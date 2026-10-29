<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Migrations\Migrator;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Schema;
use Throwable;
use Yuan\AdminCore\Attachments\Attachment;
use Yuan\AdminCore\Registry\ModuleDefinition;
use Yuan\AdminCore\Registry\ModuleRegistry;

// Run once in a new project (bin/new-project). The boilerplate repo keeps the
// demo and golden modules; this command removes them, the tests and fixtures
// built on them, and then itself.
final class RemoveDemoCommand extends Command
{
    /** The demo modules and the generator's golden modules. */
    public const array MODULES = ['Invoice', 'Customer', 'Sample', 'SampleReadonly', 'SampleAdmin'];

    /**
     * Skeleton files that exist only for those modules or for the boilerplate
     * repo. The core keeps its coverage there.
     */
    public const array FILES = [
        'tests/Feature/GoldenModulesTest.php',
        'tests/Feature/HomeRedirectTest.php',
        'tests/Feature/DatabaseQueueTest.php',
        'tests/Feature/Account/DownloadsTest.php',
        'tests/Feature/ReleaseScriptsTest.php',
        'tests/Feature/CreateProjectTest.php',
        'tests/Browser/DataTableRowMenuTest.php',
        'tests/Browser/FilesTest.php',
        'tests/Browser/DataTableSelectionTest.php',
        'tests/Browser/ShellSmokeTest.php',
        'tests/Browser/FormsTest.php',
        'tests/Browser/DataTableColumnsTest.php',
        'tests/Fixtures/GoldenModules.php',
        'tests/Fixtures/regenerate-sample.php',
        'tests/Fixtures/FailingExport.php',
        'tests/Feature/RemoveDemoTest.php',
        'app/Console/Commands/RemoveDemoCommand.php',
    ];

    /** Composer scripts that only work in the boilerplate repo. */
    public const array SCRIPTS = ['sample:regenerate', 'test:release'];

    protected $signature = 'admin:remove-demo {--dry-run : List what would be removed and change nothing} {--force : Skip the confirmation}';

    protected $description = 'Remove the demo and golden modules (folders, permissions, tables) from a new project';

    public function handle(Filesystem $files, ModuleRegistry $registry, Migrator $migrator): int
    {
        $folders = array_map(fn (string $module): string => "modules/{$module}", self::MODULES);
        $slugs = array_values(array_map(
            fn (ModuleDefinition $module): string => $module->slug,
            array_filter($registry->all(), fn (ModuleDefinition $module): bool => ! $module->core && in_array($module->name, self::MODULES, true)),
        ));
        $database = $this->databaseReachable();
        $migrations = $database ? $this->migrations($migrator, $folders) : [];

        $plan = [
            'Folders' => $folders,
            'Files' => self::FILES,
            'Composer scripts' => self::SCRIPTS,
            'Permissions' => array_map(fn (string $slug): string => "{$slug}.*", $slugs),
            'Migrations to roll back' => array_keys($migrations),
        ];

        foreach ($plan as $heading => $items) {
            $this->components->twoColumnDetail("<fg=gray>{$heading}</>");
            $this->components->bulletList($items === [] ? ['none'] : $items);
        }

        if (! $database) {
            $this->components->warn('No database yet: only the files are removed.');
        }

        if ($this->option('dry-run')) {
            return self::SUCCESS;
        }

        if (! $this->option('force') && ! $this->components->confirm('Remove the demo modules?')) {
            return self::FAILURE;
        }

        if ($database) {
            $this->dropTables($migrator, $migrations);
        }

        foreach ($folders as $folder) {
            $files->deleteDirectory(base_path($folder));
        }

        $files->delete(array_map(base_path(...), self::FILES));
        $this->removeScripts($files);

        // A fresh process: this one still has the demo modules registered.
        Process::path(base_path())->run([PHP_BINARY, 'artisan', 'modules:clear'])->throw();

        if ($database) {
            Process::path(base_path())->run([PHP_BINARY, 'artisan', 'permissions:sync'])->throw();
        }

        $this->components->info('Demo modules removed. Audit rows about demo records stay (append-only).');

        return self::SUCCESS;
    }

    /**
     * The demo migrations that have run, newest first.
     *
     * @param  list<string>  $folders
     * @return array<string, string> Migration name => file.
     */
    private function migrations(Migrator $migrator, array $folders): array
    {
        $files = $migrator->getMigrationFiles(array_map(fn (string $folder): string => base_path("{$folder}/Database/Migrations"), $folders));
        $ran = $migrator->getRepository()->getRan();

        return array_reverse(array_filter($files, fn (string $name): bool => in_array($name, $ran, true), ARRAY_FILTER_USE_KEY));
    }

    /**
     * @param  array<string, string>  $migrations
     */
    private function dropTables(Migrator $migrator, array $migrations): void
    {
        // Rows only; admin:attachments-sweep deletes the row-less files after a day.
        $models = [];

        foreach (self::MODULES as $module) {
            foreach (glob(base_path("modules/{$module}/Models/*.php")) ?: [] as $file) {
                $models[] = "Modules\\{$module}\\Models\\".basename($file, '.php');
            }
        }

        Attachment::query()->whereIn('attachable_type', $models)->delete();

        foreach ($migrations as $name => $file) {
            $migration = require $file;

            if ($migration instanceof Migration && method_exists($migration, 'down')) {
                $migration->down();
            }

            $migrator->getRepository()->delete((object) ['migration' => $name]);
        }
    }

    private function removeScripts(Filesystem $files): void
    {
        /** @var array{scripts: array<string, mixed>} $composer */
        $composer = json_decode($files->get(base_path('composer.json')), true, flags: JSON_THROW_ON_ERROR);

        foreach (self::SCRIPTS as $script) {
            unset($composer['scripts'][$script]);
        }

        $files->put(base_path('composer.json'), json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)."\n");
    }

    private function databaseReachable(): bool
    {
        try {
            return Schema::hasTable('migrations');
        } catch (Throwable) {
            return false;
        }
    }
}
