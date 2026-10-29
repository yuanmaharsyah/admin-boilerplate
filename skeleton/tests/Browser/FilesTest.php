<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Attachments\Attachment;
use Yuan\AdminCore\Attachments\AttachmentUploads;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Attachments and downloads in the browser (frontend-behavior §5, §8.5):
// files per slot in the form with the client-side checks, the grouped
// Lampiran tab, delete, and a list download that is
// either a file or a queued job with the topbar badge.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    Storage::fake('local');
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

/** A temporary file whose content matches its type (the server checks content, not the name). */
function fixtureFile(string $name, string $content): string
{
    $path = sys_get_temp_dir().'/'.$name;
    file_put_contents($path, $content);

    return $path;
}

const MINIMAL_PDF = "%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n";

it('picks files per slot in the edit form and lets one be removed again', function (): void {
    $invoice = Invoice::factory()->create();

    // Only the client side here: this test server keeps `files[slot]` names
    // flat where PHP nests them, so sending the form is covered by
    // InvoiceAttachmentsTest instead.
    visit("/admin/invoices/{$invoice->id}/edit")
        ->attach('[id="files.bukti_bayar"]', fixtureFile('bukti-okt.pdf', MINIMAL_PDF))
        ->attach('[id="files.lampiran"]', fixtureFile('kontrak.pdf', MINIMAL_PDF))
        ->assertSee('bukti-okt.pdf')
        ->assertSee('kontrak.pdf')
        ->click('[aria-label="Batalkan kontrak.pdf"]')
        ->assertDontSee('kontrak.pdf')
        ->assertSee('bukti-okt.pdf')
        ->assertNoJavaScriptErrors();
});

it('shows the files grouped by slot on Show and deletes one', function (): void {
    $invoice = Invoice::factory()->create();
    AttachmentUploads::save($invoice, [
        'bukti_bayar' => UploadedFile::fake()->createWithContent('bukti-okt.pdf', MINIMAL_PDF),
        'lampiran' => [UploadedFile::fake()->createWithContent('kontrak.pdf', MINIMAL_PDF)],
    ], null);

    visit("/admin/invoices/{$invoice->id}")
        ->click('[role="tab"]:has-text("Lampiran")')
        ->assertSee('Lampiran (2)')
        ->assertSeeIn('section[aria-label="Bukti bayar"]', 'bukti-okt.pdf')
        ->assertSeeIn('section[aria-label="Lampiran"]', 'kontrak.pdf')
        ->click('[aria-label="Hapus kontrak.pdf"]')
        ->click('[role="alertdialog"] button:has-text("Hapus")')
        ->assertSee('Lampiran dihapus.')
        ->assertSee('Lampiran (1)')
        ->assertNoJavaScriptErrors();

    expect($invoice->attachments('lampiran')->count())->toBe(0)
        ->and($invoice->attachments('bukti_bayar')->count())->toBe(1);
});

it('refuses a wrong type before the form is sent and keeps the message until dismissed', function (): void {
    $invoice = Invoice::factory()->create();

    visit("/admin/invoices/{$invoice->id}/edit")
        ->attach('[id="files.bukti_bayar"]', fixtureFile('catatan.txt', 'catatan'))
        ->assertSee('Jenis berkas tidak diizinkan.')
        ->click('[aria-label="Tutup pesan untuk catatan.txt"]')
        ->assertDontSee('Jenis berkas tidak diizinkan.');

    expect(Attachment::query()->count())->toBe(0);
});

it('downloads a small list at once and queues a large one, reachable from the badge', function (): void {
    Invoice::factory()->count(3)->create();

    // The file comes in the background; the page stays and no toast appears.
    visit('/admin/invoices')
        ->click('[aria-label="Download sesuai filter"]')
        ->wait(1)
        ->assertPathIs('/admin/invoices')
        ->assertDontSee('Ekspor diproses');
    // Exactly one audit row per download is pinned by InvoiceDownloadTest; headless
    // Chromium re-requests a download it does not accept, so only "at least one" here.
    expect(ImmutableActivity::query()->where('event', 'exported')->exists())->toBeTrue();

    config(['admin-core.exports.queue_threshold' => 2]);

    visit('/admin/invoices')
        ->click('[aria-label="Download sesuai filter"]')
        ->assertSee('Ekspor diproses, cek Unduhan')
        ->assertSee('3 baris sesuai filter')
        ->click('[aria-label="Unduhan, 1 baru"]')
        ->assertPathIs('/account/downloads')
        ->assertSee('Siap')
        ->assertPresent('[aria-label^="Unduh invoices-"]')
        ->assertNoJavaScriptErrors();
});
