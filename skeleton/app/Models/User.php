<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Yuan\AdminCore\Modules\Users\Models\User as CoreUser;

/**
 * This project's user: the core user (accounts, level, audit, data scope)
 * plus whatever the project adds. Extra columns that admins edit go in the
 * form extension (`admin-core.users.form_extension`). Two-factor
 * authentication comes from Fortify; its columns are never fillable, so the
 * audit trait never logs them (they are also in `audit.masked_fields`).
 *
 * @property Carbon|null $email_verified_at
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $two_factor_confirmed_at
 */
class User extends CoreUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, TwoFactorAuthenticatable;

    /**
     * @return list<string>
     */
    public function getHidden(): array
    {
        return array_values([...parent::getHidden(), 'two_factor_secret', 'two_factor_recovery_codes']);
    }
}
