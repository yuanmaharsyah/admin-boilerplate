<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\Fixtures\EmployeeFields;
use Yuan\AdminCore\Permissions\Level;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

// A project's user form extension (spec §2.2): extra fields on the core Users
// forms, with their validation and display. The columns come from the
// fixture migration in tests/Fixtures/database.

uses(RefreshDatabase::class);

beforeEach(fn () => config(['admin-core.users.form_extension' => EmployeeFields::class]));

/**
 * @param  array<string, mixed>  $extra
 * @return array<string, mixed>
 */
function employeeInput(array $extra): array
{
    return [
        'name' => 'Dewi Lestari',
        'email' => 'dewi@contoh.test',
        'level_id' => Level::query()->firstOrCreate(['name' => 'staf'], ['label' => 'Staf'])->id,
        'is_active' => true,
        'password' => 'RahasiaBaru1',
        'password_confirmation' => 'RahasiaBaru1',
        'extra' => $extra,
    ];
}

it('sends the extra fields to the form', function (): void {
    ModuleAssertions::actingAsLevelWith(['users.view', 'users.create']);

    AssertableInertia::fromTestResponse(get('/admin/users/create'))
        ->where('options.extra_fields.0.name', 'nip')
        ->where('options.extra_fields.0.required', true)
        ->where('options.extra_fields.1.options.0.label', 'Keuangan');
});

it('validates the extra fields with their labels', function (): void {
    ModuleAssertions::actingAsLevelWith(['users.view', 'users.create']);

    post('/admin/users', employeeInput([]))->assertSessionHasErrors(['extra.nip' => 'NIP wajib diisi.']);
    post('/admin/users', employeeInput(['nip' => '123', 'unit' => 'lain']))->assertSessionHasErrors(['extra.nip', 'extra.unit']);
});

it('saves, shows and updates the extra fields, ignoring unknown ones', function (): void {
    ModuleAssertions::actingAsLevelWith(['users.view', 'users.create', 'users.edit']);

    post('/admin/users', employeeInput(['nip' => '198001012010011001', 'unit' => 'keu', 'is_active' => false]))->assertSessionHasNoErrors();
    $user = User::query()->where('email', 'dewi@contoh.test')->sole();
    expect($user->getAttribute('nip'))->toBe('198001012010011001')
        ->and($user->is_active)->toBeTrue();

    AssertableInertia::fromTestResponse(get("/admin/users/{$user->id}"))
        ->where('user.extra.0.value', '198001012010011001')
        ->where('user.extra.1.display', 'Keuangan');

    put("/admin/users/{$user->id}", [...employeeInput(['nip' => '198001012010011001', 'unit' => 'umum']), 'lock_version' => $user->lock_version])->assertSessionHasNoErrors();
    expect($user->fresh()?->getAttribute('unit'))->toBe('umum');
    ModuleAssertions::assertAudited($user, 'updated');
});

it('keeps the extra values unique where the project says so', function (): void {
    ModuleAssertions::actingAsLevelWith(['users.view', 'users.create']);
    User::factory()->create(['nip' => '198001012010011001']);

    post('/admin/users', employeeInput(['nip' => '198001012010011001']))->assertSessionHasErrors('extra.nip');
});
