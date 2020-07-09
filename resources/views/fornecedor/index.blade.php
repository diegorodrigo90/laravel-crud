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
@stop

@section('content')

@if($errors->any())
@foreach ($errors->all() as $error)
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ $error }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endforeach
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
        <table id="fornecedoresTable" class="display col-12">
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

                @if ($fornecedor->pessoable_type == 'App\Models\PessoaJuridica')
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
                        <div class="row">
                            <a href="{{route('fornecedor.show', [$id =$fornecedor->id])}}">
                                <div type="button" class="btn btn-sm btn-success mx-1" data-toggle="tooltip"
                                    title="Visualizar"><i class="fa fa-eye"></i></div>
                            </a>
                            <a href="{{route('fornecedor.edit', [$id =$fornecedor->id])}}">
                                <div type="button" class="btn btn-sm btn-primary mx-1" data-toggle="tooltip"
                                    title="Editar"><i class="fa fa-edit"></i></div>
                            </a>

                            <div type="button" class="btn btn-sm btn-danger mx-1 mostra-modal-excluir"
                                data-id="{{$fornecedor->id}}" data-nome="{{ $fornecedor->pessoable->razao_social }}"
                                data-link="{{route('fornecedor.destroy', [$id = $fornecedor->id])}}"
                                data-toggle="tooltip" title="Excluir"><i class="fa fa-trash"></i></div>

                        </div>

                    </td>
                </tr>
                @endif

                @if ($fornecedor->pessoable_type == 'App\Models\PessoaFisica')
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
                        <div class="row">
                            <a href="{{route('fornecedor.show', [$id =$fornecedor->id])}}">
                                <div type="button" class="btn btn-sm btn-success mx-1" data-toggle="tooltip"
                                    title="Visualizar"><i class="fa fa-eye"></i></div>
                            </a>
                            <a href="{{route('fornecedor.edit', [$id =$fornecedor->id])}}">
                                <div type="button" class="btn btn-sm btn-primary mx-1" data-toggle="tooltip"
                                    title="Editar"><i class="fa fa-edit"></i></div>
                            </a>

                            <div type="button" class="btn btn-sm btn-danger mx-1 mostra-modal-excluir"
                                data-id="{{$fornecedor->id}}" data-nome="{{ $fornecedor->pessoable->nome }}"
                                data-link="{{route('fornecedor.destroy', [$id =$fornecedor->id])}}"
                                data-toggle="tooltip" title="Excluir"><i class="fa fa-trash"></i></div>

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

    <!-- Modal -->
    <div class="modal " id="modalExcluirFornecedor" tabindex="-1" role="dialog" aria-labelledby="modalExcluirFornecedor"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
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
                    <button class="btn btn-success" data-dismiss="modal">Cancelar</button>

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
    @section('js')
    {{-- <script src="{{ asset('/js/validate.rules.js')}}" defer></script> --}}

    <script src="{{ asset('/js/display.js')}}" defer></script>
    @stop
    <script>
        $(document).ready( function () {


    $('[data-toggle="tooltip"]').tooltip();


    $('#fornecedoresTable').DataTable(
        {
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
            }
        }
    );
} );
    </script>
    @stop
