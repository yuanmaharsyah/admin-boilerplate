<?php

declare(strict_types=1);

use Tests\TestCase;

// Module tests live in modules/{Name}/Tests (spec §3). The core modules' tests
// run here too: they need a whole app, and they check the project's swapped
// User model and form extension against the core screens.
pest()->extend(TestCase::class)->in('Feature', 'Browser', 'Performance', '../modules', '../vendor/yuanmaharsyah/admin-core/modules');
