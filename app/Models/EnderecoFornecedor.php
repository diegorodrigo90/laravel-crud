<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnderecoFornecedor extends Model
{
    protected $table = 'enderecos_fornecedores';

    protected $fillable = [
        'cep', 'logradouro', 'numero',
        'complemento', 'bairro', 'ponto_referencia', 'uf',
        'cidade', 'is_condominio' ,'endereco_condominio', 'numero_condominio'
    ];

    public function getCidade(){
        return $this->belongsTo('App\Models\City', 'cidade');
    }

    public function getEstado(){
        return $this->belongsTo('App\Models\State', 'uf');
    }

}
