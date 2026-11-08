<?php

declare(strict_types=1);

namespace Modules\Task\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Task\Models\Task;

/**
 * Fake kanban records for browser reviews and demos. Run it only on a
 * rehearsal database: `php artisan db:seed --class="Modules\Task\Database\Seeders\TaskSeeder"`.
 */
final class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::factory()->count(25)->create();
    }
}
