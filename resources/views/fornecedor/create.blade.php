@extends('adminlte::page')

@section('title', 'Fornecedores - Cadastrar')

@section('content_header')

<section class="content-header">
    <h1>Fornecedores <small> - Cadastrar</small></h1>
</section>
@stop

@section('content')


<form role="form" id="fornecedorForm">
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
                            value="juridica" checked>
                        <label class="form-check-label" for="PessoaJuridicaRadio">Pessoa Jurídica</label>
                    </div>
                    <div class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="radio" name="tipoPessoa" id="PessoaFisicaRadio"
                            value="fisica">
                        <label class="form-check-label" for="PessoaFisicaRadio">Pessoa Física</label>
                    </div>


                    <div id="formPessoaJuridica" class="row">

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cnpj">CNPJ <sup style="color: red">•</sup></label>
                                <input type="tel" name="cnpj" class="form-control" id="cnpj" required>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="razaoSocial">Razão Social <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="nomeFantasia">Nome fantasia <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="indicadorInscricaoEstadual">Indicador de Inscrição Estadual<sup
                                        style="color: red">•</sup></label>
                                <select id="indicadorInscricaoEstadual" name="indicadorInscricaoEstadual" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>Contribuinte</option>
                                    <option>Contribuinte Isento</option>
                                    <option>Não contribuinte</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="inscricaoEstadual">Inscrição Estadual</label>
                                <input type="text" class="form-control" id="inscricaoEstadual" name="inscricaoEstadual" disabled>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="inscricaoMunicipal">Inscrição Municipal</label>
                                <input type="text" class="form-control" id="inscricaoMunicipal" name="inscricaoMunicipal">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="situacaoCNPJ">Situação CNPJ</label>
                                <input type="text" class="form-control" id="situacaoCNPJ" name="situacaoCNPJ" disabled>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="recolhimento">Recolhimento<sup style="color: red">•</sup></label>
                                <select id="recolhimento" name="recolhimento" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>A recolher pelo prestador</option>
                                    <option>Retido pelo tomador</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="ativo">Ativo<sup style="color: red">•</sup></label>
                                <select id="recolhimento" name="recolhimento" class="form-control" required>
                                    <option disabled>Selecione</option>
                                    <option selected>Sim</option>
                                    <option>Não</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div id="formPessoaFisica" class="row d-none">

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cpf">CPF <sup style="color: red">•</sup></label>
                                <input pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" name="cpf" type="text" class="form-control" id="cpf" required>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="nome">Nome <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="nome" name="nome" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="apelido">Apelido</label>
                                <input type="text" class="form-control" id="apelido" name="apelido">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="rg">RG <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="rg" name="rg">
                            </div>
                        </div>



                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="ativo">Ativo<sup style="color: red">•</sup></label>
                                <select id="recolhimento" class="form-control" required>
                                    <option disabled>Selecione</option>
                                    <option selected>Sim</option>
                                    <option>Não</option>
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


                    <div class="row">

                        <div class="col-md-6 row" id="telefoneContato">
                            <div class="form-group col-6">
                                <label for="telefone">Telefone<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control telefone" id="telefone" name="telefone" required>
                            </div>


                            <div class="form-group  col-6">

                                <label for="telefoneTipo">Tipo<sup style="color: red">•</sup></label>
                                <div class="input-group">
                                    <select id="telefoneTipo" class="form-control" required>
                                        <option selected disabled>Selecione</option>
                                        <option>Residencial</option>
                                        <option>Comercial</option>
                                        <option>Celular</option>
                                    </select>
                                    <div class="input-group-append">
                                        <div id="addTelefone" data-toggle="tooltip" title="Adicionar telefone"
                                            class="ml-2 btn btn-sm btn-primary my-auto">
                                            <i class="fa fa-plus"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-6 row ml-1" id="emailContato" style="border-left: 1px solid #c3c3c3;">
                            <div class="form-group col-6">
                                <label for="email">E-mail<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="email" name="email" required>
                            </div>


                            <div class="form-group  col-6">

                                <label for="emailTipo">Tipo<sup style="color: red;">•</sup></label>
                                <div class="input-group">
                                    <select id="emailTipo" class="form-control" required>
                                        <option selected disabled>Selecione</option>
                                        <option>Pessoal</option>
                                        <option>Comercial</option>
                                        <option>Outro</option>
                                    </select>
                                    <div class="input-group-append">
                                        <div id="addEmail" data-toggle="tooltip" title="Adicionar e-mail"
                                            class="ml-2 btn btn-sm btn-primary my-auto">
                                            <i class="fa fa-plus"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>




                </div>
            </div>
        </div>
        <!-- /Contato principal -->

        <!-- Contatos adicionais-->
        <div class="card card-secondary">
            <h5 class="card-header" role="tab">
                <a data-toggle="collapse" data-parent="#accordion" href="#contatosAdicionais" aria-expanded="true"
                    aria-controls="collapseTwo" class="d-block">
                    <i class="fa fa-chevron-down float-right"></i> Contatos adicionais
                </a>
            </h5>
            <div id="contatosAdicionais" class="collapse show" role="tabpanel" aria-labelledby="contatosAdicionais">

                <div class="form-group float-right mr-3">
                    <div id="addContact" data-toggle="tooltip" title="Adicionar contato" class="btn btn-primary mt-3">
                        <i class="fa fa-plus"></i>
                    </div>
                </div>
                <div class="card-body">


                    <div class="d-flex justify-content-center text-muted">NÃO HÁ CONTATOS ADICIONAIS. </div>


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
                                <input type="tel" class="form-control" id="cep" name="cep" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="logradouro">Logradouro<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="logradouro" name="logradouro" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="numero">Número<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="numero" name="numero" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="complemento">Complemento</label>
                                <input type="text" class="form-control" id="complemento" name="complemento">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="bairro">Bairro<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="bairro" name="bairro" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="pontoReferencia">Ponto de referencia</label>
                                <input type="text" class="form-control" id="pontoReferencia" name="pontoReferencia">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group pl-1">
                                <label for="uf">UF<sup style="color: red">•</sup></label>
                                <select id="uf" name="uf" class="form-control" required>
                                    <option selected disabled>Selecione</option>

                                    @foreach ($states as $state)
                                    <option value="{{ $state->id }}">{{ $state->letter }} - {{ $state->title }}</option>
                                    @endforeach

                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cidade">Cidade<sup style="color: red">•</sup></label>
                                <select id="cidade" name="cidade" class="form-control" required disabled>
                                    <option selected disabled>Selecione</option>
                                    <option>Pessoal</option>
                                    <option>Comercial</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="condominio">Condomínio?<sup style="color: red">•</sup></label>
                                <select id="isCondominio" name="isCondominio" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option value="sim">Sim</option>
                                    <option value="nao">Não</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3 enderecoCondominio d-none">
                            <div class="form-group">
                                <label for="enderecoCondominio">Endereço<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="enderecoCondominio" name="enderecoCondominio" required>
                            </div>
                        </div>

                        <div class="col-md-3 numeroCondominio d-none">
                            <div class="form-group">
                                <label for="numeroCondominio">Número<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="numeroCondominio" name="numeroCondominio" required>
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
                <a data-toggle="collapse" data-parent="#accordion" href="#observacao" aria-expanded="true"
                    aria-controls="collapseOne" class="d-block">
                    <i class="fa fa-chevron-down float-right"></i> Observação
                </a>
            </h5>
            <div id="observacao" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
                <div class="card-body">

                    <div id="observacao" name="observacao">
                        <p>Editar nota</p>
                    </div>



                </div>
            </div>
        </div>
        <!-- /Observação -->



    </div>

    <button type="submit" class="btn btn-success mt-3 mb-5">
        <i class="fa fa-save"></i> Cadastrar
    </button>
</form>



@stop

@section('css')

@stop

@section('js')
<script src="{{ asset('/js/validate.rules.js')}}" defer></script>

<script src="{{ asset('/js/fornecedores.js')}}" defer></script>
<script>
    $(document).ready(function() {

        $('#observacao').summernote({
            lang: 'pt-BR',
            height: '300',
            toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link']],
            ]
        });

    $('#uf').select2();
    $('#cidade').select2();

   $('[data-toggle="tooltip"]').tooltip()


    });
</script>

@stop
