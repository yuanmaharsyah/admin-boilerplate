<?php

declare(strict_types=1);

namespace Modules\Ticket\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum TicketStatus: string
{
    case Baru = 'baru';
    case Dibuka = 'dibuka';
    case Menunggu = 'menunggu';
    case Selesai = 'selesai';

    public function label(): string
    {
        return match ($this) {
            self::Baru => __('Baru'),
            self::Dibuka => __('Dibuka'),
            self::Menunggu => __('Menunggu'),
            self::Selesai => __('Selesai'),
        };
    }

    /**
     * @return list<OptionData>
     */
    public static function options(): array
    {
        return array_map(fn (self $case): OptionData => new OptionData($case->value, $case->label()), self::cases());
    }
}
