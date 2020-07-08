<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContatoPrincipal extends Model
{
    protected $table = 'contatos_principais';

    protected $fillable = [
        'fornecedor_id', 'qual_contato', 'contato', 'tipo',
    ];

}
