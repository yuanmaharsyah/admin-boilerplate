<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Process;

// admin-core.modules.dev_only: Komponen and the generator samples exist on a
// developer's machine and staging, and not at all in production.

/**
 * @return list<string>
 */
function routeNamesIn(string $environment): array
{
    $result = Process::path(base_path())
        ->env(['APP_ENV' => $environment, 'APP_DEBUG' => 'false'])
        ->run(['php', 'artisan', 'route:list', '--json']);
    expect($result->successful())->toBeTrue($result->errorOutput());

    /** @var list<array{name: string|null}> $routes */
    $routes = json_decode($result->output(), true, flags: JSON_THROW_ON_ERROR);

    return array_values(array_filter(array_column($routes, 'name')));
}

it('registers the dev_only modules everywhere but production', function (): void {
    $local = routeNamesIn('local');
    $production = routeNamesIn('production');

    expect($local)->toContain('components.index')
        ->and($production)->not->toContain('components.index')
        ->and($production)->toContain('dashboard.index');

    // The samples live only in the boilerplate repo (admin:remove-demo deletes them).
    foreach (['Sample' => 'samples', 'SampleReadonly' => 'sample-readonly', 'SampleAdmin' => 'sample-admin'] as $folder => $slug) {
        if (is_dir(base_path("modules/{$folder}"))) {
            expect($local)->toContain("{$slug}.index")
                ->and($production)->not->toContain("{$slug}.index");
        }
    }
});
