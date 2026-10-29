<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Fixtures\WidgetProbe;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Beranda (frontend-behavior §8.6): every card loads on its own, a failing one
// offers a retry, and the range reloads only the widgets that use it.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    WidgetProbe::enable();
    $admin = User::factory()->create(['name' => 'Budi Santoso']);
    $admin->assignLevel(Level::superAdmin());
    actingAs($admin);
});

it('loads every widget, shows the failing one with a retry, and reloads ranged widgets on a range change', function (): void {
    $page = visit('/admin/dashboard')
        ->assertSee('Budi Santoso')
        ->assertSee('Login Gagal')
        ->assertSee('Aktivitas per Hari')
        ->assertSee('Gagal memuat')
        ->assertSee('Coba lagi')
        ->assertSeeIn('section[aria-label="Stabil"]', '30');

    $page->click('[role="group"][aria-label="Rentang"] button:has-text("7 hari")')
        ->assertQueryStringHas('range', '7d')
        ->assertAttribute('[role="group"][aria-label="Rentang"] button:has-text("7 hari")', 'aria-pressed', 'true')
        ->assertSeeIn('section[aria-label="Stabil"]', '7')
        ->assertSee('Coba lagi')
        ->click('button:has-text("Coba lagi")')
        ->assertSee('Gagal memuat')
        ->assertNoJavaScriptErrors();
});
