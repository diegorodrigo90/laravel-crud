@extends('adminlte::page')

@section('title', 'Dashboard')

@section('content_header')
<section class="content-header">
    <h1>Fornecedores <small> - Cadastrar</small></h1>
</section>
@stop

@section('content')

<form role="form">
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

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="tipoPessoa" id="PessoaJuridicaRadio"
                            value="juridica" checked>
                        <label class="form-check-label" for="PessoaJuridicaRadio">Pessoa Jurídica</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="tipoPessoa" id="PessoaFisicaRadio"
                            value="fisica">
                        <label class="form-check-label" for="PessoaFisicaRadio">Pessoa Física</label>
                    </div>

                    <div id="formDadosFornecedor" class="row">

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="CNPJ">CNPJ <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="CNPJ" required>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="razaoSocial">Razão Social <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="razaoSocial" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="nomeFantasia">Nome fantasia <sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="nomeFantasia" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="indicadorInscricaoEstadual">Indicador de Inscrição Estadual<sup style="color: red">•</sup></label>
                                    <select id="indicadorInscricaoEstadual" class="form-control" required>
                                        <option selected disabled>Selecione</option>
                                        <option>Contribuinte</option>
                                        <option>Contribuinte Isento</option>
                                        <option>Não contribuinte</option>
                                    </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="inscricaoEstadual">Inscrição Estadual<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="inscricaoEstadual" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="inscricaoMunicipal">Inscrição Municipal<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="inscricaoMunicipal" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="situacaoCNPJ">Situação CNPJ<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="situacaoCNPJ" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="recolhimento">Recolhimento<sup style="color: red">•</sup></label>
                                <select id="recolhimento" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>A recolher pelo prestador</option>
                                    <option>Retido pelo tomador</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="ativo">Ativo<sup style="color: red">•</sup></label>
                                <select id="recolhimento" class="form-control" required>
                                    <option  disabled>Selecione</option>
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

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="telefone">Telefone<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="telefone" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="telefoneTipo">Tipo<sup style="color: red">•</sup></label>
                                <select id="telefoneTipo" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>Residencial</option>
                                    <option>Comercial</option>
                                    <option>Celular</option>
                                </select>
                            </div>
                            <div class="form-group float-right">
                                <a href="#" class="link">Adicionar</a>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="email">E-mail<sup style="color: red">•</sup></label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="emailTipo">Tipo<sup style="color: red">•</sup></label>
                                <select id="emailTipo" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>Pessoal</option>
                                    <option>Comercial</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                            <div class="form-group float-right">
                                <a href="#" class="link">Adicionar</a>
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
                <div class="card-body">

                    <div class="form-group float-right">
                        <a href="#" class="link">Adicionar</a>
                    </div>

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
                                <input type="text" class="form-control" id="cep" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="logradouro">Logradouro<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="logradouro" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="numero">Número<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="numero" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="complemento">Complemento</label>
                                <input type="text" class="form-control" id="complemento">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="bairro">Bairro<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="bairro" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="pontoReferencia">Ponto de referencia</label>
                                <input type="text" class="form-control" id="pontoReferencia">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="uf">UF<sup style="color: red">•</sup></label>
                                <select id="uf" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>Pessoal</option>
                                    <option>Comercial</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cidade">Cidade<sup style="color: red">•</sup></label>
                                <select id="cidade" class="form-control" required disabled>
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
                                <select id="cidade" class="form-control" required>
                                    <option selected disabled>Selecione</option>
                                    <option>Sim</option>
                                    <option>Não</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="enderecoCondominio">Endereço<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="enderecoCondominio" required>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="numeroCondominio">Número<sup style="color: red">•</sup></label>
                                <input type="text" class="form-control" id="numeroCondominio" required>
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

                    <div id="summernote">
                        <p>Editar nota</p>
                    </div>



                </div>
            </div>
        </div>
        <!-- /Observação -->



    </div>

    <button type="submit" class="btn btn-success mt-3">
        <i class="fa fa-save"></i> Salvar
    </button>
</form>



@stop

@section('css')

@stop

@section('js')
<script>
    $(document).ready(function() {

        $('#summernote').summernote({
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



    });
</script>

@stop
