$(document).ready(function () {


    //aplicando mascaras
    $('#cnpj').mask('99.999.999/9999-99');
    $('#cep').mask('99999-999');

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
