<?php

declare(strict_types=1);

// composer sample:regenerate: rewrites the golden modules from tests/Fixtures/GoldenModules.php.
// --no-sync: generating in this repo never writes permissions to the dev database.

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Filesystem\Filesystem;
use Tests\Fixtures\GoldenModules;

require __DIR__.'/../../vendor/autoload.php';

$app = require __DIR__.'/../../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

foreach (array_keys(GoldenModules::MODULES) as $name) {
    (new Filesystem)->deleteDirectory($app->basePath("modules/{$name}"));
    $status = $kernel->call('make:module', [...GoldenModules::module($name), '--no-sync' => true]);
    echo $kernel->output();

    if ($status !== 0) {
        exit($status);
    }
}

foreach (GoldenModules::WIDGETS as $widget) {
    $status = $kernel->call('make:widget', $widget);
    echo $kernel->output();

    if ($status !== 0) {
        exit($status);
    }
}
