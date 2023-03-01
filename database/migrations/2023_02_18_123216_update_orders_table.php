<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->integer('sub_total');
            $table->integer('discount');
            $table->timestamp('ordered_at')->useCurrent();
            $table->integer('shipping_price')->default(0);
        });

        DB::statement('ALTER TABLE orders AUTO_INCREMENT = 10000;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
