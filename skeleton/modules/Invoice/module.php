<?php

declare(strict_types=1);

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
    'widgets' => [],
];
