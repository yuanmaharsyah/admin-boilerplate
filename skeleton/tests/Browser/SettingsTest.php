<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Testing\ModuleAssertions;

// Settings saves redirect back to the same page, so the tab's form must start
// over from the saved values: no "unsaved changes" left behind, and the next
// save carries the new lock_version instead of failing as stale (409).

uses(RefreshDatabase::class)->group('browser');

it('saves a tab twice in a row without reloading', function (): void {
    $this->withVite();
    ModuleAssertions::actingAsSuperAdmin();

    visit('/admin/settings')
        ->fill('[name="values.nama_aplikasi"]', 'SIM Uji')
        ->click('Simpan')
        ->assertSee('Pengaturan disimpan.')
        ->assertDontSee('Ada perubahan yang belum disimpan')
        ->fill('[name="values.nama_aplikasi"]', 'SIM Uji Dua')
        ->click('Simpan')
        ->wait(1)
        ->assertDontSee('Data telah diubah')
        ->assertDontSee('Ada perubahan yang belum disimpan')
        ->assertNoJavaScriptErrors();

    expect(settings('umum.nama_aplikasi'))->toBe('SIM Uji Dua');
});
