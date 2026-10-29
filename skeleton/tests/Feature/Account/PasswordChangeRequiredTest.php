<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\getJson;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

// After an admin created the account or reset its password, the user can only
// change the password or sign out (RequirePasswordChange).

uses(RefreshDatabase::class);

function userWhoMustChange(): User
{
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    $user->forceFill(['must_change_password' => true])->save();

    return $user;
}

it('sends every other page to the change-password page, and JSON gets a 403', function (): void {
    actingAs(userWhoMustChange());

    get('/admin/users')->assertRedirect(route('account.password.edit'));
    get(route('account.profile.edit'))->assertRedirect(route('account.password.edit'));
    get(route('account.profile.edit'))->assertRedirect(route('account.password.edit'));
    getJson('/admin/users')->assertForbidden();
});

it('shows the mandatory state with a sign-out link', function (): void {
    actingAs(userWhoMustChange());

    AssertableInertia::fromTestResponse(get(route('account.password.edit'))->assertOk())
        ->component('Core::Auth/ChangePassword')
        ->where('required', true)
        ->where('logout_href', route('logout'));

    post(route('logout'))->assertRedirect();
    $this->assertGuest();
});

it('clears the flag once the password is changed', function (): void {
    $user = userWhoMustChange();
    actingAs($user);

    put(route('account.password.update'), ['current_password' => 'password', 'password' => 'GantiBaru12345', 'password_confirmation' => 'GantiBaru12345'])
        ->assertRedirect(route('admin-core.home'));

    expect($user->fresh()?->must_change_password)->toBeFalse();
    get('/admin/users')->assertOk();
    AssertableInertia::fromTestResponse(get(route('account.password.edit')))->where('required', false);
});
