<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Sample\Http\Controllers\SampleController;
use Modules\Sample\Models\Sample;
use Yuan\AdminCore\Attachments\AttachmentController;
use Yuan\AdminCore\Trash\TrashController;

TrashController::routes(Sample::class);
AttachmentController::routes(Sample::class);

Route::get('/', [SampleController::class, 'index'])->middleware('permission:samples.view')->name('index');
Route::get('lookup', [SampleController::class, 'lookup'])->middleware('permission:samples.view')->name('lookup');
Route::get('download', [SampleController::class, 'download'])->middleware('permission:samples.download')->name('download');
Route::get('create', [SampleController::class, 'create'])->middleware('permission:samples.create')->name('create');
Route::post('/', [SampleController::class, 'store'])->middleware('permission:samples.create')->name('store');
Route::delete('/', [SampleController::class, 'bulkDestroy'])->middleware('permission:samples.delete')->name('bulk-destroy');

Route::whereNumber('sample')->group(function (): void {
    Route::get('{sample}', [SampleController::class, 'show'])->middleware('permission:samples.view')->name('show');
    Route::get('{sample}/edit', [SampleController::class, 'edit'])->middleware('permission:samples.edit')->name('edit');
    Route::put('{sample}', [SampleController::class, 'update'])->middleware('permission:samples.edit')->name('update');
    Route::delete('{sample}', [SampleController::class, 'destroy'])->middleware('permission:samples.delete')->name('destroy');
});
