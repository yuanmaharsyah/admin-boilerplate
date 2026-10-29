<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\SampleAdmin\Models\SampleAdmin;

/** A superadmin_only module: Super Admin passes Gate::before, everyone else is refused. */
final class SampleAdminPolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return false;
    }

    public function view(Authorizable $user, SampleAdmin $sampleAdmin): bool
    {
        return false;
    }

    public function create(Authorizable $user): bool
    {
        return false;
    }

    public function update(Authorizable $user, SampleAdmin $sampleAdmin): bool
    {
        return false;
    }

    public function delete(Authorizable $user, SampleAdmin $sampleAdmin): bool
    {
        return false;
    }
}
