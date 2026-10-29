<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\SampleAdmin\Models\SampleAdmin;

/**
 * Fake contoh khusus super admin records for browser reviews and demos. Run it only on a
 * rehearsal database: `php artisan db:seed --class="Modules\SampleAdmin\Database\Seeders\SampleAdminSeeder"`.
 */
final class SampleAdminSeeder extends Seeder
{
    public function run(): void
    {
        SampleAdmin::factory()->count(25)->create();
    }
}
