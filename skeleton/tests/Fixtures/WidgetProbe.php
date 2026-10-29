<?php

declare(strict_types=1);

namespace Tests\Fixtures;

use Yuan\AdminCore\Registry\ModuleRegistry;

/** Adds the test-only WidgetProbe module (tests/Fixtures/Modules) to the registry for one test. */
final class WidgetProbe
{
    public static function enable(): void
    {
        config([
            'admin-core.modules.roots' => [
                ...config()->array('admin-core.modules.roots'),
                ['name' => 'project', 'path' => base_path('tests/Fixtures/Modules'), 'namespace' => 'Tests\\Fixtures\\Modules\\'],
            ],
            'admin-core.modules.cache_path' => storage_path('framework/testing/widget-probe-modules.php'),
        ]);
        app()->instance(ModuleRegistry::class, ModuleRegistry::fromConfig(config()));
    }
}
