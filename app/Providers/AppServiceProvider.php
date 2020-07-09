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
        Fornecedor::deleting(function ($model) {
            $model->pessoable()->delete();
        });
    }
}
