<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    protected $table = 'fornecedores';

    protected $fillable = [
        'pessoa_type', 'pessoa_id', 'is_active', 'observacao'
    ];

    public function pessoable()
    {
        return $this->morphTo();
    }

    public function endereco()
    {
        return $this->hasOne('App\Models\EnderecoFornecedor', 'fornecedor_id');
    }

    public function contatosPrincipais()
    {
        return $this->hasMany('App\Models\ContatoPrincipal')->orderBy('id', 'ASC');
    }

    public function pessoasContatos()
    {
        return $this->hasMany('App\Models\PessoaContato')->orderBy('id', 'ASC');
    }

    public function contatosAdicionais()
    {
        return $this->hasManyThrough('App\Models\ContatoAdicional', 'App\Models\PessoaContato');
    }
}
