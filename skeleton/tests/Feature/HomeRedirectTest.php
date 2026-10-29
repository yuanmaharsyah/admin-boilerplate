<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;
use function Pest\Laravel\post;

// Where a sign-in lands (`/home`): Beranda with dashboard.view, else the
// first permitted menu item, else the no-access page.

uses(RefreshDatabase::class);

it('lands on Beranda with dashboard.view', function (): void {
    ModuleAssertions::actingAsLevelWith(['dashboard.view', 'invoices.view']);

    get('/home')->assertRedirect('/admin/dashboard');
});

it('lands on the first permitted module without dashboard.view', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view']);

    get('/home')->assertRedirect('/admin/invoices');
});

it('shows the no-access page to a user with no permitted module', function (): void {
    ModuleAssertions::actingAsLevelWith([]);

    AssertableInertia::fromTestResponse(get('/home')->assertOk())
        ->component('Core::Errors/NoAccess')
        ->where('logout_href', route('logout'));
});

it('sends a fresh sign-in there', function (): void {
    $user = User::factory()->create(['password' => 'Rahasia-Uji-123']);

    post('/login', ['username' => $user->email, 'password' => 'Rahasia-Uji-123'])->assertRedirect('/home');
});

it('redirects guests to login', function (): void {
    get('/home')->assertRedirect('/login');
});
