<?php

declare(strict_types=1);

use Modules\Invoice\Widgets\AverageValue;
use Modules\Invoice\Widgets\ByStatus;
use Modules\Invoice\Widgets\Latest;
use Modules\Invoice\Widgets\MonthlyInvoices;
use Modules\Invoice\Widgets\NewInvoices;
use Modules\Invoice\Widgets\Receivable;
use Modules\Invoice\Widgets\Revenue;
use Modules\Invoice\Widgets\RevenueByCity;
use Modules\Invoice\Widgets\RevenueByDay;
use Modules\Invoice\Widgets\RevenueTrend;
use Modules\Invoice\Widgets\TopCustomers;

// Demo module (Phase 06): uses every shared component. Removed from new
// projects by admin:remove-demo (Phase 10).
return [
    'name' => 'Invoice',
    'slug' => 'invoices',
    'label' => 'Invoice',
    'icon' => 'receipt',
    'group' => 'keuangan',
    'order' => 10,
    'enabled' => true,
    'core' => false,
    'superadmin_only' => false,
    'menu' => true,
    'actions' => ['view', 'create', 'edit', 'delete', 'download'],
    'widgets' => [
        Revenue::class,
        Receivable::class,
        NewInvoices::class,
        AverageValue::class,
        RevenueByDay::class,
        RevenueTrend::class,
        Latest::class,
        ByStatus::class,
        RevenueByCity::class,
        MonthlyInvoices::class,
        TopCustomers::class,
    ],
    // Example of a menu parent with children and badges (spec §3.1).
    'submenu' => [
        ['label' => 'Daftar invoice', 'route' => 'index'],
        ['label' => 'Buat invoice', 'route' => 'create', 'action' => 'create', 'badge' => 'Baru'],
    ],
];
