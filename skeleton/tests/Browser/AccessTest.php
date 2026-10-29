<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\artisan;

// The permission matrix (frontend-behavior §8.2) and the forced password
// change after an admin created or reset an account.

uses(RefreshDatabase::class)->group('browser');

it('ticks View along with Edit in the matrix and saves both', function (): void {
    $this->withVite();
    artisan('permissions:sync');
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
    $level = Level::query()->create(['name' => 'operator-uji', 'label' => 'Operator Uji']);

    visit("/admin/levels/{$level->id}/permissions")
        ->click('[aria-label="Users: Edit"]')
        ->assertSee('View pada Users ikut dicentang karena Edit membutuhkan akses lihat.')
        ->assertSee('2 perubahan belum disimpan')
        ->click('Simpan')
        ->assertSee('Hak akses diperbarui.')
        ->assertNoJavaScriptErrors();

    expect($level->permissions()->pluck('name')->sort()->values()->all())->toBe(['users.edit', 'users.view']);
});

it('keeps a user on the change-password page until the password is changed', function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    $user->forceFill(['must_change_password' => true])->save();
    actingAs($user);

    visit('/admin/users')
        ->assertPathIs('/account/password')
        ->assertSee('Anda harus mengganti kata sandi sebelum melanjutkan.')
        ->type('#current_password', 'password')
        ->type('#password', 'GantiBaru12345')
        ->type('#password_confirmation', 'GantiBaru12345')
        ->click('Simpan kata sandi')
        ->assertSee('Kata sandi berhasil diubah.')
        ->assertNoJavaScriptErrors();

    expect($user->fresh()?->must_change_password)->toBeFalse();
});
