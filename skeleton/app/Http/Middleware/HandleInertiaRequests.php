<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Yuan\AdminCore\Http\Middleware\HandleInertiaRequests as BaseHandleInertiaRequests;

/**
 * Project shared props. Add a key here (always a Data object); the core's
 * auth, menu and app props come from parent::share().
 */
class HandleInertiaRequests extends BaseHandleInertiaRequests
{
    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
        ];
    }
}
