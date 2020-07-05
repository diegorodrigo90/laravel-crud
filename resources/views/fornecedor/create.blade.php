@extends('adminlte::page')

@section('title', 'Fornecedores - Cadastrar')

@section('content_header')

<section class="content-header">
    <h1>Fornecedores <small> - Cadastrar</small></h1>
</section>
@stop

@section('content')

{{-- Importando formulario --}}
@include('fornecedor\forms\fornecedores')

@stop

@section('footer')
Laravel CRUD
@endsection
