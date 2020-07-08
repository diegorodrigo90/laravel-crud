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
        Fornecedor::deleted(function($pessoa){
            //excluindo qualquer tipo de pessoa, ao excluir o fonecedor
            $model = $pessoa->pessoa_type;
            $obj = $model::find($pessoa->pessoa_id);
            $obj->delete();
        });
    }
}
