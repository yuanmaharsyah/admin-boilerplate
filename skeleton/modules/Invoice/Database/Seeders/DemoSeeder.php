<?php

declare(strict_types=1);

namespace Modules\Invoice\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Models\Invoice;

/**
 * Fake customers and invoices for browser reviews and demos. Run it only on a
 * rehearsal database: `php artisan db:seed --class="Modules\Invoice\Database\Seeders\DemoSeeder"`.
 */
final class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::factory()->count(30)->create();

        Invoice::factory()->count(240)->recycle($customers)->create();
    }
}
