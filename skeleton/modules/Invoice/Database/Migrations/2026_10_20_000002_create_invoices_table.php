<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table): void {
            $table->id();
            $table->string('number', 30)->unique();
            $table->foreignId('customer_id')->constrained('customers')->restrictOnDelete();
            $table->date('issued_on')->index();
            $table->dateTime('due_at')->nullable();
            $table->string('status', 20)->index();
            $table->string('payment_method', 20)->nullable();
            $table->unsignedBigInteger('total')->index();
            $table->decimal('tax_rate', 6, 3)->default(11);
            $table->boolean('send_reminder')->default(false);
            $table->string('npwp', 20)->nullable();
            $table->text('notes')->nullable();
            $table->unsignedInteger('lock_version')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
