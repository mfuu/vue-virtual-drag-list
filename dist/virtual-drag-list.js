/*!
 * vue-virtual-drag-list v2.7.3
 * open source under the MIT license
 * https://github.com/mfuu/vue-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.VirtualDragList = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var VirtualProps = {
    dataSource: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    dataKey: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      "default": 'vertical'
    },
    keeps: {
      type: Number,
      "default": 30
    },
    size: {
      type: Number
    },
    draggable: {
      type: [Function, String]
    },
    handle: {
      type: [Function, String]
    },
    group: {
      type: [String, Object]
    },
    delay: {
      type: Number,
      "default": 0
    },
    animation: {
      type: Number,
      "default": 150
    },
    autoScroll: {
      type: Boolean,
      "default": true
    },
    scrollThreshold: {
      type: Number,
      "default": 55
    },
    keepOffset: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    fallbackOnBody: {
      type: Boolean,
      "default": false
    },
    pressDelay: {
      type: Number,
      "default": 0
    },
    pressDelayOnTouchOnly: {
      type: Boolean,
      "default": false
    },
    rootTag: {
      type: String,
      "default": 'div'
    },
    wrapTag: {
      type: String,
      "default": 'div'
    },
    headerTag: {
      type: String,
      "default": 'div'
    },
    footerTag: {
      type: String,
      "default": 'div'
    },
    itemTag: {
      type: String,
      "default": 'div'
    },
    wrapClass: {
      type: String,
      "default": ''
    },
    wrapStyle: {
      type: Object
    },
    itemStyle: {
      type: Object
    },
    itemClass: {
      type: String,
      "default": ''
    },
    ghostClass: {
      type: String,
      "default": ''
    },
    ghostStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    chosenClass: {
      type: String,
      "default": ''
    }
  };
  var SlotsProps = {
    tag: {
      type: String,
      "default": 'div'
    },
    event: {
      type: String
    },
    dataKey: {
      type: [String, Number]
    },
    isHorizontal: {
      type: Boolean
    }
  };

  function debounce(func) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timer = null;
    var result;
    var debounced = function debounced() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (timer) clearTimeout(timer);
      if (immediate) {
        var callNow = !timer;
        timer = setTimeout(function () {
          timer = null;
        }, delay);
        if (callNow) result = func.apply(this, args);
      } else {
        timer = setTimeout(function () {
          func.apply(_this, args);
        }, delay);
      }
      return result;
    };
    debounced.cancel = function () {
      clearTimeout(timer);
      timer = null;
    };
    return debounced;
  }
  function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
      return (o || {})[k];
    }, item);
  }

  var Range = /*#__PURE__*/_createClass(function Range() {
    _classCallCheck(this, Range);
    this.start = 0;
    this.end = 0;
    this.front = 0;
    this.behind = 0;
  });
  var CalcSize = /*#__PURE__*/_createClass(function CalcSize() {
    _classCallCheck(this, CalcSize);
    this.average = undefined;
    this.total = undefined;
    this.fixed = undefined;
    this.header = undefined;
    this.footer = undefined;
  });
  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND'
  };
  var LEADING_BUFFER = 2;
  function Virtual(options, callback) {
    this.options = options;
    this.callback = callback;
    this.sizes = new Map(); // store item size

    this.calcIndex = 0; // record last index
    this.calcType = CACLTYPE.INIT;
    this.calcSize = new CalcSize();
    this.direction = '';
    this.offset = 0;
    this.range = new Range();
    if (options) this.checkIfUpdate(0, options.keeps - 1);
  }
  Virtual.prototype = {
    constructor: Virtual,
    updateUniqueKeys: function updateUniqueKeys(value) {
      this.options.uniqueKeys = value;
    },
    // Deletes data that is not in the current list
    updateSizes: function updateSizes(uniqueKeys) {
      var _this = this;
      this.sizes.forEach(function (v, k) {
        if (!uniqueKeys.includes(k)) _this.sizes["delete"](k);
      });
    },
    updateRange: function updateRange() {
      var _this2 = this;
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (n > 10) return;
      // check if need to update until loaded enough list item
      var start = this.range.start;
      if (this.isFront()) {
        start -= LEADING_BUFFER;
      } else if (this.isBehind()) {
        start += LEADING_BUFFER;
      }
      var length = Math.min(this.options.keeps, this.options.uniqueKeys.length);
      if (this.sizes.size >= length - LEADING_BUFFER) {
        this.handleUpdate(start, this.getEndByStart(start));
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(function () {
            return _this2.updateRange(n++);
          });
        } else {
          setTimeout(function () {
            return _this2.updateRange(n++);
          }, 3);
        }
      }
    },
    handleScroll: function handleScroll(offset) {
      this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
      this.offset = offset;
      var scrolls = this.getScrollItems(offset);
      if (this.isFront()) {
        this.handleScrollFront(scrolls);
      } else if (this.isBehind()) {
        this.handleScrollBehind(scrolls);
      }
    },
    isFront: function isFront() {
      return this.direction === DIRECTION.FRONT;
    },
    isBehind: function isBehind() {
      return this.direction === DIRECTION.BEHIND;
    },
    isFixed: function isFixed() {
      return this.calcType === CACLTYPE.FIXED;
    },
    getScrollItems: function getScrollItems(offset) {
      var _this$calcSize = this.calcSize,
        fixed = _this$calcSize.fixed,
        header = _this$calcSize.header;
      if (header) offset -= header;
      if (offset <= 0) return 0;
      if (this.isFixed()) return Math.floor(offset / fixed);
      var low = 0,
        high = this.options.uniqueKeys.length;
      var middle = 0,
        middleOffset = 0;
      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleOffset = this.getOffsetByIndex(middle);
        if (middleOffset === offset) return middle;else if (middleOffset < offset) low = middle + 1;else if (middleOffset > offset) high = middle - 1;
      }
      return low > 0 ? --low : 0;
    },
    handleScrollFront: function handleScrollFront(scrolls) {
      if (scrolls > this.range.start) return;
      var start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0);
      this.checkIfUpdate(start, this.getEndByStart(start));
    },
    handleScrollBehind: function handleScrollBehind(scrolls) {
      if (scrolls < this.range.start + Math.round(this.options.keeps / 3)) return;
      this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
    },
    checkIfUpdate: function checkIfUpdate(start, end) {
      var _this$options = this.options,
        uniqueKeys = _this$options.uniqueKeys,
        keeps = _this$options.keeps;
      if (uniqueKeys.length && uniqueKeys.length <= keeps) {
        start = 0;
        end = uniqueKeys.length - 1;
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1;
      }
      if (this.range.start !== start) this.handleUpdate(start, end);
    },
    handleUpdate: function handleUpdate(start, end) {
      this.range.start = start;
      this.range.end = end;
      this.range.front = this.getFrontOffset();
      this.range.behind = this.getBehindOffset();
      this.callback(_objectSpread2({}, this.range));
    },
    getFrontOffset: function getFrontOffset() {
      if (this.isFixed()) {
        return this.calcSize.fixed * this.range.start;
      } else {
        return this.getOffsetByIndex(this.range.start);
      }
    },
    getBehindOffset: function getBehindOffset() {
      var last = this.getLastIndex();
      if (this.isFixed()) {
        return (last - this.range.end) * this.calcSize.fixed;
      }
      if (this.calcIndex === last) {
        return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end);
      }
      return (last - this.range.end) * this.getItemSize();
    },
    getOffsetByIndex: function getOffsetByIndex(index) {
      if (!index) return 0;
      var offset = 0;
      for (var i = 0; i < index; i++) {
        var size = this.sizes.get(this.options.uniqueKeys[i]);
        offset = offset + (typeof size === 'number' ? size : this.getItemSize());
      }
      this.calcIndex = Math.max(this.calcIndex, index - 1);
      this.calcIndex = Math.min(this.calcIndex, this.getLastIndex());
      return offset;
    },
    getEndByStart: function getEndByStart(start) {
      return Math.min(start + this.options.keeps - 1, this.getLastIndex());
    },
    getLastIndex: function getLastIndex() {
      var _this$options2 = this.options,
        uniqueKeys = _this$options2.uniqueKeys,
        keeps = _this$options2.keeps;
      return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
    },
    getItemSize: function getItemSize() {
      return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
    },
    handleItemSizeChange: function handleItemSizeChange(key, size) {
      this.sizes.set(key, size);
      if (this.calcType === CACLTYPE.INIT) {
        this.calcType = CACLTYPE.FIXED;
        this.calcSize.fixed = size;
      } else if (this.isFixed() && this.calcSize.fixed !== size) {
        this.calcType = CACLTYPE.DYNAMIC;
        this.calcSize.fixed = undefined;
      }
      // In the case of non-fixed heights, the average height and the total height are calculated
      if (this.calcType !== CACLTYPE.FIXED) {
        this.calcSize.total = _toConsumableArray(this.sizes.values()).reduce(function (t, i) {
          return t + i;
        }, 0);
        this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
      }
    },
    handleSlotSizeChange: function handleSlotSizeChange(key, size) {
      this.calcSize[key] = size;
    }
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortableDnd_min = createCommonjsModule(function (module, exports) {
  !function (t, e) {
     module.exports = e() ;
  }(commonjsGlobal, function () {

    function B(e, t) {
      var n,
        o = Object.keys(e);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), o.push.apply(o, n)), o;
    }
    function l(o) {
      for (var t = 1; t < arguments.length; t++) {
        var i = null != arguments[t] ? arguments[t] : {};
        t % 2 ? B(Object(i), !0).forEach(function (t) {
          var e, n;
          e = o, n = i[t = t], (t = function (t) {
            t = function (t, e) {
              if ("object" != typeof t || null === t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 === n) return ("string" === e ? String : Number)(t);
              n = n.call(t, e || "default");
              if ("object" != typeof n) return n;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }(t, "string");
            return "symbol" == typeof t ? t : String(t);
          }(t)) in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : B(Object(i)).forEach(function (t) {
          Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t));
        });
      }
      return o;
    }
    function R(t) {
      return (R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }
    var F = {
        capture: !1,
        passive: !1
      },
      H = /\s+/g,
      c = {
        start: ["touchstart", "mousedown"],
        move: ["touchmove", "mousemove"],
        end: ["touchend", "touchcancel", "mouseup"]
      };
    function t(t) {
      if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
    }
    var e,
      d = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
      L = t(/Edge/i),
      a = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
      k = (e = !1, document.addEventListener("checkIfSupportPassive", null, {
        get passive() {
          return e = !0;
        }
      }), e),
      u = "undefined" == typeof window || "undefined" == typeof document ? "" : (o = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"], "ms" !== (o = (Array.prototype.slice.call(o).join("").match(/-(moz|webkit|ms)-/) || "" === o.OLink && ["", "o"])[1]) ? o && o.length ? o[0].toUpperCase() + o.substr(1) : "" : "ms");
    function i(t, e) {
      t.style["".concat(u, "TransitionDuration")] = null == e ? "" : "".concat(e, "ms");
    }
    function h(t, e) {
      t.style["".concat(u, "Transform")] = e ? "".concat(e) : "";
    }
    function p(t, e, n) {
      window.addEventListener ? t.addEventListener(e, n, !(!k && d) && F) : window.attachEvent && t.attachEvent("on" + e, n);
    }
    function n(t, e, n) {
      window.removeEventListener ? t.removeEventListener(e, n, !(!k && d) && F) : window.detachEvent && t.detachEvent("on" + e, n);
    }
    function I(t) {
      var e = t,
        n = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0],
        t = n ? document.elementFromPoint(n.clientX, n.clientY) : t.target;
      return !n || "clientX" in e || (e.clientX = n.clientX, e.clientY = n.clientY, e.pageX = n.pageX, e.pageY = n.pageY, e.screenX = n.screenX, e.screenY = n.screenY), {
        touch: n,
        event: e,
        target: t
      };
    }
    function f(t, e) {
      for (var n = {
        top: 0,
        left: 0,
        height: t.offsetHeight,
        width: t.offsetWidth
      }; n.top += t.offsetTop, n.left += t.offsetLeft, (t = t.parentNode) && t !== e;);
      return n;
    }
    function m() {
      var t = document.scrollingElement;
      return t || document.documentElement;
    }
    function g(t) {
      var e,
        n,
        o,
        i,
        r,
        a,
        s,
        l = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        c = 2 < arguments.length ? arguments[2] : void 0;
      if (t.getBoundingClientRect || t === window) {
        if (t !== window && t.parentNode && t !== m()) {
          if (n = (e = t.getBoundingClientRect()).top, o = e.left, i = e.bottom, r = e.right, a = e.height, s = e.width, l.parent && t.parentNode !== t.ownerDocument.body) for (var u, h = t.parentNode; h && h.getBoundingClientRect && h !== t.ownerDocument.body;) {
            if ((u = h.getBoundingClientRect()).height < a) return n = u.top, o = u.left, i = u.bottom, r = u.right, a = u.height, {
              top: n,
              left: o,
              bottom: i,
              right: r,
              width: s = u.width,
              height: a
            };
            h = h.parentNode;
          }
        } else o = n = 0, i = window.innerHeight, r = window.innerWidth, a = window.innerHeight, s = window.innerWidth;
        if ((l.block || l.relative) && t !== window && (c = c || t.parentNode, !d)) do {
          if (c && c.getBoundingClientRect && ("none" !== b(c, "transform") || l.relative && "static" !== b(c, "position"))) {
            var p = c.getBoundingClientRect();
            n -= p.top + parseInt(b(c, "border-top-width")), o -= p.left + parseInt(b(c, "border-left-width")), i = n + e.height, r = o + e.width;
            break;
          }
        } while (c = c.parentNode);
        return {
          top: n,
          left: o,
          bottom: i,
          right: r,
          width: s,
          height: a
        };
      }
    }
    function W(t, e, n, o) {
      if (t) {
        n = n || document;
        do {
          if (null == e) {
            var i = Array.prototype.slice.call(n.children),
              r = i.indexOf(t);
            if (-1 < r) return i[r];
            for (var a = 0; a < i.length; a++) if (z(t, i[a])) return i[a];
          } else if ((">" !== e[0] || t.parentNode === n) && s(t, e) || o && t === n) return t;
        } while (t = t.parentNode);
      }
      return null;
    }
    function z(t, e) {
      if (t && e) {
        if (e.compareDocumentPosition) return e === t || 16 & e.compareDocumentPosition(t);
        if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
        for (; t = t.parentNode;) if (t === e) return 1;
      }
    }
    function v(t, e, n) {
      var o;
      t && e && (t.classList ? t.classList[n ? "add" : "remove"](e) : (o = (" " + t.className + " ").replace(H, " ").replace(" " + e + " ", " "), t.className = (o + (n ? " " + e : "")).replace(H, " ")));
    }
    function s(t, e) {
      if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
        if (t.matches) return t.matches(e);
        if (t.msMatchesSelector) return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
      } catch (t) {
        return;
      }
    }
    function q(t, e) {
      return t.top !== e.top || t.left !== e.left;
    }
    function b(t, e, n) {
      var o = t && t.style;
      if (o) {
        if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
        o[e = e in o || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = n + ("string" == typeof n ? "" : "px");
      }
    }
    var y = "Sortable" + Date.now(),
      o = {
        sortable: null,
        nodes: []
      },
      w = l({}, o),
      _ = l({}, o),
      S = {};
    function V(t) {
      this.options = t || {}, this.groupName = t.group.name || "group_" + Number(Math.random().toString().slice(-3) + Date.now()).toString(32);
    }
    function U() {
      this.autoScrollAnimationFrame = null, this.speed = {
        x: 10,
        y: 10
      };
    }
    function Z(t) {
      this.options = t, this.animations = [];
    }
    function G() {
      this.helper = null, this.distance = {
        x: 0,
        y: 0
      };
    }
    V.prototype = {
      allowDrag: function (t) {
        return this.options.multiple && S[this.groupName] && S[this.groupName].length && -1 < S[this.groupName].indexOf(t);
      },
      getHelper: function () {
        var n = document.createElement("div");
        return S[this.groupName].forEach(function (t, e) {
          t = t.cloneNode(!0);
          t.style = "\n        opacity: ".concat(0 === e ? 1 : .5, ";\n        position: absolute;\n        z-index: ").concat(e, ";\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n      "), n.appendChild(t);
        }), n;
      },
      select: function (t, e, n, o) {
        var i;
        e && (S[this.groupName] || (S[this.groupName] = []), i = S[this.groupName].indexOf(e), v(e, this.options.selectedClass, i < 0), t = l(l({}, o), {}, {
          event: t
        }), i < 0 ? (S[this.groupName].push(e), o.sortable._dispatchEvent("onSelect", t)) : (S[this.groupName].splice(i, 1), o.sortable._dispatchEvent("onDeselect", t)), S[this.groupName].sort(function (t, e) {
          return t = f(t, n), e = f(e, n), t.top == e.top ? t.left - e.left : t.top - e.top;
        }));
      },
      onDrag: function (e, t) {
        w.sortable = t, w.nodes = S[this.groupName].map(function (t) {
          return {
            node: t,
            rect: g(t),
            offset: f(t, e)
          };
        }), _.sortable = t;
      },
      onTrulyStarted: function (e, t) {
        t.animator.collect(e, null, e.parentNode), S[this.groupName].forEach(function (t) {
          t != e && t.parentNode.removeChild(t);
        }), t.animator.animate();
      },
      onChange: function (t, e) {
        var n = g(t),
          o = f(t, e.el);
        _.sortable = e, _.nodes = S[this.groupName].map(function (t) {
          return {
            node: t,
            rect: n,
            offset: o
          };
        });
      },
      onDrop: function (t, n, e, o, i) {
        var r = this,
          a = (_.sortable.animator.collect(n, null, n.parentNode), S[this.groupName].indexOf(n)),
          o = (S[this.groupName].forEach(function (t, e) {
            e < a ? n.parentNode.insertBefore(t, n) : (e = 0 < e ? S[r.groupName][e - 1] : n, n.parentNode.insertBefore(t, e.nextSibling));
          }), w.sortable = o.sortable, _.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: g(t),
              offset: f(t, e)
            };
          }), _.sortable.el != w.sortable.el || this._offsetChanged(w.nodes, _.nodes)),
          i = l(l({}, i()), {}, {
            changed: o,
            event: t
          });
        _.sortable.el != w.sortable.el && w.sortable._dispatchEvent("onDrop", i), _.sortable._dispatchEvent("onDrop", i), _.sortable.animator.animate();
      },
      _offsetChanged: function (t, n) {
        return !!t.find(function (e) {
          return q(n.find(function (t) {
            return t.node === e.node;
          }).offset, e.offset);
        });
      }
    }, window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
      return setTimeout(t, 17);
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    }), U.prototype = {
      clear: function () {
        null != this.autoScrollAnimationFrame && (cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = null);
      },
      update: function (t, e, n, o) {
        var i = this;
        cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = requestAnimationFrame(function () {
          n && o && i.autoScroll(t, e, o), i.update(t, e, n, o);
        });
      },
      autoScroll: function (t, e, n) {
        var o, i, r, a, s, l, c, u, h, p, d, f;
        t && (o = n.clientX, n = n.clientY, void 0 !== o) && void 0 !== n && (h = g(t)) && (d = t.scrollTop, i = t.scrollLeft, r = t.scrollHeight, p = t.scrollWidth, a = h.top, s = h.right, l = h.bottom, c = h.left, f = h.height, h = h.width, n < a || s < o || l < n || o < c || (u = 0 < d && a <= n && n <= a + e, h = i + h < p && o <= s && s - e <= o, p = d + f < r && n <= l && l - e <= n, (f = d = 0) < i && c <= o && o <= c + e && (d = Math.floor(Math.max(-1, (o - c) / e - 1) * this.speed.x)), h && (d = Math.ceil(Math.min(1, (o - s) / e + 1) * this.speed.x)), u && (f = Math.floor(Math.max(-1, (n - a) / e - 1) * this.speed.y)), (f = p ? Math.ceil(Math.min(1, (n - l) / e + 1) * this.speed.y) : f) && (t.scrollTop += f), d && (t.scrollLeft += d)));
      }
    }, Z.prototype = {
      collect: function (t, e, n, o) {
        var i = this;
        n && (n = Array.prototype.slice.call(n.children), e = (t = this._getRange(n, t, e, o)).start, t = t.end, this.animations.length = 0, n.slice(e, t + 1).forEach(function (t) {
          t !== o && t !== Y.helper && i.animations.push({
            node: t,
            rect: g(t)
          });
        }));
      },
      animate: function () {
        var n = this;
        this.animations.forEach(function (t) {
          var e = t.node,
            t = t.rect;
          n._excute(e, t);
        });
      },
      _excute: function (t, e) {
        var n = e.left,
          e = e.top,
          o = g(t),
          e = e - o.top,
          n = n - o.left,
          o = (i(t), h(t, "translate3d(".concat(n, "px, ").concat(e, "px, 0)")), t.offsetWidth, this.options.animation);
        i(t, o), h(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
          i(t), h(t, ""), t.animated = null;
        }, o);
      },
      _getRange: function (t, e, n) {
        var o,
          e = t.indexOf(e),
          n = t.indexOf(n);
        return n < e && (e = (o = [n, e])[0], n = o[1]), e < 0 && (e = n, n = t.length - 1), {
          start: e,
          end: n = n < 0 ? t.length - 1 : n
        };
      }
    }, G.prototype = {
      get node() {
        return this.helper;
      },
      destroy: function () {
        this.helper && this.helper.parentNode && this.helper.parentNode.removeChild(this.helper), this.helper = null, this.distance = {
          x: 0,
          y: 0
        };
      },
      move: function (t, e) {
        this.helper && h(this.helper, "translate3d(".concat(t, "px, ").concat(e, "px, 0)"));
      },
      init: function (t, e, n, o) {
        if (!this.helper) {
          var i,
            r = o.fallbackOnBody,
            a = o.ghostClass,
            o = o.ghostStyle,
            o = void 0 === o ? {} : o,
            r = r ? document.body : n,
            s = (this.helper = e.cloneNode(!0), v(this.helper, a, !0), l({
              "box-sizing": "border-box",
              top: t.top,
              left: t.left,
              width: t.width,
              height: t.height,
              position: "fixed",
              opacity: "0.8",
              "z-index": 1e5,
              "pointer-events": "none"
            }, o));
          for (i in s) b(this.helper, i, s[i]);
          n = this.helper, e = "none", n.style["".concat(u, "Transition")] = e ? "none" === e ? "none" : "".concat(e) : "", h(this.helper, "translate3d(0px, 0px, 0px)"), r.appendChild(this.helper);
          a = this.distance.x / parseInt(this.helper.style.width) * 100, t = this.distance.y / parseInt(this.helper.style.height) * 100;
          b(this.helper, "transform-origin", "".concat(a, "% ").concat(t, "%")), b(this.helper, "transform", "translateZ(0)"), b(this.helper, "will-change", "transform");
        }
      }
    };
    function r() {
      var t,
        e = {
          from: l({}, A),
          to: l({}, j)
        };
      return T && (t = {
        from: l({}, w),
        to: l({}, _)
      }, e.from = l(l({}, t.from), e.from), e.to = l(l({}, t.to), e.to)), e;
    }
    var N,
      E,
      x,
      D,
      C,
      T,
      O,
      J,
      K = {
        sortable: null,
        group: null,
        node: null,
        rect: {},
        offset: {}
      },
      M = [],
      P = new G(),
      Q = new U(),
      A = l({}, K),
      j = l({}, K),
      X = {
        x: 0,
        y: 0
      },
      $ = function (t) {
        var e = {},
          n = t.group;
        n && "object" == R(n) || (n = {
          name: n,
          pull: !0,
          put: !0
        }), e.name = n.name, e.pull = n.pull, e.put = n.put, t.group = e;
      };
    function Y(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      (t[y] = this).el = t, this.ownerDocument = t.ownerDocument, this.options = e = Object.assign({}, e);
      var n,
        o,
        i = {
          disabled: !1,
          group: "",
          animation: 150,
          multiple: !1,
          draggable: null,
          handle: null,
          onDrag: null,
          onMove: null,
          onDrop: null,
          onChange: null,
          autoScroll: !0,
          scrollThreshold: 25,
          delay: 0,
          delayOnTouchOnly: !1,
          touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
          ghostClass: "",
          ghostStyle: {},
          chosenClass: "",
          selectedClass: "",
          fallbackOnBody: !1,
          stopPropagation: !1,
          supportTouch: "ontouchstart" in window,
          emptyInsertThreshold: 5
        };
      for (n in i) n in this.options || (this.options[n] = i[n]);
      for (o in $(e), this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));
      p(t, this.options.supportTouch ? "touchstart" : "mousedown", this._onDrag), M.push(t), this.multiplayer = new V(this.options), this.animator = new Z(this.options);
    }
    return (Y.prototype = {
      constructor: Y,
      destroy: function () {
        this._dispatchEvent("destroy", this), this.el[y] = null;
        for (var t = 0; t < c.start.length; t++) n(this.el, c.start[t], this._onDrag);
        this._clearState(), M.splice(M.indexOf(this.el), 1), this.el = null;
      },
      option: function (t, e) {
        var n = this.options;
        if (void 0 === e) return n[t];
        n[t] = e, "group" === t && $(n);
      },
      _onDrag: function (t) {
        if (!this.options.disabled && this.options.group.pull && (!/mousedown|pointerdown/.test(t.type) || 0 === t.button)) {
          var e = I(t),
            n = e.touch,
            o = e.event,
            e = e.target;
          if (!(a && e && "SELECT" === e.tagName.toUpperCase() || e === this.el)) {
            var i = this.options,
              r = i.draggable,
              i = i.handle;
            if (("function" != typeof i || i(t)) && ("string" != typeof i || s(e, i))) {
              if ("function" == typeof r) {
                i = r(t);
                if (!i) return;
                !function (e) {
                  if (e) {
                    var t = document.createElement("div");
                    try {
                      return t.appendChild(e.cloneNode(!0)), 1 == e.nodeType;
                    } catch (t) {
                      return e == window || e == document;
                    }
                  }
                }(i) || (E = i);
              } else E = W(e, r, this.el, !1);
              E && !E.animated && this._prepareStart(n, o);
            }
          }
        }
      },
      _prepareStart: function (t, e) {
        var n = this,
          o = E.parentNode,
          i = ((D = e).sortable = this, D.group = E.parentNode, (T = this.options.multiple && this.multiplayer.allowDrag(E)) && this.multiplayer.onDrag(this.el, this), g(E)),
          r = f(E, this.el),
          r = (A = {
            sortable: this,
            group: o,
            node: E,
            rect: i,
            offset: r
          }, j.group = o, j.sortable = this, P.distance = {
            x: e.clientX - i.left,
            y: e.clientY - i.top
          }, p(document, "touchend", this._onDrop), p(document, "touchcancel", this._onDrop), p(document, "mouseup", this._onDrop), this.options),
          o = r.delay,
          e = r.delayOnTouchOnly;
        if (!o || e && !t || L || d) this._onStart(t);else {
          for (var a = 0; a < c.end.length; a++) p(this.ownerDocument, c.end[a], this._cancelStart);
          for (var s = 0; s < c.move.length; s++) p(this.ownerDocument, c.move[s], this._delayMoveHandler);
          J = setTimeout(function () {
            return n._onStart(t);
          }, o);
        }
      },
      _delayMoveHandler: function (t) {
        t = t.touches ? t.touches[0] : t;
        Math.max(Math.abs(t.clientX - D.clientX), Math.abs(t.clientY - D.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
      },
      _cancelStart: function () {
        clearTimeout(J);
        for (var t = 0; t < c.end.length; t++) n(this.ownerDocument, c.end[t], this._cancelStart);
        for (var e = 0; e < c.move.length; e++) n(this.ownerDocument, c.move[e], this._delayMoveHandler);
      },
      _onStart: function (t) {
        N = this.el, p(document, t ? "touchmove" : "mousemove", this._nearestSortable);
        try {
          document.selection ? setTimeout(function () {
            document.selection.empty();
          }, 0) : window.getSelection().removeAllRanges();
        } catch (t) {}
      },
      _onTrulyStarted: function () {
        var t;
        C || (this._dispatchEvent("onDrag", l(l({}, r()), {}, {
          event: D
        })), T && this.multiplayer.onTrulyStarted(E, this), t = T ? this.multiplayer.getHelper() : E, P.init(A.rect, t, this.el, this.options), Y.helper = P.node, v(E, this.options.chosenClass, !0), a && b(document.body, "user-select", "none"));
      },
      _nearestSortable: function (t) {
        var e, n, o, i, r, a, s;
        this._preventEvent(t), D && E && (e = (n = t).clientX, n = n.clientY, o = e - X.x, i = n - X.y, X.x = e, X.y = n, void 0 !== e && void 0 !== n && Math.abs(o) <= 0 && Math.abs(i) <= 0 || (n = (e = I(t)).event, o = e.target, r = n.clientX, a = n.clientY, M.some(function (t) {
          var e,
            n,
            o = t[y].options.emptyInsertThreshold;
          if (o) return n = g(t, {
            parent: !0
          }), e = r >= n.left - o && r <= n.right + o, n = a >= n.top - o && a <= n.bottom + o, e && n ? s = t : void 0;
        }), i = s, this._onTrulyStarted(), C = n, P.move(n.clientX - D.clientX, n.clientY - D.clientY), this._autoScroll(o), i && (N = i)[y]._onMove(n, o)));
      },
      _allowPut: function () {
        var t, e;
        return D.sortable.el === this.el || !!this.options.group.put && (t = this.options.group.name, (e = D.sortable.options.group).name) && t && e.name === t;
      },
      _onMove: function (t, e) {
        if (this._dispatchEvent("onMove", l(l({}, r()), {}, {
          event: t
        })), this._allowPut()) {
          if (x = W(e, this.options.draggable, N, !1)) {
            if (x === O) return;
            if ((O = x) === E) return;
            if (x.animated || z(x, E)) return;
          }
          N !== A.sortable.el ? e !== N && function (t, e, n) {
            for (var o = t.lastElementChild; o && (o === e || "none" === b(o, "display") || n && !s(o, n));) o = o.previousElementSibling;
            return o;
          }(N, P.node) ? x && this._onInsert(t, !1) : this._onInsert(t, !0) : x && this._onChange(t);
        }
      },
      _autoScroll: function (t) {
        var t = function (t, e) {
            if (t && t.getBoundingClientRect) {
              var n = t,
                o = !1;
              do {
                if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                  var i = b(n);
                  if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                    if (!n.getBoundingClientRect || n === document.body) return m();
                    if (o || e) return n;
                    o = !0;
                  }
                }
              } while (n = n.parentNode);
            }
            return m();
          }(t, !0),
          e = this.options,
          n = e.autoScroll,
          e = e.scrollThreshold;
        n && Q.update(t, e, D, C);
      },
      _onInsert: function (t, e) {
        var n = e ? E : x,
          o = e ? N : x.parentNode;
        A.sortable.animator.collect(E, null, E.parentNode, E), this.animator.collect(null, n, o, E), T && this.multiplayer.onChange(E, this), j = {
          sortable: this,
          group: o,
          node: n,
          rect: g(n),
          offset: f(n, N)
        }, A.sortable._dispatchEvent("onRemove", l(l({}, r()), {}, {
          event: t
        })), e ? o.appendChild(E) : o.insertBefore(E, x), this._dispatchEvent("onAdd", l(l({}, r()), {}, {
          event: t
        })), A.sortable.animator.animate(), this.animator.animate(), A.group = o, A.sortable = this;
      },
      _onChange: function (t) {
        var e = x.parentNode,
          t = (this.animator.collect(E, x, e), T && this.multiplayer.onChange(E, this), j = {
            sortable: this,
            group: e,
            node: x,
            rect: g(x),
            offset: f(x, N)
          }, this._dispatchEvent("onChange", l(l({}, r()), {}, {
            event: t
          })), f(E, N)),
          n = null,
          n = t.top === j.offset.top ? t.left < j.offset.left ? x.nextSibling : x : t.top < j.offset.top ? x.nextSibling : x;
        e.insertBefore(E, n), this.animator.animate(), A.group = e, A.sortable = this;
      },
      _onDrop: function (t) {
        this._unbindMoveEvents(), this._unbindDropEvents(), this._preventEvent(t), this._cancelStart(), Q.clear(), E && v(E, this.options.chosenClass, !1), E && D && C ? this._onEnd(t) : this.options.multiple && this.multiplayer.select(t, E, N, l({}, A)), this._clearState();
      },
      _onEnd: function (t) {
        var e;
        A.group = D.group, A.sortable = D.sortable, T ? this.multiplayer.onDrop(t, E, N, D, r) : (j.rect = g(E), j.offset = f(E, N), e = j.sortable.el !== A.sortable.el || q(A.offset, j.offset), e = l(l({}, r()), {}, {
          changed: e,
          event: t
        }), j.sortable.el !== A.sortable.el && A.sortable._dispatchEvent("onDrop", e), j.sortable._dispatchEvent("onDrop", e)), a && b(document.body, "user-select", "");
      },
      _preventEvent: function (t) {
        void 0 !== t.preventDefault && t.cancelable && t.preventDefault(), this.options.stopPropagation && (t && t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0);
      },
      _dispatchEvent: function (t, e) {
        t = this.options[t];
        "function" == typeof t && t(e);
      },
      _clearState: function () {
        E = x = D = C = T = O = J = Y.helper = null, X = {
          x: 0,
          y: 0
        }, A = j = l({}, K), P.destroy();
      },
      _unbindMoveEvents: function () {
        for (var t = 0; t < c.move.length; t++) n(document, c.move[t], this._nearestSortable);
      },
      _unbindDropEvents: function () {
        for (var t = 0; t < c.end.length; t++) n(document, c.end[t], this._onDrop);
      }
    }).utils = {
      getRect: g,
      getOffset: f
    }, Y.get = function (t) {
      return t[y];
    }, Y.create = function (t, e) {
      return new Y(t, e);
    }, Y;
  });
  });

  var storeKey = 'virtualSortableState';
  var defaultStore = {
    from: {},
    to: {}
  };
  function Storage() {}
  Storage.prototype = {
    constructor: Storage,
    clear: function clear() {
      localStorage.removeItem(storeKey);
    },
    /**
     * Obtaining Synchronization Data
     * @returns states: { from, to }
     */
    getStore: function getStore() {
      try {
        var result = JSON.parse(localStorage.getItem(storeKey));
        return result || defaultStore;
      } catch (e) {
        return defaultStore;
      }
    },
    /**
     * @returns states: { from, to }
     */
    getValue: function getValue() {
      return new Promise(function (resolve, reject) {
        try {
          var result = JSON.parse(localStorage.getItem(storeKey));
          resolve(result || defaultStore);
        } catch (e) {
          reject(defaultStore);
        }
      });
    },
    /**
     * @param {Object} value { from, to }
     */
    setValue: function setValue(value) {
      return new Promise(function (resolve, reject) {
        try {
          var store = JSON.parse(localStorage.getItem(storeKey));
          var result = JSON.stringify(_objectSpread2(_objectSpread2({}, store), value));
          localStorage.setItem(storeKey, result);
          resolve(result);
        } catch (e) {
          reject(defaultStore);
        }
      });
    }
  };
  var Store = new Storage();

  var attributes = ['group', 'handle', 'disabled', 'draggable', 'ghostClass', 'ghostStyle', 'chosenClass', 'animation', 'autoScroll', 'scrollThreshold', 'fallbackOnBody', 'pressDelay', 'pressDelayOnTouchOnly'];
  var dragEl = null;
  function Sortable(context, callback) {
    this.context = context;
    this.callback = callback;
    this.initialList = _toConsumableArray(context.list);
    this.dynamicList = _toConsumableArray(context.list);
    this.sortable = null;
    this.rangeChanged = false;
    this._init();
  }
  Sortable.prototype = {
    constructor: Sortable,
    destroy: function destroy() {
      this.sortable && this.sortable.destroy();
      this.sortable = null;
    },
    setValue: function setValue(key, value) {
      if (key === 'list') {
        this.initialList = _toConsumableArray(value);
        // When the list data changes when dragging, need to execute onDrag function
        if (dragEl) this._onDrag(dragEl, false);
      } else {
        this.context[key] = value;
        this.sortable.option(key, value);
      }
    },
    _init: function _init() {
      var _this = this;
      var props = attributes.reduce(function (res, key) {
        var name = key;
        if (key === 'pressDelay') name = 'delay';
        if (key === 'pressDelayOnTouchOnly') name = 'delayOnTouchOnly';
        res[name] = _this.context[key];
        return res;
      }, {});
      this.sortable = new sortableDnd_min(this.context.$refs.group, _objectSpread2(_objectSpread2({}, props), {}, {
        list: this.dynamicList,
        onDrag: function onDrag(_ref) {
          var from = _ref.from;
          return _this._onDrag(from.node);
        },
        onAdd: function onAdd(_ref2) {
          var from = _ref2.from,
            to = _ref2.to;
          return _this._onAdd(from, to);
        },
        onRemove: function onRemove(_ref3) {
          var from = _ref3.from,
            to = _ref3.to;
          return _this._onRemove(from, to);
        },
        onChange: function onChange(_ref4) {
          var from = _ref4.from,
            to = _ref4.to;
          return _this._onChange(from, to);
        },
        onDrop: function onDrop(_ref5) {
          var from = _ref5.from,
            to = _ref5.to,
            changed = _ref5.changed;
          return _this._onDrop(from, to, changed);
        }
      }));
    },
    _onDrag: function _onDrag(node) {
      var _arguments = arguments,
        _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var callback, fromList, fromState, store;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              callback = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
              dragEl = node;
              _this2.dynamicList = _toConsumableArray(_this2.initialList);
              fromList = _toConsumableArray(_this2.initialList);
              fromState = _this2._getFromTo({
                node: node
              }, fromList);
              _context.next = 7;
              return Store.setValue({
                from: _objectSpread2({
                  list: fromList
                }, fromState)
              });
            case 7:
              if (!callback) {
                _context.next = 15;
                break;
              }
              _this2.rangeChanged = false;
              _context.next = 11;
              return Store.getValue();
            case 11:
              store = _context.sent;
              _this2.context.$emit('drag', _objectSpread2({
                list: fromList
              }, store));
              _context.next = 16;
              break;
            case 15:
              _this2.rangeChanged = true;
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    _onAdd: function _onAdd(from, to) {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var store, list, index, params;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Store.getValue();
            case 2:
              store = _context2.sent;
              list = _toConsumableArray(_this3.dynamicList);
              index = _this3._getIndex(list, to.node.dataset.key);
              params = _objectSpread2(_objectSpread2({}, store.from), {}, {
                index: index
              });
              if (from.node === to.node) {
                // insert to end of list
                params.index = _this3.dynamicList.length;
                _this3.dynamicList.push(store.from.item);
              } else {
                _this3.dynamicList.splice(index, 0, store.from.item);
              }
              delete params.list;
              _this3.context.$emit('add', _objectSpread2({}, params));
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    _onRemove: function _onRemove(from, to) {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var list, state;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              list = _toConsumableArray(_this4.dynamicList);
              state = _this4._getFromTo(from, list);
              _this4.dynamicList.splice(state.index, 1);
              _this4.context.$emit('remove', _objectSpread2({}, state));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    _onChange: function _onChange(from, to) {
      var _this5 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var fromList, toList, fromState, toState;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              fromList = _toConsumableArray(_this5.dynamicList);
              toList = _toConsumableArray(_this5.dynamicList);
              fromState = _this5._getFromTo(from, fromList);
              toState = _this5._getFromTo(to, toList);
              _this5.dynamicList.splice(fromState.index, 1);
              _this5.dynamicList.splice(toState.index, 0, fromState.item);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    _onDrop: function _onDrop(from, to, changed) {
      var _this6 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var list, index, item, key, store, params;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (_this6.rangeChanged || from.sortable !== to.sortable) {
                dragEl && dragEl.remove();
              }
              list = _toConsumableArray(_this6.dynamicList);
              index = _this6._getIndex(list, from.node.dataset.key);
              item = _this6.initialList[index];
              key = getDataKey(item, _this6.context.dataKey);
              _context5.next = 7;
              return Store.setValue({
                to: {
                  list: _toConsumableArray(_this6.initialList),
                  index: index,
                  item: item,
                  key: key
                }
              });
            case 7:
              _context5.next = 9;
              return Store.getValue();
            case 9:
              store = _context5.sent;
              params = _objectSpread2(_objectSpread2({
                list: list
              }, store), {}, {
                changed: changed
              });
              _this6.context.$emit('drop', params);
              _this6.callback && _this6.callback(params);
              _this6.initialList = _toConsumableArray(list);
              _this6._clear();
            case 15:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    _getFromTo: function _getFromTo(fromTo, list) {
      var key = fromTo.node.dataset.key;
      var index = this._getIndex(list, key);
      var item = list[index];
      return {
        key: key,
        item: item,
        index: index
      };
    },
    _getIndex: function _getIndex(list, key) {
      var _this7 = this;
      return list.findIndex(function (item) {
        return getDataKey(item, _this7.context.dataKey) == key;
      });
    },
    _clear: function _clear() {
      dragEl = null;
      Store.clear();
      this.rangeChanged = false;
    }
  };

  var observer = {
    inject: ['virtualList'],
    data: function data() {
      return {
        observer: null
      };
    },
    mounted: function mounted() {
      var _this = this;
      if (typeof ResizeObserver !== 'undefined') {
        this.observer = new ResizeObserver(function () {
          _this.onSizeChange();
        });
        this.$el && this.observer.observe(this.$el);
      }
    },
    updated: function updated() {
      this.onSizeChange();
    },
    beforeDestroy: function beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
    methods: {
      onSizeChange: function onSizeChange() {
        this.virtualList[this.event](this.dataKey, this.getCurrentSize());
      },
      getCurrentSize: function getCurrentSize() {
        var sizeKey = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
        return this.$el ? this.$el[sizeKey] : 0;
      }
    }
  };
  var Items = Vue.component('virtual-draglist-items', {
    mixins: [observer],
    props: SlotsProps,
    render: function render(h) {
      var tag = this.tag,
        dataKey = this.dataKey;
      return h(tag, {
        key: dataKey,
        attrs: {
          'data-key': dataKey
        }
      }, this.$slots["default"]);
    }
  });
  var Slots = Vue.component('virtual-draglist-slots', {
    mixins: [observer],
    props: SlotsProps,
    render: function render(h) {
      var tag = this.tag,
        dataKey = this.dataKey;
      return h(tag, {
        key: dataKey,
        attrs: {
          role: dataKey
        }
      }, this.$slots["default"]);
    }
  });

  var VirtualDragList = Vue.component('virtual-drag-list', {
    props: VirtualProps,
    data: function data() {
      return {
        list: [],
        uniqueKeys: [],
        virtual: null,
        sortable: null,
        lastItem: null,
        range: new Range()
      };
    },
    provide: function provide() {
      return {
        virtualList: this
      };
    },
    computed: {
      isHorizontal: function isHorizontal() {
        return this.direction !== 'vertical';
      },
      scrollSizeKey: function scrollSizeKey() {
        return this.isHorizontal ? 'scrollWidth' : 'scrollHeight';
      },
      scrollDirectionKey: function scrollDirectionKey() {
        return this.isHorizontal ? 'scrollLeft' : 'scrollTop';
      },
      offsetSizeKey: function offsetSizeKey() {
        return this.isHorizontal ? 'offsetLeft' : 'offsetTop';
      },
      clientSizeKey: function clientSizeKey() {
        return this.isHorizontal ? 'clientWidth' : 'clientHeight';
      }
    },
    watch: {
      dataSource: {
        handler: function handler(val) {
          this.init(val);
        },
        deep: true
      },
      disabled: {
        handler: function handler(val) {
          if (this.sortable) this.sortable.setValue('disabled', val);
        },
        immediate: true
      }
    },
    created: function created() {
      this._initVirtual();
      this.init(this.dataSource);
      this.range.end = this.keeps - 1;
    },
    beforeDestroy: function beforeDestroy() {
      this._destroySortable();
    },
    methods: {
      /**
       * reset component
       */
      reset: function reset() {
        this.scrollToTop();
        this.init(this.dataSource);
      },
      /**
       * git item size by data-key
       * @param {String | Number} key data-key
       */
      getSize: function getSize(key) {
        return this.virtual.sizes.get(key);
      },
      /**
       * Get the current scroll height
       */
      getOffset: function getOffset() {
        var root = this.$refs.root;
        return root ? Math.ceil(root[this.scrollDirectionKey]) : 0;
      },
      /**
       * Scroll to top of list
       */
      scrollToTop: function scrollToTop() {
        var root = this.$refs.root;
        root[this.scrollDirectionKey] = 0;
      },
      /**
       * Scroll to bottom of list
       */
      scrollToBottom: function scrollToBottom() {
        var _this2 = this;
        var _this$$refs = this.$refs,
          bottomItem = _this$$refs.bottomItem,
          root = _this$$refs.root;
        if (bottomItem) {
          var bottom = bottomItem[this.offsetSizeKey];
          this.scrollToOffset(bottom);

          // The first scroll height may change, if the bottom is not reached, execute the scroll method again
          setTimeout(function () {
            var offset = _this2.getOffset();
            var clientSize = Math.ceil(root[_this2.clientSizeKey]);
            var scrollSize = Math.ceil(root[_this2.scrollSizeKey]);
            if (offset + clientSize + 1 < scrollSize) _this2.scrollToBottom();
          }, 5);
        }
      },
      /**
       * Scroll to the specified index position
       * @param {Number} index
       */
      scrollToIndex: function scrollToIndex(index) {
        var _this3 = this;
        if (index >= this.list.length - 1) {
          this.scrollToBottom();
        } else {
          var indexOffset = this.virtual.getOffsetByIndex(index);
          this.scrollToOffset(indexOffset);
          setTimeout(function () {
            var offset = _this3.getOffset();
            var indexOffset = _this3.virtual.getOffsetByIndex(index);
            if (offset !== indexOffset) _this3.scrollToIndex(index);
          }, 5);
        }
      },
      /**
       * Scroll to the specified offset
       * @param {Number} offset
       */
      scrollToOffset: function scrollToOffset(offset) {
        var root = this.$refs.root;
        root[this.scrollDirectionKey] = offset;
      },
      init: function init(list) {
        var _this4 = this;
        this.list = _toConsumableArray(list);
        this._updateUniqueKeys();
        this.virtual.updateUniqueKeys(this.uniqueKeys);
        this.virtual.updateSizes(this.uniqueKeys);
        this.$nextTick(function () {
          return _this4.virtual.updateRange();
        });

        // sortable init
        if (!this.sortable) {
          this.$nextTick(function () {
            return _this4._initSortable();
          });
        } else {
          this.sortable.setValue('list', _toConsumableArray(list));
        }

        // if auto scroll to the last offset
        if (this.lastItem && this.keepOffset) {
          var index = this._getItemIndex(this.lastItem);
          this.scrollToIndex(index);
          this.lastItem = null;
        }
      },
      // virtual init
      _initVirtual: function _initVirtual() {
        var _this5 = this;
        this.virtual = new Virtual({
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys
        }, function (range) {
          _this5.range = range;
          if (!_this5.sortable) return;
          var state = Store.getStore();
          var _this5$range = _this5.range,
            start = _this5$range.start,
            end = _this5$range.end;
          var index = state.from.index;
          if (index > -1 && !(index >= start && index <= end)) {
            _this5.sortable.rangeChanged = true;
          }
        });
        this.virtual.updateSizes(this.uniqueKeys);
        this.virtual.updateRange();
      },
      // sortable init
      _initSortable: function _initSortable() {
        var _this6 = this;
        this.sortable = new Sortable(this, function (_ref) {
          var list = _ref.list,
            changed = _ref.changed;
          // on drop
          if (!changed) return;
          // recalculate the range once when scrolling down
          if (_this6.sortable.rangeChanged && _this6.virtual.direction && _this6.range.start > 0) {
            var index = list.indexOf(_this6.list[_this6.range.start]);
            if (index > -1) {
              _this6.range.start = index;
              _this6.range.end = index + _this6.keeps - 1;
            }
          }
          // fix error with vue: Failed to execute 'insertBefore' on 'Node'
          _this6.list = [];
          _this6.$nextTick(function () {
            _this6.list = _toConsumableArray(list);
            _this6._updateUniqueKeys();
            _this6.virtual.updateUniqueKeys(_this6.uniqueKeys);
          });
        });
      },
      _destroySortable: function _destroySortable() {
        this.sortable && this.sortable.destroy();
        this.sortable = null;
      },
      _handleScroll: function _handleScroll() {
        var root = this.$refs.root;
        var offset = this.getOffset();
        var clientSize = Math.ceil(root[this.clientSizeKey]);
        var scrollSize = Math.ceil(root[this.scrollSizeKey]);
        if (!scrollSize || offset < 0 || offset + clientSize > scrollSize + 1) {
          return;
        }
        this.virtual.handleScroll(offset);
        if (this.virtual.isFront()) {
          if (!!this.list.length && offset <= 0) this.handleToTop(this);
        } else if (this.virtual.isBehind()) {
          if (clientSize + offset >= scrollSize) this.handleToBottom(this);
        }
      },
      handleToTop: debounce(function (_this) {
        _this.$emit('top');
        _this.lastItem = _this.list[0];
      }),
      handleToBottom: debounce(function (_this) {
        _this.$emit('bottom');
      }),
      _onItemResized: function _onItemResized(key, size) {
        this.virtual.handleItemSizeChange(key, size);
      },
      _onSlotResized: function _onSlotResized(key, size) {
        this.virtual.handleSlotSizeChange(key, size);
      },
      _updateUniqueKeys: function _updateUniqueKeys() {
        var _this7 = this;
        this.uniqueKeys = this.list.map(function (item) {
          return getDataKey(item, _this7.dataKey);
        });
      },
      _getItemIndex: function _getItemIndex(item) {
        var _this8 = this;
        return this.list.findIndex(function (el) {
          return getDataKey(item, _this8.dataKey) == getDataKey(el, _this8.dataKey);
        });
      },
      _getItemStyle: function _getItemStyle(itemKey) {
        var state = Store.getStore();
        var fromKey = state.from.key;
        if (this.sortable && this.sortable.rangeChanged && itemKey == fromKey) {
          return {
            display: 'none'
          };
        }
        return {};
      }
    },
    render: function render(h) {
      var _this9 = this;
      var _this$$slots = this.$slots,
        header = _this$$slots.header,
        footer = _this$$slots.footer;
      var _this$range = this.range,
        start = _this$range.start,
        end = _this$range.end,
        front = _this$range.front,
        behind = _this$range.behind;
      var isHorizontal = this.isHorizontal,
        headerTag = this.headerTag,
        footerTag = this.footerTag,
        itemTag = this.itemTag,
        rootTag = this.rootTag,
        wrapTag = this.wrapTag,
        itemStyle = this.itemStyle,
        itemClass = this.itemClass,
        wrapClass = this.wrapClass;
      var wrapStyle = _objectSpread2(_objectSpread2({}, this.wrapStyle), {}, {
        padding: isHorizontal ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
      });
      return h(rootTag, {
        ref: 'root',
        style: {
          overflow: isHorizontal ? 'auto hidden' : 'hidden auto'
        },
        on: {
          '&scroll': debounce(this._handleScroll, this.delay)
        }
      }, [header ? h(Slots, {
        props: {
          tag: headerTag,
          dataKey: 'header',
          event: '_onSlotResized'
        }
      }, header) : null, h(wrapTag, {
        ref: 'group',
        attrs: {
          role: 'group'
        },
        "class": wrapClass,
        style: wrapStyle
      }, this.list.slice(start, end + 1).map(function (record) {
        var index = _this9._getItemIndex(record);
        var dataKey = getDataKey(record, _this9.dataKey);
        var props = {
          isHorizontal: isHorizontal,
          dataKey: dataKey,
          tag: itemTag,
          event: '_onItemResized'
        };
        return _this9.$scopedSlots.item ? h(Items, {
          key: dataKey,
          props: props,
          style: _objectSpread2(_objectSpread2({}, itemStyle), _this9._getItemStyle(dataKey)),
          "class": itemClass
        }, _this9.$scopedSlots.item({
          record: record,
          index: index,
          dataKey: dataKey
        })) : h(itemTag, {
          key: dataKey,
          attrs: {
            'data-key': dataKey
          },
          style: _objectSpread2(_objectSpread2({}, itemStyle), {}, {
            height: "".concat(_this9.size, "px")
          }),
          "class": itemClass
        }, dataKey);
      })), footer ? h(Slots, {
        props: {
          tag: footerTag,
          dataKey: 'footer',
          event: '_onSlotResized'
        }
      }, footer) : null, h('div', {
        ref: 'bottomItem',
        style: {
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px'
        }
      })]);
    }
  });

  return VirtualDragList;

})));
