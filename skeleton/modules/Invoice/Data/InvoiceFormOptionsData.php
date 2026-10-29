<?php

declare(strict_types=1);

namespace Modules\Invoice\Data;

use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Enums\PaymentMethod;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

/** The choices of the invoice form's selects. */
#[TypeScript]
final class InvoiceFormOptionsData extends Data
{
    /**
     * @param  list<OptionData>  $statuses
     * @param  list<OptionData>  $payment_methods
     */
    public function __construct(
        public array $statuses,
        public array $payment_methods,
    ) {}

    public static function make(): self
    {
        return new self(statuses: InvoiceStatus::options(), payment_methods: PaymentMethod::options());
    }
}
