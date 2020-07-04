var url = document.getElementById("url").textContent;
var uid = 0;
var contatosAdicionais = 0;

$(document).ready(function () {

    //limpando caracteres não numericos de uma variavel
    var removeNonNumericsCaracters = function (value) {
        return value.replace(/\D/g, '');
    }

    var resetFormErrors = function () {
        $("#fornecedorForm").data('validator').resetForm();
    }

    var setFieldDisplay = {
        show: function (element, isRequired) {
            resetFormErrors();
            let input = $(element + ' > div > .set-required');

            $(element).removeClass('d-none');
            $(element).show( "slow" );
            if (isRequired) {
                input.prop('required', true);
            }

        },
        hide: function (element) {
            resetFormErrors();

            let input = $(element + ' > div > .set-required');

            $(element).hide();
            input.prop('required', false);
            input.val('');

        }
    }


    const pessoaFisicaElements = [

        {
            field: '#div-cpf',
            required: true
        },
        {
            field: '#div-nome',
            required: true
        },
        {
            field: '#div-apelido',
            required: false
        },
        {
            field: '#div-rg',
            required: true
        },

    ];

    const pessoaJuridicaElements = [

        {
            field: '#div-cnpj',
            required: true
        },
        {
            field: '#div-razao-social',
            required: true
        },
        {
            field: '#div-nome-fantasia',
            required: true
        },
        {
            field: '#div-indicador-inscricao-estadual',
            required: true
        },
        {
            field: '#div-inscricao-estadual',
            required: false
        },
        {
            field: '#div-inscricao-municipal',
            required: false
        },
        {
            field: '#div-situacao-cnpj',
            required: false
        },
        {
            field: '#div-recolhimento',
            required: true
        },

    ];


    const cangePessoaTipo = {

        display: {

            juridica: function () {

                $(pessoaFisicaElements).each(function (index) {
                    setFieldDisplay.hide(this.field);
                });

                $(pessoaJuridicaElements).each(function (index) {
                    setFieldDisplay.show(this.field, this.required);
                });

            },

            fisica: function () {
                $(pessoaJuridicaElements).each(function (index) {
                    setFieldDisplay.hide(this.field);

                });

                $(pessoaFisicaElements).each(function (index) {
                    setFieldDisplay.show(this.field, this.required);
                });



            }
        }
    };

    //verificando cnpj no receita ws
    var receitaWS = function (cnpj) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: "https://www.receitaws.com.br/v1/cnpj/" + removeNonNumericsCaracters(cnpj), //Url da Action Aqui
            success: function (data) {
                $("#razaoSocial").val(data.nome);
                $("#nomeFantasia").val(data.fantasia);
                $("#situacaoCNPJ").val(data.situacao);
                $("#cep").val(data.cep.replace(".", "")).trigger('change');

            }
        });
    };


    //pegando cidades do estado
    var getCities = async function (state, city) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: url + "/api/v1/cidades/" + state, //Url da Action Aqui
            success: function (data) {

                $("#cidade").empty().trigger('change') //limpando select2 antes de adicionar cidades
                $('#cidade').prepend('<option disabled>Selecione</option>'); //adicionando oção padrão
                $('#cidade').val("Selecione").trigger('change'); //selecionado

                $(data).each(function (index) {
                    if (city) {
                        let selected = (this.title == city) ? true : false;
                        var option = new Option(this.title, this.id, selected, selected);
                    } else {
                        var option = new Option(this.title, this.id, false, false);
                    }
                    $('#cidade').append(option);
                });

                $('#cidade').prop("disabled", false); //ativando select

            }
        });


    };

    var viaCep = function (cep) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: "https://viacep.com.br/ws/" + removeNonNumericsCaracters(cep) + "/json", //Url da Action Aqui
            success: function (data) {
                $('#logradouro').val(data.logradouro);
                $('#complemento').val(data.complemento);
                $('#bairro').val(data.bairro);

                $('#uf').val(data.uf).trigger('change.select2');
                getCities(data.uf, data.localidade);

            }
        });
    };

    //aplicando mascaras
    $('#cnpj').mask('99.999.999/9999-99');
    $('#cep').mask('99999-999');

    $('#cnpj').on('change keyup', function () {
        console.log('teste');
        if ($(this).valid()) {
            receitaWS($(this).val());
        }
    });

    $('#uf').change(function () {
        getCities($(this).val());
    });

    $('#cep').on('change keyup', function () {
        if ($(this).valid()) {
            viaCep($(this).val());
        }
    });


    $("#fornecedorForm").validate({
        errorClass: 'is-invalid error',
        validClass: 'is-valid',
        errorElement: 'div',
        //debug: true, //retira essa linha, para o form voltar a funcionar
        rules: {
            "cpf": {
                cpf: 'both' //valida tanto Formatação como os Digitos
                //caso não queira validar a formatação use => cpf: 'valid’
                //caso só queira validar a formatação use => cpf: 'format’
            },
            "cnpj": {
                cnpj: 'both' //valida tanto Formatação como os Digitos
            },

            "telefone": {
                telefone_celular: true
            },
            "email": {
                required: true,
                email: true
            },
            "cep": {
                cep: true
            }
        }
    });

    //adiconar email/telefone
    $('.button-add').on('click', function () {


        if ($(this).attr("data-add") == 'telefone') {
            uid = uid+ 1;

            let telefoneField = $(".telefone-field").html(); //pegando html da div telefone

            //e modificando classes necessários
            telefoneField = telefoneField.replace('telefone-principal' , 'telefone-adicional' + uid);
            telefoneField = telefoneField.replace('button-add' , 'button-del');
            telefoneField = telefoneField.replace('data-add="telefone"' , 'data-del="telefone-adicional'+ uid +'"');
            telefoneField = telefoneField.replace('btn-primary' , 'btn-danger');
            telefoneField = telefoneField.replace('fa fa-plus' , 'fa fa-minus');
            telefoneField = telefoneField.replace('Adicionar telefone' , 'Remover telefone');

            $(".telefonesAdicionais").append(telefoneField);

        } else if ($(this).attr("data-add") == 'email') {
            uid = uid+ 1;
            let emailField = $(".telefone-field").html(); //pegando html da div telefone

            //e modificando classes necessários
            emailField = emailField.replace('email-principal' , 'email-adicional' + uid);
            emailField = emailField.replace('button-add' , 'button-del');
            emailField = emailField.replace('data-add="email"' , 'data-del="email-adicional'+ uid +'"');
            emailField = emailField.replace('btn-primary' , 'btn-danger');
            emailField = emailField.replace('fa fa-plus' , 'fa fa-minus');
            emailField = emailField.replace('Adicionar e-mail' , 'Remover e-mail');

            $(".emailsAdicionais").append(emailField);



        }
        $('[data-toggle="tooltip"]').tooltip();

    });


    $('#addContact').on('click', function() {
        $('.contatos-adicionais').append($('.contacts-field').html());
    });

    var telefoneMask = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        telefoneMaskOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(telefoneMask.apply({}, arguments), options);
            }
        };

    $('.telefone').mask(telefoneMask, telefoneMaskOptions);

    $('#formPessoaFisica').html('');

    $("input[name='tipoPessoa']").on('change', function () {

        if ($(this).val() == 'fisica') {

            cangePessoaTipo.display.fisica();

        }

        if ($(this).val() == 'juridica') {

            cangePessoaTipo.display.juridica();

        }
    })

    $('#isCondominio').change(function () {
        $('#enderecoCondominio').val('');
        $('#numeroCondominio').val('');

        if ($(this).val() == 'sim') {
            setFieldDisplay.show('.enderecoCondominio', true);
            setFieldDisplay.show('.numeroCondominio', true);

        } else {
            setFieldDisplay.hide('.enderecoCondominio');
            setFieldDisplay.hide('.numeroCondominio');
        }
    })

});
