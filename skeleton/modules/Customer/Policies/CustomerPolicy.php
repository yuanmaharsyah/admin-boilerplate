<?php

declare(strict_types=1);

namespace Modules\Customer\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\Customer\Models\Customer;

final class CustomerPolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return $user->can('customers.view');
    }

    public function view(Authorizable $user, Customer $customer): bool
    {
        return $user->can('customers.view');
    }

    public function delete(Authorizable $user, Customer $customer): bool
    {
        return $user->can('customers.delete');
    }
}
