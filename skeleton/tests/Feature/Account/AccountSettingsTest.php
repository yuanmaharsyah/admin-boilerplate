<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Audit\AuditEvent;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Permissions\Level;
use Yuan\AdminCore\Settings\Settings;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\seed;

// Akun (restyle 03): tabs, photo, sessions, two-step state and wajib_2fa.

uses(RefreshDatabase::class);

beforeEach(function (): void {
    Storage::fake('local');
    seed();
});

it('opens the asked tab and offers two-step on Fortify\'s routes', function (): void {
    actingAs(User::factory()->create());

    AssertableInertia::fromTestResponse(get(route('account.profile.edit', ['tab' => 'keamanan']))->assertOk())
        ->component('Core::Account/Settings')
        ->where('account.tab', 'keamanan')
        ->where('account.two_factor.state', 'off')
        ->where('account.two_factor.enable_href', route('two-factor.enable'))
        // The test run keeps sessions in memory: no device list.
        ->where('account.sessions', null);

    AssertableInertia::fromTestResponse(get(route('account.profile.edit', ['tab' => 'lain']))->assertOk())->where('account.tab', 'profil');
});

it('stores the photo privately, serves it by signed URL, shares it and removes it', function (): void {
    $user = User::factory()->create();
    actingAs($user);

    post(route('account.avatar.update'), ['avatar' => UploadedFile::fake()->image('saya.png', 200, 200)])->assertRedirect(route('account.profile.edit'));

    $file = $user->attachments('avatar')->sole();
    Storage::disk($file->disk)->assertExists($file->path);
    expect(ImmutableActivity::query()->where('event', AuditEvent::AttachmentUploaded->value)->exists())->toBeTrue();

    $url = AssertableInertia::fromTestResponse(get(route('account.profile.edit')))->toArray()['props']['auth']['user']['avatar_url'];
    expect($url)->toBeString();
    get($url)->assertOk()->assertHeader('Content-Type', 'image/png');
    get(route('account.avatar.show', ['user' => $user->id]))->assertForbidden();
    expect(ImmutableActivity::query()->where('event', AuditEvent::AttachmentDownloaded->value)->exists())->toBeFalse();

    delete(route('account.avatar.destroy'))->assertRedirect(route('account.profile.edit'));
    expect($user->attachments('avatar')->exists())->toBeFalse();
});

it('refuses a photo that is not an image', function (): void {
    actingAs(User::factory()->create());

    post(route('account.avatar.update'), ['avatar' => UploadedFile::fake()->create('cv.pdf', 10, 'application/pdf')])->assertSessionHasErrors('avatar');
});

it('signs out the other devices after the current password, and stays signed in', function (): void {
    $user = User::factory()->create(['password' => 'Rahasia-Uji-123']);
    actingAs($user);

    delete(route('account.sessions.destroy'), ['password' => 'salah'])->assertSessionHasErrors('password');
    $version = $user->fresh()?->session_version;

    delete(route('account.sessions.destroy'), ['password' => 'Rahasia-Uji-123'])->assertRedirect(route('account.profile.edit', ['tab' => 'keamanan']));

    expect($user->fresh()?->session_version)->toBe($version + 1);
    get(route('account.profile.edit'))->assertOk();
});

it('keeps a user without two-step on Akun while it is required', function (): void {
    app(Settings::class)->save('keamanan', ['registrasi' => false, 'wajib_2fa' => true]);
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);

    get('/admin/dashboard')->assertRedirect(route('account.profile.edit', ['tab' => 'keamanan']));
    get(route('account.profile.edit', ['tab' => 'keamanan']))->assertOk();
    get('/admin/dashboard', ['Accept' => 'application/json'])->assertForbidden();

    $user->forceFill(['two_factor_secret' => encrypt('X'), 'two_factor_confirmed_at' => now()])->save();
    get('/admin/dashboard')->assertOk();
});
