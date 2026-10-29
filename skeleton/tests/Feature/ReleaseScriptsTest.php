<?php

declare(strict_types=1);

use Illuminate\Filesystem\Filesystem;
use Illuminate\Process\ProcessResult;
use Illuminate\Support\Facades\Process;

// bin/release and bin/new-project, each run inside a throwaway copy of the
// repo layout with bare repositories as the "admin-core" and "admin-skeleton"
// remotes.

const RELEASE_CHANGELOG = "# Changelog\n\n## [Unreleased]\n\n### Added\n- Next feature.\n\n## [1.0.0] - 2026-10-25\n\n### Added\n- First release.\n";

/**
 * @return array{repo: string, remote: string, skeleton: string}
 */
function releaseRepo(string $check = 'true', string $changelog = RELEASE_CHANGELOG, string $testRelease = 'true'): array
{
    $root = sys_get_temp_dir().'/admin-release-'.bin2hex(random_bytes(6));
    $repo = "{$root}/repo";
    $remote = "{$root}/remote.git";
    $skeleton = "{$root}/skeleton.git";
    $files = new Filesystem;

    $files->ensureDirectoryExists("{$repo}/bin");
    $files->ensureDirectoryExists("{$repo}/packages/admin-core");
    $files->ensureDirectoryExists("{$repo}/skeleton");
    $files->copy(base_path('../bin/release'), "{$repo}/bin/release");
    $files->copy(base_path('../bin/new-project'), "{$repo}/bin/new-project");
    $files->copy(base_path('../bin/skeleton-composer.php'), "{$repo}/bin/skeleton-composer.php");
    $files->chmod("{$repo}/bin/release", 0755);
    $files->chmod("{$repo}/bin/new-project", 0755);
    $files->put("{$repo}/packages/admin-core/CHANGELOG.md", $changelog);
    $files->put("{$repo}/packages/admin-core/composer.json", "{\"name\": \"yuanmaharsyah/admin-core\"}\n");
    $files->put("{$repo}/skeleton/composer.json", json_encode([
        'name' => 'yuanmaharsyah/admin-skeleton',
        'require' => ['yuanmaharsyah/admin-core' => '@dev'],
        'repositories' => ['admin-core' => ['type' => 'path', 'url' => '../packages/admin-core']],
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR));
    $files->put("{$repo}/skeleton/composer.lock", "{}\n");
    $files->put("{$repo}/skeleton/artisan", "#!/usr/bin/env php\n");
    $files->put("{$repo}/composer.json", json_encode(['scripts' => ['check' => $check, 'test:release' => $testRelease]], JSON_THROW_ON_ERROR));

    releaseGit($root, 'init', '--quiet', '--bare', $remote);
    releaseGit($root, 'init', '--quiet', '--bare', $skeleton);
    releaseGit($repo, 'init', '--quiet', '--initial-branch=master');
    releaseGit($repo, 'config', 'user.name', 'Release Test');
    releaseGit($repo, 'config', 'user.email', 'release@example.test');
    releaseGit($repo, 'add', '--all');
    releaseGit($repo, 'commit', '--quiet', '-m', 'init');
    releaseGit($repo, 'remote', 'add', 'admin-core', $remote);
    releaseGit($repo, 'remote', 'add', 'admin-skeleton', $skeleton);

    releaseRoots()[] = $root;

    return ['repo' => $repo, 'remote' => $remote, 'skeleton' => $skeleton];
}

/**
 * Temporary repos of the running test, deleted after it.
 *
 * @return list<string>
 */
function &releaseRoots(): array
{
    static $roots = [];

    return $roots;
}

afterEach(function (): void {
    $roots = &releaseRoots();

    foreach ($roots as $root) {
        (new Filesystem)->deleteDirectory($root);
    }

    $roots = [];
});

function releaseGit(string $path, string ...$args): string
{
    return Process::path($path)->run(['git', ...$args])->throw()->output();
}

/**
 * @param  list<string>  $args
 */
function runScript(string $repo, string $script, array $args): ProcessResult
{
    return Process::path($repo)->timeout(120)->run(["bin/{$script}", ...$args]);
}

function expectRefusal(ProcessResult $result, string $message): void
{
    expect($result->failed())->toBeTrue()
        ->and($result->errorOutput())->toContain($message);
}

describe('bin/release', function (): void {
    it('refuses a version that is not SemVer', function (string $version): void {
        expectRefusal(runScript(releaseRepo()['repo'], 'release', [$version, '--dry-run']), 'usage: composer release');
    })->with(['1.0', 'v1.0.0', '1.0.0-beta', '']);

    it('refuses to release from another repository than the public one', function (): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'remote', 'add', 'origin', 'git@github.com:yuanmaharsyah/yuan-admin-boiler-plate.git');

        expectRefusal(runScript($repo, 'release', ['1.0.0', '--dry-run']), 'release from the public repository');
    });

    it('releases from the public repository', function (string $origin): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'remote', 'add', 'origin', $origin);

        expect(runScript($repo, 'release', ['1.0.0', '--dry-run'])->successful())->toBeTrue();
    })->with(['git@github.com:yuanmaharsyah/admin-boilerplate.git', 'https://github.com/yuanmaharsyah/admin-boilerplate']);

    it('refuses a dirty tree', function (): void {
        $repo = releaseRepo()['repo'];
        file_put_contents("{$repo}/stray.txt", 'x');

        expectRefusal(runScript($repo, 'release', ['1.0.0', '--dry-run']), 'the working tree is not clean');
    });

    it('refuses a tag that exists in this repo', function (): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'tag', 'v1.0.0');

        expectRefusal(runScript($repo, 'release', ['1.0.0', '--dry-run']), 'tag v1.0.0 already exists in this repo');
    });

    it('refuses a tag that exists on the remote', function (): void {
        ['repo' => $repo] = releaseRepo();
        releaseGit($repo, 'push', '--quiet', 'admin-core', 'HEAD:refs/tags/v1.0.0');

        expectRefusal(runScript($repo, 'release', ['1.0.0', '--dry-run']), 'tag v1.0.0 already exists on');
    });

    it('refuses a version without its CHANGELOG heading', function (): void {
        expectRefusal(runScript(releaseRepo()['repo'], 'release', ['1.1.0', '--dry-run']), "has no '## [1.1.0]' heading");
    });

    it('refuses a release candidate with an empty [Unreleased]', function (): void {
        $repo = releaseRepo(changelog: "# Changelog\n\n## [Unreleased]\n\n## [1.0.0] - 2026-10-25\n- First release.\n")['repo'];

        expectRefusal(runScript($repo, 'release', ['1.1.0-rc.1', '--dry-run']), '[Unreleased] has no entries');
    });

    it('refuses a tag that exists on the skeleton remote', function (): void {
        ['repo' => $repo] = releaseRepo();
        releaseGit($repo, 'push', '--quiet', 'admin-skeleton', 'HEAD:refs/tags/v1.0.0');

        expectRefusal(runScript($repo, 'release', ['1.0.0', '--dry-run']), 'skeleton.git');
    });

    it('refuses a red composer check', function (): void {
        expectRefusal(runScript(releaseRepo(check: 'exit 1')['repo'], 'release', ['1.0.0', '--dry-run']), 'composer check is red');
    });

    it('refuses a red create-project test', function (): void {
        expectRefusal(runScript(releaseRepo(testRelease: 'exit 1')['repo'], 'release', ['1.0.0', '--dry-run']), 'composer test:release is red');
    });

    it('prints the writes on a dry run and pushes nothing', function (): void {
        ['repo' => $repo, 'remote' => $remote, 'skeleton' => $skeleton] = releaseRepo();
        $result = runScript($repo, 'release', ['1.0.0', '--dry-run']);

        expect($result->successful())->toBeTrue()
            ->and($result->output())->toContain(
                'would publish: packages/admin-core/ at HEAD on top of admin-core main',
                'would run: git push admin-core <package snapshot>:refs/heads/main',
                'would run: git push admin-core <package snapshot>:refs/tags/v1.0.0',
                'would publish: skeleton/ at HEAD with bin/skeleton-composer.php 1.0.0',
                'would run: git push admin-skeleton <skeleton snapshot>:refs/heads/main',
                'would run: git push admin-skeleton <skeleton snapshot>:refs/tags/v1.0.0',
                'would run: git tag -a v1.0.0',
                'Dry run: nothing was pushed or tagged.',
            )
            ->and(Process::path($remote)->run(['git', 'show-ref'])->output())->toBe('')
            ->and(Process::path($skeleton)->run(['git', 'show-ref'])->output())->toBe('')
            ->and(releaseGit($repo, 'tag', '--list'))->toBe('');
    });

    it('asks before pushing unless --yes', function (): void {
        ['repo' => $repo, 'remote' => $remote] = releaseRepo();

        expectRefusal(runScript($repo, 'release', ['1.0.0']), 'pass --yes');
        expect(Process::path($remote)->run(['git', 'show-ref'])->output())->toBe('');
    });

    it('pushes the package and skeleton snapshots and tags all three repos', function (): void {
        ['repo' => $repo, 'remote' => $remote, 'skeleton' => $skeleton] = releaseRepo();

        expect(runScript($repo, 'release', ['1.0.0', '--yes'])->throw()->output())->toContain('Released yuanmaharsyah/admin-core v1.0.0')
            ->and(releaseGit($remote, 'ls-tree', '--name-only', 'v1.0.0'))->toBe("CHANGELOG.md\ncomposer.json\n")
            ->and(releaseGit($remote, 'rev-parse', 'main'))->toBe(releaseGit($remote, 'rev-parse', 'v1.0.0^{commit}'))
            ->and(releaseGit($repo, 'tag', '--list'))->toBe("v1.0.0\n")
            // The skeleton: no lock (it pinned the path package), the package from Packagist.
            ->and(releaseGit($skeleton, 'ls-tree', '--name-only', 'v1.0.0'))->toBe("artisan\ncomposer.json\n")
            ->and(releaseGit($skeleton, 'rev-parse', 'main'))->toBe(releaseGit($skeleton, 'rev-parse', 'v1.0.0^{commit}'));

        $composer = json_decode(releaseGit($skeleton, 'show', 'v1.0.0:composer.json'), true);

        expect($composer['require']['yuanmaharsyah/admin-core'])->toBe('^1.0')
            ->and($composer)->not->toHaveKey('repositories')
            ->and(implode("\n", $composer['scripts']['post-create-project-cmd']))->toContain('admin:remove-demo', 'boost:install', 'key:generate');
    });

    it('stacks each package and skeleton release on the previous one', function (): void {
        ['repo' => $repo, 'remote' => $remote, 'skeleton' => $skeleton] = releaseRepo();
        runScript($repo, 'release', ['1.0.0', '--yes'])->throw();

        file_put_contents("{$repo}/packages/admin-core/CHANGELOG.md", str_replace('## [Unreleased]', "## [Unreleased]\n\n## [1.1.0] - 2026-11-01\n\n- More.", RELEASE_CHANGELOG));
        releaseGit($repo, 'commit', '--quiet', '-am', 'next');
        runScript($repo, 'release', ['1.1.0', '--yes'])->throw();

        expect(releaseGit($skeleton, 'rev-parse', 'main^'))->toBe(releaseGit($skeleton, 'rev-parse', 'v1.0.0^{commit}'))
            ->and(releaseGit($remote, 'rev-parse', 'main^'))->toBe(releaseGit($remote, 'rev-parse', 'v1.0.0^{commit}'))
            ->and(json_decode(releaseGit($skeleton, 'show', 'main:composer.json'), true)['require']['yuanmaharsyah/admin-core'])->toBe('^1.1');
    });
});

describe('bin/new-project', function (): void {
    it('refuses a target that is not empty', function (): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'tag', 'v1.0.0');

        expectRefusal(runScript($repo, 'new-project', ['skeleton', '--db=client_x', '--dry-run']), 'skeleton exists and is not empty');
    });

    it('refuses a missing or invalid database name', function (string $db): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'tag', 'v1.0.0');

        expectRefusal(runScript($repo, 'new-project', ['../client', ...($db === '' ? [] : ["--db={$db}"]), '--dry-run']), '--db=<database> is required');
    })->with(['', 'Client-X', '1client']);

    it('refuses a tag that does not exist', function (): void {
        $repo = releaseRepo()['repo'];

        expectRefusal(runScript($repo, 'new-project', ['../client', '--db=client_x', '--ref=v9.9.9', '--dry-run']), 'tag v9.9.9 not found');
    });

    it('refuses a repo without a release tag', function (): void {
        expectRefusal(runScript(releaseRepo()['repo'], 'new-project', ['../client', '--db=client_x', '--dry-run']), 'no v* release tag');
    });

    it('prints every step on a dry run and writes nothing', function (): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'tag', 'v1.0.0');
        releaseGit($repo, 'tag', 'v1.2.3');
        $result = Process::path($repo)->env(['DB_USERNAME' => 'bp_user', 'DB_PASSWORD' => 'p|a&s$s'])
            ->run(['bin/new-project', '../client', '--db=client_x', '--dry-run']);

        expect($result->successful())->toBeTrue()
            ->and($result->output())->not->toContain('p|a&s$s')
            ->and($result->output())->toContain(
                'git archive v1.2.3 skeleton',
                'DB_DATABASE=client_x',
                'DB_USERNAME=bp_user',
                'would set: DB_PASSWORD in .env',
                'DB_DATABASE=client_x_test',
                'composer config --unset repositories.admin-core',
                '"url": "git@github.com:yuanmaharsyah/yuan-admin-core.git", "no-api": true',
                'composer require yuanmaharsyah/admin-core:^1.2',
                'php artisan admin:remove-demo --force',
                'composer setup',
                'boost.json (Claude Code, yuanmaharsyah/admin-core)',
                'php artisan boost:install --guidelines --skills --mcp --no-interaction',
                'git init',
                'Dry run: nothing was written.',
            )
            ->and(dirname($repo).'/client')->not->toBeDirectory();
    });

    it('pins a release candidate exactly', function (): void {
        $repo = releaseRepo()['repo'];
        releaseGit($repo, 'tag', 'v1.0.0-rc.1');

        expect(runScript($repo, 'new-project', ['../client', '--db=client_x', '--ref=v1.0.0-rc.1', '--dry-run'])->output())
            ->toContain('composer require yuanmaharsyah/admin-core:1.0.0-rc.1');
    });
});
