<?php

declare(strict_types=1);

namespace Modules\Invoice\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum PaymentMethod: string
{
    case Transfer = 'transfer';
    case Cash = 'tunai';
    case Giro = 'giro';
    case Qris = 'qris';

    public function label(): string
    {
        return match ($this) {
            self::Transfer => __('Transfer bank'),
            self::Cash => __('Tunai'),
            self::Giro => __('Giro'),
            self::Qris => __('QRIS'),
        };
    }

    /**
     * @return list<OptionData>
     */
    public static function options(): array
    {
        return array_map(fn (self $method): OptionData => new OptionData($method->value, $method->label()), self::cases());
    }
}
