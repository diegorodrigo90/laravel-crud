<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoaContato extends Model
{
    protected $table = 'pessoas_contatos';

    protected $fillable = [
        'fornecedor_id', 'contato_adicional_id', 'nome', 'empresa', 'cargo'
    ];
}
