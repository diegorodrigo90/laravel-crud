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

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./resources/js/fornecedores.js":
/*!**************************************!*\
  !*** ./resources/js/fornecedores.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var url = document.getElementById('url').textContent;
var uid = 0;
var contatosAdicionais = 0; //preencher os contatos na pagina de edição

var firstTelefone, firstEmail, currentAddContact;
$('input, select').prev('label').after('<sup class=\'required\' title=\'Campo obrigatório\' style=\'color: red; display: none\'> •</sup>'); //adicionando asterico para campos obrigatorios

$('[required]').prev('.required').show(); //adicionando asterico para campos obrigatorios

var telefoneMask = function telefoneMask(val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
};

var telefoneMaskOptions = {
  onKeyPress: function onKeyPress(val, e, field, options) {
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
telefoneField = telefoneField.replace('Adicionar telefone', 'Remover telefone'); //Modificando emailField com dados necessários

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
}); //adiciona evento on click, inclusive os elementos futuros

$('body').on('click', '.remove-contact', function () {
  $('[data-toggle="tooltip"]').tooltip('hide'); //remover tooltip

  contatosAdicionais = contatosAdicionais - 1;
  $('.' + $(this).attr('data-remove')).hide('slow');
  $('.' + $(this).attr('data-remove')).remove();
  if (contatosAdicionais == 0) $('#sem-contato-adicional').show('slow');
}); //adiciona evento on click, inclusive os elementos futuros

$('body').on('click', '#addContact', function () {
  $('[data-toggle="tooltip"]').tooltip(); //reaplicando tooltips

  $('input[name="telefone"]').mask(telefoneMask, telefoneMaskOptions);
});

var getContactsField = function getContactsField(uid, contatosAdicionais) {
  var contactsReturn = AddContactsFields;
  contactsReturn = contactsReturn.replace(/telefonesAdicionais/g, 'telefonesAdicionais' + contatosAdicionais);
  contactsReturn = contactsReturn.replace(/name="emailTipo"/g, "name=\"contato-adicional[".concat(contatosAdicionais, "][email][").concat(uid, "][tipo]\""));
  contactsReturn = contactsReturn.replace(/name="telefoneTipo"/g, "name=\"contato-adicional[".concat(contatosAdicionais, "][telefone][").concat(uid, "][tipo]\""));
  contactsReturn = contactsReturn.replace('name="contato-adicional[][nome]', 'name="contato-adicional[' + contatosAdicionais + '][nome]');
  contactsReturn = contactsReturn.replace('name="contato-adicional[][cargo]', 'name="contato-adicional[' + contatosAdicionais + '][cargo]');
  contactsReturn = contactsReturn.replace('name="contato-adicional[][empresa]', 'name="contato-adicional[' + contatosAdicionais + '][empresa]');
  contactsReturn = contactsReturn.replace('name="email', 'name="contato-adicional[' + contatosAdicionais + '][email][' + uid + '][email]');
  contactsReturn = contactsReturn.replace('name="telefone', 'name="contato-adicional[' + contatosAdicionais + '][telefone][' + uid + '][telefone]');
  contactsReturn = contactsReturn.replace(/emailsAdicionais/g, 'emailsAdicionais' + contatosAdicionais);
  contactsReturn = contactsReturn.replace(/contatos-adicional/g, 'contatos-adicional' + contatosAdicionais);
  contactsReturn = contactsReturn.replace(/style="display: none"/g, ''); //tornando div visivel

  return contactsReturn;
};

$('#addContact').on('click', function () {
  uid = uid + 1;
  contatosAdicionais = contatosAdicionais + 1;
  $('#sem-contato-adicional').hide();
  $('#contatos-adicional').before(getContactsField(uid, contatosAdicionais));
  $('.telefone').mask(telefoneMask, telefoneMaskOptions);
});

var getEmailField = function getEmailField(uid) {
  var contatoAdicional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var emailReturn = emailField;

  if (contatoAdicional) {
    emailReturn = emailReturn.replace(/name="email"/g, "name=\"contato-adicional[".concat(contatoAdicional, "][email][").concat(uid, "][email]\""));
    emailReturn = emailReturn.replace(/name="emailTipo"/g, "name=\"contato-adicional[".concat(contatoAdicional, "][email][").concat(uid, "][tipo]\""));
  } else {
    emailReturn = emailReturn.replace(/name="email"/g, "name=\"email-adicional[".concat(uid, "][email]\""));
    emailReturn = emailReturn.replace(/name="emailTipo"/g, "name=\"email-adicional[".concat(uid, "][tipo]\""));
  }

  emailReturn = emailReturn.replace(/data-add="email"/g, 'data-del="email-adicional' + uid + '"');
  emailReturn = emailReturn.replace(/class="form-control email"/g, 'class="form-control email-adicional' + uid + '"');
  emailReturn = emailReturn.replace(/email-principal/g, 'email-adicional' + uid);
  return emailReturn;
};

var getTelefoneField = function getTelefoneField(uid) {
  var contatoAdicional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var telefoneReturn = telefoneField;
  telefoneReturn = telefoneReturn.replace(/telefone-principal/g, 'telefone-adicional' + uid);
  telefoneReturn = telefoneReturn.replace(/data-add="telefone"/g, 'data-del="telefone-adicional' + uid + '"');

  if (contatoAdicional) {
    telefoneReturn = telefoneReturn.replace(/name="telefone"/g, "name=\"contato-adicional[".concat(contatoAdicional, "][telefone][").concat(uid, "][telefone]\""));
    telefoneReturn = telefoneReturn.replace(/name="telefoneTipo"/g, "name=\"contato-adicional[".concat(contatoAdicional, "][telefone][").concat(uid, "][tipo]\""));
  } else {
    telefoneReturn = telefoneReturn.replace(/name="telefone"/g, "name=\"telefone-adicional[".concat(uid, "][telefone]\""));
    telefoneReturn = telefoneReturn.replace(/name="telefoneTipo"/g, "name=\"telefone-adicional[".concat(uid, "][tipo]\""));
  }

  telefoneReturn = telefoneReturn.replace(/class="form-control telefone"/g, 'class="form-control telefone-adicional' + uid + '"');
  return telefoneReturn;
}; //limpando caracteres não numericos de uma variavel


var removeNonNumericsCaracters = function removeNonNumericsCaracters(value) {
  return value.replace(/\D/g, '');
};

var setFieldDisplay = {
  show: function show(element, isRequired) {
    var input = $(element + ' > div > .set-required');
    $(element).removeClass('d-none');
    $(element).show('slow');

    if (isRequired) {
      input.prop('required', true);
    }
  },
  hide: function hide(element) {
    var input = $(element + ' > div > .set-required');
    $(element).hide();
    input.prop('required', false);
  }
};
var pessoaFisicaElements = [{
  field: '#div-cpf',
  required: true
}, {
  field: '#div-nome',
  required: true
}, {
  field: '#div-apelido',
  required: false
}, {
  field: '#div-rg',
  required: true
}];
var pessoaJuridicaElements = [{
  field: '#div-cnpj',
  required: true
}, {
  field: '#div-razao-social',
  required: true
}, {
  field: '#div-nome-fantasia',
  required: true
}, {
  field: '#div-indicador-inscricao-estadual',
  required: true
}, {
  field: '#div-inscricao-estadual',
  required: false
}, {
  field: '#div-inscricao-municipal',
  required: false
}, {
  field: '#div-situacao-cnpj',
  required: false
}, {
  field: '#div-recolhimento',
  required: true
}];
var changePessoaTipo = {
  display: {
    juridica: function juridica() {
      $(pessoaFisicaElements).each(function () {
        setFieldDisplay.hide(this.field);
      });
      $(pessoaJuridicaElements).each(function () {
        setFieldDisplay.show(this.field, this.required);
      });
    },
    fisica: function fisica() {
      $(pessoaJuridicaElements).each(function () {
        setFieldDisplay.hide(this.field);
      });
      $(pessoaFisicaElements).each(function () {
        setFieldDisplay.show(this.field, this.required);
      });
    }
  }
}; //verificando cnpj no receita ws

var receitaWS = function receitaWS(cnpj) {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'https://www.receitaws.com.br/v1/cnpj/' + removeNonNumericsCaracters(cnpj),
    //Url da Action Aqui
    success: function success(data) {
      $('#razaoSocial').val(data.nome);
      $('#nomeFantasia').val(data.fantasia);
      $('#situacaoCNPJ').val(data.situacao);
      $('#cep').val(data.cep.replace('.', '')).trigger('change');
    }
  });
}; //pegando cidades do estado


var getCities = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(state, city) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $.ajax({
              type: 'GET',
              dataType: 'json',
              url: url + '/api/v1/cidades/' + state,
              //Url da Action Aqui
              success: function success(data) {
                $('#cidade').empty().trigger('change'); //limpando select2 antes de adicionar cidades

                $('#cidade').prepend('<option disabled>Selecione</option>'); //adicionando oção padrão

                $('#cidade').val('Selecione').trigger('change'); //selecionado

                $(data).each(function () {
                  var option;

                  if (city) {
                    var selected = this.title == city ? true : false;
                    option = new Option(this.title, this.id, selected, selected);
                  } else {
                    option = new Option(this.title, this.id, false, false);
                  }

                  $('#cidade').append(option);
                });
                $('#cidade').prop('disabled', false); //ativando select
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCities(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var viaCep = function viaCep(cep) {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'https://viacep.com.br/ws/' + removeNonNumericsCaracters(cep) + '/json',
    //Url da Action Aqui
    success: function success(data) {
      $('#logradouro').val(data.logradouro);
      $('#complemento').val(data.complemento);
      $('#bairro').val(data.bairro);
      $('#uf option').filter(function () {
        return this.text == data.uf;
      }).attr('selected', true);
      $('#uf').trigger('change.select2');
      var selectedStated = $('#uf').val();
      getCities(selectedStated, data.localidade);
    }
  });
}; //aplicando mascaras


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

  $('#cidade').prepend('<option selected disabled>Carregando...</option>'); //exibe carregando na lista de cidades

  getCities($(this).val());
});
$('#cep').on('change keyup', function () {
  if ($(this).valid()) {
    viaCep($(this).val());
  }
});

var validate_function = function validate_function(element) {
  if (!$(element).hasClass('note-editable')) {
    $(element).valid();
  } else {
    element = $(element).parent().parent().parent().find('textarea');
    $(element).valid();
  }
};

$('#numero').mask('000009');
$('#fornecedorForm').validate({
  errorClass: 'is-invalid error',
  validClass: 'is-valid',
  errorPlacement: function errorPlacement(error, element) {
    if (element.hasClass('group-error')) {
      error.insertAfter(element.next('.select2-container')); // TODO: Corrigir posicionamento do erro com o select2
    } else element.after(error); // default error placement

  },
  onkeyup: validate_function,
  onfocusout: validate_function,
  //debug: true, //retira essa linha, para o form voltar a funcionar
  rules: {
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
      phone: 'both'
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

var addEmailTelefone = function addEmailTelefone(element) {
  uid = uid + 1;
  var newTelefoneField;
  var newEmailField; // corrigindo nome para campos de contato adicionas

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
      phone: 'both'
    });
    $('input.telefone-adicional' + uid).mask(telefoneMask, telefoneMaskOptions);
  } else if (element.attr('data-add') == 'email') {
    $('.' + element.attr('data-append')).append(newEmailField);
    $('input.email-adicional' + uid).empty();
    $('input.email-adicional' + uid).rules('add', {
      required: true,
      email: true
    });
  }

  $('.button-del').delegate('div', 'click', function () {
    $('[data-toggle="tooltip"]').tooltip('hide'); //remover tooltip

    $('.' + $(this).parent().attr('data-del')).remove();
  });
  $('[data-toggle="tooltip"]').tooltip();
};

var fillContactsFields = function fillContactsFields() {
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
        var element = $('input[name="telefone"]');
        var tipo = $('select[name="telefoneTipo"]');
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
        var _element = $('input[name="email"]');

        var _tipo = $('select[name="emailTipo"]');

        _element.val(value.contato);

        _tipo.val(value.tipo);

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

  if (contatosData.pessoasContatos.length > 0) $('#sem-contato-adicional').hide();
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

      if (currentAddContact == value.pessoa_contato_id) {
        if (value.qual_contato == 'Telefone' && !addedEmail.includes(value.id)) {
          if (firstTelefone == 0) {
            $('.contatos-adicional' + contatosAdicionais + ' .telefone-field input').val(value.contato);
            $('.contatos-adicional' + contatosAdicionais + ' .telefone-field select').val(value.tipo);
            firstTelefone = 1;
          } else {
            addEmailTelefone(fieldTelefone);
            $('input[name="contato-adicional[' + contatosAdicionais + '][telefone][' + uid + '][telefone]"]').val(value.contato);
            $('select[name="contato-adicional[' + contatosAdicionais + '][telefone][' + uid + '][tipo]"]').val(value.tipo);
          }

          addedEmail.push(value.id);
        } else if (value.qual_contato == 'E-mail' && !addedTelefone.includes(value.id)) {
          if (firstEmail == 0) {
            $('.contatos-adicional' + contatosAdicionais + ' .email-field input').val(value.contato);
            $('.contatos-adicional' + contatosAdicionais + ' .email-principal select').val(value.tipo);
            firstEmail = 1;
          } else {
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

var IndicadorInscricaoEstadual = function IndicadorInscricaoEstadual() {
  var IndicadorInscricaoEstadual = $('#indicadorInscricaoEstadual');
  var inscricaoEstadual = $('#inscricaoEstadual');

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
}); //adiconar email/telefone

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
  lang: 'pt-BR',
  height: '300',
  toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'clear']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['link']]],
  disableDragAndDrop: true // onKeyup: function(e) {
  //     $("#observacao").val($(this).code());
  //   },

});
$('#uf').select2();
$('#cidade').select2();
$('[data-toggle="tooltip"]').tooltip(); // capturando form submit

$('form#fornecedorForm').on('submit', function () {
  $('.collapse').collapse('show'); //expande todas os accordion ao enviar
  //aguarda um tempo antes de enviar

  setTimeout(function () {
    return false; // desativa envio padrão do formulario
  }, 1000);
});

/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./resources/js/fornecedores.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Projetos\laravel-crud\resources\js\fornecedores.js */"./resources/js/fornecedores.js");


/***/ })

/******/ });