<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoaFisica extends Model
{
    protected $table = 'pessoas_fisicas';

    public function pessoa()
    {
        return $this->morphOne('App\Models\Fornecedor', 'pessoable');
    }

}
