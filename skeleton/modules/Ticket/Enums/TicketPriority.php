<?php

declare(strict_types=1);

namespace Modules\Ticket\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum TicketPriority: string
{
    case Rendah = 'rendah';
    case Sedang = 'sedang';
    case Tinggi = 'tinggi';
    case Darurat = 'darurat';

    public function label(): string
    {
        return match ($this) {
            self::Rendah => __('Rendah'),
            self::Sedang => __('Sedang'),
            self::Tinggi => __('Tinggi'),
            self::Darurat => __('Darurat'),
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
