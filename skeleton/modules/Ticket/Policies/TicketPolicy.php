<?php

declare(strict_types=1);

namespace Modules\Ticket\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\Ticket\Models\Ticket;

final class TicketPolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return $user->can('tickets.view');
    }

    public function view(Authorizable $user, Ticket $ticket): bool
    {
        return $user->can('tickets.view');
    }

    public function create(Authorizable $user): bool
    {
        return $user->can('tickets.create');
    }

    public function update(Authorizable $user, Ticket $ticket): bool
    {
        return $user->can('tickets.edit');
    }

    public function delete(Authorizable $user, Ticket $ticket): bool
    {
        return $user->can('tickets.delete');
    }
}
