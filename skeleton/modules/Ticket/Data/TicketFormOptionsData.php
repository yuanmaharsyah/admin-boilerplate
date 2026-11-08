<?php

declare(strict_types=1);

namespace Modules\Ticket\Data;

use Modules\Ticket\Enums\TicketPriority;
use Modules\Ticket\Enums\TicketStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

/** The choices of the tiket form's selects. */
#[TypeScript]
final class TicketFormOptionsData extends Data
{
    /**
     * @param  list<OptionData>  $priority_options
     * @param  list<OptionData>  $status_options
     */
    public function __construct(
        public array $priority_options,
        public array $status_options,
    ) {}

    public static function make(): self
    {
        return new self(priority_options: TicketPriority::options(), status_options: TicketStatus::options());
    }
}
