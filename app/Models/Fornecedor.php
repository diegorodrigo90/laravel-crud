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

}
