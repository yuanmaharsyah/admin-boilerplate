<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

require __DIR__.'/settings.php';

// Unknown URLs go through the web middleware, so the 404 page knows who is signed in.
Route::fallback(fn () => abort(404));
