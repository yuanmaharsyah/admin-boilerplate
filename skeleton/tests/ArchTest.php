<?php

declare(strict_types=1);

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Testing\ArchRules;

// The arch rows of spec §9.1 for the project: app/ and both module roots.
// Each expectation names one namespace: Pest silently passes `expect([$a, $b])->not->toUse()`.

$base = dirname(__DIR__);
/** @var array<string, string> $exceptions */
$exceptions = require __DIR__.'/arch-exceptions.php';
$excepted = array_map(fn (string $path): string => 'App\\'.str_replace(['/', '.php'], ['\\', ''], substr($path, strlen('app/'))), array_keys($exceptions));
$roots = [
    ['path' => "{$base}/vendor/yuanmaharsyah/admin-core/modules", 'namespace' => 'Yuan\\AdminCore\\Modules\\'],
    ['path' => "{$base}/modules", 'namespace' => 'Modules\\'],
];
// Pest's arch scanner can't read files under vendor/: in a project, where the
// package is a real folder there, its classes have no path and the rules
// either crash or pass without checking anything. The core modules are
// checked in the boilerplate repo, where vendor/yuanmaharsyah/admin-core links to
// packages/admin-core; a project checks its own modules (the isolation rule
// still forbids them the core modules' internals).
$checked = str_contains((string) realpath($roots[0]['path']), '/vendor/') ? [$roots[1]] : $roots;
$modules = array_keys(ArchRules::modules($checked));
$targets = ['App', ...$modules];
$code = ["{$base}/app", "{$base}/modules"];

it('lists only exception files that still exist', function () use ($base, $exceptions): void {
    $gone = array_values(array_filter(array_keys($exceptions), fn (string $path): bool => ! is_file("{$base}/{$path}")));

    expect($gone)->toBe([], 'Gone, remove their lines from tests/arch-exceptions.php: '.implode(', ', $gone));
});

arch('code declares strict types', function () use ($targets): void {
    foreach ($targets as $target) {
        expect($target)->toUseStrictTypes();
    }
});

arch('no debugging helpers', function () use ($targets): void {
    foreach ($targets as $target) {
        expect($target)->not->toUse(['dd', 'dump', 'ray', 'var_dump']);
    }
});

arch('no env() outside config', function () use ($targets): void {
    foreach ($targets as $target) {
        expect($target)->not->toUse('env');
    }
});

it('never unguards a model', function () use ($code): void {
    expect(ArchRules::filesMatching($code, '/\$guarded\s*=\s*\[\s*\]/'))->toBe([]);
});

arch('modules use another module only through its Models', function () use ($roots, $modules): void {
    $rules = array_intersect_key(ArchRules::isolation($roots), array_flip($modules));
    expect(array_keys($rules))->toBe($modules); // every module gets a rule, also while there are none

    foreach ($rules as $module => $forbidden) {
        expect($module)->not->toUse($forbidden);
    }
});

arch('controllers use neither the DB facade nor FormRequests', function () use ($modules, $excepted): void {
    foreach (['App\Http\Controllers', ...array_map(fn (string $module): string => "{$module}\\Http\\Controllers", $modules)] as $namespace) {
        expect($namespace)->not->toUse([DB::class, FormRequest::class])->ignoring($excepted);
    }
});

arch('Data classes are laravel-data objects with #[TypeScript]', function () use ($modules): void {
    foreach (['App\Data', ...array_map(fn (string $module): string => "{$module}\\Data", $modules)] as $namespace) {
        expect($namespace)->classes()->toExtend(Data::class)->toHaveAttribute(TypeScript::class);
    }
});

arch('no FormRequests: input is a laravel-data object', function () use ($targets, $excepted): void {
    foreach ($targets as $target) {
        expect($target)->classes()->not->toExtend(FormRequest::class)->ignoring($excepted);
    }
});

arch('downloads only through ExportManager: the Excel facade only in the core', function (): void {
    expect('Maatwebsite\Excel\Facades\Excel')->toOnlyBeUsedIn('Yuan\AdminCore\Exports');
});

// A source scan too: it also catches the `Excel` alias, which the class rule
// can't see. Module tests may use the facade (Excel::fake()).
it('downloads only through ExportManager', function () use ($code): void {
    expect(ArchRules::filesMatching($code, '/Excel::(download|store|queue|raw)|Maatwebsite\\\\Excel\\\\Facades\\\\Excel/', ['/Tests/']))->toBe([]);
});

arch('activity log only through Audit::record() and LogsModuleActivity', function () use ($targets): void {
    foreach ($targets as $target) {
        expect($target)->not->toUse(['activity', 'Spatie\Activitylog']);
    }
});

it('never names the activity_log table', function () use ($code): void {
    expect(ArchRules::filesMatching($code, '/[\'"]activity_log[\'"]/', ['/Tests/']))->toBe([]);
});
