<?php

declare(strict_types=1);

namespace Modules\Sample\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Customer\Models\Customer;
use Modules\Sample\Enums\SampleStatus;
use Modules\Sample\Models\Sample;

/**
 * @extends Factory<Sample>
 */
final class SampleFactory extends Factory
{
    protected $model = Sample::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->words(3, true),
            'kode' => fake()->words(3, true),
            'catatan' => fake()->sentence(),
            'jumlah' => fake()->numberBetween(1, 1000),
            'tahun' => fake()->numberBetween(1990, now()->year),
            'berat' => fake()->randomFloat(3, 0, 1000),
            'harga' => fake()->numberBetween(1, 10_000) * 1000,
            'aktif' => fake()->boolean(),
            'mulai_tanggal' => fake()->date('Y-m-d'),
            'selesai_pada' => fake()->dateTime()->format('Y-m-d H:i:00'),
            'status' => fake()->randomElement(SampleStatus::cases()),
            'customer_id' => Customer::factory(),
        ];
    }
}
