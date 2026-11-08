<?php

declare(strict_types=1);

namespace Modules\Ticket\Data;

use Modules\Ticket\Enums\TicketPriority;
use Modules\Ticket\Enums\TicketStatus;
use Modules\Ticket\Models\Ticket;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One tiket record, for its Show and Edit pages. */
#[TypeScript]
final class TicketData extends Data
{
    public function __construct(
        public int $id,
        public string $number,
        public string $subject,
        public string $requester,
        public string $message,
        public TicketPriority $priority,
        public string $priority_label,
        public TicketStatus $status,
        public string $status_label,
        public ?string $assignee,
        public int $lock_version,
    ) {}

    public static function fromModel(Ticket $ticket): self
    {
        return new self(
            id: $ticket->id,
            number: $ticket->number,
            subject: $ticket->subject,
            requester: $ticket->requester,
            message: $ticket->message,
            priority: $ticket->priority,
            priority_label: $ticket->priority->label(),
            status: $ticket->status,
            status_label: $ticket->status->label(),
            assignee: $ticket->assignee,
            lock_version: $ticket->lock_version,
        );
    }
}
