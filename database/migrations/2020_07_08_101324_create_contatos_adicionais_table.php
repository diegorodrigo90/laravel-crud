<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContatosAdicionaisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contatos_adicionais', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pessoa_contato_id');
            $table->string('qual_contato');
            $table->string('contato');
            $table->string('tipo');
            $table->timestamps();

            $table->foreign('pessoa_contato_id')->references('id')->on('pessoas_contatos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contatos_adicionais');
    }
}
