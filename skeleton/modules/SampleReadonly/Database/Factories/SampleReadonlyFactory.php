<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SampleReadonly\Enums\SampleReadonlyStatus;
use Modules\SampleReadonly\Models\SampleReadonly;

/**
 * @extends Factory<SampleReadonly>
 */
final class SampleReadonlyFactory extends Factory
{
    protected $model = SampleReadonly::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->words(3, true),
            'jumlah' => fake()->numberBetween(1, 1000),
            'status' => fake()->randomElement(SampleReadonlyStatus::cases()),
            'tanggal' => fake()->date('Y-m-d'),
        ];
    }
}
