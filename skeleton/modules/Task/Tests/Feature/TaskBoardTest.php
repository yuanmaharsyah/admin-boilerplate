<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Modules\Task\Enums\TaskStatus;
use Modules\Task\Models\Task;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;
use function Pest\Laravel\patch;

// Kanban → Papan (demo, restyle 03): the board and its moves.

uses(RefreshDatabase::class);

it('needs kanban.view for the board and kanban.edit to move', function (): void {
    ModuleAssertions::assertGuestRedirected('get', '/admin/kanban/board');
    ModuleAssertions::assertForbiddenWithout('kanban.view', 'get', '/admin/kanban/board');
    ModuleAssertions::assertForbiddenWithout('kanban.edit', 'patch', '/admin/kanban/board', ['columns' => ['rencana' => []]]);
});

it('reads only the tasks the user may see', function (): void {
    ModuleAssertions::actingAsLevelWith(['kanban.view']);

    ModuleAssertions::assertScopedToUser(Task::class, 'get', '/admin/kanban/board');
});

it('groups the cards per status in position order, without the move link for a viewer', function (): void {
    $second = Task::factory()->create(['status' => TaskStatus::Rencana, 'position' => 2]);
    $first = Task::factory()->create(['status' => TaskStatus::Rencana, 'position' => 1]);
    $done = Task::factory()->create(['status' => TaskStatus::Selesai, 'position' => 0]);
    ModuleAssertions::actingAsLevelWith(['kanban.view']);

    AssertableInertia::fromTestResponse(get('/admin/kanban/board')->assertOk())
        ->component('Task::Board')
        ->where('board.columns.0.key', 'rencana')
        ->where('board.columns.0.ids', [$first->id, $second->id])
        ->where('board.columns.3.ids', [$done->id])
        ->where('board.move_href', null);
});

it('moves cards between columns in one audited batch', function (): void {
    [$a, $b] = Task::factory()->count(2)->create(['status' => TaskStatus::Rencana])->all();
    ModuleAssertions::actingAsLevelWith(['kanban.view', 'kanban.edit']);

    patch('/admin/kanban/board', ['columns' => ['rencana' => [$b->id], 'dikerjakan' => [$a->id]]])->assertRedirect(route('kanban.board'));

    expect($a->fresh()?->status)->toBe(TaskStatus::Dikerjakan)
        ->and($a->fresh()?->position)->toBe(0)
        ->and($b->fresh()?->position)->toBe(0)
        ->and(ImmutableActivity::query()->where('event', 'updated')->whereNotNull('batch_uuid')->distinct()->count('batch_uuid'))->toBe(1);
});

it('refuses ids the user may not see and unknown columns', function (): void {
    ModuleAssertions::actingAsLevelWith(['kanban.view', 'kanban.edit']);

    patch('/admin/kanban/board', ['columns' => ['rencana' => [999999]]])->assertNotFound();
    patch('/admin/kanban/board', ['columns' => ['arsip' => []]])->assertSessionHasErrors('columns');
});
