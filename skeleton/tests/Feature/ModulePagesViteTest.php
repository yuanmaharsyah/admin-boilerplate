<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Yuan\AdminCore\Registry\ModuleRegistry;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;

// Runs after `npm run build` (composer check: `test:built`), against the real
// Vite manifest, for module pages and the package's `Core::` pages: a page the
// build didn't pick up, for example in a folder whose
// case differs from `resources/js/pages`, fails here while the server-side
// page finder still accepts it on a case-insensitive disk.

uses(RefreshDatabase::class)->group('vite');

it('renders every module and core page with the built Vite manifest', function (): void {
    $this->withVite();
    ModuleAssertions::actingAsSuperAdmin();
    $folders = ['Core' => config()->string('admin-core.pages.core_path')];

    foreach (app(ModuleRegistry::class)->enabled() as $module) {
        $folders[$module->name] = $module->path('resources/js/pages');
    }

    $rendered = 0;

    foreach ($folders as $namespace => $folder) {
        foreach (glob($folder.'/{,*/,*/*/}*.tsx', GLOB_BRACE) ?: [] as $file) {
            $component = $namespace.'::'.Str::beforeLast(Str::after($file, $folder.'/'), '.tsx');
            Route::middleware('web')->get('/__vite-page/'.$rendered, fn () => Inertia::render($component));

            get('/__vite-page/'.$rendered)->assertOk();
            $rendered++;
        }
    }

    $onDisk = count(glob(base_path('{modules,vendor/yuanmaharsyah/admin-core/modules}/*/resources/js/pages/{,*/,*/*/}*.tsx'), GLOB_BRACE) ?: [])
        + count(glob(base_path('vendor/yuanmaharsyah/admin-core/resources/js/pages/{,*/,*/*/}*.tsx'), GLOB_BRACE) ?: []);

    expect($rendered)->toBe($onDisk);
});
