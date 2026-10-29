<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

#[TypeScript]
enum SampleReadonlyStatus: string
{
    case Baru = 'baru';
    case Lama = 'lama';

    public function label(): string
    {
        return match ($this) {
            self::Baru => __('Baru'),
            self::Lama => __('Lama'),
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
