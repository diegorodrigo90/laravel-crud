const mix = require('laravel-mix');
require('laravel-mix-eslint-config');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.js('resources/js/display.js', 'public/js').eslint()
    .js('resources/js/fornecedores.js', 'public/js').eslint()
    .js('resources/js/validate.rules.js', 'public/js').eslint()
    .sass('resources/sass/app.scss', 'public/css');
