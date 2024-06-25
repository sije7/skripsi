<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role')->default('user');
            $table->rememberToken();
            $table->string('no_req')->nullable();
            $table->string('jenis_kelamin')->nullable();
            $table->string('umur')->nullable();
            $table->string('lokasi')->nullable();
            $table->string('penanggung_jawab')->nullable();
            $table->string('nomor_telepon')->nullable();
            $table->string('profile_image')->default('/storage/images/profiledefault.png')->nullable();
            $table->string('bank')->nullable();
            $table->integer('status')->default(0);
            $table->longText('deskripsi')->nullable();
            $table->decimal('latitude',20,7)->nullable();
            $table->decimal('longitude',20,7)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
