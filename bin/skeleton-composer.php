<?php

declare(strict_types=1);

// php bin/skeleton-composer.php X.Y.Z[-rc.N] < skeleton/composer.json
//
// The skeleton's composer.json as yuanmaharsyah/admin-skeleton publishes it:
// yuanmaharsyah/admin-core from Packagist (no monorepo path repository) at the
// release's version, and a post-create-project-cmd that prepares a new app
// without a database (key, demo removal, AI docs), then prints the next steps.

if (! isset($argv[1]) || ! preg_match('/^(\d+)\.(\d+)\.\d+(-rc\.\d+)?$/', $argv[1], $version)) {
    fwrite(STDERR, "usage: php bin/skeleton-composer.php X.Y.Z[-rc.N] < skeleton/composer.json\n");
    exit(1);
}

$composer = json_decode((string) stream_get_contents(STDIN), true, flags: JSON_THROW_ON_ERROR);

// A release candidate is pinned exactly; a release follows its minor line.
$composer['require']['yuanmaharsyah/admin-core'] = isset($version[3]) ? $argv[1] : "^{$version[1]}.{$version[2]}";
unset($composer['repositories']['admin-core']);

if (($composer['repositories'] ?? null) === []) {
    unset($composer['repositories']);
}

$composer['scripts']['post-create-project-cmd'] = [
    "@php -r \"file_exists('.env') || copy('.env.example', '.env');\"",
    '@php artisan key:generate --ansi',
    '@php artisan admin:remove-demo --force --ansi',
    "@php -r \"file_exists('boost.json') || file_put_contents('boost.json', json_encode(['agents' => ['claude_code'], 'packages' => ['yuanmaharsyah/admin-core'], 'cloud' => false], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES).PHP_EOL); file_exists('CLAUDE.md') || touch('CLAUDE.md');\"",
    '@php artisan boost:install --guidelines --skills --mcp --no-interaction --ansi',
    "@php -r \"echo PHP_EOL, 'Next: set DB_DATABASE, DB_USERNAME and DB_PASSWORD in .env and the test database in phpunit.xml, create both databases, then run: composer setup && composer dev', PHP_EOL;\"",
];

echo json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR), "\n";
