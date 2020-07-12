@extends('adminlte::page')

@section('title', 'Fornecedores - Painel de controle')

@section('content_header')
<section class="content-header">
    <h1>Fornecedores <small> - Painel de Controle</small></h1>
    <div class="d-flex flex-row-reverse">
        <div>
            <a href="{{ route('fornecedor.create') }}">
                <button class="btn btn-block btn-success">
                    <i class="fa fa-plus fa-fw"></i> Cadastrar
                </button>
            </a>
        </div>
    </div>
</section>

@section('content')

@if($errors->any())
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    @foreach ($errors->all() as $error)
    {{ $error }} <br />
    @endforeach
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif

@if(session('success'))
<div class="alert alert-success alert-dismissible fade show" role="alert">
    {{session('success')}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif

<?php

function formatCnpjCpf($value)
{
    $cnpj_cpf = preg_replace("/\D/", '', $value);

    if (strlen($cnpj_cpf) === 11) {
        return preg_replace("/(\d{3})(\d{3})(\d{3})(\d{2})/", "\$1.\$2.\$3-\$4", $cnpj_cpf);
    }

    return preg_replace("/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/", "\$1.\$2.\$3/\$4-\$5", $cnpj_cpf);
}

?>

<div class="card">
    <div class="card-body">
        <table id="fornecedoresTable" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Razão Social/ Nome</th>
                    <th>Nome Fantasia/Apelido</th>
                    <th>CNPJ/CPF</th>
                    <th>Ativo</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>

                @foreach ($fornecedores as $fornecedor)

                @if ($fornecedor->pessoable->cnpj)
                <tr>
                    <td>{{ $fornecedor->pessoable->razao_social }}</td>
                    <td>{{ $fornecedor->pessoable->nome_fantasia }}</td>
                    <td>{{ formatCnpjCpf($fornecedor->pessoable->cnpj) }}</td>
                    @if ($fornecedor->is_active)
                    <td> <span class="badge badge-success">Ativo</span> </td>
                    @else
                    <td> <span class="badge badge-danger">Inativo</span> </td>
                    @endif
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ação
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="{{route('fornecedor.show', [$id =$fornecedor->id])}}"><i
                                        class="fa fa-eye"></i> Visualizar</a>
                                <a class="dropdown-item" href="{{route('fornecedor.edit', [$id =$fornecedor->id])}}"><i
                                        class="fa fa-edit"></i> Editar</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item mostra-modal-excluir" data-id="{{$fornecedor->id}}"
                                    data-nome="{{ $fornecedor->pessoable->razao_social }}"
                                    data-link="{{route('fornecedor.destroy', [$id = $fornecedor->id])}}" href="#"><i
                                        class="fa fa-trash"></i> Excluir</a>
                            </div>
                        </div>

                    </td>
                </tr>
                @endif

                @if ($fornecedor->pessoable->cpf)
                <tr>
                    <td>{{ $fornecedor->pessoable->nome }}</td>
                    <td>{{ $fornecedor->pessoable->apelido }}</td>
                    <td>{{ formatCnpjCpf($fornecedor->pessoable->cpf) }}</td>
                    @if ($fornecedor->is_active)
                    <td> <span class="badge badge-success">Ativo</span> </td>
                    @else
                    <td><span class="badge badge-danger">Inativo</span></td>
                    @endif
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ação
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="{{route('fornecedor.show', [$id =$fornecedor->id])}}"><i
                                        class="fa fa-eye"></i> Visualizar</a>
                                <a class="dropdown-item" href="{{route('fornecedor.edit', [$id =$fornecedor->id])}}"><i
                                        class="fa fa-edit"></i> Editar</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item mostra-modal-excluir" data-id="{{$fornecedor->id}}"
                                    data-nome="{{ $fornecedor->pessoable->nome }}"
                                    data-link="{{route('fornecedor.destroy', [$id = $fornecedor->id])}}" href="#"><i
                                        class="fa fa-trash"></i> Excluir</a>
                            </div>
                        </div>

                    </td>
                </tr>
                @endif

                @endforeach


            </tbody>
            <tfoot>
                <tr>
                    <th>Razão Social/ Nome</th>
                    <th>Nome Fantasia/Apelido</th>
                    <th>CNPJ/CPF</th>
                    <th>Ativo</th>
                    <th>Ação</th>
                </tr>
            </tfoot>
        </table>
        <!-- /.card-body -->
    </div>
</div>

<!-- Modal -->
<div class="modal " id="modalExcluirFornecedor" tabindex="-1" role="dialog" aria-labelledby="modalExcluirFornecedor"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><b>Excluir fornecedor?</b></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Realmente deseja excluir o fornecedor <span id="fornecedorNome"></span>?

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-dismiss="modal">Cancelar</button>

                <form action="#" id="excluirFornecedor" method="POST">
                    @method('delete')
                    @csrf
                    <button type="submit" id="linkExcluirFornecedor" class="btn btn-danger">Excluir</button>
                </form>

            </div>
        </div>
    </div>
</div>


@stop

@section('css')
@stop

@section('js')

<script src="{{ asset('/js/display.js')}}" defer></script>
@stop


@stop
