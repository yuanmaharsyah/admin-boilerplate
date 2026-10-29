<?php

declare(strict_types=1);

namespace App\Actions\Fortify;

use App\Models\User;
use Laravel\Fortify\Contracts\ResetsUserPasswords;
use Yuan\AdminCore\Data\Auth\ResetPasswordData;

class ResetUserPassword implements ResetsUserPasswords
{
    /**
     * Validate and reset the user's forgotten password (spec §8 rules).
     *
     * @param  array<string, string>  $input
     */
    public function reset(User $user, array $input): void
    {
        $data = ResetPasswordData::validateAndCreate($input);

        $user->forceFill(['password' => $data->password])->save();
    }
}
