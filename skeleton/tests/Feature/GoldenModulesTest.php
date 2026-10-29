<?php

declare(strict_types=1);

use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Inertia\Testing\AssertableInertia;
use Symfony\Component\Finder\SplFileInfo;
use Tests\Fixtures\GoldenModules;
use Yuan\AdminCore\Permissions\Level;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;

// The generator's golden modules (Phase 08 plan Q8): modules/Sample,
// SampleReadonly and SampleAdmin are exactly what make:module and make:widget
// write today, so a stub change can't drift silently. After an intended stub
// change: composer sample:regenerate.

uses(RefreshDatabase::class);

/**
 * @return array<string, string> Relative path => contents.
 */
function moduleTree(string $folder): array
{
    $files = [];

    foreach ((new Filesystem)->allFiles($folder) as $file) {
        /** @var SplFileInfo $file */
        $files[$file->getRelativePathname()] = $file->getContents();
    }

    ksort($files);

    return $files;
}

it('matches a fresh run of make:module and make:widget', function (string $name): void {
    $folder = storage_path('framework/testing/golden-modules');
    (new Filesystem)->deleteDirectory($folder);

    expect(Artisan::call('make:module', [...GoldenModules::module($name), '--path' => $folder, '--no-post' => true]))->toBe(0);

    foreach (GoldenModules::WIDGETS as $widget) {
        if ($widget['module'] === $name) {
            expect(Artisan::call('make:widget', [...$widget, '--path' => $folder]))->toBe(0);
        }
    }

    $expected = moduleTree("{$folder}/{$name}");
    $committed = moduleTree(base_path("modules/{$name}"));
    (new Filesystem)->deleteDirectory($folder);

    expect(array_keys($committed))->toBe(array_keys($expected));

    foreach ($expected as $path => $contents) {
        expect($committed[$path])->toBe($contents, "modules/{$name}/{$path} differs from the stubs' output: run composer sample:regenerate after an intended stub change.");
    }
})->with(array_keys(GoldenModules::MODULES))->group('generator');

it('shows up in the menu, the command palette and the Hak Akses matrix', function (): void {
    ModuleAssertions::actingAsSuperAdmin();
    $level = Level::query()->create(['name' => 'staf', 'label' => 'Staf']);

    $menu = AssertableInertia::fromTestResponse(get('/admin/samples')->assertOk())->toArray()['props']['menu'];
    $items = collect($menu)->flatMap(fn (array $group): array => $group['items']);

    expect($items->firstWhere('slug', 'samples'))->toMatchArray(['label' => 'Contoh', 'create_href' => route('samples.create')]);
    AssertableInertia::fromTestResponse(get("/admin/levels/{$level->id}/permissions")->assertOk())
        ->where('matrix.rows', fn ($rows): bool => collect($rows)->contains(fn (array $row): bool => $row['slug'] === 'samples' && $row['actions'] === ['view', 'create', 'edit', 'delete', 'download']));
});
