<?php

declare(strict_types=1);

use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Process;

// `composer create-project yuanmaharsyah/admin-skeleton` as a public user runs
// it, with local path repositories standing in for Packagist: the skeleton as
// bin/release publishes it (bin/skeleton-composer.php, no composer.lock) and
// the package's tracked files. Slow (a full composer install), so it runs in
// `composer test:release`, which bin/release requires before pushing.

uses()->group('release');

/**
 * Copies the tracked and new (not ignored) files of a monorepo folder, from the
 * working tree, so a change is tested before it is committed.
 */
function copyTracked(string $folder, string $target): void
{
    $files = new Filesystem;
    $root = dirname(base_path());

    foreach (array_filter(explode("\0", Process::path($root)->run(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', $folder])->throw()->output())) as $path) {
        if (is_file("{$root}/{$path}")) {
            $files->ensureDirectoryExists(dirname("{$target}/".substr($path, strlen($folder) + 1)));
            $files->copy("{$root}/{$path}", "{$target}/".substr($path, strlen($folder) + 1));
        }
    }
}

it('creates a ready project from the published skeleton', function (): void {
    $work = sys_get_temp_dir().'/admin-create-project-'.bin2hex(random_bytes(6));
    $files = new Filesystem;
    copyTracked('skeleton', "{$work}/skeleton");
    copyTracked('packages/admin-core', "{$work}/admin-core");

    $published = Process::path(dirname(base_path()))->input((string) file_get_contents("{$work}/skeleton/composer.json"))
        ->run(['php', 'bin/skeleton-composer.php', '1.0.0'])->throw()->output();
    file_put_contents("{$work}/skeleton/composer.json", $published);
    $files->delete("{$work}/skeleton/composer.lock");

    $repository = fn (string $path, string $name): string => json_encode([
        'type' => 'path', 'url' => $path, 'options' => ['symlink' => false, 'versions' => [$name => '1.0.0']],
    ], JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

    try {
        // A user's shell, not this test's: unset what phpunit.xml and this app's .env
        // set (APP_ENV=testing hides Boost's commands; an inherited APP_KEY makes
        // key:generate leave the new .env without a key).
        preg_match_all('/<env name="([A-Z_]+)"/', (string) file_get_contents(base_path('phpunit.xml')), $phpunit);
        preg_match_all('/^([A-Z][A-Z0-9_]*)=/m', (string) @file_get_contents(base_path('.env')), $dotenv);
        $env = ['COMPOSER_NO_INTERACTION' => '1', ...array_fill_keys([...$phpunit[1], ...$dotenv[1]], false)];

        $result = Process::path($work)->timeout(900)->env($env)->run([
            'composer', 'create-project', 'yuanmaharsyah/admin-skeleton', 'app', '1.0.0',
            '--repository='.$repository("{$work}/skeleton", 'yuanmaharsyah/admin-skeleton'),
            '--repository='.$repository("{$work}/admin-core", 'yuanmaharsyah/admin-core'),
            '--add-repository', '--no-interaction',
        ]);

        $app = "{$work}/app";
        $composer = json_decode((string) file_get_contents("{$app}/composer.json"), true);

        expect($result->successful())->toBeTrue($result->errorOutput())
            ->and($result->output().$result->errorOutput())->toContain('Next: set DB_DATABASE')
            ->and("{$app}/vendor/yuanmaharsyah/admin-core/src/AdminCoreServiceProvider.php")->toBeFile()
            ->and((string) file_get_contents("{$app}/.env"))->toMatch('/^APP_KEY=base64:/m')
            ->and(glob("{$app}/modules/*") ?: [])->toBe([])
            ->and("{$app}/app/Console/Commands/RemoveDemoCommand.php")->not->toBeFile()
            ->and($composer['scripts'])->not->toHaveKey('sample:regenerate')
            ->and($composer['require']['yuanmaharsyah/admin-core'])->toBe('^1.0')
            ->and((string) file_get_contents("{$app}/CLAUDE.md"))->toContain('yuanmaharsyah/admin-core')
            ->and("{$app}/.claude/skills/admin-make-module/SKILL.md")->toBeFile();
    } finally {
        $files->deleteDirectory($work);
    }
});
