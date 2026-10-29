<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Audit\Audit;
use Yuan\AdminCore\Audit\AuditEvent;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Log Aktivitas (frontend-behavior §8.3): one filter state for the summary
// and the list, segment clicks filter the list, the drawer lives in the URL.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    $admin = User::factory()->create(['name' => 'Admin Utama']);
    $admin->assignLevel(Level::superAdmin());
    $staff = User::factory()->create(['name' => 'Siti Rahmawati']);
    Audit::actingAs($staff, fn () => Audit::record(AuditEvent::Login));
    Audit::actingAs($staff, fn () => Audit::record(AuditEvent::Exported, meta: ['rows' => 12], module: 'users'));
    actingAs($admin);
});

it('loads the summary after the list and filters the list from a segment', function (): void {
    $page = visit('/admin/audit-log')
        ->assertSee('Riwayat')
        ->assertSee('Total Aktivitas')
        ->assertSee('Aktivitas per Jenis')
        ->click('[aria-label^="Filter event Autentikasi"]')
        ->assertScript("new URLSearchParams(location.search).get('filter[event]')", 'auth')
        ->assertAttribute('[aria-label^="Filter event Autentikasi"]', 'aria-pressed', 'true')
        ->assertSee('Masuk')
        ->assertNoJavaScriptErrors();

    $page->assertScript("[...document.querySelectorAll('table[aria-label=\"Riwayat aktivitas\"] tbody tr')].every((row) => /Masuk|Keluar|Login gagal|Akun terkunci|Password/.test(row.textContent))", true);
});

it('opens the drawer from the URL and closes it with Esc', function (): void {
    $row = ImmutableActivity::query()->where('event', 'exported')->sole();

    visit("/admin/audit-log?event_id={$row->id}")
        ->assertPresent('[role="dialog"][aria-label="Detail aktivitas"]')
        ->assertSee('Keterangan')
        ->assertSee('Baris')
        ->keys('[role="dialog"]', 'Escape')
        ->assertNotPresent('[role="dialog"]')
        ->assertQueryStringMissing('event_id')
        ->assertNoJavaScriptErrors();
});

it('reloads the summary and the list from the filter bar', function (): void {
    visit('/admin/audit-log')
        ->assertSee('Total Aktivitas')
        ->click('[aria-label="Modul: Semua modul"]')
        ->click('[role="menuitem"]:has-text("Autentikasi")')
        ->assertScript("new URLSearchParams(location.search).get('filter[module]')", 'auth')
        ->assertDontSee('Diunduh')
        ->assertSee('Masuk')
        ->assertNoJavaScriptErrors();
});

it('loads a record\'s Riwayat tab on demand and opens a change inline', function (): void {
    $user = User::query()->where('name', 'Siti Rahmawati')->sole();
    $user->update(['name' => 'Siti R.']);

    visit("/admin/users/{$user->id}")
        ->click('[role="tab"]:has-text("Riwayat")')
        ->assertSee('Mengubah 1 field')
        ->click('button[aria-expanded="false"]:has-text("Mengubah 1 field")')
        ->assertSee('Siti Rahmawati')
        ->assertPresent('table[aria-label="Perubahan field"]')
        ->assertNoJavaScriptErrors();
});

it('keeps the window from scrolling: only the main area scrolls, hidden chart tables included', function (): void {
    visit('/admin/audit-log')
        ->resize(1280, 700)
        ->assertSee('Aktivitas per Hari')
        ->assertScript('document.documentElement.scrollHeight <= window.innerHeight', true)
        ->assertNoJavaScriptErrors();
});
