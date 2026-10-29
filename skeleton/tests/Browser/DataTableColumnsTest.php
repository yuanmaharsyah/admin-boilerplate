<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Column visibility of the DataTable (frontend-behavior §5): chosen in the
// "Kolom" menu, kept per table in localStorage `dt_cols:{slug}`.

uses(RefreshDatabase::class)->group('browser');

it('hides a column and keeps the choice after a reload', function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
    Invoice::factory()->for(Customer::factory()->state(['name' => 'Toko Sumber Rejeki']))->create();

    $page = visit('/admin/invoices')
        ->assertSee('Toko Sumber Rejeki')
        ->click('[aria-label="Atur kolom"]')
        ->click('[role="menuitemcheckbox"]:has-text("Pelanggan")')
        ->assertDontSee('Toko Sumber Rejeki')
        ->assertScript("localStorage.getItem('dt_cols:invoices')", '["customer_name"]');

    $page->navigate('/admin/invoices')
        ->assertDontSee('Toko Sumber Rejeki')
        ->click('[aria-label="Atur kolom"]')
        ->click('[role="menuitemcheckbox"]:has-text("Pelanggan")')
        ->assertSee('Toko Sumber Rejeki')
        ->assertScript("localStorage.getItem('dt_cols:invoices')", '[]')
        ->assertNoJavaScriptErrors();
});
