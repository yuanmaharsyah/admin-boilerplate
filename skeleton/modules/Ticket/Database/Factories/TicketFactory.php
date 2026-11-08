<?php

declare(strict_types=1);

namespace Modules\Ticket\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Ticket\Enums\TicketPriority;
use Modules\Ticket\Enums\TicketStatus;
use Modules\Ticket\Models\Ticket;

/**
 * @extends Factory<Ticket>
 */
final class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition(): array
    {
        return [
            'number' => fake()->words(3, true),
            'subject' => fake()->words(3, true),
            'requester' => fake()->words(3, true),
            'message' => fake()->sentence(),
            'priority' => fake()->randomElement(TicketPriority::cases()),
            'status' => fake()->randomElement(TicketStatus::cases()),
            'assignee' => fake()->words(3, true),
        ];
    }
}
