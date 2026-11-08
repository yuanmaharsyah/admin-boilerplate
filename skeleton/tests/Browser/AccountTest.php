<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

// Akun (restyle 03): segmented tabs, the reserved Notifikasi switches, and two-step set-up up to the QR code.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    actingAs(User::factory()->create(['password' => 'Rahasia-Uji-123']));
});

it('switches tabs and toggles a notification switch on the page only', function (): void {
    visit('/account/profile')
        ->assertSee('Foto profil')
        ->click('[role="tab"]:has-text("Notifikasi")')
        ->assertQueryStringHas('tab', 'notifikasi')
        ->assertAttribute('[role="switch"][aria-labelledby="notif-newsletter"]', 'aria-checked', 'false')
        ->click('[role="switch"][aria-labelledby="notif-newsletter"]')
        ->assertAttribute('[role="switch"][aria-labelledby="notif-newsletter"]', 'aria-checked', 'true')
        ->assertNoJavaScriptErrors();
});

it('asks for the password, then shows the QR code to set up two-step', function (): void {
    visit('/account/profile?tab=keamanan')
        ->click('button:has-text("Aktifkan")')
        ->type('#confirm_password', 'Rahasia-Uji-123')
        ->click('button:has-text("Konfirmasi")')
        ->assertSee('Menunggu konfirmasi')
        ->assertPresent('img[alt="Kode QR untuk aplikasi autentikator"]')
        ->assertNoJavaScriptErrors();
});
