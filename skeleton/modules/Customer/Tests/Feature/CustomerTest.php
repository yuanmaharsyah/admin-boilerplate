<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Support\SessionKey;
use Inertia\Testing\AssertableInertia;
use Modules\Customer\Models\Customer;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

it('redirects guests to login', function (): void {
    $customer = Customer::factory()->create();

    ModuleAssertions::assertGuestRedirected('get', '/admin/customers');
    ModuleAssertions::assertGuestRedirected('delete', "/admin/customers/{$customer->id}");
    ModuleAssertions::assertGuestRedirected('delete', '/admin/customers');
});

it('needs the permission of each action', function (): void {
    $customer = Customer::factory()->create();

    ModuleAssertions::assertForbiddenWithout('customers.view', 'get', '/admin/customers');
    ModuleAssertions::assertForbiddenWithout('customers.view', 'get', '/admin/customers/lookup');
    ModuleAssertions::assertForbiddenWithout('customers.delete', 'delete', "/admin/customers/{$customer->id}");
    ModuleAssertions::assertForbiddenWithout('customers.delete', 'delete', '/admin/customers', ['ids' => [$customer->id]]);

    expect($customer->fresh()?->trashed())->toBeFalse();
});

it('lists customers with customers.view, searched and sorted from the URL', function (): void {
    Customer::factory()->create(['name' => 'Toko Maju', 'city' => 'Bandung']);
    Customer::factory()->create(['name' => 'CV Bandung Jaya', 'city' => 'Garut']);
    Customer::factory()->create(['name' => 'PT Lain', 'city' => 'Bogor']);
    ModuleAssertions::actingAsLevelWith(['customers.view']);

    AssertableInertia::fromTestResponse(get('/admin/customers?search=bandung&sort=-name')->assertOk())
        ->component('Customer::Index')
        ->count('customers.items', 2)
        ->where('customers.items.0.name', 'Toko Maju')
        ->where('table.search', 'bandung');
});

it('rejects a sort the list does not allow', function (): void {
    ModuleAssertions::actingAsLevelWith(['customers.view']);

    get('/admin/customers?sort=no_hp')->assertStatus(400);
});

it('moves a customer to the trash and audits it with no_hp masked', function (): void {
    $customer = Customer::factory()->create(['no_hp' => '081234567890']);
    ModuleAssertions::actingAsLevelWith(['customers.view', 'customers.delete']);

    delete("/admin/customers/{$customer->id}")->assertRedirect();

    expect($customer->fresh()?->trashed())->toBeTrue()
        ->and(session(SessionKey::FLASH_DATA))->toBe(['success' => 'Dipindahkan ke Sampah', 'description' => "Pelanggan {$customer->name}"]);
    ModuleAssertions::assertAudited($customer, 'deleted', masked: ['no_hp']);
});

it('deletes the selected customers in one audit batch', function (): void {
    [$first, $second, $kept] = Customer::factory()->count(3)->create()->all();
    ModuleAssertions::actingAsLevelWith(['customers.view', 'customers.delete']);

    delete('/admin/customers', ['ids' => [$first->id, $second->id]])->assertRedirect();

    $rows = ImmutableActivity::query()->where('event', 'deleted')->get();

    expect(Customer::query()->pluck('id')->all())->toBe([$kept->id])
        ->and($rows)->toHaveCount(2)
        ->and($rows->pluck('batch_uuid')->unique()->filter())->toHaveCount(1);
});

it('validates the bulk selection', function (): void {
    ModuleAssertions::actingAsLevelWith(['customers.view', 'customers.delete']);

    delete('/admin/customers', ['ids' => []])->assertSessionHasErrors('ids');
});

it('lets only Super Admin see the trash and restore, with Urungkan', function (): void {
    $customer = Customer::factory()->create();
    ModuleAssertions::actingAsLevelWith(['customers.view', 'customers.delete']);
    delete("/admin/customers/{$customer->id}");

    get('/admin/customers/trash')->assertForbidden();
    post('/admin/customers/trash/restore', ['ids' => [$customer->id]])->assertForbidden();
    delete('/admin/customers/trash', ['ids' => [$customer->id]])->assertForbidden();

    ModuleAssertions::actingAsSuperAdmin();
    $other = Customer::factory()->create();
    delete("/admin/customers/{$other->id}");
    expect(session(SessionKey::FLASH_DATA)['undo'] ?? null)->toBe(['href' => route('customers.trash.restore'), 'ids' => [$other->id]]);

    AssertableInertia::fromTestResponse(get('/admin/customers/trash')->assertOk())
        ->component('Core::Trash/Index')
        ->count('items.items', 2);

    post('/admin/customers/trash/restore', ['ids' => [$customer->id]])->assertRedirect();

    expect($customer->fresh()?->trashed())->toBeFalse();
    ModuleAssertions::assertAudited($customer, 'restored');
});

it('looks up at most 20 customers by name or city, live ones only', function (): void {
    Customer::factory()->count(25)->create(['city' => 'Bandung']);
    Customer::factory()->create(['name' => 'Toko Maju', 'city' => 'Garut']);
    Customer::factory()->trashed()->create(['name' => 'Toko Lama']);
    ModuleAssertions::actingAsLevelWith(['customers.view']);

    get('/admin/customers/lookup?search=bandung')->assertOk()->assertJsonCount(20, 'items');
    get('/admin/customers/lookup?search=toko')->assertOk()->assertExactJson(['items' => [['value' => (string) Customer::query()->where('name', 'Toko Maju')->value('id'), 'label' => 'Toko Maju']]]);
});

it('scopes every customer query to the signed-in user', function (): void {
    $customer = Customer::factory()->create();
    ModuleAssertions::actingAsLevelWith(['customers.view', 'customers.delete']);

    ModuleAssertions::assertScopedToUser(Customer::class, 'get', '/admin/customers');
    ModuleAssertions::assertScopedToUser(Customer::class, 'get', '/admin/customers/lookup');
    ModuleAssertions::assertScopedToUser(Customer::class, 'delete', "/admin/customers/{$customer->id}");
});
