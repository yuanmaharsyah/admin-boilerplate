<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// The form components and their behaviour (frontend-behavior §6) on the demo
// Invoice form: typed dates, locale numbers, the relation lookup, the error
// summary and focus, the unsaved-changes guard and the stale-update dialog.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('creates an invoice from typed dates, pasted numbers and a looked-up customer', function (): void {
    Customer::factory()->create(['name' => 'Toko Sumber Rejeki']);

    visit('/admin/invoices/create')
        ->type('#number', 'INV-777')
        ->click('#customer_id')
        ->type('[cmdk-input]', 'sumber')
        ->click('[cmdk-item]:has-text("Toko Sumber Rejeki")')
        ->assertSeeIn('#customer_id', 'Toko Sumber Rejeki')
        ->type('#issued_on', '20/10/2026')
        ->keys('#issued_on', 'Tab')
        ->assertValue('#issued_on', '20 Okt 2026')
        ->type('#total', '1,250,000')
        ->keys('#total', 'Tab')
        ->assertValue('#total', '1.250.000')
        ->fill('#tax_rate', '0.125')
        ->keys('#tax_rate', 'Tab')
        ->assertValue('#tax_rate', '0,125')
        ->click('button[type=submit]')
        ->assertSee('Invoice dibuat.')
        ->assertSee('Rp 1.250.000')
        ->assertSee('20 Okt 2026')
        ->assertNoJavaScriptErrors();

    expect(Invoice::query()->sole()->only(['number', 'total', 'tax_rate']))
        ->toMatchArray(['number' => 'INV-777', 'total' => 1250000, 'tax_rate' => '0.125'])
        ->and(Invoice::query()->sole()->issued_on->toDateString())->toBe('2026-10-20');
});

it('lists the errors and focuses the first invalid field', function (): void {
    visit('/admin/invoices/create')
        ->click('button[type=submit]')
        ->assertSee('Periksa')
        ->assertScript('document.activeElement?.id', 'number')
        ->assertScript("document.getElementById('number').getAttribute('aria-invalid')", 'true');
});

it('asks before leaving a changed form, and stays or leaves', function (): void {
    $invoice = Invoice::factory()->create();

    visit("/admin/invoices/{$invoice->id}/edit")
        ->type('#notes', 'Belum disimpan')
        ->click('a:has-text("Batal")')
        ->assertSee('Perubahan belum disimpan')
        ->click('button:has-text("Tetap di sini")')
        ->assertPathIs("/admin/invoices/{$invoice->id}/edit")
        ->assertValue('#notes', 'Belum disimpan')
        ->click('a:has-text("Batal")')
        ->click('button:has-text("Tinggalkan")')
        ->assertPathIs("/admin/invoices/{$invoice->id}")
        ->assertNoJavaScriptErrors();
});

it('opens the stale dialog when someone saved first, and reloads their version', function (): void {
    $invoice = Invoice::factory()->create(['notes' => 'Versi awal']);

    $page = visit("/admin/invoices/{$invoice->id}/edit")->assertValue('#notes', 'Versi awal');

    $invoice->update(['notes' => 'Versi orang lain']);

    $page->fill('#notes', 'Versi saya')
        ->click('button[type=submit]')
        ->assertSee('Data ini telah diubah oleh pengguna lain')
        ->click('button:has-text("Muat ulang")')
        ->assertValue('#notes', 'Versi orang lain')
        ->assertDontSee('Data ini telah diubah oleh pengguna lain')
        ->assertNoJavaScriptErrors();

    expect($invoice->fresh()?->notes)->toBe('Versi orang lain');
});

it('shows on blur how each number was read', function (string $field, string $typed, string $shown): void {
    visit('/admin/invoices/create')
        ->fill("#{$field}", $typed)
        ->keys("#{$field}", 'Tab')
        ->assertValue("#{$field}", $shown);
})->with([
    'decimal: a lone dot is the decimal mark' => ['tax_rate', '0.125', '0,125'],
    'decimal: comma decimal' => ['tax_rate', '12,5', '12,5'],
    'decimal: both separators' => ['tax_rate', '1.234,5', '1.234,5'],
    'rupiah: dot thousands' => ['total', '1.250', '1.250'],
    'rupiah: English notation' => ['total', '1,250,000', '1.250.000'],
    'rupiah: decimals rounded away' => ['total', '1.250.000,75', '1.250.001'],
    'not a number' => ['total', 'abc', ''],
]);
