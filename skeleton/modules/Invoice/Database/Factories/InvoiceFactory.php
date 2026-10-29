<?php

declare(strict_types=1);

namespace Modules\Invoice\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Enums\PaymentMethod;
use Modules\Invoice\Models\Invoice;

/**
 * @extends Factory<Invoice>
 */
final class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        $issued = fake()->dateTimeBetween('-1 year');

        return [
            'number' => 'INV-'.fake()->unique()->numerify('######'),
            'customer_id' => Customer::factory(),
            'issued_on' => $issued->format('Y-m-d'),
            'due_at' => (clone $issued)->modify('+30 days')->format('Y-m-d 17:00:00'),
            'status' => fake()->randomElement(InvoiceStatus::cases()),
            'payment_method' => fake()->randomElement(PaymentMethod::cases()),
            'total' => fake()->numberBetween(100, 50_000) * 1000,
            'tax_rate' => '11.000',
            'send_reminder' => fake()->boolean(),
            'npwp' => fake()->numerify('###############'),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
