@extends('adminlte::page')

@section('title', 'Fornecedores - Visualizar')

@section('content_header')

<section class="content-header">
    <h1>Fornecedores <small> - Visualizar</small></h1>
</section>
@stop

@section('content')


<div id="accordion" role="tablist" aria-multiselectable="true">
    <!-- Dados do fornecedor -->
    <div class="card card-secondary">
        <h5 class="card-header" role="tab">
            <a data-toggle="collapse" data-parent="#accordion" href="#dadosFornecedor" aria-expanded="true"
                aria-controls="collapseOne" class="d-block">
                <i class="fa fa-chevron-down float-right"></i> Dados do Fornecedor
            </a>
        </h5>
        @if($fornecedor->pessoable->cpf)
        <div id="dadosFornecedor" class="collapse show" role="tabpanel" aria-labelledby="dadosForncedor">
            <div class="card-body">
                <div class="form-check form-check-inline mb-3">
                    <input disabled class="form-check-input" type="radio" name="tipoPessoa" id="PessoaJuridicaRadio"
                        value="juridica">
                    <label class="form-check-label" for="PessoaJuridicaRadio">Pessoa Jurídica</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input disabled class="form-check-input" type="radio" name="tipoPessoa" id="PessoaFisicaRadio"
                        value="fisica" checked>
                    <label class="form-check-label" for="PessoaFisicaRadio">Pessoa Física</label>
                </div>

                <div class="row">


                    <div class="col-md-3" id="div-cpf" style="display: none">
                        <div class="form-group">
                            <label for="cpf">CPF <sup style="color: red;">•</sup></label>
                            <input pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" name="cpf" type="text"
                                class="form-control set-required" id="cpf" value="{{ $fornecedor->pessoable->cpf }}"
                                disabled>
                        </div>
                    </div>

                    <div class="col-md-6" id="div-nome" style="display: none">
                        <div class="form-group">
                            <label for="nome">Nome <sup style="color: red">•</sup></label>
                            <input type="text" class="form-control set-required" id="nome" name="nome"
                                value="{{ $fornecedor->pessoable->nome }}" disabled>
                        </div>
                    </div>

                    <div class="col-md-3" id="div-apelido" style="display: none">
                        <div class="form-group">
                            <label for="apelido">Apelido</label>
                            <input type="text" class="form-control set-required" id="apelido" name="apelido"
                                value="{{ $fornecedor->pessoable->apelido }}" disabled>
                        </div>
                    </div>

                    <div class="col-md-3" id="div-rg" style="display: none">
                        <div class="form-group">
                            <label for="rg">RG <sup style="color: red">•</sup></label>
                            <input type="text" class="form-control set-required" id="rg" name="rg"
                                value="{{ $fornecedor->pessoable->rg }}" disabled>
                        </div>
                    </div>

                    @endif

                    @if($fornecedor->pessoable->cnpj)
                    <div id="dadosFornecedor" class="collapse show" role="tabpanel" aria-labelledby="dadosForncedor">
                        <div class="card-body">
                            <div class="form-check form-check-inline mb-3">
                                <input disabled class="form-check-input" type="radio" name="tipoPessoa"
                                    id="PessoaJuridicaRadio" value="juridica">
                                <label class="form-check-label" for="PessoaJuridicaRadio">Pessoa Jurídica</label>
                            </div>
                            <div class="form-check form-check-inline mb-3">
                                <input disabled checked class="form-check-input" type="radio" name="tipoPessoa"
                                    id="PessoaFisicaRadio" value="fisica">
                                <label class="form-check-label" for="PessoaFisicaRadio">Pessoa Física</label>
                            </div>

                            <div class="row">

                                <div class="col-md-3" id="div-cnpj">
                                    <div class="form-group">
                                        <label for="cnpj">CNPJ <sup style="color: red">•</sup></label>
                                        <input type="tel" value="{{$fornecedor->pessoable->cnpj}}" name="cnpj"
                                            class="form-control" id="cnpj" disabled>
                                    </div>
                                </div>

                                <div class="col-md-6" id="div-razao-social">
                                    <div class="form-group">
                                        <label for="razaoSocial">Razão Social <sup style="color: red">•</sup></label>
                                        <input type="text" value="{{$fornecedor->pessoable->razao_social}}"
                                            class="form-control set-required" id="razaoSocial" name="razaoSocial"
                                            disabled>
                                    </div>
                                </div>

                                <div class="col-md-3" id="div-nome-fantasia">
                                    <div class="form-group">
                                        <label for="nomeFantasia">Nome fantasia <sup style="color: red">•</sup></label>
                                        <input type="text" value="{{$fornecedor->pessoable->nome_fantasia}}"
                                            class="form-control set-required" id="nomeFantasia" name="nomeFantasia"
                                            disabled>
                                    </div>
                                </div>

                                <div class="col-md-3" id="div-indicador-inscricao-estadual">
                                    <div class="form-group">
                                        <label for="indicadorInscricaoEstadual">Indicador de Inscrição Estadual<sup
                                                style="color: red">•</sup></label>
                                        <select disabled id="indicadorInscricaoEstadual"
                                            name="indicadorInscricaoEstadual" class="form-control set-required"
                                            required>
                                            <option selected>{{ $fornecedor->pessoable->indicador_inscricao_estadual }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3" id="div-inscricao-estadual">
                                    <div class="form-group">
                                        <label for="inscricaoEstadual">Inscrição Estadual</label>
                                        <input type="text" class="form-control set-required"
                                            value="{{$fornecedor->pessoable->inscricao_estadual}}"
                                            id="inscricaoEstadual" name="inscricaoEstadual" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3" id="div-inscricao-municipal">
                                    <div class="form-group">
                                        <label for="inscricaoMunicipal">Inscrição Municipal</label>
                                        <input type="text" class="form-control set-required"
                                            value="{{$fornecedor->pessoable->inscricao_municipal}}"
                                            id="inscricaoMunicipal" name="inscricaoMunicipal" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3" id="div-situacao-cnpj">
                                    <div class="form-group">
                                        <label for="situacaoCNPJ">Situação CNPJ</label>
                                        <input type="text" class="form-control set-required"
                                            value="{{$fornecedor->pessoable->situacao_cnpj}}" id="situacaoCNPJ"
                                            name="situacaoCNPJ" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3" id="div-recolhimento">
                                    <div class="form-group">
                                        <label for="recolhimento">Recolhimento<sup style="color: red">•</sup></label>
                                        <select id="recolhimento" name="recolhimento" class="form-control set-required"
                                            disabled>
                                            <option selected>{{ $fornecedor->pessoable->recolhimento }}</option>
                                        </select>
                                    </div>
                                </div>


                                @endif

                                <div class="col-md-3" id="div-ativo">
                                    <div class="form-group">
                                        <label for="ativo">Ativo<sup style="color: red">•</sup></label>
                                        <select id="ativo" name="ativo" class="form-control set-required" disabled>>
                                            <option selected>{{ ($fornecedor->is_active) ? 'Sim' : 'Não' }}</option>

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
                                                    <label for="telefone">Telefone<sup
                                                            style="color: red">•</sup></label>
                                                    <input type="text" class="form-control telefone" name="telefone"
                                                        value="{{ $fornecedor->pessoable->telefone }}">
                                                </div>

                                                <div class="form-group  col-6">

                                                    <label for="telefoneTipo">Tipo<sup
                                                            style="color: red">•</sup></label>
                                                    <div class="input-form">
                                                        <select id="telefoneTipo" name="telefoneTipo"
                                                            class="form-control group-error" required>
                                                            <option selected disabled>Selecione</option>
                                                        </select>
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
                                                    <div class="input-form">
                                                        <select name="emailTipo" name="emailTipo"
                                                            class="form-control group-error" required>
                                                            <option selected disabled>Selecione</option>
                                                            <option>Pessoal</option>
                                                            <option>Comercial</option>
                                                            <option>Outro</option>
                                                        </select>
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
                        <div id="addContact" data-toggle="tooltip" title="Novo contato adicional"
                            class="btn btn-primary mt-3">
                            <i class="fa fa-plus"></i>
                        </div>
                    </div>
                </div>

                {{-- /botão adicionar contato adicional --}}

                <!-- sem contatos adicionais-->
                <div class="card card-secondary" id="sem-contato-adicional">
                    <h5 class="card-header" role="tab">
                        <a data-toggle="collapse" data-parent="#accordion" href="#contatosAdicionais"
                            aria-expanded="true" aria-controls="collapseTwo" class="d-block">
                            <i class="fa fa-chevron-down float-right"></i> Contatos adicionais
                        </a>
                    </h5>

                    <div id="contatosAdicionais" class="collapse show" role="tabpanel"
                        aria-labelledby="contatosAdicionais">

                        <div class="card-body">

                            <div class="d-flex justify-content-center text-muted">NENHUM CONTATO ADICIONAL. </div>

                        </div>
                    </div>
                </div>
                <!-- /sem contatos adicionais -->

                <!-- Contatos adicionais-->
                <div id="contatos-adicional" style="display: none">
                    <div class="card card-secondary contatos-adicional">
                        <h5 class="card-header" role="tab">
                            <a data-toggle="collapse" data-parent="#accordion" href="#contatosAdicionais"
                                aria-expanded="true" aria-controls="collapseTwo" class="d-block">
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

                                    <div class="col-md-3" id="div-inscricao-minucipal">
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
                                            value="{{$fornecedor->endereco->cep}}" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="logradouro">Logradouro<sup style="color: red">•</sup></label>
                                        <input type="text" class="form-control" id="logradouro" name="logradouro"
                                            value="{{$fornecedor->endereco->logradouro}}" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="numero">Número<sup style="color: red">•</sup></label>
                                        <input type="text" class="form-control" id="numero" name="numero"
                                            value="{{$fornecedor->endereco->numero}}" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="complemento">Complemento</label>
                                        <input type="text" class="form-control" id="complemento" name="complemento"
                                            value="{{$fornecedor->endereco->complemento}}" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="bairro">Bairro<sup style="color: red">•</sup></label>
                                        <input type="text" class="form-control" id="bairro" name="bairro"
                                            value="{{$fornecedor->endereco->bairro}}" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="pontoReferencia">Ponto de referencia</label>
                                        <input type="text" class="form-control" id="pontoReferencia"
                                            name="pontoReferencia" value="{{$fornecedor->endereco->ponto_referencia}}"
                                            disabled>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group pl-1">
                                        <label for="uf">UF<sup style="color: red">•</sup></label>
                                        <select id="uf" name="uf" class="form-control" disabled>
                                            <option>{{ $fornecedor->endereco->getEstado->title }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="cidade">Cidade<sup style="color: red">•</sup></label>
                                        <select id="cidade" name="cidade" class="form-control" disabled>
                                            <option>{{ $fornecedor->endereco->getCidade->title }}</option>
                                        </select>
                                    </div>
                                </div>


                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="condominio">Condomínio?<sup style="color: red">•</sup></label>
                                        <select id="isCondominio" name="isCondominio" class="form-control" disabled>
                                            <option>{{ ($fornecedor->endereco->is_condominio) ? 'Sim' : 'Não' }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                @if ($fornecedor->endereco->is_condominio)
                                <div class="col-md-3 enderecoCondominio">
                                    <div class="form-group">
                                        <label for="enderecoCondominio">Endereço<sup style="color: red">•</sup></label>
                                        <input type="text" class="form-control set-required" id="enderecoCondominio"
                                            name="enderecoCondominio"
                                            value="{{$fornecedor->endereco->endereco_condominio}}" disabled>
                                    </div>
                                </div>

                                <div class="col-md-3 numeroCondominio">
                                    <div class="form-group">
                                        <label for="numeroCondominio">Número<sup style="color: red">•</sup></label>
                                        <input type="text" class="form-control set-required" id="numeroCondominio"
                                            name="numeroCondominio" value="{{$fornecedor->endereco->numero_condominio}}"
                                            disabled>
                                    </div>
                                </div>

                                @endif


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

                            <div name="observacao" id="observacao-div" disabled>{!! $fornecedor->observacao !!}</div>

                            {{-- <div id="observacao-div"></div> --}}


                        </div>
                    </div>
                </div>
                <!-- /Observação -->


            </div>
            <a href="{{ route('fornecedor.edit', [$id = $fornecedor->id])}}">
                <div type="submit" class="btn btn-primary mt-3 mb-5">
                    <i class="fa fa-edit"></i> Editar
                </div>
            </a>
            @section('css')

            @stop

            @section('js')
            <script src="{{ asset('/js/validate.rules.js')}}" defer></script>
            <script src="{{ asset('/js/fornecedores.js')}}" defer></script>

            <script>
                $("#observacao").summernote("disable")
      $(".note-toolbar").remove(); //remove a barra de edição

            </script>

            @stop


            @stop

            @section('footer')
            Laravel CRUD
            @endsection