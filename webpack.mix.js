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

var options = {
    enforce: 'pre',
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
        fix: true,
        cache: false,
    }
};

mix.js('resources/js/display.js', 'public/js').eslint(options)
    .js('resources/js/fornecedores.js', 'public/js').eslint(options)
    .js('resources/js/validate.rules.js', 'public/js').eslint(options)
    .sass('resources/sass/app.scss', 'public/css')
    .browserSync('localhost:8000');
