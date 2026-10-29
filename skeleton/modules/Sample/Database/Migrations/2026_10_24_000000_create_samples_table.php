<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('samples', function (Blueprint $table): void {
            $table->id();
            $table->string('nama')->index();
            $table->string('kode')->nullable()->index();
            $table->text('catatan')->nullable();
            $table->integer('jumlah')->index();
            $table->unsignedSmallInteger('tahun')->index();
            $table->decimal('berat', 15, 3)->nullable()->index();
            $table->unsignedBigInteger('harga')->index();
            $table->boolean('aktif')->default(false);
            $table->date('mulai_tanggal')->index();
            $table->dateTime('selesai_pada')->nullable()->index();
            $table->string('status', 32)->index();
            $table->foreignId('customer_id')->constrained('customers')->restrictOnDelete();
            $table->unsignedInteger('lock_version')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('samples');
    }
};
