<?php

declare(strict_types=1);

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Http\Responses\RegisterResponse;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Laravel\Fortify\Events\TwoFactorAuthenticationConfirmed;
use Laravel\Fortify\Events\TwoFactorAuthenticationDisabled;
use Laravel\Fortify\Events\TwoFactorAuthenticationFailed;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Responses\FailedPasswordResetLinkRequestResponse as FailedResponse;
use Laravel\Fortify\Http\Responses\SuccessfulPasswordResetLinkRequestResponse;
use Yuan\AdminCore\Audit\Audit;
use Yuan\AdminCore\Audit\AuditEvent;
use Yuan\AdminCore\Auth\AuthenticateUser;
use Yuan\AdminCore\Auth\PasswordRules;
use Yuan\AdminCore\Data\Auth\ConfirmPasswordPageData;
use Yuan\AdminCore\Data\Auth\ForgotPasswordPageData;
use Yuan\AdminCore\Data\Auth\LoginPageData;
use Yuan\AdminCore\Data\Auth\RegisterPageData;
use Yuan\AdminCore\Data\Auth\ResetPasswordPageData;
use Yuan\AdminCore\Data\Auth\TwoFactorChallengePageData;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureResponses();
        $this->configureRateLimiting();
        $this->configureAudit();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::authenticateUsing(app(AuthenticateUser::class));
    }

    /**
     * Configure Fortify views: the core auth pages, with Data props.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('Core::Auth/Login', new LoginPageData(
            submit_href: route('login.store'),
            forgot_href: Features::enabled(Features::resetPasswords()) ? route('password.request') : null,
            status: $this->status($request),
            social: $this->socialProviders(),
            register_href: Features::enabled(Features::registration()) && settings('keamanan.registrasi') === true ? route('register') : null,
        )));

        Fortify::registerView(function () {
            abort_unless(settings('keamanan.registrasi') === true, 404);

            return Inertia::render('Core::Auth/Register', new RegisterPageData(
                submit_href: route('register.store'),
                login_href: route('login'),
                password_hint: PasswordRules::hint(),
                social: $this->socialProviders(),
            ));
        });

        Fortify::twoFactorChallengeView(fn () => Inertia::render('Core::Auth/TwoFactorChallenge', new TwoFactorChallengePageData(
            submit_href: route('two-factor.login.store'),
            login_href: route('login'),
        )));

        Fortify::confirmPasswordView(fn () => Inertia::render('Core::Auth/ConfirmPassword', new ConfirmPasswordPageData(
            submit_href: route('password.confirm.store'),
        )));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('Core::Auth/ForgotPassword', new ForgotPasswordPageData(
            submit_href: route('password.email'),
            login_href: route('login'),
            status: $this->status($request),
            resend_after: config()->integer('auth.passwords.users.throttle', 60),
        )));

        Fortify::resetPasswordView(function (Request $request) {
            $email = $request->string('email')->toString();
            $token = (string) $request->route('token');
            $broker = Password::broker();
            $user = $broker->getUser(['email' => $email]);

            return Inertia::render('Core::Auth/ResetPassword', new ResetPasswordPageData(
                submit_href: route('password.update'),
                login_href: route('login'),
                forgot_href: route('password.request'),
                email: $email,
                token: $token,
                token_valid: $user !== null && $broker->tokenExists($user, $token),
                password_hint: PasswordRules::hint(),
            ));
        });
    }

    /**
     * @return list<'google'|'github'>
     */
    private function socialProviders(): array
    {
        $providers = [];

        foreach (config()->array('admin-core.auth.social') as $provider) {
            if ($provider === 'google' || $provider === 'github') {
                $providers[] = $provider;
            }
        }

        return $providers;
    }

    private function status(Request $request): ?string
    {
        $status = $request->session()->get('status');

        return is_string($status) ? $status : null;
    }

    /**
     * "Lupa kata sandi" answers the same whether or not the email has an
     * account, so the form can't be used to find accounts. Throttling and other
     * failures still show their error.
     */
    private function configureResponses(): void
    {
        $this->app->singleton(RegisterResponseContract::class, RegisterResponse::class);

        $this->app->bind(FailedPasswordResetLinkRequestResponse::class, fn ($app, array $parameters) => $parameters['status'] === Password::INVALID_USER
            ? new SuccessfulPasswordResetLinkRequestResponse(Password::RESET_LINK_SENT)
            : new FailedResponse($parameters['status']));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

    }

    /**
     * Two-factor changes and wrong codes go to the activity log (spec §7.1).
     */
    private function configureAudit(): void
    {
        Event::listen(TwoFactorAuthenticationConfirmed::class, fn (TwoFactorAuthenticationConfirmed $event) => Audit::record(AuditEvent::TwoFactorEnabled, $event->user));
        Event::listen(TwoFactorAuthenticationDisabled::class, fn (TwoFactorAuthenticationDisabled $event) => Audit::record(AuditEvent::TwoFactorDisabled, $event->user));
        Event::listen(TwoFactorAuthenticationFailed::class, fn (TwoFactorAuthenticationFailed $event) => Audit::record(AuditEvent::TwoFactorFailed, $event->user));
    }
}
