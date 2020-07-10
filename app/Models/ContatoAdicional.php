<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContatoAdicional extends Model
{
    protected $table = 'contatos_adicionais';

    protected $fillable = [
        'pessoa_contato_id', 'qual_contato', 'contato', 'tipo',
    ];
}
