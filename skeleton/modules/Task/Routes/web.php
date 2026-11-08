<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Task\Http\Controllers\TaskBoardController;
use Modules\Task\Http\Controllers\TaskController;
use Modules\Task\Models\Task;
use Yuan\AdminCore\Trash\TrashController;

TrashController::routes(Task::class);

Route::get('/', [TaskController::class, 'index'])->middleware('permission:kanban.view')->name('index');
Route::get('board', [TaskBoardController::class, 'board'])->middleware('permission:kanban.view')->name('board');
Route::patch('board', [TaskBoardController::class, 'move'])->middleware('permission:kanban.edit')->name('board.move');
Route::get('lookup', [TaskController::class, 'lookup'])->middleware('permission:kanban.view')->name('lookup');
Route::get('create', [TaskController::class, 'create'])->middleware('permission:kanban.create')->name('create');
Route::post('/', [TaskController::class, 'store'])->middleware('permission:kanban.create')->name('store');
Route::delete('/', [TaskController::class, 'bulkDestroy'])->middleware('permission:kanban.delete')->name('bulk-destroy');

Route::whereNumber('task')->group(function (): void {
    Route::get('{task}', [TaskController::class, 'show'])->middleware('permission:kanban.view')->name('show');
    Route::get('{task}/edit', [TaskController::class, 'edit'])->middleware('permission:kanban.edit')->name('edit');
    Route::put('{task}', [TaskController::class, 'update'])->middleware('permission:kanban.edit')->name('update');
    Route::delete('{task}', [TaskController::class, 'destroy'])->middleware('permission:kanban.delete')->name('destroy');
});
