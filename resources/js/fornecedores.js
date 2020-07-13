var url = document.getElementById('url').textContent;
var uid = 0;
var contatosAdicionais = 0;

//preencher os contatos na pagina de edição
var firstTelefone, firstEmail, currentAddContact;

$('input, select').prev('label').after('<sup class=\'required\' title=\'Campo obrigatório\' style=\'color: red; display: none\'> •</sup>'); //adicionando asterico para campos obrigatorios
$('[required]').prev('.required').show(); //adicionando asterico para campos obrigatorios

var telefoneMask = function (val) {
	return val.replace(/\D/g, '').length === 11 ?
		'(00) 00000-0000' :
		'(00) 0000-00009';
};

var telefoneMaskOptions = {
	onKeyPress: function (val, e, field, options) {
		field.mask(telefoneMask.apply({}, arguments), options);
	}
};

var telefoneField = $('.telefone-field').html(); //pegando html da div telefone
var emailField = $('.email-field').html(); //pegando html da div telefone
var contactsFields = $('.contacts-field').html(); //pegando html da div .contacts-field
var AddContactsFields = $('.contato-adicional').html(); //pegando html da div .contacts-field

$('#contato-adicional-fields').append(contactsFields); //adicona capos de email e telefone no contato adicional

//Modificando telefoneField com dados necessários
telefoneField = telefoneField.replace(/button-add/g, 'button-del');
telefoneField = telefoneField.replace(/btn-primary/g, 'btn-danger');
telefoneField = telefoneField.replace(/fa fa-plus/g, 'fa fa-minus');
telefoneField = telefoneField.replace(
	'Adicionar telefone',
	'Remover telefone'
);


//Modificando emailField com dados necessários
emailField = emailField.replace(/button-add/g, 'button-del');
emailField = emailField.replace(/btn-primary/g, 'btn-danger');
emailField = emailField.replace(/fa fa-plus/g, 'fa fa-minus');
emailField = emailField.replace(/Adicionar e-mail/g, 'Remover e-mail');

AddContactsFields = $('#contatos-adicional').html(); //pegando html da div
$('#contatos-adicional').html(''); //limpando div

// adiciona evento on click, inclusive os elementos futuros
$('body').on('click', '.button-add', function () {
	$($(this)).tooltip('hide'); //remover tooltip
	addEmailTelefone($(this));
});

//adiciona evento on click, inclusive os elementos futuros
$('body').on('click', '.remove-contact', function () {
	$('[data-toggle="tooltip"]').tooltip('hide'); //remover tooltip
	contatosAdicionais = contatosAdicionais - 1;
	$('.' + $(this).attr('data-remove')).hide('slow');
	$('.' + $(this).attr('data-remove')).remove();
	if (contatosAdicionais == 0) $('#sem-contato-adicional').show('slow');
});

//adiciona evento on click, inclusive os elementos futuros
$('body').on('click', '#addContact', function () {
	$('[data-toggle="tooltip"]').tooltip(); //reaplicando tooltips
	$('input[name="telefone"]').mask(telefoneMask, telefoneMaskOptions);
});

var getContactsField = function (uid, contatosAdicionais) {
	let contactsReturn = AddContactsFields;
	contactsReturn = contactsReturn.replace(
		/telefonesAdicionais/g,
		'telefonesAdicionais' + contatosAdicionais
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
		'name="contato-adicional[' + contatosAdicionais + '][nome]'
	);
	contactsReturn = contactsReturn.replace(
		'name="contato-adicional[][cargo]',
		'name="contato-adicional[' + contatosAdicionais + '][cargo]'
	);
	contactsReturn = contactsReturn.replace(
		'name="contato-adicional[][empresa]',
		'name="contato-adicional[' + contatosAdicionais + '][empresa]'
	);
	contactsReturn = contactsReturn.replace(
		'name="email',
		'name="contato-adicional[' +
        contatosAdicionais +
        '][email][' +
        uid +
        '][email]'
	);
	contactsReturn = contactsReturn.replace(
		'name="telefone',
		'name="contato-adicional[' +
        contatosAdicionais +
        '][telefone][' +
        uid +
        '][telefone]'
	);
	contactsReturn = contactsReturn.replace(
		/emailsAdicionais/g,
		'emailsAdicionais' + contatosAdicionais
	);
	contactsReturn = contactsReturn.replace(
		/contatos-adicional/g,
		'contatos-adicional' + contatosAdicionais
	);
	contactsReturn = contactsReturn.replace(/style="display: none"/g, ''); //tornando div visivel

	return contactsReturn;
};

$('#addContact').on('click', function () {
	uid = uid + 1;
	contatosAdicionais = contatosAdicionais + 1;
	$('#sem-contato-adicional').hide();
	$('#contatos-adicional').before(
		getContactsField(uid, contatosAdicionais)
	);
	$('.telefone').mask(telefoneMask, telefoneMaskOptions);
});

var getEmailField = function (uid, contatoAdicional = null) {
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
		'email-adicional' + uid
	);

	return emailReturn;
};

var getTelefoneField = function (uid, contatoAdicional = null) {
	let telefoneReturn = telefoneField;

	telefoneReturn = telefoneReturn.replace(
		/telefone-principal/g,
		'telefone-adicional' + uid
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
var removeNonNumericsCaracters = function (value) {
	return value.replace(/\D/g, '');
};

var setFieldDisplay = {
	show: function (element, isRequired) {
		let input = $(element + ' > div > .set-required');

		$(element).removeClass('d-none');
		$(element).show('slow');
		if (isRequired) {
			input.prop('required', true);
		}
	},
	hide: function (element) {

		let input = $(element + ' > div > .set-required');

		$(element).hide();
		input.prop('required', false);
	}
};

const pessoaFisicaElements = [{
	field:    '#div-cpf',
	required: true
},
{
	field:    '#div-nome',
	required: true
},
{
	field:    '#div-apelido',
	required: false
},
{
	field:    '#div-rg',
	required: true
}
];

const pessoaJuridicaElements = [{
	field:    '#div-cnpj',
	required: true
},
{
	field:    '#div-razao-social',
	required: true
},
{
	field:    '#div-nome-fantasia',
	required: true
},
{
	field:    '#div-indicador-inscricao-estadual',
	required: true
},
{
	field:    '#div-inscricao-estadual',
	required: false
},
{
	field:    '#div-inscricao-municipal',
	required: false
},
{
	field:    '#div-situacao-cnpj',
	required: false
},
{
	field:    '#div-recolhimento',
	required: true
}
];


const changePessoaTipo = {
	display: {
		juridica: function () {
			$(pessoaFisicaElements).each(function () {
				setFieldDisplay.hide(this.field);
			});

			$(pessoaJuridicaElements).each(function () {
				setFieldDisplay.show(this.field, this.required);
			});
		},

		fisica: function () {
			$(pessoaJuridicaElements).each(function () {
				setFieldDisplay.hide(this.field);
			});

			$(pessoaFisicaElements).each(function () {
				setFieldDisplay.show(this.field, this.required);
			});
		}
	}
};

//verificando cnpj no receita ws
var receitaWS = function (cnpj) {
	$.ajax({
		type:     'GET',
		dataType: 'jsonp',
		url:      'https://www.receitaws.com.br/v1/cnpj/' +
            removeNonNumericsCaracters(cnpj), //Url da Action Aqui
		success:  function (data) {
			$('#razaoSocial').val(data.nome);
			$('#nomeFantasia').val(data.fantasia);
			$('#situacaoCNPJ').val(data.situacao);

			$('#cep')
				.val(data.cep.replace('.', ''))
				.trigger('change');

		}
	});
};

//pegando cidades do estado
var getCities = async function (state, city) {
	$.ajax({
		type:     'GET',
		dataType: 'json',
		url:      url + '/api/v1/cidades/' + state, //Url da Action Aqui
		success:  function (data) {
			$('#cidade')
				.empty()
				.trigger('change'); //limpando select2 antes de adicionar cidades
			$('#cidade').prepend('<option disabled>Selecione</option>'); //adicionando oção padrão
			$('#cidade')
				.val('Selecione')
				.trigger('change'); //selecionado

			$(data).each(function () {
				var option;
				if (city) {
					let selected = this.title == city ? true : false;
					option = new Option(
						this.title,
						this.id,
						selected,
						selected
					);
				} else {
					option = new Option(
						this.title,
						this.id,
						false,
						false
					);
				}
				$('#cidade').append(option);
			});

			$('#cidade').prop('disabled', false); //ativando select
		}
	});
};

var viaCep = function (cep) {
	$.ajax({
		type:     'GET',
		dataType: 'jsonp',
		url:      'https://viacep.com.br/ws/' +
            removeNonNumericsCaracters(cep) +
            '/json', //Url da Action Aqui
		success: function (data) {
			$('#logradouro').val(data.logradouro);
			$('#complemento').val(data.complemento);
			$('#bairro').val(data.bairro);

			$('#uf option').filter(function () {
				return this.text == data.uf;
			}).attr('selected', true);

			$('#uf')
				.trigger('change.select2');

			let selectedStated = $('#uf').val();

			getCities(selectedStated, data.localidade);

		}
	});
};

//aplicando mascaras
$('#cnpj').mask('99.999.999/9999-99');
$('#cpf').mask('999.999.999-00');
$('#cep').mask('99999-999');

$('#cnpj').on('change keyup', function () {
	if ($(this).valid()) {
		receitaWS($(this).val());
	}
});

$('#uf').change(function () {
	$('#cidade').prop('disabled', true); //desativando select

	$('#cidade').prepend(
		'<option selected disabled>Carregando...</option>'
	); //exibe carregando na lista de cidades

	getCities($(this).val());
});

$('#cep').on('change keyup', function () {
	if ($(this).valid()) {
		viaCep($(this).val());
	}
});

const validate_function = function (element) {
	if (!$(element).hasClass('note-editable')) {
		$(element).valid();
	} else {
		element = $(element)
			.parent()
			.parent()
			.parent()
			.find('textarea');
		$(element).valid();
	}
};

$('#numero').mask('000009');


$('#fornecedorForm').validate({
	errorClass:     'is-invalid error',
	validClass:     'is-valid',
	errorPlacement: function (error, element) {
		if (element.hasClass('group-error')) {
			error.insertAfter(element.next('.select2-container')); // TODO: Corrigir posicionamento do erro com o select2
		} else element.after(error); // default error placement
	},
	onkeyup:    validate_function,
	onfocusout: validate_function,
	//debug: true, //retira essa linha, para o form voltar a funcionar
	rules:      {
		cpf: {
			cpf: 'both' //valida tanto Formatação como os Digitos
			//caso não queira validar a formatação use => cpf: 'valid’
			//caso só queira validar a formatação use => cpf: 'format’
		},
		cnpj: {
			cnpj: 'both' //valida tanto Formatação como os Digitos
		},

		telefone: {
			required: true,
			phone:    'both'
		},
		email: {
			required: true,
			email:    true
		},
		cep: {
			cep: true
		}
	}
});


var addEmailTelefone = function (element) {
	uid = uid + 1;
	let newTelefoneField;
	let newEmailField;

	// corrigindo nome para campos de contato adicionas

	if ($('.contatos-adicional' + contatosAdicionais).length > 0) {
		newTelefoneField = getTelefoneField(uid, contatosAdicionais);
		newEmailField = getEmailField(uid, contatosAdicionais);
	} else {
		newTelefoneField = getTelefoneField(uid);
		newEmailField = getEmailField(uid);
	}

	if (element.attr('data-add') == 'telefone') {
		$('.' + element.attr('data-append')).append(newTelefoneField);

		$('input.telefone-adicional' + uid).empty();

		$('input.telefone-adicional' + uid).rules('add', {
			required: true,
			phone:    'both'
		});
		$('input.telefone-adicional' + uid).mask(
			telefoneMask,
			telefoneMaskOptions
		);

	} else if (element.attr('data-add') == 'email') {
		$('.' + element.attr('data-append')).append(newEmailField);

		$('input.email-adicional' + uid).empty();

		$('input.email-adicional' + uid).rules('add', {
			required: true,
			email:    true
		});
	}


	$('.button-del').delegate('div', 'click', function () {
		$('[data-toggle="tooltip"]').tooltip('hide'); //remover tooltip
		$(
			'.' +
            $(this).parent().attr('data-del')
		).remove();
	});

	$('[data-toggle="tooltip"]').tooltip();


};


var fillContactsFields = function () {

	firstTelefone = 0;
	firstEmail = 0;
	var fieldTelefone = $('#telefoneContato .button-add');
	var fieldEmail = $('#emailContato .button-add');
	var addedEmail = [];
	var addedTelefone = [];


	/*eslint-disable */
    $.each(contatosData.contatosPrincipais, function (index, value) {
    /*eslint-enable */
		if (value.qual_contato == 'Telefone' && !addedTelefone.includes(value.id)) {
            
			if (firstTelefone == 0) {
				let element = $('input[name="telefone"]');
				let tipo = $('select[name="telefoneTipo"]');
				element.val(value.contato);
				tipo.val(value.tipo);
				firstTelefone = 1;

			} else {
				addEmailTelefone(fieldTelefone);
				$('.telefone-adicional' + uid).val(value.contato);
				$('select[name="telefone-adicional[' + uid + '][tipo]"]').val(value.tipo);


			}
			addedTelefone.push(value.id);
		} else if (value.qual_contato == 'E-mail' && !addedEmail.includes(value.id)) {

			if (firstEmail == 0) {
				let element = $('input[name="email"]');
				let tipo = $('select[name="emailTipo"]');
				element.val(value.contato);
				tipo.val(value.tipo);
				firstEmail = 1;

			} else {
				addEmailTelefone(fieldEmail);
				$('.email-adicional' + uid).val(value.contato);
				$('select[name="email-adicional[' + uid + '][tipo]"]').val(value.tipo);

			}
		}
		addedEmail.push(value.id);
        
	});
    
	addedEmail = [];
	addedTelefone = [];

	/*eslint-disable */
if(contatosData.pessoasContatos.length > 0)$('#sem-contato-adicional').hide();

    $.each(contatosData.pessoasContatos, function (index, value) {
    /*eslint-enable */
		firstTelefone = 0;
		firstEmail = 0;
		uid = uid + 1;
		contatosAdicionais = contatosAdicionais + 1;
		currentAddContact = value.id; //para usar relacionar aos contatos adicionais
        
		$('#contatos-adicional').before(getContactsField(uid, contatosAdicionais));
		$('.telefone').mask(telefoneMask, telefoneMaskOptions);
		$('input[name="contato-adicional[' + contatosAdicionais + '][nome]"]').val(value.nome);
		$('input[name="contato-adicional[' + contatosAdicionais + '][empresa]"]').val(value.empresa);
		$('input[name="contato-adicional[' + contatosAdicionais + '][cargo]"]').val(value.cargo);

		fieldTelefone = $('.contatos-adicional' + contatosAdicionais + ' #telefoneContato .button-add');
		fieldEmail = $('.contatos-adicional' + contatosAdicionais + ' #emailContato .button-add');


		/*eslint-disable */
        $.each(contatosData.contatosAdicionais, function (key, value) {
        /*eslint-enable */
			uid = uid + 1;
			if ( currentAddContact == value.pessoa_contato_id) {
				if (value.qual_contato == 'Telefone' && !addedEmail.includes(value.id)) {
	
					if (firstTelefone == 0 ) {
						$('.contatos-adicional' + contatosAdicionais + ' .telefone-field input' ).val(value.contato);
						$('.contatos-adicional' + contatosAdicionais + ' .telefone-field select' ).val(value.tipo);
						firstTelefone = 1;
					}
                    
					else {
						addEmailTelefone(fieldTelefone);
						$('input[name="contato-adicional[' + contatosAdicionais + '][telefone][' + uid + '][telefone]"]').val(value.contato);
						$('select[name="contato-adicional[' + contatosAdicionais + '][telefone][' + uid + '][tipo]"]').val(value.tipo);
					}
                    
					addedEmail.push(value.id);

					
				}

				else if (value.qual_contato == 'E-mail' && !addedTelefone.includes(value.id)) {
                    
					if (firstEmail == 0 ) {
						$('.contatos-adicional' + contatosAdicionais + ' .email-field input' ).val(value.contato);
						$('.contatos-adicional' + contatosAdicionais + ' .email-principal select' ).val(value.tipo);
						firstEmail = 1;
                        
					}

					else {
						addEmailTelefone(fieldEmail);
						$('input[name="contato-adicional[' + contatosAdicionais + '][email][' + uid + '][email]"]').val(value.contato);
						$('select[name="contato-adicional[' + contatosAdicionais + '][email][' + uid + '][tipo]"]').val(value.tipo);
					}
                    
					addedTelefone.push(value.id);
				}

			}

		});

	});

};
/*eslint-disable */
//executa a função de fillContactsFields apenas se existir o objeto contatosData
if (typeof contatosData !== 'undefined') fillContactsFields();
/*eslint-enable */

//Oculta/exibe campo de inscrição estadual
var IndicadorInscricaoEstadual = function () {
	let IndicadorInscricaoEstadual = $('#indicadorInscricaoEstadual');
	let inscricaoEstadual = $('#inscricaoEstadual');

	if (IndicadorInscricaoEstadual.val() == 'Contribuinte' || IndicadorInscricaoEstadual.val() == 'Contribuinte Isento') {
		inscricaoEstadual.prev('sup').show();
		inscricaoEstadual.prop('required', true);
		inscricaoEstadual.prop('disabled', false);
	} else {
		inscricaoEstadual.prev('sup').hide();
		inscricaoEstadual.prop('required', false);
		inscricaoEstadual.prop('disabled', true);

	}


};

IndicadorInscricaoEstadual();

$('#indicadorInscricaoEstadual').on('change', function () {
	IndicadorInscricaoEstadual();
	$('#inscricaoEstadual').removeClass('is-invalid');
	$('#inscricaoEstadual').next('label.is-invalid').hide();
});


//adiconar email/telefone
$('#addContact').on('click', function () {
	$('.contatos-adicionais').append($('.contacts-field').html());
});

$('.telefone').mask(telefoneMask, telefoneMaskOptions);

$('#formPessoaFisica').html('');

$('input[name=\'tipoPessoa\']').on('change click', function () {
	if ($(this).val() == 'fisica') {
		changePessoaTipo.display.fisica();
	}

	if ($(this).val() == 'juridica') {
		changePessoaTipo.display.juridica();
	}
});

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
});

$('.mostra-modal-excluir').on('click', function () {
	$('#modalExcluirFornecedor').modal('show');
});

$('input[name="telefone"]').mask(telefoneMask, telefoneMaskOptions);

$('#observacao-div').summernote({
	lang:    'pt-BR',
	height:  '300',
	toolbar: [
		['style', ['style']],
		['font', ['bold', 'underline', 'clear']],
		['color', ['color']],
		['para', ['ul', 'ol', 'paragraph']],
		['insert', ['link']]
	],
	disableDragAndDrop: true,
	// onKeyup: function(e) {
	//     $("#observacao").val($(this).code());
	//   },
});


$('#uf').select2();
$('#cidade').select2();

$('[data-toggle="tooltip"]').tooltip();

// capturando form submit
$('form#fornecedorForm').on('submit', function () {
	$('.collapse').collapse('show'); //expande todas os accordion ao enviar

	//aguarda um tempo antes de enviar
	setTimeout(function () {
		return false; // desativa envio padrão do formulario
	}, 1000);

});
