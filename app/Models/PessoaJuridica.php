<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoaJuridica extends Model
{
    protected $table = 'pessoas_juridicas';

    protected $fillable = [
        'cnpj', 'razao_social', 'indicador_inscricao_estadual', 'inscricao_estadual', 'inscricao_municipal', 'recolhimento'
    ];

    public function pessoa()
    {
        return $this->morphOne('App\Models\Fornecedor', 'pessoable');
    }

}
