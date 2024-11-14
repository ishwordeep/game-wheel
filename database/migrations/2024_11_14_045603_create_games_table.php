<?php

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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('agent_link')->nullable();
            $table->string('player_link')->nullable();
            $table->string('image')->nullable();
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('image')->nullable();
            $table->integer('spin_frequency')->nullable(); //in hrs
            $table->timestamps();
        });

        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('image')->nullable();
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('wheel_rules', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('wheels', function (Blueprint $table) {
            $table->id();
            $table->double('value')->nullable();
            $table->double('win_ratio')->nullable();
            $table->timestamps();
        });

        Schema::create('spin_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wheel_id');
            $table->unsignedBigInteger('user_id');
            $table->double('value');
            $table->timestamps();

            $table->foreign('wheel_id')->references('id')->on('wheels')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('user_balances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('spin_record_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->double('value');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('spin_record_id')->references('id')->on('spin_records')->onDelete('cascade');
        });


        Schema::create('custom_win_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('wheel_id');
            $table->double('value');
            $table->boolean('is_applied')->default(false);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('wheel_id')->references('id')->on('wheels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       
        Schema::dropIfExists('custom_win_records');
        Schema::dropIfExists('user_balances');
        Schema::dropIfExists('spin_records');
        Schema::dropIfExists('wheels');
        Schema::dropIfExists('wheel_rules');
        Schema::dropIfExists('sliders');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('games');
    }
};
