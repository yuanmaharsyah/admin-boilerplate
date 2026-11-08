<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Ticket\Http\Controllers\TicketController;
use Modules\Ticket\Models\Ticket;
use Yuan\AdminCore\Trash\TrashController;

TrashController::routes(Ticket::class);

Route::get('/', [TicketController::class, 'index'])->middleware('permission:tickets.view')->name('index');
Route::get('lookup', [TicketController::class, 'lookup'])->middleware('permission:tickets.view')->name('lookup');
Route::get('create', [TicketController::class, 'create'])->middleware('permission:tickets.create')->name('create');
Route::post('/', [TicketController::class, 'store'])->middleware('permission:tickets.create')->name('store');
Route::delete('/', [TicketController::class, 'bulkDestroy'])->middleware('permission:tickets.delete')->name('bulk-destroy');

Route::whereNumber('ticket')->group(function (): void {
    Route::get('{ticket}', [TicketController::class, 'show'])->middleware('permission:tickets.view')->name('show');
    Route::get('{ticket}/edit', [TicketController::class, 'edit'])->middleware('permission:tickets.edit')->name('edit');
    Route::put('{ticket}', [TicketController::class, 'update'])->middleware('permission:tickets.edit')->name('update');
    Route::delete('{ticket}', [TicketController::class, 'destroy'])->middleware('permission:tickets.delete')->name('destroy');
});
