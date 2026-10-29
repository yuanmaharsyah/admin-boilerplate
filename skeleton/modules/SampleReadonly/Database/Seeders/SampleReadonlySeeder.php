<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\SampleReadonly\Models\SampleReadonly;

/**
 * Fake contoh baca saja records for browser reviews and demos. Run it only on a
 * rehearsal database: `php artisan db:seed --class="Modules\SampleReadonly\Database\Seeders\SampleReadonlySeeder"`.
 */
final class SampleReadonlySeeder extends Seeder
{
    public function run(): void
    {
        SampleReadonly::factory()->count(25)->create();
    }
}
