<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['receiver', 'contact', 'status']);
            $table->foreignId('receiver_id')->constrained('receivers')->cascadeOnDelete();
            $table->foreignId('order_status_id')->constrained('order_statuses')->cascadeOnDelete();
            $table->timestamp('ordered_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
