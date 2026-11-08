<?php

declare(strict_types=1);

namespace Modules\Ticket\Models;

use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Modules\Ticket\Database\Factories\TicketFactory;
use Modules\Ticket\Enums\TicketPriority;
use Modules\Ticket\Enums\TicketStatus;
use Yuan\AdminCore\Audit\HasActivityHistory;
use Yuan\AdminCore\Audit\LogsModuleActivity;
use Yuan\AdminCore\Concurrency\PreventsStaleUpdates;
use Yuan\AdminCore\Data\DataTableFilterData;
use Yuan\AdminCore\DataTable\DataTableModel;
use Yuan\AdminCore\DataTable\HasDataTable;
use Yuan\AdminCore\DataTable\HasVisibilityScope;

/**
 * @property int $id
 * @property string $number
 * @property string $subject
 * @property string $requester
 * @property string $message
 * @property TicketPriority $priority
 * @property TicketStatus $status
 * @property string|null $assignee
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $lock_version
 */
#[UseFactory(TicketFactory::class)]
final class Ticket extends Model implements DataTableModel
{
    /** @use HasFactory<TicketFactory> */
    use HasActivityHistory, HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, PreventsStaleUpdates, SoftDeletes;

    /** @var array<string, mixed> */
    protected $attributes = ['lock_version' => 0];

    protected $fillable = ['number', 'subject', 'requester', 'message', 'priority', 'status', 'assignee'];

    public function dataTableSearch(): array
    {
        return ['number', 'subject', 'requester', 'assignee'];
    }

    public function dataTableSorts(): array
    {
        return ['number', 'subject', 'requester', 'assignee'];
    }

    public function dataTableFilters(): array
    {
        return [new DataTableFilterData('priority', __('Prioritas'), TicketPriority::options()), new DataTableFilterData('status', __('Status'), TicketStatus::options())];
    }

    protected function casts(): array
    {
        return [
            'priority' => TicketPriority::class,
            'status' => TicketStatus::class,
            'lock_version' => 'integer',
        ];
    }
}
