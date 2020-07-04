/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/fornecedores.js":
/*!**************************************!*\
  !*** ./resources/js/fornecedores.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
      "email": {
        required: true,
        email: true
      },
      "cep": {
        cep: true
      }
    }
  });

  var telefoneMask = function telefoneMask(val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
      telefoneMaskOptions = {
    onKeyPress: function onKeyPress(val, e, field, options) {
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
  });
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
  });
});

/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./resources/js/fornecedores.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Projetos\Pessoal\laravel-crud\resources\js\fornecedores.js */"./resources/js/fornecedores.js");


/***/ })

/******/ });