<?php

declare(strict_types=1);

namespace Modules\Sample\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\Sample\Models\Sample;

final class SamplePolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return $user->can('samples.view');
    }

    public function view(Authorizable $user, Sample $sample): bool
    {
        return $user->can('samples.view');
    }

    public function create(Authorizable $user): bool
    {
        return $user->can('samples.create');
    }

    public function update(Authorizable $user, Sample $sample): bool
    {
        return $user->can('samples.edit');
    }

    public function delete(Authorizable $user, Sample $sample): bool
    {
        return $user->can('samples.delete');
    }

    public function download(Authorizable $user): bool
    {
        return $user->can('samples.download');
    }
}
