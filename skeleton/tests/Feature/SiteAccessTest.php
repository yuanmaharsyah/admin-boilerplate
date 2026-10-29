<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Http\Middleware\SiteAccess;
use Yuan\AdminCore\Permissions\Level;
use Yuan\AdminCore\Settings\Settings;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\artisan;
use function Pest\Laravel\get;

// Settings → Akses Situs (spec §7.3): public routes only; auth routes, the
// account pages and /admin always work, and a Super Admin is never locked out.

uses(RefreshDatabase::class);

function siteMode(string $mode, ?string $message = null): void
{
    app(Settings::class)->save('akses', ['mode' => $mode, 'pesan' => $message]);
}

it('leaves public pages alone while the site is open', function (): void {
    get('/')->assertOk()->assertHeaderMissing('Retry-After');
});

it('answers public pages with 503 and Retry-After in maintenance, with the message', function (): void {
    siteMode('maintenance', 'Kembali pukul 23.00 WIB.');

    $response = get('/')->assertStatus(503)->assertHeader('Retry-After', (string) SiteAccess::RETRY_AFTER);

    AssertableInertia::fromTestResponse($response)
        ->component('Core::Errors/SiteAccess')
        ->where('mode', 'maintenance')
        ->where('message', 'Kembali pukul 23.00 WIB.');
});

it('answers public pages with a noindex 200 while coming soon', function (): void {
    siteMode('coming_soon');

    AssertableInertia::fromTestResponse(get('/')->assertOk()->assertHeader('X-Robots-Tag', 'noindex'))
        ->component('Core::Errors/SiteAccess')
        ->where('mode', 'coming_soon');
});

it('keeps login, password reset, the account pages and /admin working', function (string $mode): void {
    siteMode($mode);

    get('/login')->assertOk();
    get('/forgot-password')->assertOk();

    ModuleAssertions::actingAsLevelWith(['users.view']);
    get('/admin/users')->assertOk();
    get('/account/profile')->assertOk();
    get('/')->assertStatus($mode === 'maintenance' ? 503 : 200);
})->with(['maintenance', 'coming_soon']);

it('never locks out a signed-in Super Admin', function (): void {
    siteMode('maintenance');
    $admin = User::factory()->create();
    $admin->assignLevel(Level::superAdmin());

    actingAs($admin)->get('/')->assertOk();
});

it('restores access from the CLI with admin:access, audited on the cli channel', function (): void {
    siteMode('maintenance');

    artisan('admin:access', ['mode' => 'open'])->assertSuccessful();
    artisan('admin:access', ['mode' => 'closed'])->assertFailed();

    $row = ImmutableActivity::query()->where('event', 'settings_updated')->latest('id')->firstOrFail();
    get('/')->assertOk();
    expect($row->properties?->get('context')['channel'] ?? null)->toBe('cli')
        ->and($row->properties?->get('meta')['new'])->toBe(['akses' => ['mode' => 'open']]);
});
