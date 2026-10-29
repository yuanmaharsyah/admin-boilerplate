<?php

declare(strict_types=1);

namespace Modules\Invoice\Policies;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Modules\Invoice\Models\Invoice;

final class InvoicePolicy
{
    public function viewAny(Authorizable $user): bool
    {
        return $user->can('invoices.view');
    }

    public function view(Authorizable $user, Invoice $invoice): bool
    {
        return $user->can('invoices.view');
    }

    public function create(Authorizable $user): bool
    {
        return $user->can('invoices.create');
    }

    public function update(Authorizable $user, Invoice $invoice): bool
    {
        return $user->can('invoices.edit');
    }

    public function download(Authorizable $user): bool
    {
        return $user->can('invoices.download');
    }

    public function delete(Authorizable $user, Invoice $invoice): bool
    {
        return $user->can('invoices.delete');
    }
}
