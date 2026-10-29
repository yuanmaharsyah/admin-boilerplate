<?php

declare(strict_types=1);

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\User;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Database\Seeders\AdminCoreSeeder;
use Yuan\AdminCore\Http\Middleware\HandleInertiaRequests as CoreHandleInertiaRequests;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\put;

uses(RefreshDatabase::class);

it('runs the project middleware, a subclass of the core one, in the web group', function (): void {
    app(Kernel::class); // the HTTP kernel hands its middleware groups to the router

    expect(is_subclass_of(HandleInertiaRequests::class, CoreHandleInertiaRequests::class))->toBeTrue()
        ->and(app('router')->getMiddlewareGroups()['web'])->toContain(HandleInertiaRequests::class);
});

it('shares the core props on a page, with the level and its permissions', function (): void {
    $this->seed(AdminCoreSeeder::class);
    $user = User::factory()->create();
    $user->assignLevel($operator = Level::query()->where('name', 'operator')->sole());

    AssertableInertia::fromTestResponse(actingAs($user)->get(route('account.profile.edit')))
        ->where('auth.user', ['id' => $user->id, 'name' => $user->name, 'email' => $user->email])
        ->where('auth.level', ['id' => $operator->id, 'name' => 'operator', 'label' => 'Operator'])
        ->where('auth.permissions', $operator->permissions()->orderBy('name')->pluck('name')->all())
        ->where('auth.is_super_admin', false)
        ->has('menu')
        ->where('app.name', config('app.name'));
});

it('reads the panel state from the unencrypted admin_panel cookie the shell writes', function (): void {
    $user = User::factory()->create();

    AssertableInertia::fromTestResponse(actingAs($user)->withUnencryptedCookie('admin_panel', 'false')->get(route('account.profile.edit')))
        ->where('app.panel_open', false)
        ->where('app.route', 'account.profile.edit');
});

it('flashes success through native flash after a profile update', function (): void {
    actingAs(User::factory()->create());

    put(route('account.profile.update'), ['name' => 'Budi', 'email' => 'budi@example.test', 'lock_version' => 0])
        ->assertSessionHas('inertia.flash_data', ['success' => 'Profil disimpan.']);
});
