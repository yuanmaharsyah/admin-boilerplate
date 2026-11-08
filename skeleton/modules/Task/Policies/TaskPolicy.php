<?php

declare(strict_types=1);

namespace Modules\Task\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\Task\Models\Task;

final class TaskPolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return $user->can('kanban.view');
    }

    public function view(Authorizable $user, Task $task): bool
    {
        return $user->can('kanban.view');
    }

    public function create(Authorizable $user): bool
    {
        return $user->can('kanban.create');
    }

    public function update(Authorizable $user, Task $task): bool
    {
        return $user->can('kanban.edit');
    }

    public function delete(Authorizable $user, Task $task): bool
    {
        return $user->can('kanban.delete');
    }
}
