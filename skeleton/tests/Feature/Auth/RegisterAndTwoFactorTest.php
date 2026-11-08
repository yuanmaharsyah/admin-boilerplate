<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use PragmaRX\Google2FA\Google2FA;
use Yuan\AdminCore\Audit\AuditEvent;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Settings\Settings;

use function Pest\Laravel\assertAuthenticated;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\seed;

// Restyle 03: self-registration behind Pengaturan → Keamanan, and Fortify's two-step verification.

uses(RefreshDatabase::class);

beforeEach(fn () => seed());

function registration(bool $open): void
{
    app(Settings::class)->save('keamanan', ['registrasi' => $open, 'wajib_2fa' => false]);
}

it('hides registration until Super Admin opens it', function (): void {
    get('/register')->assertNotFound();
    post('/register', ['name' => 'Rina'])->assertNotFound();

    AssertableInertia::fromTestResponse(get('/login')->assertOk())
        ->where('register_href', null)
        ->where('social', ['google', 'github']);

    registration(true);

    AssertableInertia::fromTestResponse(get('/login')->assertOk())->where('register_href', route('register'));
    AssertableInertia::fromTestResponse(get('/register')->assertOk())->component('Core::Auth/Register');
});

it('creates an inactive operator account, audits it and returns to login signed out', function (): void {
    registration(true);

    post('/register', [
        'name' => 'Rina Wulandari',
        'username' => 'rina',
        'email' => 'rina@example.test',
        'password' => 'Rahasia-Uji-123',
        'password_confirmation' => 'Rahasia-Uji-123',
    ])->assertRedirect(route('login'))->assertSessionHas('status');

    assertGuest();
    $user = User::query()->where('username', 'rina')->sole();

    expect($user->is_active)->toBeFalse()
        ->and($user->level()?->name)->toBe('operator')
        ->and(ImmutableActivity::query()->where('event', AuditEvent::Registered->value)->where('subject_id', $user->id)->exists())->toBeTrue();
});

it('validates the registration form', function (): void {
    registration(true);
    User::factory()->create(['username' => 'rina']);

    post('/register', ['name' => '', 'username' => 'rina', 'email' => 'bukan-email', 'password' => 'a', 'password_confirmation' => 'b'])
        ->assertSessionHasErrors(['name', 'username', 'email', 'password']);
});

it('asks for the authenticator code after the password, and audits a wrong one', function (): void {
    $google = new Google2FA;
    $secret = $google->generateSecretKey();
    $user = User::factory()->create(['password' => 'Rahasia-Uji-123']);
    $user->forceFill([
        'two_factor_secret' => encrypt($secret),
        'two_factor_recovery_codes' => encrypt(json_encode(['pulih-satu', 'pulih-dua'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    post('/login', ['username' => $user->email, 'password' => 'Rahasia-Uji-123'])->assertRedirect(route('two-factor.login'));
    assertGuest();
    AssertableInertia::fromTestResponse(get('/two-factor-challenge')->assertOk())->component('Core::Auth/TwoFactorChallenge');

    post('/two-factor-challenge', ['code' => '000000'])->assertSessionHasErrors('code');
    expect(ImmutableActivity::query()->where('event', AuditEvent::TwoFactorFailed->value)->exists())->toBeTrue();

    post('/two-factor-challenge', ['code' => $google->getCurrentOtp($secret)]);
    assertAuthenticated();
});

it('never writes the two-factor secrets to the activity log', function (): void {
    $user = User::factory()->create();
    $user->forceFill(['two_factor_secret' => encrypt('GEHEIM'), 'two_factor_recovery_codes' => encrypt('[]')])->save();

    expect(ImmutableActivity::query()->get()->pluck('attribute_changes')->toJson())->not->toContain('two_factor');
});
