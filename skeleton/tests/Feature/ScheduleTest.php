<?php

declare(strict_types=1);

use Illuminate\Console\Scheduling\Event;
use Illuminate\Console\Scheduling\Schedule;

// The core maintenance commands the project schedules (routes/console.php).

it('runs the core maintenance commands daily', function (string $command): void {
    $daily = collect(app(Schedule::class)->events())
        ->filter(fn (Event $event): bool => str_contains((string) $event->command, $command))
        ->map(fn (Event $event): string => $event->expression);

    expect($daily->values()->all())->toBe(['0 0 * * *']);
})->with(['admin:audit-prune', 'admin:attachments-sweep', 'model:prune']);
