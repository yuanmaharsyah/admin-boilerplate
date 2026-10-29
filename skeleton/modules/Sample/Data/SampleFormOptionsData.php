<?php

declare(strict_types=1);

namespace Modules\Sample\Data;

use Modules\Sample\Enums\SampleStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

/** The choices of the contoh form's selects. */
#[TypeScript]
final class SampleFormOptionsData extends Data
{
    /**
     * @param  list<OptionData>  $status_options
     */
    public function __construct(
        public array $status_options,
    ) {}

    public static function make(): self
    {
        return new self(status_options: SampleStatus::options());
    }
}
