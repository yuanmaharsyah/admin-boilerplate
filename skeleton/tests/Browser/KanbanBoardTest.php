<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Task\Enums\TaskStatus;
use Modules\Task\Models\Task;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Kanban → Papan (demo, restyle 03): a card moves through its menu and the move is saved.
// (Pointer dragging isn't automated: Playwright's dragTo sends too few pointer moves for dnd-kit.)

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('moves a card to another column through its menu, and saves it', function (): void {
    $task = Task::factory()->create(['title' => 'Siapkan laporan', 'status' => TaskStatus::Rencana, 'position' => 0]);

    visit('/admin/kanban/board')
        ->click('[aria-label="Pindahkan Siapkan laporan ke"]')
        ->click('[role="menuitem"]:has-text("Dikerjakan")')
        ->assertSeeIn('section[aria-label="Dikerjakan"]', 'Siapkan laporan')
        ->assertNoJavaScriptErrors();

    expect($task->fresh()?->status)->toBe(TaskStatus::Dikerjakan);
});
