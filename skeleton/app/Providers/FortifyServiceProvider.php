<?php

declare(strict_types=1);

namespace App\Providers;

use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Responses\FailedPasswordResetLinkRequestResponse as FailedResponse;
use Laravel\Fortify\Http\Responses\SuccessfulPasswordResetLinkRequestResponse;
use Yuan\AdminCore\Auth\AuthenticateUser;
use Yuan\AdminCore\Auth\PasswordRules;
use Yuan\AdminCore\Data\Auth\ForgotPasswordPageData;
use Yuan\AdminCore\Data\Auth\LoginPageData;
use Yuan\AdminCore\Data\Auth\ResetPasswordPageData;

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
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
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
}
