<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Invoice\Http\Controllers\InvoiceController;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Attachments\AttachmentController;
use Yuan\AdminCore\Trash\TrashController;

TrashController::routes(Invoice::class);
AttachmentController::routes(Invoice::class);

Route::get('/', [InvoiceController::class, 'index'])->middleware('permission:invoices.view')->name('index');
Route::get('download', [InvoiceController::class, 'download'])->middleware('permission:invoices.download')->name('download');
Route::get('create', [InvoiceController::class, 'create'])->middleware('permission:invoices.create')->name('create');
Route::post('/', [InvoiceController::class, 'store'])->middleware('permission:invoices.create')->name('store');
Route::delete('/', [InvoiceController::class, 'bulkDestroy'])->middleware('permission:invoices.delete')->name('bulk-destroy');

Route::whereNumber('invoice')->group(function (): void {
    Route::get('{invoice}', [InvoiceController::class, 'show'])->middleware('permission:invoices.view')->name('show');
    Route::get('{invoice}/edit', [InvoiceController::class, 'edit'])->middleware('permission:invoices.edit')->name('edit');
    Route::put('{invoice}', [InvoiceController::class, 'update'])->middleware('permission:invoices.edit')->name('update');
    Route::delete('{invoice}', [InvoiceController::class, 'destroy'])->middleware('permission:invoices.delete')->name('destroy');
});
