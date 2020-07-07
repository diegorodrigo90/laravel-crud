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

    //adiciona evento on click, inclusive os elementos futuros
    $("body").on("click", ".button-add", function(event) {
        $($(this)).tooltip("hide"); //remover tooltip
        addEmailTelefone($(this));
    });

    //adiciona evento on click, inclusive os elementos futuros
    $("body").on("click", ".remove-contact", function(event) {
        $('[data-toggle="tooltip"]').tooltip("hide"); //remover tooltip
    });

    //adiciona evento on click, inclusive os elementos futuros
    $("body").on("click", "#addContact", function(event) {
        $('[data-toggle="tooltip"]').tooltip(); //reaplicando tooltips
        $('input[name="telefone"]').mask(telefoneMask, telefoneMaskOptions);
    });

    var getContactsField = function(uid, contatosAdicionais) {
        let contactsReturn = AddContactsFields;
        contactsReturn = contactsReturn.replace(
            /telefonesAdicionais/g,
            "telefonesAdicionais" + contatosAdicionais
        );
        contactsReturn = contactsReturn.replace(
            /name="emailTipo"/g,
            `name="contato-adicional[${contatosAdicionais}][email][${uid}][tipo]"`
        );

        contactsReturn = contactsReturn.replace(
            /name="telefoneTipo"/g,
            `name="contato-adicional[${contatosAdicionais}][telefone][${uid}][tipo]"`
        );
        contactsReturn = contactsReturn.replace(
            'name="contato-adicional[][nome]',
            'name="contato-adicional[' + contatosAdicionais + "][nome]"
        );
        contactsReturn = contactsReturn.replace(
            'name="contato-adicional[][cargo]',
            'name="contato-adicional[' + contatosAdicionais + "][cargo]"
        );
        contactsReturn = contactsReturn.replace(
            'name="contato-adicional[][empresa]',
            'name="contato-adicional[' + contatosAdicionais + "][empresa]"
        );
        contactsReturn = contactsReturn.replace(
            'name="email',
            'name="contato-adicional[' +
                contatosAdicionais +
                "][email][" +
                uid +
                "][email]"
        );
        contactsReturn = contactsReturn.replace(
            'name="telefone',
            'name="contato-adicional[' +
                contatosAdicionais +
                "][telefone][" +
                uid +
                "][telefone]"
        );
        contactsReturn = contactsReturn.replace(
            /emailsAdicionais/g,
            "emailsAdicionais" + contatosAdicionais
        );
        contactsReturn = contactsReturn.replace(
            /contatos-adicional/g,
            "contatos-adicional" + contatosAdicionais
        );
        contactsReturn = contactsReturn.replace(/style="display: none"/g, ""); //tornando div visivel

        return contactsReturn;
    };

    $("#addContact").on("click", function() {
        uid = uid + 1;
        contatosAdicionais = contatosAdicionais + 1;
        $("#sem-contato-adicional").hide();
        $("#contatos-adicional").before(
            getContactsField(uid, contatosAdicionais)
        );
        $(".telefone").mask(telefoneMask, telefoneMaskOptions);

        $("html, body").animate(
            {
                scrollTop: $(".contatos-adicional" + contatosAdicionais).offset().top - 80
            },
            500
        );
    });

    var getEmailField = function(uid, contatoAdicional = null) {
        let emailReturn = emailField;
        if (contatoAdicional) {
            emailReturn = emailReturn.replace(
                /name="email"/g,
                `name="contato-adicional[${contatoAdicional}][email][${uid}][email]"`
            );
            emailReturn = emailReturn.replace(
                /name="emailTipo"/g,
                `name="contato-adicional[${contatoAdicional}][email][${uid}][tipo]"`
            );
        } else {
            emailReturn = emailReturn.replace(
                /name="email"/g,
                `name="email-adicional[${uid}][email]"`
            );
            emailReturn = emailReturn.replace(
                /name="emailTipo"/g,
                `name="email-adicional[${uid}][tipo]"`
            );
        }
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

    var getTelefoneField = function(uid, contatoAdicional = null) {
        let telefoneReturn = telefoneField;

        telefoneReturn = telefoneReturn.replace(
            /telefone-principal/g,
            "telefone-adicional" + uid
        );
        telefoneReturn = telefoneReturn.replace(
            /data-add="telefone"/g,
            'data-del="telefone-adicional' + uid + '"'
        );

        if (contatoAdicional) {
            telefoneReturn = telefoneReturn.replace(
                /name="telefone"/g,
                `name="contato-adicional[${contatoAdicional}][telefone][${uid}][telefone]"`
            );
            telefoneReturn = telefoneReturn.replace(
                /name="telefoneTipo"/g,
                `name="contato-adicional[${contatoAdicional}][telefone][${uid}][tipo]"`
            );
        } else {
            telefoneReturn = telefoneReturn.replace(
                /name="telefone"/g,
                `name="telefone-adicional[${uid}][telefone]"`
            );
            telefoneReturn = telefoneReturn.replace(
                /name="telefoneTipo"/g,
                `name="telefone-adicional[${uid}][tipo]"`
            );
        }

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

    var setFieldDisplay = {
        show: function(element, isRequired) {
            let input = $(element + " > div > .set-required");

            $(element).removeClass("d-none");
            $(element).show("slow");
            if (isRequired) {
                input.prop("required", true);
            }
        },
        hide: function(element) {

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
            beforeSend: function() {
                $("#razaoSocial").prop("disabled", true);
                $("#nomeFantasia").prop("disabled", true);

                $("#razaoSocial").val("carregando...");
                $("#nomeFantasia").val("carregando...");
                $("#situacaoCNPJ").val("carregando...");
            },
            complete: function() {
                $("#razaoSocial").prop("disabled", false);
                $("#nomeFantasia").prop("disabled", false);
            },
            error: function(request, status, error) {
                $("#razaoSocial").val("");
                $("#nomeFantasia").val("");
                $("#situacaoCNPJ").val("");
            },
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
            beforeSend: function() {
                $("#logradouro").prop("disabled", true);
                $("#complemento").prop("disabled", true);
                $("#bairro").prop("disabled", true);

                $("#logradouro").val("carregando...");
                $("#complemento").val("carregando...");
                $("#bairro").val("carregando...");
            },
            complete: function() {
                $("#logradouro").prop("disabled", false);
                $("#complemento").prop("disabled", false);
                $("#bairro").prop("disabled", false);
            },
            error: function(request, status, error) {
                $("#logradouro").val("");
                $("#complemento").val("");
                $("#bairro").val("");
            },
            success: function(data) {
                $("#logradouro").val(data.logradouro);
                $("#complemento").val(data.complemento);
                $("#bairro").val(data.bairro);

                $("#uf option").filter(function() {
                    return this.text == data.uf;
                }).attr('selected', true);

                $("#uf")
                    .trigger("change.select2");

                let selectedStated = $('#uf').val();

                getCities(selectedStated, data.localidade);

            }
        });
    };

    //aplicando mascaras
    $("#cnpj").mask("99.999.999/9999-99");
    $("#cpf").mask("999.999.999-00");
    $("#cep").mask("99999-999");

    $("#cnpj").on("change keyup", function() {
        if ($(this).valid()) {
            receitaWS($(this).val());
        }
    });

    $("#uf").change(function() {
        $("#cidade").prop("disabled", true); //desativando select

        $("#cidade").prepend(
            "<option selected disabled>Carregando...</option>"
        ); //exibe carregando na lista de cidades

        getCities($(this).val());
    });

    $("#cep").on("change keyup", function() {
        if ($(this).valid()) {
            viaCep($(this).val());
        }
    });

    const validate_function = function(element) {
        if (!$(element).hasClass("note-editable")) {
            $(element).valid();
        } else {
            element = $(element)
                .parent()
                .parent()
                .parent()
                .find("textarea");
            $(element).valid();
        }
    };

    $("#fornecedorForm").validate({
        errorClass: "is-invalid error",
        validClass: "is-valid",
        errorPlacement: function(error, element) {
            if (element.hasClass("group-error")) {
                error.insertAfter(element.parent(".input-group"));
            } else element.after(error); // default error placement
        },
        onkeyup: validate_function,
        onfocusout: validate_function,
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
                required: true,
                phone: "both"
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
        uid = uid + 1;
        let newTelefoneField;
        let newEmailField;

        // corrigindo nome para campos de contato adicionas
        if (
            $(element).closest(".contatos-adicional" + contatosAdicionais)
                .length > 0
        ) {
            newTelefoneField = getTelefoneField(uid, contatosAdicionais);
            newEmailField = getEmailField(uid, contatosAdicionais);
        } else {
            newTelefoneField = getTelefoneField(uid);
            newEmailField = getEmailField(uid);
        }

        if (element.attr("data-add") == "telefone") {
            $("." + element.attr("data-append")).append(newTelefoneField);

            $("input.telefone-adicional" + uid).empty();

            $("input.telefone-adicional" + uid).rules("add", {
                required: true,
                phone: "both"
            });
            $("input.telefone-adicional" + uid).mask(
                telefoneMask,
                telefoneMaskOptions
            );
        } else if (element.attr("data-add") == "email") {
            $("." + element.attr("data-append")).append(newEmailField);

            $("input.email-adicional" + uid).empty();

            $("input.email-adicional" + uid).rules("add", {
                required: true,
                email: true
            });
        }

        $(".button-del").delegate("div", "click", function() {
            $('[data-toggle="tooltip"]').tooltip("hide"); //remover tooltip
            $(
                "." +
                    $(this)
                        .parent()
                        .attr("data-del")
            ).remove();
        });

        $('[data-toggle="tooltip"]').tooltip();
    };

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

    $('input[name="telefone"]').mask(telefoneMask, telefoneMaskOptions);

    $("#observacao-div").summernote({
        lang: "pt-BR",
        height: "300",
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["insert", ["link"]]
        ]
        // onKeyup: function(e) {
        //     $("#observacao").val($(this).code());
        //   },
    });

    $("#uf").select2();
    $("#cidade").select2();

    $('[data-toggle="tooltip"]').tooltip();
});
