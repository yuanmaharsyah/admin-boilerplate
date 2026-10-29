<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\SampleReadonly\Models\SampleReadonly;

final class SampleReadonlyPolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return $user->can('sample-readonly.view');
    }

    public function view(Authorizable $user, SampleReadonly $sampleReadonly): bool
    {
        return $user->can('sample-readonly.view');
    }
}
