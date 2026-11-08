<?php

declare(strict_types=1);

namespace Modules\Ticket\Data;

use Illuminate\Validation\Rule;
use Modules\Ticket\Enums\TicketPriority;
use Modules\Ticket\Enums\TicketStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** The create form of a tiket record. */
#[TypeScript]
final class StoreTicketData extends Data
{
    public function __construct(
        public string $number,
        public string $subject,
        public string $requester,
        public string $message,
        public TicketPriority $priority,
        public TicketStatus $status,
        public ?string $assignee,
    ) {}

    /**
     * @return array<string, list<mixed>>
     */
    public static function rules(): array
    {
        return [
            'number' => ['required', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'requester' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'priority' => ['required', Rule::enum(TicketPriority::class)],
            'status' => ['required', Rule::enum(TicketStatus::class)],
            'assignee' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Field names in validation messages.
     *
     * @return array<string, string>
     */
    public static function attributes(): array
    {
        return [
            'number' => __('number'),
            'subject' => __('subject'),
            'requester' => __('requester'),
            'message' => __('message'),
            'priority' => __('priority'),
            'status' => __('status'),
            'assignee' => __('assignee'),
        ];
    }
}
