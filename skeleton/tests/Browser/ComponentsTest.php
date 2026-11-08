<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Komponen renders every catalogue entry with no JS error, in light and dark.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('renders every section in light and dark', function (): void {
    foreach ([false, true] as $dark) {
        $page = visit('/admin/components');

        if ($dark) {
            $page = $page->inDarkMode();
        }

        $page->assertSee('Komponen')
            ->assertPresent('#tabel table tbody[data-rows-in] tr')
            ->assertPresent('#grafik section[aria-label="Pendapatan per hari"]')
            ->assertSee('Buka dialog hapus')
            ->assertNoJavaScriptErrors()
            ->assertNoConsoleLogs();
    }
});
