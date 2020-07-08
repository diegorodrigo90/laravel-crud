<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoaContato extends Model
{
    protected $table = 'pessoas_contatos';

    protected $fillable = [
        'fornecedor_id', 'nome', 'empresa', 'cargo'
    ];

    public function contatos() {
        return $this->belongsTo('App\Models\ContatoAdicional', 'pessoa_id');
    }


}
