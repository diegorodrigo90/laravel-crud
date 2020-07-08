<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnderecoFornecedor extends Model
{
    protected $table = 'enderecos_fornecedores';

    protected $fillable = [
        'fornecedor_id', 'cep', 'logradouro', 'numero',
        'complemento', 'bairro', 'ponto_referencia', 'uf',
        'cidade', 'endereco_condominio', 'numero_condominio'
    ];
}
