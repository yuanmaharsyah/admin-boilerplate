<?php

declare(strict_types=1);

namespace Modules\Invoice\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum InvoiceStatus: string
{
    case Draft = 'draft';
    case Sent = 'sent';
    case Paid = 'paid';
    case Void = 'void';

    public function label(): string
    {
        return match ($this) {
            self::Draft => __('Draf'),
            self::Sent => __('Terkirim'),
            self::Paid => __('Lunas'),
            self::Void => __('Batal'),
        };
    }

    /**
     * @return list<OptionData>
     */
    public static function options(): array
    {
        return array_map(fn (self $status): OptionData => new OptionData($status->value, $status->label()), self::cases());
    }
}
