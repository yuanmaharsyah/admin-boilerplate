<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Real-browser smoke tests (Playwright) over the built assets: run by
// `composer check` after `npm run build` (test:built). They catch what the
// HTTP tests can't, such as a page that renders blank because of a JS error.

uses(RefreshDatabase::class)->group('browser');

beforeEach(fn () => $this->withVite());

it('signs in through the login form and lands on Beranda', function (): void {
    $user = User::factory()->create(['password' => 'Rahasia-Uji-123']);
    $user->assignLevel(Level::superAdmin());

    visit('/login')
        ->type('username', $user->email)
        ->type('password', 'Rahasia-Uji-123')
        ->click('button[type=submit]')
        ->assertSee('Beranda')
        ->assertPathIs('/admin/dashboard')
        ->assertNoJavaScriptErrors();
});

it('renders the shell in dark mode with no console errors', function (): void {
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);

    visit('/admin/dashboard')
        ->inDarkMode()
        ->assertScript("document.documentElement.classList.contains('dark')", true)
        ->assertSee('Beranda')
        ->assertSee($user->name)
        ->assertNoJavaScriptErrors()
        ->assertNoConsoleLogs();
});

it('shows the 404 page with a link home to a signed-in user', function (): void {
    actingAs(User::factory()->create());

    visit('/tidak-ada-halaman-ini')
        ->assertSee('Halaman tidak ditemukan')
        ->assertSee('Kembali ke Beranda')
        ->assertNoJavaScriptErrors();
});

it('shows the clicked one-item group in the panel even when it links to the current page', function (): void {
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);

    visit('/admin/invoices')
        ->assertPresent('nav[aria-label="Menu Keuangan"]')
        ->click('[aria-label="Master Data"]')
        ->assertPresent('nav[aria-label="Menu Master Data"]')
        ->click('a[aria-label="Keuangan"]')
        ->assertPresent('nav[aria-label="Menu Keuangan"]')
        ->assertMissing('nav[aria-label="Menu Master Data"]')
        ->assertPathIs('/admin/invoices')
        ->assertNoJavaScriptErrors();
});
