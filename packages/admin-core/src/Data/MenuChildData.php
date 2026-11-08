<?php

declare(strict_types=1);

namespace Yuan\AdminCore\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One child of a menu item (`module.php` → `submenu`), already permission-filtered. */
#[TypeScript]
final class MenuChildData extends Data
{
    public function __construct(
        public string $label,
        public string $href,
        // Full route name (`{slug}.{route}`): the sidebar marks the child of the current route.
        public string $route,
        public ?string $badge = null,
    ) {}
}
