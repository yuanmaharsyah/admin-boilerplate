<?php

declare(strict_types=1);

namespace Modules\Ticket\Data;

use Modules\Ticket\Enums\TicketPriority;
use Modules\Ticket\Enums\TicketStatus;
use Modules\Ticket\Models\Ticket;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One row of the tiket list. */
#[TypeScript]
final class TicketListItemData extends Data
{
    public function __construct(
        public int $id,
        public string $number,
        public string $subject,
        public string $requester,
        public TicketPriority $priority,
        public string $priority_label,
        public TicketStatus $status,
        public string $status_label,
        public ?string $assignee,
        // Shown in the row's details panel (DataTable `expandable`).
        public string $message = '',
    ) {}

    public static function fromModel(Ticket $ticket): self
    {
        return new self(
            id: $ticket->id,
            number: $ticket->number,
            subject: $ticket->subject,
            requester: $ticket->requester,
            priority: $ticket->priority,
            priority_label: $ticket->priority->label(),
            status: $ticket->status,
            status_label: $ticket->status->label(),
            assignee: $ticket->assignee,
            message: $ticket->message,
        );
    }
}
