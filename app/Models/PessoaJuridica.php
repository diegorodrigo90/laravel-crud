<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoaJuridica extends Model
{
    protected $table = 'pessoas_juridicas';

    public function pessoa()
    {
        return $this->morphOne('App\Models\Fornecedor', 'pessoable');
    }

}
