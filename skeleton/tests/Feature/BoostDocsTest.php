<?php

declare(strict_types=1);

use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Finder\SplFileInfo;

// The AI guideline and skills the package ships through Laravel Boost
// (resources/boost) must not name a command, config key, class, method,
// component, hook or file that doesn't exist. Placeholders such as {Name}
// are skipped.

const BOOST_DOCS = 'vendor/yuanmaharsyah/admin-core/resources/boost';

/** Composer's own commands, not scripts. */
const BOOST_COMPOSER_COMMANDS = ['install', 'update', 'require', 'remove', 'config', 'show', 'dump-autoload', 'create-project'];

/**
 * Package class basename => fully qualified names (src/ and modules/).
 *
 * @return array<string, list<string>>
 */
function boostPackageClasses(): array
{
    static $classes = null;

    if ($classes !== null) {
        return $classes;
    }

    $classes = [];
    $roots = ['src' => 'Yuan\\AdminCore\\', 'modules' => 'Yuan\\AdminCore\\Modules\\'];

    foreach ($roots as $folder => $namespace) {
        foreach ((new Filesystem)->allFiles(base_path("vendor/yuanmaharsyah/admin-core/{$folder}")) as $file) {
            /** @var SplFileInfo $file */
            $relative = $file->getRelativePathname();

            if ($file->getExtension() !== 'php' || ! ctype_upper($file->getFilename()[0]) || str_contains($relative, '/Tests/') || str_contains($relative, 'resources/')) {
                continue;
            }

            $classes[$file->getBasename('.php')][] = $namespace.str_replace(['/', '.php'], ['\\', ''], $relative);
        }
    }

    return $classes;
}

function boostJsExports(): string
{
    static $source = null;

    if ($source !== null) {
        return $source;
    }

    $source = '';

    foreach (['resources/js', 'modules'] as $folder) {
        foreach ((new Filesystem)->allFiles(base_path("vendor/yuanmaharsyah/admin-core/{$folder}")) as $file) {
            /** @var SplFileInfo $file */
            if (in_array($file->getExtension(), ['ts', 'tsx'], true)) {
                $source .= $file->getContents()."\n";
            }
        }
    }

    return $source;
}

function boostTypeExists(string $class): bool
{
    return class_exists($class) || interface_exists($class) || trait_exists($class) || enum_exists($class);
}

/**
 * Every name in the text that doesn't exist.
 *
 * @return list<string>
 */
function boostDrift(string $text): array
{
    $problems = [];
    // Boost registers its commands only outside tests: read them from its sources.
    preg_match_all('/\$signature = \'([\w:-]+)/', implode("\n", array_map(file_get_contents(...), glob(base_path('vendor/laravel/boost/src/Console/*.php')) ?: [])), $boost);
    $commands = [...Artisan::all(), ...array_flip($boost[1])];
    $scripts = json_decode((string) file_get_contents(base_path('composer.json')), true)['scripts'];
    $classes = boostPackageClasses();
    $resolve = fn (string $basename): array => $classes[$basename] ?? [];

    preg_match_all('/php artisan ([a-z][a-z0-9:-]*)/', $text, $matches);
    foreach (array_unique($matches[1]) as $command) {
        array_key_exists($command, $commands) || $problems[] = "command {$command}";
    }

    // Only where composer starts a command (not `brew install php composer node`).
    preg_match_all('/(?:^|`|&&\s*|;\s*)composer ([a-z][a-z0-9:-]*)/m', $text, $matches);
    foreach (array_unique($matches[1]) as $script) {
        in_array($script, BOOST_COMPOSER_COMMANDS, true) || array_key_exists($script, $scripts) || $problems[] = "composer script {$script}";
    }

    preg_match_all('/(?<![\w@\/.-])admin-core\.([a-z_]+(?:\.[a-z_]+)*)/', $text, $matches);
    foreach (array_unique($matches[1]) as $key) {
        in_array(last(explode('.', $key)), ['json', 'php', 'css', 'neon'], true) || config()->has("admin-core.{$key}") || $problems[] = "config admin-core.{$key}";
    }

    preg_match_all('/\b((?:Yuan\\\\AdminCore|App|Illuminate)\\\\[A-Za-z\\\\]*[A-Za-z])/', $text, $matches);
    foreach (array_unique($matches[1]) as $class) {
        boostTypeExists($class) || array_filter(array_merge(...array_values($classes)), fn (string $fqcn): bool => str_starts_with($fqcn, "{$class}\\")) !== [] || $problems[] = "class {$class}";
    }

    preg_match_all('/(?<![\w}\\\\])([A-Z][A-Za-z]+)::([a-z]\w*)\(/', $text, $matches, PREG_SET_ORDER);
    foreach ($matches as [, $class, $method]) {
        if ($resolve($class) === []) {
            boostTypeExists("Illuminate\\Support\\Facades\\{$class}") || $problems[] = "class {$class}";
        } elseif (array_filter($resolve($class), fn (string $fqcn): bool => method_exists($fqcn, $method)) === []) {
            $problems[] = "method {$class}::{$method}()";
        }
    }

    // Not Inertia page names ('Users::Index').
    preg_match_all('/(?<![\w}\\\\\'])([A-Z][A-Za-z]+)::([A-Z]\w*)\b(?!\()/', $text, $matches, PREG_SET_ORDER);
    foreach ($matches as [, $class, $case]) {
        // Unknown class: an Inertia page name (Kendaraan::Index), not a constant.
        $resolve($class) === [] || array_filter($resolve($class), fn (string $fqcn): bool => defined("{$fqcn}::{$case}")) !== [] || $problems[] = "constant {$class}::{$case}";
    }

    preg_match_all('/\buse ([A-Z][A-Za-z]+);/', $text, $matches);
    foreach (array_unique($matches[1]) as $trait) {
        $resolve($trait) !== [] || $problems[] = "trait {$trait}";
    }

    preg_match_all('/<([A-Z][A-Za-z]+)[\s>\/]/', $text, $matches);
    preg_match_all('/\b(use[A-Z][A-Za-z]+)\b/', $text, $hooks);
    foreach (array_unique([...$matches[1], ...$hooks[1]]) as $export) {
        preg_match("/export (?:function|const|class) {$export}\\b/", boostJsExports()) || $problems[] = "component or hook {$export}";
    }

    preg_match_all('/`((?:vendor|tests)\/[\w\/.-]+\.\w+)`/', $text, $matches);
    foreach (array_unique($matches[1]) as $path) {
        file_exists(base_path($path)) || $problems[] = "file {$path}";
    }

    return array_values(array_unique($problems));
}

/**
 * @return list<string>
 */
function boostSkillProblems(string $file): array
{
    $text = (string) file_get_contents($file);
    $folder = basename(dirname($file));

    if (! preg_match('/\A---\nname: (\S+)\ndescription: "(.+)"\n---\n/', $text, $front)) {
        return ['frontmatter: needs name and description'];
    }

    return [
        ...($front[1] === $folder ? [] : ["name {$front[1]} differs from its folder {$folder}"]),
        ...boostDrift($text),
    ];
}

it('names only things that exist in the guideline', function (): void {
    $guideline = (string) file_get_contents(base_path(BOOST_DOCS.'/guidelines/core.blade.php'));

    expect(boostDrift($guideline))->toBe([]);
});

it('keeps Blade syntax out of the guideline', function (): void {
    // Boost renders it with Blade: @php or {{ in the text would run or break.
    $guideline = (string) file_get_contents(base_path(BOOST_DOCS.'/guidelines/core.blade.php'));

    expect($guideline)->not->toContain('{{')
        ->not->toContain('{!!')
        ->and(preg_match_all('/(?<![\w`])@(?!admin-core|ts-ignore)[a-z]+/', $guideline))->toBe(0);
});

it('names only things that exist in each skill', function (string $skill): void {
    expect(boostSkillProblems(base_path(BOOST_DOCS."/skills/{$skill}/SKILL.md")))->toBe([]);
})->with(fn (): array => array_map(basename(...), glob(dirname(__DIR__, 2).'/'.BOOST_DOCS.'/skills/*', GLOB_ONLYDIR) ?: []));

it('reports every kind of drift', function (): void {
    expect(boostSkillProblems(base_path('tests/Fixtures/boost/broken/SKILL.md')))->toBe([
        'name admin-renamed differs from its folder broken',
        'command admin:nope',
        'composer script nope',
        'config admin-core.nope.key',
        'class Yuan\AdminCore\Nope',
        'class Nope',
        'method Trash::nope()',
        'constant AuditEvent::Nope',
        'trait HasNope',
        'component or hook NopeField',
        'component or hook useNope',
        'file vendor/yuanmaharsyah/admin-core/nope.php',
    ]);
});

it('reports a skill without frontmatter', function (): void {
    $file = sys_get_temp_dir().'/boost-'.bin2hex(random_bytes(4)).'/SKILL.md';
    (new Filesystem)->ensureDirectoryExists(dirname($file));
    file_put_contents($file, "# No frontmatter\n");

    expect(boostSkillProblems($file))->toBe(['frontmatter: needs name and description']);

    (new Filesystem)->deleteDirectory(dirname($file));
});

/**
 * The repository's READMEs (English and Bahasa Indonesia), only in the
 * boilerplate repo: a project has its own README.
 *
 * @return array<string, string> Name => contents.
 */
function boostReadmes(): array
{
    $root = dirname(base_path());

    if (! is_dir("{$root}/packages/admin-core")) {
        return [];
    }

    return ['README.md' => (string) file_get_contents("{$root}/README.md"), 'README.id.md' => (string) file_get_contents("{$root}/README.id.md")];
}

it('names only things that exist in the READMEs', function (): void {
    foreach (boostReadmes() as $name => $text) {
        expect(boostDrift($text))->toBe([], $name);
    }
})->skip(fn (): bool => boostReadmes() === [], 'Only in the boilerplate repo.');

it('keeps the two READMEs in sync', function (): void {
    ['README.md' => $en, 'README.id.md' => $id] = boostReadmes();
    $blocks = fn (string $text): array => preg_match_all('/^```[a-z]*\n.*?^```$/ms', $text, $m) ? $m[0] : [];
    $headings = fn (string $text, string $level): int => preg_match_all('/^'.$level.' /m', $text);

    expect($blocks($id))->toBe($blocks($en))
        ->and($headings($id, '##'))->toBe($headings($en, '##'))
        ->and($headings($id, '###'))->toBe($headings($en, '###'))
        ->and(substr_count($id, '<details>'))->toBe(substr_count($en, '<details>'))
        ->and($en)->toContain('[Bahasa Indonesia](README.id.md)')
        ->and($id)->toContain('[English](README.md)');
})->skip(fn (): bool => boostReadmes() === [], 'Only in the boilerplate repo.');
