<?php

declare(strict_types=1);

use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Yuan\AdminCore\Audit\AuditEvent;
use Yuan\AdminCore\Modules\AuditLog\Data\AuditFilterData;
use Yuan\AdminCore\Modules\AuditLog\Services\AuditSummary;
use Yuan\AdminCore\Permissions\Level;

// Spec §7 (AuditSummary): under 500ms on a million rows, with the SA
// visibility rule, cache cold. Outside composer check (`composer test:perf`):
// run it before a phase review and in the release rehearsal, and record
// the times in the phase plan.

uses(RefreshDatabase::class)->group('perf');

const PERF_ROWS = 1_000_000;

const PERF_BUDGET_MS = 500;

/**
 * A million rows over the last year: 200 users (5 of them Super Admins),
 * every core event, one in ten with a subject.
 *
 * @return array{User, User}
 */
function seedAuditRows(): array
{
    $level = Level::query()->create(['name' => 'staf', 'label' => 'Staf']);
    $users = User::factory()->count(200)->create()->each(fn (User $user) => $user->assignLevel($level));
    $users->take(5)->each(fn (User $user) => $user->assignLevel(Level::superAdmin()));
    $ids = $users->modelKeys();
    $events = array_map(fn (AuditEvent $event): string => $event->value, AuditEvent::cases());
    $morph = (new User)->getMorphClass();
    $start = CarbonImmutable::now()->subDays(365)->getTimestamp();
    $span = CarbonImmutable::now()->getTimestamp() - $start;
    $properties = json_encode(['meta' => ['subject_label' => 'Invoice INV-0001', 'rows' => 25], 'context' => ['channel' => 'web']]);

    DB::disableQueryLog();

    for ($done = 0; $done < PERF_ROWS; $done += 2000) {
        $rows = [];

        for ($i = 0; $i < 2000; $i++) {
            $at = date('Y-m-d H:i:s', $start + random_int(0, $span));
            $causer = $ids[array_rand($ids)];
            $rows[] = [
                'log_name' => 'users',
                'description' => 'perf',
                'event' => $events[array_rand($events)],
                'causer_type' => $morph,
                'causer_id' => $causer,
                'subject_type' => $i % 10 === 0 ? $morph : null,
                'subject_id' => $i % 10 === 0 ? $ids[array_rand($ids)] : null,
                'properties' => $properties,
                'batch_uuid' => $i % 50 === 0 ? (string) Str::uuid() : null,
                'created_at' => $at,
                'updated_at' => $at,
            ];
        }

        DB::table('activity_log')->insert($rows);
    }

    return [$users->last(), $users->first()];
}

it('builds the summary within budget on a million rows', function (): void {
    [$staff, $superAdmin] = seedAuditRows();
    $summary = app(AuditSummary::class);
    $results = [];
    $times = [];

    foreach (['30 days' => AuditFilterData::from([]), '366 days' => AuditFilterData::from(['range' => 'custom', 'from' => now()->subDays(365)->toDateString(), 'to' => now()->toDateString()])] as $range => $filters) {
        foreach (['non-SA' => $staff, 'SA' => $superAdmin] as $viewer => $user) {
            cache()->flush();
            $started = hrtime(true);
            $data = $summary->for($filters, $user);
            $ms = (hrtime(true) - $started) / 1e6;
            $results[] = sprintf('%-8s %-6s %7.1f ms  (%s rows)', $range, $viewer, $ms, number_format($data->total));
            $times[] = $ms;
        }
    }

    fwrite(STDERR, "\nAuditSummary on ".number_format(PERF_ROWS)." rows:\n".implode("\n", $results)."\n");
    expect(max($times))->toBeLessThan(PERF_BUDGET_MS);
});
