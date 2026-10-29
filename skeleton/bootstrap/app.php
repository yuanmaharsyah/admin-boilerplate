<?php

declare(strict_types=1);

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Yuan\AdminCore\Http\ErrorPages;
use Yuan\AdminCore\Http\Middleware\EnsureUserIsActive;
use Yuan\AdminCore\Http\Middleware\RequirePasswordChange;
use Yuan\AdminCore\Http\Middleware\SiteAccess;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'admin_panel']);

        $middleware->web(append: [
            EnsureUserIsActive::class,
            RequirePasswordChange::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            SiteAccess::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        ErrorPages::register($exceptions);
    })->create();
