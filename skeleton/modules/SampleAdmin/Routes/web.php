<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\SampleAdmin\Http\Controllers\SampleAdminController;
use Modules\SampleAdmin\Models\SampleAdmin;
use Yuan\AdminCore\Attachments\AttachmentController;
use Yuan\AdminCore\Trash\TrashController;

// A superadmin_only module: the registry adds the `superadmin` middleware.
TrashController::routes(SampleAdmin::class);
AttachmentController::routes(SampleAdmin::class);

Route::get('/', [SampleAdminController::class, 'index'])->name('index');
Route::get('lookup', [SampleAdminController::class, 'lookup'])->name('lookup');
Route::get('create', [SampleAdminController::class, 'create'])->name('create');
Route::post('/', [SampleAdminController::class, 'store'])->name('store');
Route::delete('/', [SampleAdminController::class, 'bulkDestroy'])->name('bulk-destroy');

Route::whereNumber('sampleAdmin')->group(function (): void {
    Route::get('{sampleAdmin}', [SampleAdminController::class, 'show'])->name('show');
    Route::get('{sampleAdmin}/edit', [SampleAdminController::class, 'edit'])->name('edit');
    Route::put('{sampleAdmin}', [SampleAdminController::class, 'update'])->name('update');
    Route::delete('{sampleAdmin}', [SampleAdminController::class, 'destroy'])->name('destroy');
});
