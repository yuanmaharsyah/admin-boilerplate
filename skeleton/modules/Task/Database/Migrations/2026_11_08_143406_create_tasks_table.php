<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table): void {
            $table->id();
            $table->string('title')->index();
            $table->text('description')->nullable();
            $table->string('status', 32)->index();
            $table->string('priority', 32)->index();
            $table->string('assignee')->nullable()->index();
            $table->date('due_on')->nullable()->index();
            $table->integer('position')->index();
            $table->unsignedInteger('lock_version')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
