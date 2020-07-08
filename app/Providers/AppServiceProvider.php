<?php

namespace App\Providers;

use App\Models\Fornecedor;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fornecedor::deleted(function($fornecedor){
            //excluindo qualquer tipo de pessoa, ao excluir o fonecedor
            $model = $fornecedor->pessoa_type;
            $obj = $model::find($fornecedor->pessoa_id);
            $obj->delete();
        });
    }
}
