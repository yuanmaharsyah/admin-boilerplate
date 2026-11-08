<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Restyle 03 part B on the Komponen example and the Invoice list: expanding rows,
// inline editing, keyboard row and column reorder, sticky header.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('opens and closes a row details panel', function (): void {
    $invoice = Invoice::factory()->create(['notes' => 'Bayar lewat transfer']);

    visit('/admin/invoices')
        ->click("[aria-label=\"Rincian {$invoice->number}\"]")
        ->assertAttribute("[aria-label=\"Rincian {$invoice->number}\"]", 'aria-expanded', 'true')
        ->assertSee('Bayar lewat transfer')
        ->click("[aria-label=\"Rincian {$invoice->number}\"]")
        ->assertDontSee('Bayar lewat transfer')
        ->assertScript("getComputedStyle(document.querySelector('thead')).position", 'sticky')
        ->assertNoJavaScriptErrors();
});

it('edits a cell inline: Enter saves, Esc cancels', function (): void {
    visit('/admin/components#tabel')
        ->click('#tabel [aria-label="Ubah Pelanggan"]:has-text("Toko Sinar Jaya")')
        ->type('#tabel input[aria-label="Pelanggan"]', 'Toko Sinar Jaya Baru')
        ->keys('#tabel input[aria-label="Pelanggan"]', 'Enter')
        ->assertSeeIn('#tabel', 'Toko Sinar Jaya Baru')
        ->click('#tabel [aria-label="Ubah Pelanggan"]:has-text("CV Maju Bersama")')
        ->type('#tabel input[aria-label="Pelanggan"]', 'Tidak jadi')
        ->keys('#tabel input[aria-label="Pelanggan"]', 'Escape')
        ->assertDontSeeIn('#tabel', 'Tidak jadi')
        ->assertNoJavaScriptErrors();
});

it('moves a row and a column with the keyboard', function (): void {
    $row = '#tabel [aria-label="Pindahkan Toko Sinar Jaya"]';
    $column = '#tabel [aria-label="Pindahkan kolom Pelanggan"]';

    visit('/admin/components#tabel')
        ->keys($row, 'Space')->wait(0.3)
        ->keys($row, 'ArrowDown')->wait(0.3)
        ->keys($row, 'Space')->wait(0.3)
        ->assertScript("document.querySelectorAll('#tabel tbody tr')[1].textContent.includes('Toko Sinar Jaya')", true)
        ->keys($column, 'Space')->wait(0.3)
        ->keys($column, 'ArrowRight')->wait(0.3)
        ->keys($column, 'Space')->wait(0.3)
        ->assertScript("[...document.querySelectorAll('#tabel thead th')].findIndex((th) => th.textContent.includes('Pelanggan')) > [...document.querySelectorAll('#tabel thead th')].findIndex((th) => th.textContent.includes('Kota'))", true)
        ->assertNoJavaScriptErrors();
});
