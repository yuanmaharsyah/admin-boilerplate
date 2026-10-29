<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Permissions\Level;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\put;

// The signed-in user's own profile (/account/profile): name and email only.

uses(RefreshDatabase::class);

it('redirects guests to login', function (): void {
    get(route('account.profile.edit'))->assertRedirect(route('login'));
    put(route('account.profile.update'))->assertRedirect(route('login'));
});

it('shows the profile with the username and level read-only', function (): void {
    $user = User::factory()->create(['username' => 'andi.w']);
    $user->assignLevel(Level::query()->create(['name' => 'staf', 'label' => 'Staf']));

    AssertableInertia::fromTestResponse(actingAs($user)->get(route('account.profile.edit'))->assertOk())
        ->component('Core::Account/Profile')
        ->where('profile.username', 'andi.w')
        ->where('profile.level_label', 'Staf')
        ->where('profile.submit_href', route('account.profile.update'));
});

it('saves the name and email, audited, and keeps the username and level', function (): void {
    $user = User::factory()->create(['username' => 'andi.w']);
    $level = Level::query()->create(['name' => 'staf', 'label' => 'Staf']);
    $user->assignLevel($level);
    $user->refresh();

    actingAs($user)->put(route('account.profile.update'), ['name' => 'Andi Baru', 'email' => 'ANDI@contoh.test', 'username' => 'lain', 'level_id' => Level::superAdmin()->id, 'lock_version' => $user->lock_version])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('account.profile.edit'));

    $user->refresh();
    expect($user->name)->toBe('Andi Baru')
        ->and($user->email)->toBe('andi@contoh.test')
        ->and($user->username)->toBe('andi.w')
        ->and($user->level()?->is($level))->toBeTrue();
    ModuleAssertions::assertAudited($user, 'updated');
});

it('validates the fields and refuses an email taken by someone else', function (): void {
    $user = User::factory()->create();
    User::factory()->create(['email' => 'dipakai@contoh.test']);

    actingAs($user)->put(route('account.profile.update'), [])->assertSessionHasErrors(['name', 'email', 'lock_version']);
    put(route('account.profile.update'), ['name' => 'X', 'email' => 'dipakai@contoh.test', 'lock_version' => 0])->assertSessionHasErrors('email');
    put(route('account.profile.update'), ['name' => 'X', 'email' => $user->email, 'lock_version' => 0])->assertSessionHasNoErrors();
});

it('gives a stale save a 409', function (): void {
    $user = User::factory()->create();
    actingAs($user);

    put(route('account.profile.update'), ['name' => 'Satu', 'email' => $user->email, 'lock_version' => 0])->assertRedirect();
    put(route('account.profile.update'), ['name' => 'Dua', 'email' => $user->email, 'lock_version' => 0])->assertStatus(409);

    expect($user->fresh()?->name)->toBe('Satu');
});
