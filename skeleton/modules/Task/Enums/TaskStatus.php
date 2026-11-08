<?php

declare(strict_types=1);

namespace Modules\Task\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum TaskStatus: string
{
    case Rencana = 'rencana';
    case Dikerjakan = 'dikerjakan';
    case Ditinjau = 'ditinjau';
    case Selesai = 'selesai';

    public function label(): string
    {
        return match ($this) {
            self::Rencana => __('Rencana'),
            self::Dikerjakan => __('Dikerjakan'),
            self::Ditinjau => __('Ditinjau'),
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
