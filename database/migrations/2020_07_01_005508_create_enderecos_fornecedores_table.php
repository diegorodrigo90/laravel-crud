<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnderecosFornecedoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enderecos_fornecedores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fornecedor_id');
            $table->integer('cep');
            $table->string('logradouro');
            $table->integer('numero');
            $table->string('complemento')->nullable();
            $table->string('bairro');
            $table->string('ponto_referencia')->nullable();
            $table->unsignedBigInteger('uf');
            $table->unsignedBigInteger('cidade');
            $table->boolean('is_condominio');
            $table->string('endereco_condominio')->nullable();
            $table->string('numero_condominio')->nullable();
            $table->timestamps();

            $table->foreign('uf')->references('id')->on('states');
            $table->foreign('cidade')->references('id')->on('cities');
            $table->foreign('fornecedor_id')->references('id')->on('fornecedores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enderecos_fornecedores');
    }
}
