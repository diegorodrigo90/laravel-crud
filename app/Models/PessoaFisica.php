<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoaFisica extends Model
{
    protected $table = 'pessoas_fisicas';

    protected $fillable = [
        'cpf', 'nome', 'apelido', 'rg'
    ];

    public function pessoa()
    {
        return $this->morphOne('App\Models\Fornecedor', 'pessoable');
    }

    public function contatos() {
        return $this->belongsTo('App\Models\ContatoPrincipal', 'fornecedor_id');
    }

    public function contatosAdicionais() {
        return $this->belongsTo('App\Models\PessoaContato', 'fornecedor_id');
    }

}
