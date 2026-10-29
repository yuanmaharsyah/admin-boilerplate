<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SampleAdmin\Models\SampleAdmin;

/**
 * @extends Factory<SampleAdmin>
 */
final class SampleAdminFactory extends Factory
{
    protected $model = SampleAdmin::class;

    public function definition(): array
    {
        return [
            'judul' => fake()->words(3, true),
            'catatan' => fake()->sentence(),
        ];
    }
}
