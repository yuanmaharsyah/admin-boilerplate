<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Database\Seeders\AdminCoreSeeder;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\seed;

// The seeded Super Admins must change their password at the first sign-in,
// except on a developer's machine and in tests; the seeded Operator level
// starts with Beranda and the project modules only.

uses(RefreshDatabase::class);

beforeEach(fn () => config(['admin-core.seed.password' => 'Rahasia12345']));

it('makes the seeded Super Admins change their password outside local and testing', function (string $environment): void {
    app()->detectEnvironment(fn (): string => $environment);

    app()->call([app(AdminCoreSeeder::class), 'run']);

    expect(User::query()->pluck('must_change_password')->all())->toBe([true, true]);
})->with(['production', 'staging']);

it('leaves the seeded Super Admins alone in local and testing', function (string $environment): void {
    app()->detectEnvironment(fn (): string => $environment);

    app()->call([app(AdminCoreSeeder::class), 'run']);

    expect(User::query()->pluck('must_change_password')->all())->toBe([false, false]);
})->with(['local', 'testing']);

it('lets a new Operator open Beranda and view the project modules, never Users, Levels or the activity log', function (): void {
    seed(AdminCoreSeeder::class);

    $permissions = Level::query()->where('name', 'operator')->sole()->permissions()->orderBy('name')->pluck('name')->all();

    expect($permissions)->toBe(['customers.view', 'dashboard.view', 'invoices.view', 'sample-readonly.view', 'samples.view']);

    foreach (['users.', 'levels.', 'audit-log.', 'settings.'] as $core) {
        expect(array_filter($permissions, fn (string $name): bool => str_starts_with($name, $core)))->toBe([]);
    }
});
