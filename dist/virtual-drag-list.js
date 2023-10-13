/*!
 * vue-virtual-drag-list v2.7.4
 * open source under the MIT license
 * https://github.com/mfuu/vue-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.VirtualDragList = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw new Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
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
    pageMode: {
      type: Boolean,
      "default": false
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
    headerStyle: {
      type: Object
    },
    footerStyle: {
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
    sizeKey: {
      type: String
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
    this.average = 0;
    this.total = 0;
    this.fixed = 0;
    this.header = 0;
    this.footer = 0;
  });
  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND',
    STATIONARY: 'STATIONARY'
  };
  var LEADING_BUFFER = 2;
  function Virtual(options, callback) {
    this.options = options;
    this.callback = callback;
    this.sizes = new Map(); // store item size

    this.calcType = CACLTYPE.INIT;
    this.calcSize = new CalcSize();
    this.direction = '';
    this.offset = 0;
    this.range = new Range();
    if (options) {
      this.checkIfUpdate(0, options.keeps - 1);
    }
  }
  Virtual.prototype = {
    constructor: Virtual,
    isFront: function isFront() {
      return this.direction === DIRECTION.FRONT;
    },
    isBehind: function isBehind() {
      return this.direction === DIRECTION.BEHIND;
    },
    isFixed: function isFixed() {
      return this.calcType === CACLTYPE.FIXED;
    },
    updateOptions: function updateOptions(key, value) {
      var _this = this;
      if (this.options && key in this.options) {
        if (key === 'uniqueKeys') {
          this.sizes.forEach(function (v, k) {
            if (!value.includes(k)) {
              _this.sizes["delete"](k);
            }
          });
        }
        this.options[key] = value;
      }
    },
    updateRange: function updateRange() {
      var start = this.range.start;
      if (this.isFront()) {
        start -= LEADING_BUFFER;
      } else if (this.isBehind()) {
        start += LEADING_BUFFER;
      }
      start = Math.max(start, 0);
      this.handleUpdate(start, this.getEndByStart(start));
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
    },
    handleScroll: function handleScroll(offset) {
      if (offset === this.offset) {
        this.direction = DIRECTION.STATIONARY;
      } else {
        this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
      }
      this.offset = offset;
      if (this.isFront()) {
        this.handleScrollFront();
      } else if (this.isBehind()) {
        this.handleScrollBehind();
      }
    },
    handleScrollFront: function handleScrollFront() {
      var scrolls = this.getScrollItems();
      if (scrolls > this.range.start) {
        return;
      }
      var start = Math.max(scrolls - this.options.buffer, 0);
      this.checkIfUpdate(start, this.getEndByStart(start));
    },
    handleScrollBehind: function handleScrollBehind() {
      var scrolls = this.getScrollItems();
      if (scrolls < this.range.start + this.options.buffer) {
        return;
      }
      this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
    },
    getScrollItems: function getScrollItems() {
      var offset = this.offset - this.calcSize.header;
      if (offset <= 0) {
        return 0;
      }
      if (this.isFixed()) {
        return Math.floor(offset / this.calcSize.fixed);
      }
      var low = 0;
      var high = this.options.uniqueKeys.length;
      var middle = 0;
      var middleOffset = 0;
      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleOffset = this.getOffsetByIndex(middle);
        if (middleOffset === offset) {
          return middle;
        } else if (middleOffset < offset) {
          low = middle + 1;
        } else if (middleOffset > offset) {
          high = middle - 1;
        }
      }
      return low > 0 ? --low : 0;
    },
    checkIfUpdate: function checkIfUpdate(start, end) {
      var keeps = this.options.keeps;
      var total = this.options.uniqueKeys.length;
      if (total <= keeps) {
        start = 0;
        end = this.getLastIndex();
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1;
      }
      if (this.range.start !== start) {
        this.handleUpdate(start, end);
      }
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
      var end = this.range.end;
      var last = this.getLastIndex();
      if (this.isFixed()) {
        return (last - end) * this.calcSize.fixed;
      }
      return (last - end) * this.getItemSize();
    },
    getOffsetByIndex: function getOffsetByIndex(index) {
      if (!index) return 0;
      var offset = this.calcSize.header;
      for (var i = 0; i < index; i++) {
        var size = this.sizes.get(this.options.uniqueKeys[i]);
        offset = offset + (typeof size === 'number' ? size : this.getItemSize());
      }
      return offset;
    },
    getEndByStart: function getEndByStart(start) {
      return Math.min(start + this.options.keeps - 1, this.getLastIndex());
    },
    getLastIndex: function getLastIndex() {
      var _this$options = this.options,
        uniqueKeys = _this$options.uniqueKeys,
        keeps = _this$options.keeps;
      return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
    },
    getItemSize: function getItemSize() {
      return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
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

    function Y(e, t) {
      var n,
        o = Object.keys(e);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), o.push.apply(o, n)), o;
    }
    function l(o) {
      for (var t = 1; t < arguments.length; t++) {
        var i = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Y(Object(i), !0).forEach(function (t) {
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
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : Y(Object(i)).forEach(function (t) {
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
          if (c && c.getBoundingClientRect && ("none" !== v(c, "transform") || l.relative && "static" !== v(c, "position"))) {
            var p = c.getBoundingClientRect();
            n -= p.top + parseInt(v(c, "border-top-width")), o -= p.left + parseInt(v(c, "border-left-width")), i = n + e.height, r = o + e.width;
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
    function s(t, e, n, o) {
      if (t) {
        n = n || document;
        do {
          if (null == e) {
            var i = Array.prototype.slice.call(n.children),
              r = i.indexOf(t);
            if (-1 < r) return i[r];
            for (var a = 0; a < i.length; a++) if (W(t, i[a])) return i[a];
          } else if ((">" !== e[0] || t.parentNode === n) && q(t, e) || o && t === n) return t;
        } while (t = t.parentNode);
      }
      return null;
    }
    function W(t, e) {
      if (t && e) {
        if (e.compareDocumentPosition) return e === t || 16 & e.compareDocumentPosition(t);
        if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
        for (; t = t.parentNode;) if (t === e) return 1;
      }
    }
    function z(t, e, n) {
      var o;
      t && e && (t.classList ? t.classList[n ? "add" : "remove"](e) : (o = (" " + t.className + " ").replace(H, " ").replace(" " + e + " ", " "), t.className = (o + (n ? " " + e : "")).replace(H, " ")));
    }
    function q(t, e) {
      if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
        if (t.matches) return t.matches(e);
        if (t.msMatchesSelector) return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
      } catch (t) {
        return;
      }
    }
    function V(t, e) {
      return t.top !== e.top || t.left !== e.left;
    }
    function v(t, e, n) {
      var o = t && t.style;
      if (o) {
        if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
        o[e = e in o || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = n + ("string" == typeof n ? "" : "px");
      }
    }
    function U(t, e) {
      return t.sortable.el !== e.sortable.el;
    }
    function y(t, e) {
      v(t, "display", e ? "" : "none");
    }
    var b = "Sortable" + Date.now(),
      o = {
        sortable: null,
        nodes: []
      },
      w = l({}, o),
      _ = l({}, o),
      S = {};
    function Z(t) {
      this.options = t || {}, this.groupName = t.group.name || "group_" + Number(Math.random().toString().slice(-3) + Date.now()).toString(32);
    }
    function G() {
      this.autoScrollAnimationFrame = null, this.speed = {
        x: 10,
        y: 10
      };
    }
    function J(t) {
      this.options = t, this.animations = [];
    }
    function K() {
      this.helper = null, this.distance = {
        x: 0,
        y: 0
      };
    }
    Z.prototype = {
      allowDrag: function (t) {
        return this.options.multiple && S[this.groupName] && S[this.groupName].length && -1 < S[this.groupName].indexOf(t);
      },
      getHelper: function () {
        var n = document.createElement("div");
        return S[this.groupName].forEach(function (t, e) {
          t = t.cloneNode(!0);
          t.style = "\n        opacity: ".concat(0 === e ? 1 : .5, ";\n        position: absolute;\n        z-index: ").concat(e, ";\n        left: 0;\n        top: 0;\n        bottom: 0;\n        right: 0;\n      "), n.appendChild(t);
        }), n;
      },
      select: function (t, e, n, o) {
        var i;
        e && (S[this.groupName] || (S[this.groupName] = []), i = S[this.groupName].indexOf(e), z(e, this.options.selectedClass, i < 0), t = l(l({}, o), {}, {
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
          t != e && y(t, !1);
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
            y(t, !0), e < a ? n.parentNode.insertBefore(t, n) : (e = 0 < e ? S[r.groupName][e - 1] : n, n.parentNode.insertBefore(t, e.nextSibling));
          }), w.sortable = o.sortable, _.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: g(t),
              offset: f(t, e)
            };
          }), U(w, _)),
          s = o || this._offsetChanged(w.nodes, _.nodes),
          i = l(l({}, i()), {}, {
            changed: s,
            event: t
          });
        o && w.sortable._dispatchEvent("onDrop", i), _.sortable._dispatchEvent("onDrop", i), _.sortable.animator.animate();
      },
      _offsetChanged: function (t, n) {
        return !!t.find(function (e) {
          return V(n.find(function (t) {
            return t.node === e.node;
          }).offset, e.offset);
        });
      }
    }, window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
      return setTimeout(t, 17);
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    }), G.prototype = {
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
    }, J.prototype = {
      collect: function (t, e, n, o) {
        var i = this;
        n && (n = Array.prototype.slice.call(n.children), e = (t = this._getRange(n, t, e, o)).start, t = t.end, this.animations.length = 0, n.slice(e, t + 1).forEach(function (t) {
          "none" !== v(t, "display") && t !== o && t !== B.helper && i.animations.push({
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
    }, K.prototype = {
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
            r = r ? document.body : n,
            s = (this.helper = e.cloneNode(!0), z(this.helper, a, !0), l({
              top: t.top,
              left: t.left,
              width: t.width,
              height: t.height,
              position: "fixed",
              opacity: "0.8",
              "z-index": 1e5,
              "pointer-events": "none",
              "box-sizing": "border-box"
            }, o));
          for (i in s) v(this.helper, i, s[i]);
          n = this.helper, e = "none", n.style["".concat(u, "Transition")] = e ? "none" === e ? "none" : "".concat(e) : "", h(this.helper, "translate3d(0px, 0px, 0px)"), r.appendChild(this.helper);
          a = this.distance.x / parseInt(this.helper.style.width) * 100, t = this.distance.y / parseInt(this.helper.style.height) * 100;
          v(this.helper, "transform-origin", "".concat(a, "% ").concat(t, "%")), v(this.helper, "transform", "translateZ(0)"), v(this.helper, "will-change", "transform");
        }
      }
    };
    function r() {
      var t,
        e = {
          from: l({}, A),
          to: l({}, j)
        };
      return C && (t = {
        from: l({}, w),
        to: l({}, _)
      }, e.from = l(l({}, t.from), e.from), e.to = l(l({}, t.to), e.to)), e;
    }
    var N,
      E,
      x,
      D,
      O,
      T,
      C,
      Q,
      $,
      tt = {
        sortable: null,
        group: null,
        node: null,
        rect: {},
        offset: {}
      },
      M = [],
      P = new K(),
      et = new G(),
      A = l({}, tt),
      j = l({}, tt),
      X = {
        x: 0,
        y: 0
      },
      nt = function (t) {
        var e = {},
          n = t.group;
        n && "object" == R(n) || (n = {
          name: n,
          pull: !0,
          put: !0
        }), e.name = n.name, e.pull = n.pull, e.put = n.put, t.group = e;
      };
    function B(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      (t[b] = this).el = t, this.ownerDocument = t.ownerDocument, this.options = e = Object.assign({}, e);
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
          scrollThreshold: 55,
          delay: 0,
          delayOnTouchOnly: !1,
          touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
          ghostClass: "",
          ghostStyle: {},
          chosenClass: "",
          selectedClass: "",
          swapOnDrop: !0,
          fallbackOnBody: !1,
          stopPropagation: !1,
          supportTouch: "ontouchstart" in window,
          emptyInsertThreshold: 5
        };
      for (n in i) n in this.options || (this.options[n] = i[n]);
      for (o in nt(e), this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));
      p(t, this.options.supportTouch ? "touchstart" : "mousedown", this._onDrag), M.push(t), this.multiplayer = new Z(this.options), this.animator = new J(this.options);
    }
    return (B.prototype = {
      constructor: B,
      destroy: function () {
        this._dispatchEvent("destroy", this), this.el[b] = null;
        for (var t = 0; t < c.start.length; t++) n(this.el, c.start[t], this._onDrag);
        this._clearState(), M.splice(M.indexOf(this.el), 1), this.el = null;
      },
      option: function (t, e) {
        var n = this.options;
        if (void 0 === e) return n[t];
        n[t] = e, "group" === t && nt(n);
      },
      _onDrag: function (t) {
        if (!this.options.disabled && this.options.group.pull && (!/mousedown|pointerdown/.test(t.type) || 0 === t.button)) {
          var e = I(t),
            n = e.touch,
            o = e.event,
            e = e.target;
          if (!(e === this.el || a && e && "SELECT" === e.tagName.toUpperCase())) {
            var i = this.options,
              r = i.draggable,
              i = i.handle;
            if (("function" != typeof i || i(t)) && ("string" != typeof i || q(e, i))) {
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
              } else E = s(e, r, this.el, !1);
              E && !E.animated && (D = E.cloneNode(!0), this._prepareStart(n, o));
            }
          }
        }
      },
      _prepareStart: function (t, e) {
        var n = this,
          o = E.parentNode,
          i = ((O = e).sortable = this, O.group = E.parentNode, (C = this.options.multiple && this.multiplayer.allowDrag(E)) && this.multiplayer.onDrag(this.el, this), g(E)),
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
          $ = setTimeout(function () {
            return n._onStart(t);
          }, o);
        }
      },
      _delayMoveHandler: function (t) {
        t = t.touches ? t.touches[0] : t;
        Math.max(Math.abs(t.clientX - O.clientX), Math.abs(t.clientY - O.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
      },
      _cancelStart: function () {
        clearTimeout($);
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
        T || (this._dispatchEvent("onDrag", l(l({}, r()), {}, {
          event: O
        })), C && this.multiplayer.onTrulyStarted(E, this), t = C ? this.multiplayer.getHelper() : E, P.init(A.rect, t, this.el, this.options), B.helper = P.node, y(E, !1), E.parentNode.insertBefore(D, E), z(D, this.options.chosenClass, !0), a && v(document.body, "user-select", "none"));
      },
      _nearestSortable: function (t) {
        var e, n, o, i, r, a, s;
        this._preventEvent(t), !O || !E || (e = (n = t).clientX, n = n.clientY, o = e - X.x, i = n - X.y, X.x = e, X.y = n, void 0 !== e && void 0 !== n && Math.abs(o) <= 0 && Math.abs(i) <= 0) || (n = (e = I(t)).event, o = e.target, r = n.clientX, a = n.clientY, M.some(function (t) {
          var e,
            n,
            o = t[b].options.emptyInsertThreshold;
          if (o) return n = g(t, {
            parent: !0
          }), e = r >= n.left - o && r <= n.right + o, n = a >= n.top - o && a <= n.bottom + o, e && n ? s = t : void 0;
        }), i = s, this._onTrulyStarted(), T = n, P.move(n.clientX - O.clientX, n.clientY - O.clientY), this._autoScroll(o), i && i[b]._onMove(n, o));
      },
      _allowPut: function () {
        var t, e;
        return O.sortable.el === this.el || !!this.options.group.put && (t = this.options.group.name, (e = O.sortable.options.group).name) && t && e.name === t;
      },
      _onMove: function (t, e) {
        if (this._allowPut()) {
          if (this._dispatchEvent("onMove", l(l({}, r()), {}, {
            event: t
          })), N = this.el, x = s(e, this.options.draggable, N, !1)) {
            if (x === Q) return;
            if ((Q = x) === D) return;
            if (x.animated || W(x, D)) return;
          }
          N !== A.sortable.el ? e !== N && function (t, e, n) {
            for (var o = t.lastElementChild; o && (o === e || "none" === v(o, "display") || n && !q(o, n));) o = o.previousElementSibling;
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
                  var i = v(n);
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
        n && et.update(t, e, O, T);
      },
      _onInsert: function (t, e) {
        var n = e ? D : x,
          o = e ? N : x.parentNode;
        A.sortable.animator.collect(D, null, D.parentNode, D), this.animator.collect(null, n, o, D), C && this.multiplayer.onChange(D, this), j = {
          sortable: this,
          group: o,
          node: n,
          rect: g(n),
          offset: f(n, N)
        }, A.sortable._dispatchEvent("onRemove", l(l({}, r()), {}, {
          event: t
        })), e ? o.appendChild(D) : o.insertBefore(D, x), this._dispatchEvent("onAdd", l(l({}, r()), {}, {
          event: t
        })), A.sortable.animator.animate(), this.animator.animate(), A.group = o, A.sortable = this;
      },
      _onChange: function (t) {
        var e = x.parentNode,
          t = (this.animator.collect(D, x, e), C && this.multiplayer.onChange(D, this), j = {
            sortable: this,
            group: e,
            node: x,
            rect: g(x),
            offset: f(x, N)
          }, this._dispatchEvent("onChange", l(l({}, r()), {}, {
            event: t
          })), f(D, N)),
          n = null,
          n = t.top === j.offset.top ? t.left < j.offset.left ? x.nextSibling : x : t.top < j.offset.top ? x.nextSibling : x;
        e.insertBefore(D, n), this.animator.animate(), A.group = e, A.sortable = this;
      },
      _onDrop: function (t) {
        this._unbindMoveEvents(), this._unbindDropEvents(), this._preventEvent(t), this._cancelStart(), et.clear(), E && O && T ? this._onEnd(t) : this.options.multiple && this.multiplayer.select(t, E, N, l({}, A)), this._clearState();
      },
      _onEnd: function (t) {
        var e, n;
        this.options.swapOnDrop && D.parentNode.insertBefore(E, D), A.group = O.group, A.sortable = O.sortable, j.rect = g(D), j.offset = f(D, N), C ? this.multiplayer.onDrop(t, E, N, O, r) : (j.node === D && (j.node = E), n = (e = U(A, j)) || V(A.offset, j.offset), n = l(l({}, r()), {}, {
          changed: n,
          event: t
        }), e && A.sortable._dispatchEvent("onDrop", n), j.sortable._dispatchEvent("onDrop", n)), y(E, !0), D.parentNode.removeChild(D), a && v(document.body, "user-select", "");
      },
      _preventEvent: function (t) {
        void 0 !== t.preventDefault && t.cancelable && t.preventDefault(), this.options.stopPropagation && (t && t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0);
      },
      _dispatchEvent: function (t, e) {
        t = this.options[t];
        "function" == typeof t && t(e);
      },
      _clearState: function () {
        E = x = D = O = T = C = Q = $ = B.helper = null, X = {
          x: 0,
          y: 0
        }, A = j = l({}, tt), P.destroy();
      },
      _unbindMoveEvents: function () {
        for (var t = 0; t < c.move.length; t++) n(document, c.move[t], this._nearestSortable);
      },
      _unbindDropEvents: function () {
        for (var t = 0; t < c.end.length; t++) n(document, c.end[t], this._onDrop);
      }
    }).utils = {
      on: p,
      off: n,
      css: v,
      closest: s,
      getRect: g,
      getOffset: f
    }, B.get = function (t) {
      return t[b];
    }, B.create = function (t, e) {
      return new B(t, e);
    }, B;
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
      window[storeKey] = undefined;
    },
    /**
     * Obtaining Synchronization Data
     * @returns states: { from, to }
     */
    getStore: function getStore() {
      try {
        var result = JSON.parse(window[storeKey]);
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
          var result = JSON.parse(window[storeKey]);
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
          var store = JSON.parse(window[storeKey] || '{}');
          var result = _objectSpread2(_objectSpread2({}, store), value);
          window[storeKey] = JSON.stringify(result);
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
  function Sortable(ctx, callback) {
    this.ctx = ctx;
    this.callback = callback;
    this.initialList = _toConsumableArray(ctx.list);
    this.dynamicList = _toConsumableArray(ctx.list);
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
        this.ctx[key] = value;
        this.sortable.option(key, value);
      }
    },
    _init: function _init() {
      var _this = this;
      var props = attributes.reduce(function (res, key) {
        var name = key;
        if (key === 'pressDelay') name = 'delay';
        if (key === 'pressDelayOnTouchOnly') name = 'delayOnTouchOnly';
        res[name] = _this.ctx[key];
        return res;
      }, {});
      this.sortable = new sortableDnd_min(this.ctx.$refs.groupRef, _objectSpread2(_objectSpread2({}, props), {}, {
        swapOnDrop: false,
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
              _this2.ctx.$emit('drag', _objectSpread2({
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
              _this3.ctx.$emit('add', _objectSpread2({}, params));
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
              _this4.ctx.$emit('remove', _objectSpread2({}, state));
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
              list = _toConsumableArray(_this6.dynamicList);
              index = _this6._getIndex(list, from.node.dataset.key);
              item = _this6.initialList[index];
              key = getDataKey(item, _this6.ctx.dataKey);
              _context5.next = 6;
              return Store.setValue({
                to: {
                  list: _toConsumableArray(_this6.initialList),
                  index: index,
                  item: item,
                  key: key
                }
              });
            case 6:
              _context5.next = 8;
              return Store.getValue();
            case 8:
              store = _context5.sent;
              params = _objectSpread2(_objectSpread2({
                list: list
              }, store), {}, {
                changed: changed
              });
              _this6.callback && _this6.callback(params);
              _this6.ctx.$emit('drop', params);
              _this6.initialList = _toConsumableArray(list);
              _this6._clear();
            case 14:
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
      for (var i = 0; i < list.length; i++) {
        if (getDataKey(list[i], this.ctx.dataKey) == key) {
          return i;
        }
      }
      return -1;
    },
    _clear: function _clear() {
      dragEl = null;
      Store.clear();
      this.rangeChanged = false;
    }
  };

  var Observer = {
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
        return this.$el ? this.$el[this.sizeKey] : 0;
      }
    }
  };
  var Items = Vue.component('virtual-draglist-items', {
    mixins: [Observer],
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
    mixins: [Observer],
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
    model: {
      prop: 'dataSource',
      event: 'updateDataSource'
    },
    props: VirtualProps,
    data: function data() {
      return {
        list: [],
        uniqueKeys: [],
        virtual: null,
        sortable: null,
        lastLength: null,
        range: new Range(),
        timer: null
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
      bottomOffsetKey: function bottomOffsetKey() {
        return this.isHorizontal ? 'offsetLeft' : 'offsetTop';
      },
      clientSizeKey: function clientSizeKey() {
        return this.isHorizontal ? 'clientWidth' : 'clientHeight';
      },
      itemSizeKey: function itemSizeKey() {
        return this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
      }
    },
    watch: {
      'dataSource.length': function dataSourceLength() {
        this.init();
      },
      disabled: function disabled(val) {
        this.sortable && this.sortable.setValue('disabled', val);
      }
    },
    activated: function activated() {
      // set back offset when awake from keep-alive
      this.scrollToOffset(this.virtual.offset);
      if (this.pageMode) {
        this._addPageModeScrollListener();
      }
    },
    deactivated: function deactivated() {
      if (this.pageMode) {
        this._removePageModeScrollListener();
      }
    },
    created: function created() {
      this._debounceScroll = debounce(this._handleScroll, this.delay);
      this.range.end = this.keeps - 1;
      this._initVirtual();
      this.init();
    },
    mounted: function mounted() {
      if (this.pageMode) {
        this._updatePageModeFront();
        this._addPageModeScrollListener();
      }
    },
    beforeDestroy: function beforeDestroy() {
      this._destroySortable();
      if (this.pageMode) {
        this._removePageModeScrollListener();
      }
    },
    methods: {
      /**
       * reset component
       */
      reset: function reset() {
        this.scrollToTop();
        this.init();
      },
      /**
       * Git item size by data-key
       * @param {any} key data-key
       */
      getSize: function getSize(key) {
        return this.virtual.sizes.get(key);
      },
      /**
       * Get the current scroll height
       */
      getOffset: function getOffset() {
        if (this.pageMode) {
          return document.documentElement[this.scrollDirectionKey] || document.body[this.scrollDirectionKey];
        } else {
          var rootRef = this.$refs.rootRef;
          return rootRef ? Math.ceil(rootRef[this.scrollDirectionKey]) : 0;
        }
      },
      /**
       * Get client viewport size
       */
      getClientSize: function getClientSize() {
        if (this.pageMode) {
          return document.documentElement[this.clientSizeKey] || document.body[this.clientSizeKey];
        } else {
          var rootRef = this.$refs.rootRef;
          return rootRef ? Math.ceil(rootRef[this.clientSizeKey]) : 0;
        }
      },
      /**
       * Get all scroll size
       */
      getScrollSize: function getScrollSize() {
        if (this.pageMode) {
          return document.documentElement[this.scrollSizeKey] || document.body[this.scrollSizeKey];
        } else {
          var rootRef = this.$refs.rootRef;
          return rootRef ? Math.ceil(rootRef[this.scrollSizeKey]) : 0;
        }
      },
      /**
       * Scroll to the specified index position
       * @param {Number} index
       */
      scrollToIndex: function scrollToIndex(index) {
        if (index >= this.list.length - 1) {
          this.scrollToBottom();
        } else {
          var indexOffset = this.virtual.getOffsetByIndex(index);
          this.scrollToOffset(indexOffset);
        }
      },
      /**
       * Scroll to the specified offset
       * @param {Number} offset
       */
      scrollToOffset: function scrollToOffset(offset) {
        if (this.pageMode) {
          document.body[this.scrollDirectionKey] = offset;
          document.documentElement[this.scrollDirectionKey] = offset;
        } else {
          var rootRef = this.$refs.rootRef;
          rootRef[this.scrollDirectionKey] = offset;
        }
      },
      /**
       * Scroll to top of list
       */
      scrollToTop: function scrollToTop() {
        this.scrollToOffset(0);
      },
      /**
       * Scroll to bottom of list
       */
      scrollToBottom: function scrollToBottom() {
        var _this = this;
        var bottomRef = this.$refs.bottomRef;
        if (bottomRef) {
          var bottom = bottomRef[this.bottomOffsetKey];
          this.scrollToOffset(bottom);

          // if the bottom is not reached, execute the scroll method again
          setTimeout(function () {
            if (!_this._scrolledToBottom()) _this.scrollToBottom();
          }, 5);
        }
      },
      init: function init() {
        var _this2 = this;
        this.list = _toConsumableArray(this.dataSource);
        this._updateUniqueKeys();
        if (this.virtual.sizes.size) {
          this.virtual.updateRange();
        } else {
          clearTimeout(this.timer);
          this.timer = setTimeout(function () {
            return _this2.virtual.updateRange();
          }, 17);
        }
        if (!this.sortable) {
          this.$nextTick(function () {
            return _this2._initSortable();
          });
        } else {
          this.sortable.setValue('list', _toConsumableArray(this.list));
        }

        // auto scroll to the last offset
        if (this.lastLength && this.keepOffset) {
          var index = Math.abs(this.dataSource.length - this.lastLength);
          this.scrollToIndex(index);
          this.lastLength = null;
        }
      },
      // virtual init
      _initVirtual: function _initVirtual() {
        var _this3 = this;
        this.virtual = new Virtual({
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          buffer: Math.round(this.keeps / 3)
        }, function (range) {
          _this3.range = range;
          if (!_this3.sortable) return;
          var state = Store.getStore();
          var _this3$range = _this3.range,
            start = _this3$range.start,
            end = _this3$range.end;
          var index = state.from.index;
          if (index > -1 && !(index >= start && index <= end)) {
            _this3.sortable.rangeChanged = true;
          }
        });
      },
      // sortable init
      _initSortable: function _initSortable() {
        var _this4 = this;
        this.sortable = new Sortable(this, function (_ref) {
          var list = _ref.list,
            changed = _ref.changed;
          if (!changed) return;
          if (list.length !== _this4.list.length) {
            _this4._updateRangeOnDrop(list);
          }
          _this4.list = _toConsumableArray(list);
          _this4._updateUniqueKeys();
          _this4.$emit('updateDataSource', _toConsumableArray(list));
        });
      },
      _updateRangeOnDrop: function _updateRangeOnDrop(list) {
        var range = _objectSpread2({}, this.range);
        if (this.range.start > 0) {
          var index = list.indexOf(this.list[this.range.start]);
          if (index > -1) {
            range.start = index;
            range.end = index + this.keeps - 1;
          }
        }
        if (list.length > this.list.length && this.range.end === this.list.length - 1 && this._scrolledToBottom()) {
          range.end++;
          range.start = Math.max(0, range.end - this.keeps + 1);
        }
        this.virtual.handleUpdate(range.start, range.end);
      },
      _destroySortable: function _destroySortable() {
        this.sortable && this.sortable.destroy();
        this.sortable = null;
      },
      _addPageModeScrollListener: function _addPageModeScrollListener() {
        document.addEventListener('scroll', this._debounceScroll, {
          passive: false
        });
      },
      _removePageModeScrollListener: function _removePageModeScrollListener() {
        document.removeEventListener('scroll', this._debounceScroll);
      },
      _handleScroll: function _handleScroll() {
        var offset = this.getOffset();
        var clientSize = this.getClientSize();
        var scrollSize = this.getScrollSize();

        // iOS scroll-spring-back behavior will make direction mistake
        if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
          return;
        }
        this.virtual.handleScroll(offset);
        if (this.virtual.isFront() && !!this.list.length && offset <= 0) {
          this._handleToTop();
        } else if (this.virtual.isBehind() && clientSize + offset >= scrollSize) {
          this._handleToBottom();
        }
      },
      _scrolledToBottom: function _scrolledToBottom() {
        var offset = this.getOffset();
        var clientSize = this.getClientSize();
        var scrollSize = this.getScrollSize();
        return offset + clientSize + 1 >= scrollSize;
      },
      _handleToTop: debounce(function () {
        this.$emit('top');
        this.lastLength = this.list.length;
      }),
      _handleToBottom: debounce(function () {
        this.$emit('bottom');
      }),
      _onItemResized: function _onItemResized(key, size) {
        this.virtual.handleItemSizeChange(key, size);
      },
      _onSlotResized: function _onSlotResized(key, size) {
        this.virtual.handleSlotSizeChange(key, size);
      },
      // when using page mode we need update slot header size manually
      // taking root offset relative to the browser as slot header size
      _updatePageModeFront: function _updatePageModeFront() {
        var rootRef = this.$refs.rootRef;
        if (rootRef) {
          var rect = rootRef.getBoundingClientRect();
          var defaultView = rootRef.ownerDocument.defaultView;
          var offsetFront = this.isHorizontal ? rect.left + defaultView.pageXOffset : rect.top + defaultView.pageYOffset;
          this.virtual.handleSlotSizeChange('header', offsetFront);
        }
      },
      _updateUniqueKeys: function _updateUniqueKeys() {
        var _this5 = this;
        this.uniqueKeys = this.list.map(function (item) {
          return getDataKey(item, _this5.dataKey);
        });
        this.virtual.updateOptions('uniqueKeys', this.uniqueKeys);
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
      },
      _renderSlots: function _renderSlots(h, key, TagName) {
        var itemSizeKey = this.itemSizeKey;
        var slot = this.$slots[key];
        var headerStyle = _objectSpread2({}, this.headerStyle);
        var footerStyle = _objectSpread2({}, this.footerStyle);
        return slot ? h(Slots, {
          props: {
            tag: TagName,
            dataKey: key,
            sizeKey: itemSizeKey,
            event: '_onSlotResized'
          },
          style: key === 'header' ? headerStyle : key === 'footer' ? footerStyle : undefined
        }, slot) : null;
      },
      _renderItems: function _renderItems(h) {
        var renders = [];
        var _this$range = this.range,
          start = _this$range.start,
          end = _this$range.end;
        var itemTag = this.itemTag,
          itemClass = this.itemClass,
          itemSizeKey = this.itemSizeKey;
        for (var index = start; index <= end; index++) {
          var record = this.list[index];
          if (record) {
            var dataKey = getDataKey(record, this.dataKey);
            var itemStyle = _objectSpread2(_objectSpread2({}, this.itemStyle), this._getItemStyle(dataKey));
            renders.push(this.$scopedSlots.item ? h(Items, {
              key: dataKey,
              props: {
                dataKey: dataKey,
                tag: itemTag,
                sizeKey: itemSizeKey,
                event: '_onItemResized'
              },
              style: itemStyle,
              "class": itemClass
            }, this.$scopedSlots.item({
              record: record,
              index: index,
              dataKey: dataKey
            })) : null);
          }
        }
        return renders;
      }
    },
    render: function render(h) {
      var _this$range2 = this.range,
        front = _this$range2.front,
        behind = _this$range2.behind;
      var pageMode = this.pageMode,
        isHorizontal = this.isHorizontal,
        headerTag = this.headerTag,
        footerTag = this.footerTag,
        rootTag = this.rootTag,
        wrapTag = this.wrapTag,
        wrapClass = this.wrapClass;
      var wrapperStyle = _objectSpread2(_objectSpread2({}, this.wrapStyle), {}, {
        padding: isHorizontal ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
      });
      return h(rootTag, {
        ref: 'rootRef',
        style: !pageMode && {
          overflow: isHorizontal ? 'auto hidden' : 'hidden auto'
        },
        on: {
          '&scroll': !pageMode && this._debounceScroll
        }
      }, [this._renderSlots(h, 'header', headerTag), h(wrapTag, {
        ref: 'groupRef',
        "class": wrapClass,
        style: wrapperStyle
      }, this._renderItems(h)), this._renderSlots(h, 'footer', footerTag), h('div', {
        ref: 'bottomRef',
        style: {
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px'
        }
      })]);
    }
  });

  return VirtualDragList;

})));
