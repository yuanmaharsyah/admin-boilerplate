<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Audit\ImmutableActivity;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

it('renders the core login page with its links', function (): void {
    AssertableInertia::fromTestResponse(get(route('login')))
        ->component('Core::Auth/Login')
        ->where('submit_href', route('login.store'))
        ->where('forgot_href', route('password.request'))
        ->where('status', null);
});

it('signs in with a username in the login field', function (): void {
    $user = User::factory()->create(['username' => 'budi.santoso']);

    post(route('login.store'), ['username' => 'budi.santoso', 'password' => 'password'])
        ->assertRedirect(route('admin-core.home'));

    $this->assertAuthenticatedAs($user);
});

it('shows Indonesian messages for a failed sign-in', function (): void {
    post(route('login.store'), ['username' => '', 'password' => ''])
        ->assertSessionHasErrors(['username' => 'Username atau email wajib diisi.', 'password' => 'Kata sandi wajib diisi.']);

    post(route('login.store'), ['username' => 'tidak.ada', 'password' => 'Salah12345'])
        ->assertSessionHasErrors(['username' => 'Username atau kata sandi salah.']);
});

it('answers the same for a known and an unknown email, and only mails the known one', function (): void {
    Notification::fake();
    $user = User::factory()->create();

    post(route('password.email'), ['email' => 'tidak.ada@example.test'])
        ->assertSessionHasNoErrors()
        ->assertSessionHas('status', __('passwords.sent'));
    post(route('password.email'), ['email' => $user->email])
        ->assertSessionHasNoErrors()
        ->assertSessionHas('status', __('passwords.sent'));

    Notification::assertSentTo($user, ResetPassword::class);
    Notification::assertSentTimes(ResetPassword::class, 1);
});

it('renders the forgot-password page with its throttle and the sent status', function (): void {
    AssertableInertia::fromTestResponse(get(route('password.request')))
        ->component('Core::Auth/ForgotPassword')
        ->where('resend_after', config('auth.passwords.users.throttle'))
        ->where('status', null);

    AssertableInertia::fromTestResponse($this->withSession(['status' => 'Terkirim'])->get(route('password.request')))
        ->where('status', 'Terkirim');
});

it('tells a valid reset link from a used or unknown one when the page opens', function (): void {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    AssertableInertia::fromTestResponse(get(route('password.reset', ['token' => $token, 'email' => $user->email])))
        ->component('Core::Auth/ResetPassword')
        ->where('email', $user->email)
        ->where('token_valid', true)
        ->where('password_hint', 'Minimal 10 karakter, dengan huruf besar, huruf kecil, dan angka.');

    AssertableInertia::fromTestResponse(get(route('password.reset', ['token' => 'bukan-token', 'email' => $user->email])))
        ->where('token_valid', false);
});

it('applies the spec §8 rules to a reset', function (): void {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    post(route('password.update'), ['token' => $token, 'email' => $user->email, 'password' => 'rahasia', 'password_confirmation' => 'rahasia'])
        ->assertSessionHasErrors('password');
});

it('redirects guests away from the change-password page', function (): void {
    get(route('account.password.edit'))->assertRedirect(route('login'));
});

it('renders the change-password page for the signed-in user', function (): void {
    $user = User::factory()->create(['name' => 'Budi Santoso']);

    AssertableInertia::fromTestResponse(actingAs($user)->get(route('account.password.edit')))
        ->component('Core::Auth/ChangePassword')
        ->where('user_name', 'Budi Santoso')
        ->where('submit_href', route('account.password.update'))
        ->where('back_href', route('admin-core.home'));
});

it('changes the password, audits password_changed and flashes success', function (): void {
    $user = User::factory()->create();

    actingAs($user)->put(route('account.password.update'), [
        'current_password' => 'password',
        'password' => 'GantiBaru12345',
        'password_confirmation' => 'GantiBaru12345',
    ])->assertRedirect(route('admin-core.home'))->assertInertiaFlash('success', 'Kata sandi berhasil diubah.');

    $row = ImmutableActivity::query()->where('event', 'password_changed')->sole();
    expect(password_verify('GantiBaru12345', (string) $user->fresh()?->password))->toBeTrue()
        ->and($row->subject_id)->toBe($user->id)
        ->and($row->log_name)->toBe('users')
        ->and(json_encode($row->toArray()))->not->toContain('GantiBaru12345');
});

it('refuses a wrong current password, a weak or reused new one, and a mismatch', function (array $input, array $errors): void {
    actingAs(User::factory()->create())
        ->put(route('account.password.update'), $input)
        ->assertSessionHasErrors($errors);
})->with([
    'wrong current password' => [['current_password' => 'salah', 'password' => 'GantiBaru12345', 'password_confirmation' => 'GantiBaru12345'], ['current_password' => 'Kata sandi saat ini salah.']],
    'weak new password' => [['current_password' => 'password', 'password' => 'pendek', 'password_confirmation' => 'pendek'], ['password']],
    'mismatch' => [['current_password' => 'password', 'password' => 'GantiBaru12345', 'password_confirmation' => 'GantiBaru54321'], ['password' => 'Konfirmasi kata sandi tidak cocok.']],
]);

it('refuses a new password equal to the current one', function (): void {
    $user = User::factory()->create(['password' => 'SamaSaja12345']);

    actingAs($user)->put(route('account.password.update'), [
        'current_password' => 'SamaSaja12345',
        'password' => 'SamaSaja12345',
        'password_confirmation' => 'SamaSaja12345',
    ])->assertSessionHasErrors(['password' => 'Kata sandi baru harus berbeda dari kata sandi saat ini.']);
});
