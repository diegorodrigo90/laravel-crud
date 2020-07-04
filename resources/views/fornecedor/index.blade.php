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
                {{-- <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                </tr> --}}
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

    @stop

    @section('css')
    @stop

    @section('js')
    <script>
        $(document).ready( function () {
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
