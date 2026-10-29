<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Auth\SessionGuard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Yuan\AdminCore\Http\Middleware\EnsureUserIsActive;

use function Pest\Laravel\assertAuthenticatedAs;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\withCookie;

uses(RefreshDatabase::class);

beforeEach(fn () => config(['session.driver' => 'file']));

/**
 * A user signed in through Fortify, on the file session driver.
 */
function signedInThroughFortify(): User
{
    $user = User::factory()->create();
    post(route('login.store'), ['username' => $user->email, 'password' => 'password']);
    assertAuthenticatedAs($user);

    return $user;
}

/**
 * Another admin changes the user, then the next request resolves the user
 * from the session again.
 */
function revokeAsAnotherAdmin(User $user): void
{
    auth()->setUser(User::factory()->create());
    $user->update(['password' => 'GantiBaru12345']);
    auth()->forgetUser();
}

it('rejects a revoked session on the Fortify password-confirm routes, not just module routes', function (): void {
    $user = signedInThroughFortify();
    get(route('password.confirmation'))->assertOk();

    revokeAsAnotherAdmin($user);

    post(route('password.confirm.store'), ['password' => 'GantiBaru12345'])->assertRedirect(route('login'));
    assertGuest();
    get(route('password.confirmation'))->assertRedirect(route('login'));
});

it('rejects a revoked session on the kit pages', function (): void {
    revokeAsAnotherAdmin(signedInThroughFortify());

    get(route('account.profile.edit'))->assertRedirect(route('login'));
    assertGuest();
});

it('keeps the current session when users change their own password', function (): void {
    $user = signedInThroughFortify();

    put(route('account.password.update'), [
        'current_password' => 'password',
        'password' => 'GantiBaru12345',
        'password_confirmation' => 'GantiBaru12345',
    ])->assertSessionHasNoErrors();

    expect($user->fresh()?->session_version)->toBe(1);
    get(route('account.profile.edit'))->assertOk();
});

it('lets a revoked session reach logout', function (): void {
    revokeAsAnotherAdmin(signedInThroughFortify());

    post(route('logout'))->assertRedirect('/');
    assertGuest();
});

/**
 * The remember-me cookie Laravel would issue for the user as they are now.
 *
 * @return array{string, string}
 */
function rememberCookie(User $user): array
{
    /** @var SessionGuard $guard */
    $guard = Auth::guard();

    return [$guard->getRecallerName(), $user->getAuthIdentifier().'|'.$user->getRememberToken().'|'.$user->getAuthPassword()];
}

it('restores a session from a remember cookie with the current session version', function (): void {
    $user = User::factory()->create();
    revokeAsAnotherAdmin($user);
    $user->refresh();
    expect($user->session_version)->toBe(1);

    withCookie(...rememberCookie($user))->get(route('account.profile.edit'))->assertOk();

    assertAuthenticatedAs($user);
    expect(session(EnsureUserIsActive::SESSION_VERSION))->toBe(1);
    get(route('account.profile.edit'))->assertOk();
});

it('refuses a remember cookie issued before a revocation', function (): void {
    $user = User::factory()->create();
    $cookie = rememberCookie($user);

    revokeAsAnotherAdmin($user);

    withCookie(...$cookie)->get(route('account.profile.edit'))->assertRedirect(route('login'));
    assertGuest();
});
