<?php

declare(strict_types=1);

// Demo module (Phase 06): the target of the Invoice RelationSelect. Removed
// from new projects by admin:remove-demo (Phase 10).
return [
    'name' => 'Customer',
    'slug' => 'customers',
    'label' => 'Pelanggan',
    'icon' => 'users',
    'group' => 'master',
    'order' => 10,
    'enabled' => true,
    'core' => false,
    'superadmin_only' => false,
    'menu' => true,
    'actions' => ['view', 'delete'],
    'widgets' => [],
];
