<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Attachments\Attachment;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\getJson;
use function Pest\Laravel\post;
use function Pest\Laravel\travel;

// The demo's named attachment slots: `bukti_bayar` (one file, a new one
// replaces it) and `lampiran` (a list). Files go with the invoice form.

uses(RefreshDatabase::class);

beforeEach(fn () => Storage::fake('local'));

/**
 * @param  array<string, mixed>  $files
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function invoiceWithFiles(array $files, array $overrides = []): array
{
    return [
        'number' => 'INV-700',
        'customer_id' => Customer::factory()->create()->id,
        'issued_on' => '2026-10-20',
        'due_at' => null,
        'status' => 'sent',
        'payment_method' => null,
        'total' => 500000,
        'tax_rate' => 11,
        'send_reminder' => false,
        'npwp' => null,
        'notes' => null,
        'files' => $files,
        ...$overrides,
    ];
}

function pdf(string $name = 'bukti.pdf', int $kb = 120): UploadedFile
{
    return UploadedFile::fake()->create($name, $kb, 'application/pdf');
}

/** An invoice with one file in `lampiran`, as an editor saved it. */
function invoiceWithAttachment(): Attachment
{
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create', 'invoices.edit']);
    post('/admin/invoices', invoiceWithFiles(['lampiran' => [pdf('scan.pdf')]]))->assertRedirect();

    return Attachment::query()->sole();
}

it('stores the files of each slot with the new invoice, on the private disk, audited in its batch', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create']);

    post('/admin/invoices', invoiceWithFiles([
        'bukti_bayar' => pdf("../../Bukti\x07 Okt.pdf"),
        'lampiran' => [pdf('kontrak.pdf'), UploadedFile::fake()->image('foto.jpg')],
    ]))->assertRedirect();

    $invoice = Invoice::query()->sole();
    $proof = $invoice->attachments('bukti_bayar')->sole();
    expect($invoice->attachments('lampiran')->pluck('original_name')->all())->toEqualCanonicalizing(['kontrak.pdf', 'foto.jpg'])
        ->and($proof->original_name)->toBe('Bukti Okt.pdf')
        ->and($proof->disk)->toBe('local')
        ->and($proof->path)->toStartWith('attachments/invoices/')
        ->and($proof->path)->not->toContain('Bukti');
    Storage::disk('local')->assertExists($proof->path);

    $rows = ImmutableActivity::query()->whereMorphedTo('subject', $invoice)->get();
    expect($rows->pluck('event')->all())->toEqualCanonicalizing(['created', 'attachment_uploaded', 'attachment_uploaded', 'attachment_uploaded'])
        ->and($rows->pluck('batch_uuid')->unique())->toHaveCount(1)
        ->and($rows->firstWhere('event', 'attachment_uploaded')?->properties?->get('meta')['slot'] ?? null)->toBeIn(['bukti_bayar', 'lampiran']);
});

it('checks each file against its own slot', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create']);

    post('/admin/invoices', invoiceWithFiles(['bukti_bayar' => UploadedFile::fake()->create('bukti.xlsx', 10)]))->assertSessionHasErrors('files.bukti_bayar');
    post('/admin/invoices', invoiceWithFiles(['bukti_bayar' => pdf('besar.pdf', 2049)]))->assertSessionHasErrors('files.bukti_bayar');
    post('/admin/invoices', invoiceWithFiles(['bukti_bayar' => [pdf(), pdf()]]))->assertSessionHasErrors('files.bukti_bayar');
    post('/admin/invoices', invoiceWithFiles(['lampiran' => [UploadedFile::fake()->create('skrip.php', 1, 'text/x-php')]]))->assertSessionHasErrors('files.lampiran.0');

    expect(Invoice::query()->count())->toBe(0)
        ->and(Attachment::query()->count())->toBe(0);
});

it('replaces the file of a single slot on update and adds to a list', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.create', 'invoices.edit']);
    post('/admin/invoices', invoiceWithFiles(['bukti_bayar' => pdf('lama.pdf'), 'lampiran' => [pdf('a.pdf')]]))->assertRedirect();
    $invoice = Invoice::query()->sole();
    $old = $invoice->attachments('bukti_bayar')->sole();

    post("/admin/invoices/{$invoice->id}?_method=PUT", invoiceWithFiles(['bukti_bayar' => pdf('baru.pdf'), 'lampiran' => [pdf('b.pdf')]], ['number' => $invoice->number, 'customer_id' => $invoice->customer_id, 'lock_version' => $invoice->lock_version]))
        ->assertRedirect("/admin/invoices/{$invoice->id}");

    expect($invoice->attachments('bukti_bayar')->pluck('original_name')->all())->toBe(['baru.pdf'])
        ->and($invoice->attachments('lampiran')->count())->toBe(2);
    Storage::disk('local')->assertMissing($old->path);
    ModuleAssertions::assertAudited($invoice, 'attachment_deleted');
});

it('lists every slot with its files on Show, Edit and Create; delete only for editors', function (): void {
    $file = invoiceWithAttachment();
    $invoice = Invoice::query()->sole();

    AssertableInertia::fromTestResponse(get("/admin/invoices/{$invoice->id}"))
        ->where('attachments.slots.0.key', 'bukti_bayar')
        ->where('attachments.slots.0.multiple', false)
        ->where('attachments.slots.0.accept', ['pdf', 'jpg', 'jpeg', 'png'])
        ->where('attachments.slots.0.max_kb', 2048)
        ->where('attachments.slots.0.items', [])
        ->where('attachments.slots.1.key', 'lampiran')
        ->where('attachments.slots.1.items.0.name', 'scan.pdf')
        ->where('attachments.slots.1.items.0.destroy_href', route('invoices.attachments.destroy', $file));
    AssertableInertia::fromTestResponse(get("/admin/invoices/{$invoice->id}/edit"))->where('attachments.slots.1.items.0.id', $file->id);
    AssertableInertia::fromTestResponse(get('/admin/invoices/create'))->where('attachments.slots.1.items', []);

    ModuleAssertions::actingAsLevelWith(['invoices.view']);
    AssertableInertia::fromTestResponse(get("/admin/invoices/{$invoice->id}"))->where('attachments.slots.1.items.0.destroy_href', null);
});

it('needs invoices.view to download and invoices.edit to delete', function (): void {
    $file = invoiceWithAttachment();

    ModuleAssertions::assertGuestRedirected('get', "/admin/invoices/attachments/{$file->id}/url");
    ModuleAssertions::assertForbiddenWithout('invoices.view', 'get', "/admin/invoices/attachments/{$file->id}/url");
    ModuleAssertions::assertForbiddenWithout('invoices.edit', 'delete', "/admin/invoices/attachments/{$file->id}");
});

it('downloads through a fresh signed URL and audits the download with its slot', function (): void {
    $file = invoiceWithAttachment();

    $url = getJson("/admin/invoices/attachments/{$file->id}/url")->assertOk()->json('url');
    get($url)->assertOk()->assertDownload('scan.pdf');

    expect(ModuleAssertions::assertAudited(Invoice::query()->sole(), 'attachment_downloaded')->properties?->get('meta'))->toMatchArray(['slot' => 'lampiran']);
});

it('refuses an expired, unsigned or tampered download URL', function (): void {
    $file = invoiceWithAttachment();
    $url = (string) getJson("/admin/invoices/attachments/{$file->id}/url")->json('url');

    get("/admin/invoices/attachments/{$file->id}/download")->assertForbidden();
    get(str_replace("attachments/{$file->id}/", 'attachments/'.($file->id + 1).'/', $url))->assertForbidden();
    travel(6)->minutes();
    get($url)->assertForbidden();
});

it('refuses a valid signed URL to a user who may not view invoices', function (): void {
    $file = invoiceWithAttachment();
    $url = (string) getJson("/admin/invoices/attachments/{$file->id}/url")->json('url');

    ModuleAssertions::actingAsLevelWith(['invoices.edit']);

    get($url)->assertForbidden();
});

it('never serves an attachment of another model through this module', function (): void {
    $file = new Attachment(['disk' => 'local', 'path' => 'x', 'original_name' => 'x.pdf', 'mime' => 'application/pdf', 'size' => 1]);
    $file->attachable()->associate(Customer::factory()->create())->save();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.edit']);

    getJson("/admin/invoices/attachments/{$file->id}/url")->assertNotFound();
    delete("/admin/invoices/attachments/{$file->id}")->assertNotFound();
});

it('deletes a file from the disk and audits it', function (): void {
    $file = invoiceWithAttachment();

    delete("/admin/invoices/attachments/{$file->id}")->assertRedirect();

    expect(Attachment::query()->count())->toBe(0);
    Storage::disk('local')->assertMissing($file->path);
    ModuleAssertions::assertAudited(Invoice::query()->sole(), 'attachment_deleted');
});

it('puts a file stored before the slots existed in lampiran', function (): void {
    $invoice = Invoice::factory()->create();
    DB::table('attachments')->insert(['attachable_type' => $invoice->getMorphClass(), 'attachable_id' => $invoice->id, 'disk' => 'local', 'path' => 'x', 'original_name' => 'lama.pdf', 'mime' => 'application/pdf', 'size' => 1, 'created_at' => now(), 'updated_at' => now()]);

    expect($invoice->attachments('lampiran')->sole()->original_name)->toBe('lama.pdf');
});

it('scopes every attachment route to the signed-in user', function (): void {
    $file = invoiceWithAttachment();

    ModuleAssertions::assertScopedToUser(Invoice::class, 'get', "/admin/invoices/attachments/{$file->id}/url");
    ModuleAssertions::assertScopedToUser(Invoice::class, 'delete', "/admin/invoices/attachments/{$file->id}");
});
