<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Yuan\AdminCore\Account\AccountRoutes;

// The signed-in user's own pages: profile, password, downloads (core).
Route::middleware(['auth', 'active'])->group(fn () => AccountRoutes::register());
