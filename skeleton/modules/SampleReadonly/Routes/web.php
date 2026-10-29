<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\SampleReadonly\Http\Controllers\SampleReadonlyController;

Route::get('/', [SampleReadonlyController::class, 'index'])->middleware('permission:sample-readonly.view')->name('index');
Route::get('lookup', [SampleReadonlyController::class, 'lookup'])->middleware('permission:sample-readonly.view')->name('lookup');

Route::whereNumber('sampleReadonly')->group(function (): void {
    Route::get('{sampleReadonly}', [SampleReadonlyController::class, 'show'])->middleware('permission:sample-readonly.view')->name('show');
});
