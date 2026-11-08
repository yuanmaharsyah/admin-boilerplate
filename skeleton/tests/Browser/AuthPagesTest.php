<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Settings\Settings;

use function Pest\Laravel\seed;

// Restyle 03: the split auth card with our showcase, the reserved social buttons, register, error pages.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    seed();
});

it('shows the split login card with the social room and hides the showcase on a phone', function (): void {
    visit('/login')
        ->resize(1440, 900)
        ->assertSee('Google')
        ->assertSee('atau masuk dengan')
        ->assertVisible('[aria-hidden="true"].auth-grid')
        ->resize(375, 800)
        ->assertScript("getComputedStyle(document.querySelector('.auth-grid')).display", 'none')
        ->assertDontSee('Buat akun')
        ->assertNoJavaScriptErrors();
});

it('offers the register page while registration is on', function (): void {
    app(Settings::class)->save('keamanan', ['registrasi' => true, 'wajib_2fa' => false]);

    visit('/login')
        ->click('a:has-text("Buat akun")')
        ->assertPathIs('/register')
        ->assertSee('Nama lengkap')
        ->assertNoJavaScriptErrors();
});

it('renders an error page in the shared card, in dark mode too', function (): void {
    visit('/tidak-ada-halaman-ini')
        ->inDarkMode()
        ->assertSee('404')
        ->assertSee('Halaman tidak ditemukan')
        ->assertNoJavaScriptErrors();
});
