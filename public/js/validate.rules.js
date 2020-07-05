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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/validate.rules.js":
/*!****************************************!*\
  !*** ./resources/js/validate.rules.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function isCnpj(cnpj) {
  var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;

  if (cnpj.length == 0) {
    return false;
  }

  cnpj = cnpj.replace(/\D+/g, '');
  digitos_iguais = 1;

  for (i = 0; i < cnpj.length - 1; i++) {
    if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  }

  if (digitos_iguais) return false;
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado == digitos.charAt(1);
}

function isCnpjFormatted(cnpj) {
  var validCNPJ = /\d{2,3}.\d{3}.\d{3}\/\d{4}-\d{2}/;
  return cnpj.match(validCNPJ);
}

function isCpf(cpf) {
  exp = /\.|-/g;
  cpf = cpf.toString().replace(exp, "");
  var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
  var soma1 = 0,
      soma2 = 0;
  var vlr = 11;

  for (i = 0; i < 9; i++) {
    soma1 += eval(cpf.charAt(i) * (vlr - 1));
    soma2 += eval(cpf.charAt(i) * vlr);
    vlr--;
  }

  soma1 = soma1 * 10 % 11 == 10 ? 0 : soma1 * 10 % 11;
  soma2 = (soma2 + 2 * soma1) * 10 % 11;

  if (cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999" || cpf == "00000000000") {
    var digitoGerado = null;
  } else {
    var digitoGerado = soma1 * 10 + soma2;
  }

  if (digitoGerado != digitoDigitado) {
    return false;
  }

  return true;
}

function isCpfFormatted(cpf) {
  var validCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return cpf.match(validCPF);
}

(function ($) {
  $.validator.addMethod("cpf", function (value, element, type) {
    if (value == "") return true;
    if ((type == 'format' || type == 'both') && !isCpfFormatted(value)) return false;else return type == 'valid' || type == 'both' ? isCpf(value) : true;
  }, function (type, element) {
    return type == 'format' || type == 'both' && !isCpfFormatted($(element).val()) ? 'Formato do CPF não é válido' : 'Por favor digite um CPF válido';
  });
  $.validator.addMethod("cnpj", function (value, element, type) {
    if (value == "") return true;
    if ((type == 'format' || type == 'both') && !isCnpjFormatted(value)) return false;else return type == 'valid' || type == 'both' ? isCnpj(value) : true;
  }, function (type, element) {
    return type == 'format' || type == 'both' && !isCnpjFormatted($(element).val()) ? 'Formato do CNPJ não é válido' : 'Por favor digite um CNPJ válido';
  }); //Celular

  jQuery.validator.addMethod('celular', function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    value = value.replace(" ", "").trim();

    if (value == '0000000000') {
      return this.optional(element) || false;
    } else if (value == '00000000000') {
      return this.optional(element) || false;
    }

    if (["00", "01", "02", "03",, "04",, "05",, "06",, "07",, "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
      return this.optional(element) || false;
    }

    if (value.length < 10 || value.length > 11) {
      return this.optional(element) || false;
    }

    if (["6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
      return this.optional(element) || false;
    }

    return this.optional(element) || true;
  }, 'Informe um celular válido'); //Telefone fixo

  jQuery.validator.addMethod('telefone', function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    value = value.replace(" ", "").trim();

    if (value == '0000000000') {
      return this.optional(element) || false;
    } else if (value == '00000000000') {
      return this.optional(element) || false;
    }

    if (["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
      return this.optional(element) || false;
    }

    if (value.length < 10 || value.length > 11) {
      return this.optional(element) || false;
    }

    if (["1", "2", "3", "4", "5"].indexOf(value.substring(2, 3)) == -1) {
      return this.optional(element) || false;
    }

    return this.optional(element) || true;
  }, 'Informe um telefone válido');
  jQuery.validator.addMethod('telefone_celular', function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    value = value.replace(" ", "").trim();

    if (value == '0000000000') {
      return this.optional(element) || false;
    } else if (value == '00000000000') {
      return this.optional(element) || false;
    }

    if (["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
      return this.optional(element) || false;
    }

    if (value.length < 10 || value.length > 11) {
      return this.optional(element) || false;
    }

    if (["1", "2", "3", "4", "5"].indexOf(value.substring(2, 3)) == -1) {
      return this.optional(element) || false;
    }

    return this.optional(element) || true;
  }, 'Informe um telefone válido');
  jQuery.validator.addMethod("cep", function (value, element) {
    return this.optional(element) || /^[0-9]{5}-[0-9]{3}$/.test(value);
  }, "Por favor, digite um CEP válido");
})(jQuery);

/***/ }),

/***/ 2:
/*!**********************************************!*\
  !*** multi ./resources/js/validate.rules.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Projetos\Pessoal\laravel-crud\resources\js\validate.rules.js */"./resources/js/validate.rules.js");


/***/ })

/******/ });