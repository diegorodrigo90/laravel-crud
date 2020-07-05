var url = document.getElementById("url").textContent;
var uid = 0;
var contatosAdicionais = 0;
var telefoneField = $(".telefone-field").html(); //pegando html da div telefone
var emailField = $(".email-field").html(); //pegando html da div telefone
var contactsFields = $(".contacts-field").html(); //pegando html da div .contacts-field
var AddContactsFields = $(".contato-adicional").html(); //pegando html da div .contacts-field

$(document).ready(function() {
    $("#contato-adicional-fields").append(contactsFields); //adicona capos de email e telefone no contato adicional

    //Modificando telefoneField com dados necessários
    telefoneField = telefoneField.replace(/button-add/g, "button-del");
    telefoneField = telefoneField.replace(/btn-primary/g, "btn-danger");
    telefoneField = telefoneField.replace(/fa fa-plus/g, "fa fa-minus");
    telefoneField = telefoneField.replace(
        "Adicionar telefone",
        "Remover telefone"
    );

    //Modificando emailField com dados necessários
    emailField = emailField.replace(/button-add/g, "button-del");
    emailField = emailField.replace(/btn-primary/g, "btn-danger");
    emailField = emailField.replace(/fa fa-plus/g, "fa fa-minus");
    emailField = emailField.replace(/Adicionar e-mail/g, "Remover e-mail");

    AddContactsFields = $("#contatos-adicional").html(); //pegando html da div
    $("#contatos-adicional").html(""); //limpando div

    var getContactsField = function() {
        uid = uid + 1;
        let contactsReturn = AddContactsFields;
        contactsReturn = contactsReturn.replace(
            /telefonesAdicionais/g,
            "telefonesAdicionais" + uid
        );
        contactsReturn = contactsReturn.replace(
            /emailsAdicionais/g,
            "emailsAdicionais" + uid
        );
        contactsReturn = contactsReturn.replace(
            /contatos-adicional/g,
            "contatos-adicional" + uid
        );
        contactsReturn = contactsReturn.replace(/style="display: none"/g, "");
        // console.log(contactsReturn);
        return contactsReturn;
    };

    $("#addContact").on("click", function() {
        contatosAdicionais = contatosAdicionais + 1;
        $("#sem-contato-adicional").hide();
        $("#contatos-adicional").before(getContactsField());
    });

    var getEmailField = function(uid) {
        let emailReturn = emailField;
        emailReturn = emailReturn.replace(
            /name="email/g,
            'name="email-adicional' + uid
        );
        emailReturn = emailReturn.replace(
            /data-add="email"/g,
            'data-del="email-adicional' + uid + '"'
        );
        emailReturn = emailReturn.replace(
            /class="form-control email"/g,
            'class="form-control email-adicional' + uid + '"'
        );
        emailReturn = emailReturn.replace(
            /email-principal/g,
            "email-adicional" + uid
        );

        return emailReturn;
    };

    var getTelefoneField = function(uid) {
        let telefoneReturn = telefoneField;

        telefoneReturn = telefoneReturn.replace(
            /telefone-principal/g,
            "telefone-adicional" + uid
        );
        telefoneReturn = telefoneReturn.replace(
            /data-add="telefone"/g,
            'data-del="telefone-adicional' + uid + '"'
        );
        telefoneReturn = telefoneReturn.replace(
            /name="telefone/g,
            'name="telefone-adicional' + uid
        );
        telefoneReturn = telefoneReturn.replace(
            /class="form-control telefone"/g,
            'class="form-control telefone-adicional' + uid + '"'
        );
        return telefoneReturn;
    };

    //limpando caracteres não numericos de uma variavel
    var removeNonNumericsCaracters = function(value) {
        return value.replace(/\D/g, "");
    };

    var resetFormErrors = function() {
        $("#fornecedorForm")
            .data("validator")
            .resetForm();
    };

    var setFieldDisplay = {
        show: function(element, isRequired) {
            resetFormErrors();
            let input = $(element + " > div > .set-required");

            $(element).removeClass("d-none");
            $(element).show("slow");
            if (isRequired) {
                input.prop("required", true);
            }
        },
        hide: function(element) {
            resetFormErrors();

            let input = $(element + " > div > .set-required");

            $(element).hide();
            input.prop("required", false);
            input.val("");
        }
    };

    const pessoaFisicaElements = [
        { field: "#div-cpf", required: true },
        { field: "#div-nome", required: true },
        { field: "#div-apelido", required: false },
        { field: "#div-rg", required: true }
    ];

    const pessoaJuridicaElements = [
        { field: "#div-cnpj", required: true },
        { field: "#div-razao-social", required: true },
        { field: "#div-nome-fantasia", required: true },
        { field: "#div-indicador-inscricao-estadual", required: true },
        { field: "#div-inscricao-estadual", required: false },
        { field: "#div-inscricao-municipal", required: false },
        { field: "#div-situacao-cnpj", required: false },
        { field: "#div-recolhimento", required: true }
    ];

    const cangePessoaTipo = {
        display: {
            juridica: function() {
                $(pessoaFisicaElements).each(function(index) {
                    setFieldDisplay.hide(this.field);
                });

                $(pessoaJuridicaElements).each(function(index) {
                    setFieldDisplay.show(this.field, this.required);
                });
            },

            fisica: function() {
                $(pessoaJuridicaElements).each(function(index) {
                    setFieldDisplay.hide(this.field);
                });

                $(pessoaFisicaElements).each(function(index) {
                    setFieldDisplay.show(this.field, this.required);
                });
            }
        }
    };

    //verificando cnpj no receita ws
    var receitaWS = function(cnpj) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url:
                "https://www.receitaws.com.br/v1/cnpj/" +
                removeNonNumericsCaracters(cnpj), //Url da Action Aqui
            success: function(data) {
                $("#razaoSocial").val(data.nome);
                $("#nomeFantasia").val(data.fantasia);
                $("#situacaoCNPJ").val(data.situacao);
                $("#cep")
                    .val(data.cep.replace(".", ""))
                    .trigger("change");
            }
        });
    };

    //pegando cidades do estado
    var getCities = async function(state, city) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url + "/api/v1/cidades/" + state, //Url da Action Aqui
            success: function(data) {
                $("#cidade")
                    .empty()
                    .trigger("change"); //limpando select2 antes de adicionar cidades
                $("#cidade").prepend("<option disabled>Selecione</option>"); //adicionando oção padrão
                $("#cidade")
                    .val("Selecione")
                    .trigger("change"); //selecionado

                $(data).each(function(index) {
                    if (city) {
                        let selected = this.title == city ? true : false;
                        var option = new Option(
                            this.title,
                            this.id,
                            selected,
                            selected
                        );
                    } else {
                        var option = new Option(
                            this.title,
                            this.id,
                            false,
                            false
                        );
                    }
                    $("#cidade").append(option);
                });

                $("#cidade").prop("disabled", false); //ativando select
            }
        });
    };

    var viaCep = function(cep) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url:
                "https://viacep.com.br/ws/" +
                removeNonNumericsCaracters(cep) +
                "/json", //Url da Action Aqui
            success: function(data) {
                $("#logradouro").val(data.logradouro);
                $("#complemento").val(data.complemento);
                $("#bairro").val(data.bairro);

                $("#uf")
                    .val(data.uf)
                    .trigger("change.select2");
                getCities(data.uf, data.localidade);
            }
        });
    };

    //aplicando mascaras
    $("#cnpj").mask("99.999.999/9999-99");
    $("#cep").mask("99999-999");

    $("#cnpj").on("change keyup", function() {
        if ($(this).valid()) {
            receitaWS($(this).val());
        }
    });

    $("#uf").change(function() {
        $("#cidade").prepend("<option selected disabled>Carregando...</option>"); //exibe carregando na lista de cidades
        getCities($(this).val());
    });

    $("#cep").on("change keyup", function() {
        if ($(this).valid()) {
            viaCep($(this).val());
        }
    });

    $("#fornecedorForm").validate({
        errorClass: "is-invalid error",
        validClass: "is-valid",
        errorElement: "div",
        //debug: true, //retira essa linha, para o form voltar a funcionar
        rules: {
            cpf: {
                cpf: "both" //valida tanto Formatação como os Digitos
                //caso não queira validar a formatação use => cpf: 'valid’
                //caso só queira validar a formatação use => cpf: 'format’
            },
            cnpj: {
                cnpj: "both" //valida tanto Formatação como os Digitos
            },

            telefone: {
                telefone_celular: true
            },
            email: {
                required: true,
                email: true
            },
            cep: {
                cep: true
            }
        }
    });

    var addEmailTelefone = function(element) {
        if (element.attr("data-add") == "telefone") {
            uid = uid + 1;

            var teste = $("." + element.attr("data-append")).append(
                getTelefoneField(uid)
            );

            $("input.telefone-adicional" + uid).empty();

            $("input.telefone-adicional" + uid).mask(
                telefoneMask,
                telefoneMaskOptions
            );
            $("input.telefone-adicional" + uid).rules("add", {
                telefone_celular: true
            });
        } else if (element.attr("data-add") == "email") {
            uid = uid + 1;

            $("." + element.attr("data-append")).append(getEmailField(uid));

            $("input.email-adicional" + uid).empty();

            $("input.email-adicional" + uid).rules("add", {
                required: true,
                email: true
            });
        }

        $(".button-del").delegate("div", "click", function() {
            $(
                "." +
                    $(this)
                        .parent()
                        .attr("data-del")
            ).remove();
        });

        $('[data-toggle="tooltip"]').tooltip();
    };

    //adciona event, inclusive os elementos futoros
    $("body").on("click", ".button-add", function(event) {
        addEmailTelefone($(this));
    });

    $("body").on("click", ".remove-contact", function(event) {
        contatosAdicionais = contatosAdicionais - 1;
        $("." + $(this).attr("data-remove")).hide("slow");
        $("." + $(this).attr("data-remove")).remove();
        if (contatosAdicionais == 0) $("#sem-contato-adicional").show("slow");
    });

    //adiconar email/telefone

    $("#addContact").on("click", function() {
        $(".contatos-adicionais").append($(".contacts-field").html());
    });

    var telefoneMask = function(val) {
            return val.replace(/\D/g, "").length === 11
                ? "(00) 00000-0000"
                : "(00) 0000-00009";
        },
        telefoneMaskOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(telefoneMask.apply({}, arguments), options);
            }
        };

    $(".telefone").mask(telefoneMask, telefoneMaskOptions);

    $("#formPessoaFisica").html("");

    $("input[name='tipoPessoa']").on("change", function() {
        if ($(this).val() == "fisica") {
            cangePessoaTipo.display.fisica();
        }

        if ($(this).val() == "juridica") {
            cangePessoaTipo.display.juridica();
        }
    });

    $("#isCondominio").change(function() {
        $("#enderecoCondominio").val("");
        $("#numeroCondominio").val("");

        if ($(this).val() == "sim") {
            setFieldDisplay.show(".enderecoCondominio", true);
            setFieldDisplay.show(".numeroCondominio", true);
        } else {
            setFieldDisplay.hide(".enderecoCondominio");
            setFieldDisplay.hide(".numeroCondominio");
        }
    });
});
