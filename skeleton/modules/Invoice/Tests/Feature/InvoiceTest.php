<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Support\SessionKey;
use Inertia\Testing\AssertableInertia;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\delete;
use function Pest\Laravel\freezeSecond;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

uses(RefreshDatabase::class);

/**
 * A valid form submission, as the create page sends it.
 *
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function invoiceInput(array $overrides = []): array
{
    return [
        'number' => 'INV-900',
        'customer_id' => Customer::factory()->create()->id,
        'issued_on' => '2026-10-20',
        'due_at' => '2026-11-19 17:00',
        'status' => 'sent',
        'payment_method' => 'transfer',
        'total' => 1250000,
        'tax_rate' => 11,
        'send_reminder' => true,
        'npwp' => '012345678901234',
        'notes' => 'Termin pertama',
        ...$overrides,
    ];
}

it('redirects guests to login', function (): void {
    $invoice = Invoice::factory()->create();

    ModuleAssertions::assertGuestRedirected('get', '/admin/invoices');
    ModuleAssertions::assertGuestRedirected('get', '/admin/invoices/create');
    ModuleAssertions::assertGuestRedirected('post', '/admin/invoices');
    ModuleAssertions::assertGuestRedirected('get', "/admin/invoices/{$invoice->id}");
    ModuleAssertions::assertGuestRedirected('get', "/admin/invoices/{$invoice->id}/edit");
    ModuleAssertions::assertGuestRedirected('put', "/admin/invoices/{$invoice->id}");
    ModuleAssertions::assertGuestRedirected('delete', "/admin/invoices/{$invoice->id}");
    ModuleAssertions::assertGuestRedirected('delete', '/admin/invoices');
});

it('needs the permission of each action', function (): void {
    $invoice = Invoice::factory()->create();

    ModuleAssertions::assertForbiddenWithout('invoices.view', 'get', '/admin/invoices');
    ModuleAssertions::assertForbiddenWithout('invoices.view', 'get', "/admin/invoices/{$invoice->id}");
    ModuleAssertions::assertForbiddenWithout('invoices.create', 'get', '/admin/invoices/create');
    ModuleAssertions::assertForbiddenWithout('invoices.create', 'post', '/admin/invoices', invoiceInput());
    ModuleAssertions::assertForbiddenWithout('invoices.edit', 'get', "/admin/invoices/{$invoice->id}/edit");
    ModuleAssertions::assertForbiddenWithout('invoices.edit', 'put', "/admin/invoices/{$invoice->id}", invoiceInput(['lock_version' => $invoice->lock_version]));
    ModuleAssertions::assertForbiddenWithout('invoices.delete', 'delete', "/admin/invoices/{$invoice->id}");
    ModuleAssertions::assertForbiddenWithout('invoices.delete', 'delete', '/admin/invoices', ['ids' => [$invoice->id]]);

    expect($invoice->fresh()?->trashed())->toBeFalse();
});

it('lists invoices with invoices.view, filtered and sorted from the URL', function (): void {
    Invoice::factory()->create(['number' => 'INV-B', 'status' => InvoiceStatus::Paid]);
    Invoice::factory()->create(['number' => 'INV-A', 'status' => InvoiceStatus::Paid]);
    Invoice::factory()->create(['number' => 'INV-C', 'status' => InvoiceStatus::Draft]);
    ModuleAssertions::actingAsLevelWith(['invoices.view']);

    AssertableInertia::fromTestResponse(get('/admin/invoices?filter[status]=paid&sort=number')->assertOk())
        ->component('Invoice::Index')
        ->count('invoices.items', 2)
        ->where('invoices.items.0.number', 'INV-A')
        ->where('invoices.items.0.status_label', 'Lunas')
        ->where('table.filter', ['status' => 'paid'])
        ->where('table.sort', 'number')
        ->where('table.filters.0.options.2.label', 'Lunas');
});

it('rejects a sort the list does not allow', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view']);

    get('/admin/invoices?sort=npwp')->assertStatus(400);
});

it('moves an invoice to the trash and audits it with npwp masked', function (): void {
    $invoice = Invoice::factory()->create(['npwp' => '012345678901234']);
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.delete']);

    delete("/admin/invoices/{$invoice->id}")->assertRedirect();

    expect($invoice->fresh()?->trashed())->toBeTrue()
        ->and(session(SessionKey::FLASH_DATA))->toBe(['success' => 'Dipindahkan ke Sampah', 'description' => "Invoice {$invoice->number}"]);
    ModuleAssertions::assertAudited($invoice, 'deleted', masked: ['npwp']);
});

it('deletes the selected invoices in one audit batch', function (): void {
    [$first, $second, $kept] = Invoice::factory()->count(3)->create()->all();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.delete']);

    delete('/admin/invoices', ['ids' => [$first->id, $second->id]])->assertRedirect();

    $rows = ImmutableActivity::query()->where('event', 'deleted')->get();

    expect(Invoice::query()->pluck('id')->all())->toBe([$kept->id])
        ->and($rows)->toHaveCount(2)
        ->and($rows->pluck('batch_uuid')->unique()->filter())->toHaveCount(1);
});

it('validates the bulk selection', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.delete']);

    delete('/admin/invoices', ['ids' => []])->assertSessionHasErrors('ids');
});

it('lets only Super Admin see the trash and restore, with Urungkan', function (): void {
    $invoice = Invoice::factory()->create();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.delete']);
    delete("/admin/invoices/{$invoice->id}");

    get('/admin/invoices/trash')->assertForbidden();
    post('/admin/invoices/trash/restore', ['ids' => [$invoice->id]])->assertForbidden();
    delete('/admin/invoices/trash', ['ids' => [$invoice->id]])->assertForbidden();

    ModuleAssertions::actingAsSuperAdmin();
    $other = Invoice::factory()->create();
    delete("/admin/invoices/{$other->id}");
    expect(session(SessionKey::FLASH_DATA)['undo'] ?? null)->toBe(['href' => route('invoices.trash.restore'), 'ids' => [$other->id]]);

    AssertableInertia::fromTestResponse(get('/admin/invoices/trash')->assertOk())
        ->component('Core::Trash/Index')
        ->count('items.items', 2);

    post('/admin/invoices/trash/restore', ['ids' => [$invoice->id]])->assertRedirect();

    expect($invoice->fresh()?->trashed())->toBeFalse();
    ModuleAssertions::assertAudited($invoice, 'restored');
});

it('creates an invoice and audits it with npwp masked', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create']);

    post('/admin/invoices', invoiceInput())->assertSessionHasNoErrors();

    $invoice = Invoice::query()->where('number', 'INV-900')->sole();
    expect($invoice->status)->toBe(InvoiceStatus::Sent)
        ->and($invoice->due_at?->format('Y-m-d H:i'))->toBe('2026-11-19 17:00')
        ->and($invoice->tax_rate)->toBe('11.000')
        ->and(session(SessionKey::FLASH_DATA))->toBe(['success' => 'Invoice dibuat.', 'description' => 'INV-900']);
    ModuleAssertions::assertAudited($invoice, 'created', masked: ['npwp']);
});

it('rejects an invoice without its required fields', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create']);

    post('/admin/invoices', [])->assertSessionHasErrors(['number', 'customer_id', 'issued_on', 'status', 'total', 'tax_rate']);
});

it('validates formats, enums, the due date and a trashed customer', function (array $overrides, string $field): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create']);

    post('/admin/invoices', invoiceInput($overrides))->assertSessionHasErrors($field);
})->with([
    'date format' => [['issued_on' => '20/10/2026'], 'issued_on'],
    'due before issued' => [['due_at' => '2026-10-01 09:00'], 'due_at'],
    'unknown status' => [['status' => 'lost'], 'status'],
    'unknown payment method' => [['payment_method' => 'cek'], 'payment_method'],
    'npwp digits' => [['npwp' => '01.234'], 'npwp'],
    'negative total' => [['total' => -1], 'total'],
    'trashed customer' => [fn (): array => ['customer_id' => Customer::factory()->trashed()->create()->id], 'customer_id'],
]);

it('rejects a number that another invoice uses, but keeps its own on edit', function (): void {
    $taken = Invoice::factory()->create(['number' => 'INV-900']);
    $invoice = Invoice::factory()->create();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create', 'invoices.edit']);

    post('/admin/invoices', invoiceInput())->assertSessionHasErrors('number');
    put("/admin/invoices/{$taken->id}", invoiceInput(['lock_version' => $taken->lock_version]))->assertSessionHasNoErrors();
    put("/admin/invoices/{$invoice->id}", invoiceInput(['lock_version' => $invoice->lock_version]))->assertSessionHasErrors('number');
});

it('shows an invoice and its edit form with invoices.view and invoices.edit', function (): void {
    $invoice = Invoice::factory()->create(['due_at' => '2026-11-19 17:00:00']);
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.edit']);

    AssertableInertia::fromTestResponse(get("/admin/invoices/{$invoice->id}")->assertOk())
        ->component('Invoice::Show')
        ->where('invoice.number', $invoice->number)
        ->where('invoice.due_at', '2026-11-19 17:00')
        ->where('breadcrumbs.items.1.label', $invoice->number);

    AssertableInertia::fromTestResponse(get("/admin/invoices/{$invoice->id}/edit")->assertOk())
        ->component('Invoice::Edit')
        ->where('invoice.lock_version', 0)
        ->has('options.statuses', 4)
        ->has('options.payment_methods', 4);
});

it('updates an invoice and audits the change with npwp masked', function (): void {
    $invoice = Invoice::factory()->create(['npwp' => '111111111111111']);
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.edit']);

    put("/admin/invoices/{$invoice->id}", invoiceInput(['number' => $invoice->number, 'lock_version' => $invoice->lock_version]))
        ->assertRedirect("/admin/invoices/{$invoice->id}");

    expect($invoice->fresh()?->total)->toBe(1250000);
    ModuleAssertions::assertAudited($invoice, 'updated', masked: ['npwp']);
});

it('gives the second of two saves in the same second a 409 and keeps the first', function (): void {
    $invoice = Invoice::factory()->create(['total' => 1000]);
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.edit']);
    freezeSecond();

    put("/admin/invoices/{$invoice->id}", invoiceInput(['number' => $invoice->number, 'total' => 2000, 'lock_version' => 0]))->assertRedirect();
    put("/admin/invoices/{$invoice->id}", invoiceInput(['number' => $invoice->number, 'total' => 3000, 'lock_version' => 0]))->assertStatus(409);

    expect($invoice->fresh()?->only(['total', 'lock_version']))->toBe(['total' => 2000, 'lock_version' => 1]);
});

it('scopes every invoice query to the signed-in user', function (): void {
    $invoice = Invoice::factory()->create();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.edit', 'invoices.delete']);

    ModuleAssertions::assertScopedToUser(Invoice::class, 'get', '/admin/invoices');
    ModuleAssertions::assertScopedToUser(Invoice::class, 'get', "/admin/invoices/{$invoice->id}");
    ModuleAssertions::assertScopedToUser(Invoice::class, 'get', "/admin/invoices/{$invoice->id}/edit");
    ModuleAssertions::assertScopedToUser(Invoice::class, 'put', "/admin/invoices/{$invoice->id}", invoiceInput(['lock_version' => $invoice->lock_version]));
    ModuleAssertions::assertScopedToUser(Invoice::class, 'delete', '/admin/invoices', ['ids' => [$invoice->id]]);
    ModuleAssertions::assertScopedToUser(Invoice::class, 'delete', "/admin/invoices/{$invoice->id}");
});

it('links only a customer the user may see', function (): void {
    $invoice = Invoice::factory()->create();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create', 'invoices.edit']);

    ModuleAssertions::assertScopedToUser(Customer::class, 'post', '/admin/invoices', invoiceInput());
    ModuleAssertions::assertScopedToUser(Customer::class, 'put', "/admin/invoices/{$invoice->id}", invoiceInput(['number' => $invoice->number, 'lock_version' => $invoice->lock_version]));
});
