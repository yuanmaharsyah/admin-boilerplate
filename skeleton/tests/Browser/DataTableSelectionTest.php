<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Row selection of the DataTable (frontend-behavior §5): page-scoped, select
// all with an indeterminate state, bulk delete through the confirm dialog.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('selects rows, selects all on the page, and clears the selection on paging', function (): void {
    foreach (range(1, 12) as $i) {
        Invoice::factory()->create(['number' => sprintf('INV-%03d', $i)]);
    }

    visit('/admin/invoices?per_page=10')
        ->assertDontSee('dipilih')
        ->click('[aria-label="Pilih INV-012"]')
        ->assertSee('1 dipilih')
        ->assertScript("document.querySelector('[aria-label=\"Pilih semua di halaman ini\"]').dataset.state", 'indeterminate')
        ->click('[aria-label="Pilih semua di halaman ini"]')
        ->assertSee('10 dipilih')
        ->click('[aria-label="Pilih semua di halaman ini"]')
        ->assertDontSee('dipilih')
        ->click('[aria-label="Pilih INV-011"]')
        ->assertSee('1 dipilih')
        ->click('[aria-label="Halaman 2"]')
        ->assertSee('INV-001')
        ->assertDontSee('dipilih')
        ->assertNoJavaScriptErrors();
});

it('deletes the selected rows after the confirm', function (): void {
    foreach (['INV-001', 'INV-002', 'INV-003'] as $number) {
        Invoice::factory()->create(['number' => $number]);
    }

    visit('/admin/invoices')
        ->click('[aria-label="Pilih INV-001"]')
        ->click('[aria-label="Pilih INV-003"]')
        ->assertSee('2 dipilih')
        ->click('[role="status"] button:has-text("Hapus")')
        ->assertSee('2 item')
        ->click('[role="alertdialog"] button:has-text("Hapus")')
        ->assertSee('Dipindahkan ke Sampah')
        ->assertDontSee('INV-003')
        ->assertSee('INV-002')
        ->assertNoJavaScriptErrors();

    expect(Invoice::query()->pluck('number')->all())->toBe(['INV-002']);
});
