<?php

declare(strict_types=1);

namespace Modules\Ticket\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Ticket\Models\Ticket;

/**
 * Fake tiket records for browser reviews and demos. Run it only on a
 * rehearsal database: `php artisan db:seed --class="Modules\Ticket\Database\Seeders\TicketSeeder"`.
 */
final class TicketSeeder extends Seeder
{
    public function run(): void
    {
        Ticket::factory()->count(25)->create();
    }
}
