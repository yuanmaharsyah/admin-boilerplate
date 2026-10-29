<?php

declare(strict_types=1);

namespace Modules\Sample\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum SampleStatus: string
{
    case Draf = 'draf';
    case Aktif = 'aktif';
    case Arsip = 'arsip';

    public function label(): string
    {
        return match ($this) {
            self::Draf => __('Draf'),
            self::Aktif => __('Aktif'),
            self::Arsip => __('Arsip'),
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
