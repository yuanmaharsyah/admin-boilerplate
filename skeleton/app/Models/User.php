<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Yuan\AdminCore\Modules\Users\Models\User as CoreUser;

/**
 * This project's user: the core user (accounts, level, audit, data scope)
 * plus whatever the project adds. Extra columns that admins edit go in the
 * form extension (`admin-core.users.form_extension`).
 *
 * @property Carbon|null $email_verified_at
 */
class User extends CoreUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;
}
