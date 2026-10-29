<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Yuan\AdminCore\Audit\ImmutableActivity;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

it('writes login and logout for a real Fortify sign-in', function (): void {
    $user = User::factory()->create();

    post(route('login.store'), ['username' => $user->email, 'password' => 'password']);
    actingAs($user)->post(route('logout'));

    expect(ImmutableActivity::query()->where('log_name', 'auth')->orderBy('id')->get(['event', 'log_name', 'causer_id'])->toArray())->toBe([
        ['event' => 'login', 'log_name' => 'auth', 'causer_id' => $user->id],
        ['event' => 'logout', 'log_name' => 'auth', 'causer_id' => $user->id],
    ]);
});

it('refuses an inactive account at login, writing one login_failed with reason inactive', function (): void {
    $user = User::factory()->inactive()->create();

    post(route('login.store'), ['username' => $user->email, 'password' => 'password'])
        ->assertSessionHasErrors(['username' => 'Akun Anda tidak aktif. Hubungi administrator.']);

    $this->assertGuest();
    $row = ImmutableActivity::query()->where('log_name', 'auth')->sole();
    expect($row->event)->toBe('login_failed')
        ->and($row->subject_id)->toBe($user->id)
        ->and($row->getProperty('meta'))->toMatchArray(['username' => $user->email, 'reason' => 'inactive']);
});

it('writes login_failed with the email only, never the password', function (): void {
    $user = User::factory()->create();

    post(route('login.store'), ['username' => $user->email, 'password' => 'SalahSekali9']);

    $row = ImmutableActivity::query()->where('log_name', 'auth')->sole();
    expect($row->event)->toBe('login_failed')
        ->and($row->subject_id)->toBe($user->id)
        ->and($row->getProperty('meta.username'))->toBe($user->email)
        ->and(json_encode(DB::table('activity_log')->first()))->not->toContain('SalahSekali9');
});
