<?php

declare(strict_types=1);

use App\Console\Commands\RemoveDemoCommand;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Yuan\AdminCore\Registry\ModuleRegistry;

// The real run deletes this repo's own demo modules, so it is proven by the
// release rehearsal (bin/new-project); here the list and the dry run.

uses(RefreshDatabase::class);

it('lists only paths that exist', function (): void {
    foreach (RemoveDemoCommand::MODULES as $module) {
        expect(base_path("modules/{$module}/module.php"))->toBeFile();
    }

    foreach (RemoveDemoCommand::FILES as $file) {
        expect(base_path($file))->toBeFile();
    }

    $scripts = json_decode((string) file_get_contents(base_path('composer.json')), true)['scripts'];

    foreach (RemoveDemoCommand::SCRIPTS as $script) {
        expect($scripts)->toHaveKey($script);
    }
});

it('names project modules only', function (): void {
    $names = array_map(fn ($module): string => $module->name, app(ModuleRegistry::class)->all());

    foreach (RemoveDemoCommand::MODULES as $module) {
        expect($names)->toContain($module);
    }
});

it('lists everything on a dry run and changes nothing', function (): void {
    $composer = file_get_contents(base_path('composer.json'));

    expect(Artisan::call('admin:remove-demo', ['--dry-run' => true]))->toBe(0)
        ->and(Artisan::output())->toContain(
            'modules/Invoice',
            'modules/SampleAdmin',
            'tests/Feature/GoldenModulesTest.php',
            'sample:regenerate',
            'invoices.*',
            'create_invoices_table',
            'create_sample_readonlies_table',
        );

    foreach (RemoveDemoCommand::MODULES as $module) {
        expect(base_path("modules/{$module}"))->toBeDirectory();
    }

    expect(file_get_contents(base_path('composer.json')))->toBe($composer)
        ->and(Schema::hasTable('invoices'))->toBeTrue()
        ->and(Schema::hasTable('samples'))->toBeTrue();
});
