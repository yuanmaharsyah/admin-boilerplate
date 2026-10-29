<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Modules\Users\Models\User as CoreUser;
use Yuan\AdminCore\Permissions\Level;
use Yuan\AdminCore\Registry\PageResolver;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;
use function Pest\Laravel\post;

// Spec §2.2 in this project: a core page replaced through
// admin-core.pages.overrides, and the swapped User model behind the core Users module.

uses(RefreshDatabase::class);

it('renders the project page in place of an overridden core page', function (): void {
    config(['admin-core.pages.overrides' => ['Users::Index' => 'App::welcome']]);
    app(PageResolver::class)->register(app());
    ModuleAssertions::actingAsSuperAdmin();

    AssertableInertia::fromTestResponse(get('/admin/users')->assertOk())->component('App::welcome');
});

it('runs the core Users module on the project User model', function (): void {
    ModuleAssertions::actingAsSuperAdmin();

    post('/admin/users', [
        'name' => 'Rina Kartika',
        'username' => 'rina.k',
        'email' => 'rina@example.test',
        'password' => 'Rahasia-Uji-123',
        'password_confirmation' => 'Rahasia-Uji-123',
        'level_id' => Level::superAdmin()->id,
        'is_active' => true,
    ])->assertRedirect();

    $user = User::query()->where('email', 'rina@example.test')->sole();
    expect(config('admin-core.models.user'))->toBe(User::class)
        ->and($user)->toBeInstanceOf(CoreUser::class);
    AssertableInertia::fromTestResponse(get("/admin/users/{$user->id}")->assertOk())->where('user.name', 'Rina Kartika');
});
