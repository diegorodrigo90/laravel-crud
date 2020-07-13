<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

# Projeto Prático de Laravel - CRUD

> Projeto utilizando polimorfismo realizando cadastro de fornecedores, tanto pessoas físicas ou juríricas, com campos de contatos adicionados dinamicamente.

Feito com Laravel 7

## Baixar o projeto
Primeiro passo, clonar o projeto:
``` bash
# Clonar
git clone https://github.com/diegorodrigo90/laravel-crud.git

# Acessar
cd laravel-crud
```

## Configuração - Backend

``` bash
# Instalar dependências do projeto
composer install

# Configurar variáveis de ambiente
cp .env.example .env

# Criar migrations (tabelas e Seeders)
php artisan migrate --seed

# Criar link simbólico storage/app/public para public/storage/
php artisan storage:link
```

## Login
O usuário de teste é:
```
email:   user@vercan.com.br
password: password
```

## Configuração - Frontend
``` bash
# Atualizar dependências
yarn
ou
npm install

# Rodar em ambiente local localhost:8080
yarn dev
ou
npm install

# Rodar em ambiente de desenvolvimento
yarn watch
ou
npm run watch

# Rodar em ambiente de produção
yarn build
ou
npm run build
