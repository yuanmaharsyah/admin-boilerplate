<?php

declare(strict_types=1);

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Yuan\AdminCore\Audit\Audit;
use Yuan\AdminCore\Audit\AuditEvent;
use Yuan\AdminCore\Data\Auth\RegisterData;
use Yuan\AdminCore\Events\UserCreated;
use Yuan\AdminCore\Permissions\Level;

/**
 * Self-registration (restyle 03), only while Pengaturan → Keamanan →
 * registrasi is on: the account gets `admin-core.auth.register_level` and
 * stays inactive until an admin activates it (Users).
 */
class CreateNewUser implements CreatesNewUsers
{
    /**
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        abort_unless(settings('keamanan.registrasi') === true, 404);

        $data = RegisterData::validateAndCreate($input);

        $user = DB::transaction(function () use ($data): User {
            $user = new User(['name' => $data->name, 'username' => $data->username, 'email' => $data->email, 'password' => $data->password, 'is_active' => false]);
            $user->save();
            $user->assignLevel(Level::query()->where('name', config()->string('admin-core.auth.register_level'))->firstOrFail());
            Audit::record(AuditEvent::Registered, $user);

            return $user;
        });

        DB::afterCommit(fn () => UserCreated::dispatch($user));

        return $user;
    }
}
