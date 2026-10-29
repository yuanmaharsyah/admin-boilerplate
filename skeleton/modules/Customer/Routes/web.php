<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Customer\Http\Controllers\CustomerController;
use Modules\Customer\Models\Customer;
use Yuan\AdminCore\Trash\TrashController;

TrashController::routes(Customer::class);

Route::get('/', [CustomerController::class, 'index'])->middleware('permission:customers.view')->name('index');
Route::get('lookup', [CustomerController::class, 'lookup'])->middleware('permission:customers.view')->name('lookup');
Route::delete('/', [CustomerController::class, 'bulkDestroy'])->middleware('permission:customers.delete')->name('bulk-destroy');
Route::delete('{customer}', [CustomerController::class, 'destroy'])->middleware('permission:customers.delete')->whereNumber('customer')->name('destroy');
