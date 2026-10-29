<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\getJson;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    config(['app.debug' => false]);
    Route::middleware('web')->get('/_test/status/{status}', fn (int $status) => abort($status));
    Route::middleware('web')->get('/_test/crash', fn () => throw new RuntimeException('boom'));
});

it('renders each error status as the core error page with the core props', function (int $status): void {
    AssertableInertia::fromTestResponse(get("/_test/status/{$status}")->assertStatus($status))
        ->component('Core::Errors/Show')
        ->where('status', $status)
        ->where('signed_in', false)
        ->where('home_href', route('login'))
        ->has('app.name');
})->with([403, 404, 419, 500, 503]);

it('renders an unknown URL as the 404 page, linking home when signed in', function (): void {
    AssertableInertia::fromTestResponse(actingAs(User::factory()->create())->get('/tidak-ada-halaman-ini')->assertNotFound())
        ->component('Core::Errors/Show')
        ->where('status', 404)
        ->where('signed_in', true)
        ->where('home_href', route('admin-core.home'));
});

it('renders an exception as the 500 page without debug, and keeps the debug page with it', function (): void {
    AssertableInertia::fromTestResponse(get('/_test/crash')->assertStatus(500))
        ->component('Core::Errors/Show')
        ->where('status', 500);

    config(['app.debug' => true]);

    expect(get('/_test/crash')->assertStatus(500)->headers->get('X-Inertia'))->toBeNull();
});

it('keeps JSON responses for JSON requests', function (): void {
    getJson('/_test/status/403')->assertForbidden()->assertJsonStructure(['message']);
});
