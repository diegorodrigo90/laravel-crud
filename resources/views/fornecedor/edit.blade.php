@extends('adminlte::page')

@section('title', 'Fornecedores - Cadastrar')

@section('content_header')

<section class="content-header">
    <h1>Fornecedores <small> - Editar</small></h1>
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



<form role="form" method="POST" action="{{ route('fornecedor.index') }}" id="fornecedorForm">
    @csrf
    <div id="accordion" role="tablist" aria-multiselectable="true">
        <!-- Dados do fornecedor -->
        <div class="card card-secondary">
            <h5 class="card-header" role="tab">
                <a data-toggle="collapse" data-parent="#accordion" href="#dadosFornecedor" aria-expanded="true"
                    aria-controls="collapseOne" class="d-block">
                    <i class="fa fa-chevron-down float-right"></i> Dados do Fornecedor
                </a>
            </h5>
            <div id="dadosFornecedor" class="collapse show" role="tabpanel" aria-labelledby="dadosForncedor">
                <div class="card-body">
                    <div class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="radio" name="tipoPessoa" id="PessoaJuridicaRadio"
                            value="juridica" @isset($fornecedor->pessoable->cnpj) checked @endisset>
                        <label class="form-check-label" for="PessoaJuridicaRadio">Pessoa Jurídica</label>
                    </div>
                    <div class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="radio" name="tipoPessoa" id="PessoaFisicaRadio"
                            value="fisica" @isset($fornecedor->pessoable->cpf) checked @endisset>
                        <label class="form-check-label" for="PessoaFisicaRadio">Pessoa Física</label>
                    </div>

                    <div class="row">

                        <div class="col-md-3" id="div-cnpj" @isset($fornecedor->pessoable->cpf) style="display: none;"
                            @endisset>
                            <div class="form-group">
                                <label for="cnpj">CNPJ <sup style="color: red">•</sup></label>
                                <input type="tel" name="cnpj" value="{{ $fornecedor->pessoable->cnpj }}"
                                    class="form-control set-required" id="cnpj" required>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-cpf" @if($fornecedor->pessoable->cnpj) style="display: none;"
                            @endif >
                            <div class="form-group">
                                <label for="cpf">CPF <sup style="color: red;">•</sup></label>
                                <input pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" name="cpf"
                                    value="{{ $fornecedor->pessoable->cpf }}" type="text"
                                    class="form-control set-required" id="cpf" required>
                            </div>
                        </div>

                        <div class="col-md-6" id="div-nome" @if($fornecedor->pessoable->cnpj) style="display: none;"
                            @endif>
                            <div class="form-group">
                                <label for="nome">Nome <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control set-required"
                                    value="{{ $fornecedor->pessoable->nome }}" id="nome" name="nome" required>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-apelido" @if($fornecedor->pessoable->cnpj) style="display: none;"
                            @endif>
                            <div class="form-group">
                                <label for="apelido">Apelido</label>
                                <input type="text" class="form-control set-required"
                                    value="{{ $fornecedor->pessoable->apelido }}" id="apelido" name="apelido">
                            </div>
                        </div>

                        <div class="col-md-3" id="div-rg" @if($fornecedor->pessoable->cnpj) style="display: none;"
                            @endif>
                            <div class="form-group">
                                <label for="rg">RG <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control set-required"
                                    value="{{ $fornecedor->pessoable->rg }}" id="rg" name="rg">
                            </div>
                        </div>


                        <div class="col-md-6" id="div-razao-social" @isset($fornecedor->pessoable->cpf) style="display:
                            none;" @endisset>
                            <div class="form-group">
                                <label for="razaoSocial">Razão Social <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control set-required" id="razaoSocial"
                                    value="{{ $fornecedor->pessoable->razao_social }}" name="razaoSocial" required>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-nome-fantasia" @isset($fornecedor->pessoable->cpf) style="display:
                            none;" @endisset>
                            <div class="form-group">
                                <label for="nomeFantasia">Nome fantasia <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control set-required" id="nomeFantasia"
                                    value="{{ $fornecedor->pessoable->nome_fantasia }}" name="nomeFantasia" required>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-indicador-inscricao-estadual" @isset($fornecedor->pessoable->cpf)
                            style="display: none;" @endisset>
                            <div class="form-group">
                                <label for="indicadorInscricaoEstadual">Indicador de Inscrição Estadual<sup
                                        style="color: red">•</sup></label>
                                <select id="indicadorInscricaoEstadual" name="indicadorInscricaoEstadual"
                                    class="form-control set-required" required>
                                    <option @if($fornecedor->pessoable->cnpj == 'Contribuinte') selected @endif
                                        >Contribuinte</option>
                                    <option @if($fornecedor->pessoable->cnpj == 'Contribuinte Isento') selected
                                        @endif>Contribuinte Isento</option>
                                    <option @if($fornecedor->pessoable->cnpj == 'Não contribuinte') selected @endif>Não
                                        contribuinte</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-inscricao-estadual" @isset($fornecedor->pessoable->cpf)
                            style="display: none;" @endisset>
                            <div class="form-group">
                                <label for="inscricaoEstadual">Inscrição Estadual</label>
                                <input type="text" class="form-control set-required" id="inscricaoEstadual"
                                    value="{{ $fornecedor->pessoable->inscricao_estadual }}" name="inscricaoEstadual"
                                    disabled>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-inscricao-municipal" @isset($fornecedor->pessoable->cpf)
                            style="display: none;" @endisset>
                            <div class="form-group">
                                <label for="inscricaoMunicipal">Inscrição Municipal</label>
                                <input type="text" class="form-control set-required" id="inscricaoMunicipal"
                                    value="{{ $fornecedor->pessoable->inscricao_municipal }}" name="inscricaoMunicipal">
                            </div>
                        </div>


                        <div class="col-md-3" id="div-situacao-cnpj" @isset($fornecedor->pessoable->cpf) style="display:
                            none;" @endisset>
                            <div class="form-group">
                                <label for="situacaoCNPJ">Situação CNPJ</label>
                                <input type="text" class="form-control set-required" id="situacaoCNPJ"
                                    value="{{ $fornecedor->pessoable->situacao_cnpj }}" name="situacaoCNPJ" disabled>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-recolhimento" @isset($fornecedor->pessoable->cpf) style="display:
                            none;" @endisset>
                            <div class="form-group">
                                <label for="recolhimento">Recolhimento<sup style="color: red">•</sup></label>
                                <select id="recolhimento" name="recolhimento" class="form-control set-required"
                                    required>
                                    <option @if($fornecedor->pessoable->recolhimento == 'A recolher pelo prestador')
                                        selected @endif>A recolher pelo prestador</option>
                                    <option @if($fornecedor->pessoable->recolhimento == 'Retido pelo tomador') selected
                                        @endif>Retido pelo tomador</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3" id="div-ativo">
                            <div class="form-group">
                                <label for="ativo">Ativo<sup style="color: red">•</sup></label>
                                <select id="ativo" name="ativo" class="form-control set-required" required>
                                    <option @if($fornecedor->is_active) selected @endif>Sim</option>
                                    <option @if(!$fornecedor->is_active) selected @endif>Não</option>
                                </select>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <!-- /Dados do fornecedor -->

        <!-- Contato principal-->
        <div class="card card-secondary">
            <h5 class="card-header" role="tab">
                <a data-toggle="collapse" data-parent="#accordion" href="#contatoPrincipal" aria-expanded="true"
                    aria-controls="contatoPrincipal" class="d-block">
                    <i class="fa fa-chevron-down float-right"></i> Contato principal
                </a>
            </h5>
            <div id="contatoPrincipal" class="collapse show" role="tabpanel" aria-labelledby="contatoPrincipal">
                <div class="card-body">

                    <div class="contacts-field">
                        <div class="row">

                            <div class="col-md-6" id="telefoneContato">

                                <span class="telefone-field">
                                    <div class="telefone-principal row col-md6">
                                        <div class="form-group col-6">
                                            <label for="telefone">Telefone<sup style="color: red">•</sup></label>
                                            <input type="text" class="form-control telefone" name="telefone" required>
                                        </div>

                                        <div class="form-group  col-6">

                                            <label for="telefoneTipo">Tipo<sup style="color: red">•</sup></label>
                                            <div class="input-group">
                                                <select id="telefoneTipo" name="telefoneTipo"
                                                    class="form-control group-error" required>
                                                    <option selected disabled>Selecione</option>
                                                    <option>Residencial</option>
                                                    <option>Comercial</option>
                                                    <option>Celular</option>
                                                </select>
                                                <div class="input-group-append button-add" data-add="telefone"
                                                    data-append="telefonesAdicionais">
                                                    <div data-toggle="tooltip" title="Adicionar telefone"
                                                        class="ml-2 btn btn-sm btn-primary my-auto">
                                                        <i class="fa fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>

                                <div class="telefonesAdicionais"></div>

                            </div>

                            <div class="col-md-6" id="emailContato">

                                <span class="email-field">

                                    <div class="email-principal row">
                                        <div class="form-group col-6">
                                            <label for="email">E-mail<sup style="color: red">•</sup></label>
                                            <input type="text" class="form-control email" name="email" required>
                                        </div>

                                        <div class="form-group  col-6">

                                            <label for="emailTipo">Tipo<sup style="color: red;">•</sup></label>
                                            <div class="input-group">
                                                <select name="emailTipo" name="emailTipo"
                                                    class="form-control group-error" required>
                                                    <option selected disabled>Selecione</option>
                                                    <option>Pessoal</option>
                                                    <option>Comercial</option>
                                                    <option>Outro</option>
                                                </select>
                                                <div class="input-group-append button-add" data-add="email"
                                                    data-append="emailsAdicionais">
                                                    <div data-toggle="tooltip" title="Adicionar e-mail"
                                                        class="ml-2 btn btn-sm btn-primary my-auto">
                                                        <i class="fa fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </span>

                                <div class="emailsAdicionais"></div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- /Contato principal -->

        {{-- botão adicionar contato adicional --}}
        <div class="col-12 d-flex flex-row-reverse">
            <div class="form-group">
                <div id="addContact" data-toggle="tooltip" title="Novo contato adicional" class="btn btn-primary mt-3">
                    <i class="fa fa-plus"></i>
                </div>
            </div>
        </div>

        {{-- /botão adicionar contato adicional --}}

        <!-- sem contatos adicionais-->
        <div class="card card-secondary" id="sem-contato-adicional">
            <h5 class="card-header" role="tab">
                <a data-toggle="collapse" data-parent="#accordion" href="#contatosAdicionais" aria-expanded="true"
                    aria-controls="collapseTwo" class="d-block">
                    <i class="fa fa-chevron-down float-right"></i> Contatos adicionais
                </a>
            </h5>

            <div id="contatosAdicionais" class="collapse show" role="tabpanel" aria-labelledby="contatosAdicionais">

                <div class="card-body">

                    <div class="d-flex justify-content-center text-muted">NENHUM CONTATO ADICIONAL. </div>

                </div>
            </div>
        </div>
        <!-- /sem contatos adicionais -->

        <!-- Contatos adicionais-->
        <div id="contatos-adicional" style="display: none;">
            <div class="card card-secondary contatos-adicional">
                <h5 class="card-header" role="tab">
                    <a data-toggle="collapse" data-parent="#accordion" href="#contatosAdicionais" aria-expanded="true"
                        aria-controls="collapseTwo" class="d-block">
                        <i class="fa fa-chevron-down float-right"></i> Contato Adicional
                    </a>
                </h5>

                <div class="collapse show" role="tabpanel" aria-labelledby="contatosAdicionais">

                    <div class="card-body">

                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="contato-adicional[nome]">Nome</label>
                                    <input type="text" class="form-control set-required"
                                        name="contato-adicional[][nome]">
                                </div>
                            </div>

                            <div class="col-md-3" id="div-inscricao-municipal">
                                <div class="form-group">
                                    <label for="contato-adicional[empresa]">Empresa</label>
                                    <input type="text" class="form-control set-required"
                                        name="contato-adicional[][empresa]">
                                </div>
                            </div>

                            <div class="col-md-3" id="div-inscricao-minucipal">
                                <div class="form-group">
                                    <label for="contato-adicional[cargo]">Cargo</label>
                                    <input type="text" class="form-control set-required"
                                        name="contato-adicional[][cargo]">
                                </div>
                            </div>

                        </div>

                        <div id="contato-adicional-fields"></div>


                    </div>

                    <div class="card-footer">
                        <div class="btn btn-danger float-right remove-contact" data-toggle="tooltip"
                            title="Remover contato adicional" data-remove="contatos-adicional"><i
                                class="fa fa-trash"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Contatos adicionais -->

        <!-- Dados de endereço-->
        <div class="card card-secondary">
            <h5 class="card-header" role="tab">
                <a data-toggle="collapse" data-parent="#accordion" href="#dadosEndereco" aria-expanded="true"
                    aria-controls="collapseTwo" class="d-block">
                    <i class="fa fa-chevron-down float-right"></i> Dados de Endereço
                </a>
            </h5>
            <div id="dadosEndereco" class="collapse show" role="tabpanel" aria-labelledby="dadosEndereco">
                <div class="card-body">
                    <div class="row">

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cep">CEP<sup style="color: red">•</sup></label>
                                <input type="tel" class="form-control" id="cep" name="cep"
                                    value="{{ $fornecedor->endereco->cep }}" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="logradouro">Logradouro<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="logradouro" name="logradouro"
                                    value="{{ $fornecedor->endereco->logradouro }}" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="numero">Número<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="numero" name="numero"
                                    value="{{ $fornecedor->endereco->numero }}" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="complemento">Complemento</label>
                                <input type="text" class="form-control" id="complemento"
                                    value="{{ $fornecedor->endereco->complemento }}" name="complemento">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="bairro">Bairro<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="bairro" name="bairro"
                                    value="{{ $fornecedor->endereco->bairro }}" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="pontoReferencia">Ponto de referencia</label>
                                <input type="text" class="form-control" id="pontoReferencia"
                                    value="{{ $fornecedor->endereco->ponto_referencia }}" name="pontoReferencia">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group pl-1">
                                <label for="uf">UF<sup style="color: red">•</sup></label>
                                <select id="uf" name="uf" class="form-control" required>
                                    @foreach ($states as $state)
                                    <option value="{{ $state->id }}" @if($fornecedor->pessoable->uf == $state->id )
                                        selected @endif>{{ $state->letter }}</option>
                                    @endforeach

                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cidade">Cidade<sup style="color: red">•</sup></label>
                                <select id="cidade" name="cidade" class="form-control" required>
                                    @foreach ($cities as $city)
                                    <option value="{{ $city->id }}" @if($fornecedor->pessoable->cidade == $city->id )
                                        selected @endif>{{ $city->title }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="condominio">Condomínio?<sup style="color: red">•</sup></label>
                                <select id="isCondominio" name="isCondominio" class="form-control" required>
                                    <option @if($fornecedor->endereco->is_condomino) selected @endif value="sim">Sim
                                    </option>
                                    <option @if(!$fornecedor->endereco->is_condomino) selected @endif value="nao">Não
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3 enderecoCondominio" @if(!$fornecedor->endereco->is_condomino)
                            style="display: none;" @endif >
                            <div class="form-group">
                                <label for="enderecoCondominio">Endereço<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control set-required" id="enderecoCondominio"
                                    name="enderecoCondominio" @if(!$fornecedor->endereco->is_condomino) required @endif>
                            </div>
                        </div>

                        <div class="col-md-3 numeroCondominio" @if(!$fornecedor->endereco->is_condomino) style="display:
                            none;" @endif>
                            <div class="form-group">
                                <label for="numeroCondominio">Número<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control set-required" id="numeroCondominio"
                                    name="numeroCondominio" @if(!$fornecedor->endereco->is_condomino) required @endif>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <!-- /Dados de endereço -->

        <!-- Observação -->
        <div class="card card-secondary">
            <h5 class="card-header" role="tab">
                Observação
            </h5>
            <div id="observacao" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
                <div class="card-body">

                    <textarea name="observacao" id="observacao-div">{!! $fornecedor->observacao !!}</textarea>

                    {{-- <div id="observacao-div"></div> --}}


                </div>
            </div>
        </div>
        <!-- /Observação -->


    </div>

    <button type="submit" class="btn btn-success mt-3 mb-5">
        <i class="fa fa-save"></i> Atualizar
    </button>

    <div class="btn btn-danger mt-3 mb-5 mostra-modal-excluir">
        <i class="fa fa-trash"></i> Excluir
    </div>
</form>

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
                @if ($fornecedor->pessoable->cpf)
                Realmente deseja excluir o fornecedor <b>{{ $fornecedor->pessoable->nome }}</b> ?
                @endif
                @if ($fornecedor->pessoable->cnpj)
                Realmente deseja excluir o fornecedor <b>{{ $fornecedor->pessoable->razao_social }}</b> ?
                @endif

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-dismiss="modal">Cancelar</button>

                <form action="{{route('fornecedor.destroy', [$id =$fornecedor->id])}}" id="excluirFornecedor"
                    method="POST">
                    @method('delete')
                    @csrf
                    <button type="submit" id="linkExcluirFornecedor" class="btn btn-danger">Excluir</button>
                </form>

            </div>
        </div>
    </div>
</div>

@section('css')

@stop

@section('js')
<script src="{{ asset('/js/validate.rules.js')}}" defer></script>

<script src="{{ asset('/js/fornecedores.js')}}" defer></script>

<script>
    var cnpj = '{{empty($fornecedor->pessoable->cnpj)}}';
var cpf = '{{empty($fornecedor->pessoable->cpf)}}';



</script>

@stop


@stop

@section('footer')
Laravel CRUD
@endsection
