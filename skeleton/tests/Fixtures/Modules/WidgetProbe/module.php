<?php

declare(strict_types=1);
use Tests\Fixtures\Modules\WidgetProbe\Widgets\Broken;
use Tests\Fixtures\Modules\WidgetProbe\Widgets\Steady;

// A test-only module (not in a module root): one widget that works and one
// that throws, for the Beranda failure-isolation tests.
return [
    'name' => 'WidgetProbe',
    'slug' => 'widget-probe',
    'label' => 'Widget Probe',
    'icon' => 'bug',
    'group' => 'beranda',
    'order' => 99,
    'enabled' => true,
    'core' => false,
    'superadmin_only' => false,
    'menu' => false,
    'actions' => ['view'],
    'widgets' => [
        Steady::class,
        Broken::class,
    ],
];
