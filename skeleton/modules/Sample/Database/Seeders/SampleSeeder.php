<?php

declare(strict_types=1);

namespace Modules\Sample\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sample\Models\Sample;

/**
 * Fake contoh records for browser reviews and demos. Run it only on a
 * rehearsal database: `php artisan db:seed --class="Modules\Sample\Database\Seeders\SampleSeeder"`.
 */
final class SampleSeeder extends Seeder
{
    public function run(): void
    {
        Sample::factory()->count(25)->create();
    }
}
