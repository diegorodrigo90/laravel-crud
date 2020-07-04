$(document).ready(function () {

    //limpando caracteres não numericos de uma variavel
    var removeNonNumericsCaracters = function(value) {
        return value.replace(/\D/g,'');
    }

    //verificando cnpj no receita ws
    var receitaWS = function(cnpj) {
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: "https://www.receitaws.com.br/v1/cnpj/" + removeNonNumericsCaracters(cnpj), //Url da Action Aqui
                success: function (data) {
                    $("#razaoSocial").val(data.nome);
                    $("#nomeFantasia").val(data.fantasia);
                    $("#situacaoCNPJ").val(data.situacao);
                    $("#cep").val(data.cep.replace(".",""));

                }
            });
    };

    var viaCep = function(cep) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: "https://viacep.com.br/ws/" + removeNonNumericsCaracters(cep) + "/json", //Url da Action Aqui
            success: function (data) {
                console.log(data);
                $('#logradouro').val(data.logradouro);
                $('#complemento').val(data.complemento);
                $('#bairro').val(data.bairro);

                $('#uf').val(data.uf).trigger('change.select2');


            }
        });
};

    //aplicando mascaras
    $('#cnpj').mask('99.999.999/9999-99');
    $('#cep').mask('99999-999');


        $('#cnpj').on('change',function(){
            if($("[name='cnpj']").valid()){
                receitaWS($(this).val());
            }
        });

        $('#cep').on('change',function(){
            if($("[name='cep']").valid()){
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
            "email" : {
                required: true,
                email: true
            },
            "cep" : {
                cep: true
            }
        }
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

    var divPessoaJuridica = $('#formPessoaJuridica').html();
    var divPessoaFisica = $('#formPessoaFisica').html();

    $('#formPessoaFisica').html('');

    $("input[name='tipoPessoa']").on('change', function () {


        if ($(this).val() == 'fisica') {


            $('#formPessoaJuridica').hide();
            $('#formPessoaJuridica').html('');
            $('#formPessoaFisica').html(divPessoaFisica);
            $('#formPessoaFisica').removeClass('d-none');
            $('#cpf').mask('999.999.999-99');
            $('#formPessoaFisica').show();


        }

        if ($(this).val() == 'juridica') {

            $('#formPessoaFisica').hide();
            $('#formPessoaFisica').html('');
            $('#formPessoaJuridica').html(divPessoaJuridica);
            $('#cnpj').mask('99.999.999/9999-99');
            $('#formPessoaJuridica').show();

        }
    })

    $('#isCondominio').change(function () {
        $('#enderecoCondominio').val('');
        $('#numeroCondominio').val('');

        if ($(this).val() == 'sim') {
            $('.enderecoCondominio').removeClass('d-none');
            $('.numeroCondominio').removeClass('d-none');

        } else {
            $('.enderecoCondominio').addClass('d-none');
            $('.numeroCondominio').addClass('d-none');
        }
    })


});
