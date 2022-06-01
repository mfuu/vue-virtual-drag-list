/*!
 * vue-virtual-drag-list v2.6.9
 * open source under the MIT license
 * https://github.com/mfuu/vue-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualDragList = factory(global.Vue));
})(this, (function (Vue) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

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
      Object.defineProperty(target, descriptor.key, descriptor);
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

  // scroll range
  var Range = /*#__PURE__*/_createClass(function Range() {
    _classCallCheck(this, Range);

    this.start = 0;
    this.end = 0;
    this.front = 0;
    this.behind = 0;
  }); // drag state

  var DragState = /*#__PURE__*/_createClass(function DragState() {
    _classCallCheck(this, DragState);

    this.from = {
      key: null,
      item: null,
      index: -1
    };
    this.to = {
      key: null,
      item: null,
      index: -1
    };
  }); // virtual state

  var CalcSize = /*#__PURE__*/_createClass(function CalcSize() {
    _classCallCheck(this, CalcSize);

    this.average = undefined; // 计算首次加载每一项的评价高度

    this.total = undefined; // 首次加载的总高度

    this.fixed = undefined; // 记录固定高度值

    this.header = undefined; // 顶部插槽高度

    this.footer = undefined; // 底部插槽高度
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

  function Virtual(options, callback) {
    this.options = options;
    this.callback = callback;
    this.sizes = new Map(); // 用于存储列表项的高度

    this.isHorizontal = options.isHorizontal; // 是否为横向滚动

    this.calcIndex = 0; // 记录上次计算的index

    this.calcType = CACLTYPE.INIT; // 记录列表项高度是动态还是静态

    this.calcSize = new CalcSize();
    this.direction = ''; // 滚动方向

    this.offset = 0; // 记录滚动距离

    this.range = new Range();
    if (options) this.checkIfUpdate(0, options.keeps - 1);
  }

  Virtual.prototype = {
    construcrot: Virtual,
    // --------------------------- update ------------------------------
    updateUniqueKeys: function updateUniqueKeys(value) {
      this.options.uniqueKeys = value;
    },
    // 更新 sizes，删除不在当前列表中的数据
    updateSizes: function updateSizes(uniqueKeys) {
      var _this = this;

      this.sizes.forEach(function (v, k) {
        if (!uniqueKeys.includes(k)) _this.sizes["delete"](k);
      });
    },
    updateRange: function updateRange() {
      var start = Math.max(this.range.start, 0);
      this.handleUpdate(start, this.getEndByStart(start));
    },
    // --------------------------- scroll ------------------------------
    // 滚动事件
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
    getScrollItems: function getScrollItems(offset) {
      var _this$calcSize = this.calcSize,
          fixed = _this$calcSize.fixed,
          header = _this$calcSize.header; // 减去顶部插槽高度

      if (header) offset -= header;
      if (offset <= 0) return 0; // 固定高度

      if (this.calcType === CACLTYPE.FIXED) return Math.floor(offset / fixed); // 非固定高度使用二分查找

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

      if (uniqueKeys.length <= keeps) {
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
      if (this.calcType === CACLTYPE.FIXED) {
        return this.calcSize.fixed * this.range.start;
      } else {
        return this.getOffsetByIndex(this.range.start);
      }
    },
    getBehindOffset: function getBehindOffset() {
      var last = this.getLastIndex();

      if (this.calcType === CACLTYPE.FIXED) {
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
      return this.options.uniqueKeys.length - 1;
    },
    // --------------------------- size ------------------------------
    // 获取列表项的高度
    getItemSize: function getItemSize() {
      return this.calcType === CACLTYPE.FIXED ? this.calcSize.fixed : this.calcSize.average || this.options.size;
    },
    // 列表项高度变化
    handleItemSizeChange: function handleItemSizeChange(id, size) {
      this.sizes.set(id, size); // 'INIT' 状态表示每一项的高度都相同

      if (this.calcType === CACLTYPE.INIT) {
        this.calcType = CACLTYPE.FIXED; // 固定高度

        this.calcSize.fixed = size;
      } else if (this.calcType === CACLTYPE.FIXED && this.calcSize.fixed !== size) {
        // 如果当前为 'FIXED' 状态并且 size 与固定高度不同，表示当前高度不固定，fixed值也就不需要了
        this.calcType = CACLTYPE.DYNAMIC;
        this.calcSize.fixed = undefined;
      } // 非固定高度的情况下，计算平均高度与总高度


      if (this.calcType !== CACLTYPE.FIXED) {
        this.calcSize.total = _toConsumableArray(this.sizes.values()).reduce(function (t, i) {
          return t + i;
        }, 0);
        this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
      }
    },
    // header 插槽高度变化
    handleHeaderSizeChange: function handleHeaderSizeChange(size) {
      this.calcSize.header = size;
    },
    // footer 插槽高度变化
    handleFooterSizeChange: function handleFooterSizeChange(size) {
      this.calcSize.footer = size;
    }
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortable_min = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e() ;
  }(commonjsGlobal, function () {

    function i(t) {
      return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function n(t, e) {
      for (var o = 0; o < e.length; o++) {
        var n = e[o];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    function r(t, e, o) {
      return e && n(t.prototype, e), o && n(t, o), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t;
    }

    function s(t) {
      return function (t) {
        if (Array.isArray(t)) return a(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
      }(t) || function (t, e) {
        if (t) {
          if ("string" == typeof t) return a(t, e);
          var o = Object.prototype.toString.call(t).slice(8, -1);
          return "Map" === (o = "Object" === o && t.constructor ? t.constructor.name : o) || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? a(t, e) : void 0;
        }
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function a(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var o = 0, n = new Array(e); o < e; o++) n[o] = t[o];

      return n;
    }

    function t(t) {
      if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
    }

    var e,
        l = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        c = t(/Edge/i),
        h = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
        u = t(/iP(ad|od|hone)/i),
        f = t(/chrome/i) && t(/android/i),
        d = {
      capture: !1,
      passive: !1
    },
        p = /\s+/g,
        m = ["-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition", "transition"],
        g = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"],
        v = (e = !1, document.addEventListener("checkIfSupportPassive", null, {
      get passive() {
        return e = !0;
      }

    }), e);

    function y(e, o) {
      o ? "none" === o ? m.forEach(function (t) {
        return M(e, t, "none");
      }) : m.forEach(function (t) {
        return M(e, t, "".concat(t.split("transition")[0], "transform ").concat(o));
      }) : m.forEach(function (t) {
        return M(e, t, "");
      });
    }

    function w(e, o) {
      o ? g.forEach(function (t) {
        return M(e, t, "".concat(t.split("transform")[0]).concat(o));
      }) : g.forEach(function (t) {
        return M(e, t, "");
      });
    }

    function b(t, e, o) {
      window.addEventListener ? t.addEventListener(e, o, !(!v && l) && d) : window.attachEvent && t.attachEvent("on" + e, o);
    }

    function E(t, e, o) {
      window.removeEventListener ? t.removeEventListener(e, o, !(!v && l) && d) : window.detachEvent && t.detachEvent("on" + e, o);
    }

    function S(t) {
      for (var e = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
      }, o = (e.height = t.offsetHeight, e.width = t.offsetWidth, e.top = t.offsetTop, e.left = t.offsetLeft, t.offsetParent); null !== o;) e.top += o.offsetTop, e.left += o.offsetLeft, o = o.offsetParent;

      return e;
    }

    function _(t, e) {
      if (!t || !t.getBoundingClientRect) return D();
      var o = t,
          n = !1;

      do {
        if (o.clientWidth < o.scrollWidth || o.clientHeight < o.scrollHeight) {
          var i = M(o);

          if (o.clientWidth < o.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || o.clientHeight < o.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
            if (!o.getBoundingClientRect || o === document.body) return D();
            if (n || e) return o;
            n = !0;
          }
        }
      } while (o = o.parentNode);

      return D();
    }

    function D() {
      var t = document.scrollingElement;
      return !t || t.contains(document.body) ? document : t;
    }

    function T(t) {
      var e;
      if (t.getBoundingClientRect || t === window) return e = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0
      }, t !== window && t.parentNode && t !== D() ? (t = t.getBoundingClientRect(), e.top = t.top, e.left = t.left, e.bottom = t.bottom, e.right = t.right, e.height = t.height, e.width = t.width) : (e.top = 0, e.left = 0, e.bottom = window.innerHeight, e.right = window.innerWidth, e.height = window.innerHeight, e.width = window.innerWidth), e;
    }

    function x(t, e, o) {
      var n = s(Array.from(t.children)),
          t = n.indexOf(e);
      if (-1 < t) return o ? n[t] : {
        index: t,
        el: n[t],
        rect: T(n[t]),
        offset: S(n[t])
      };

      for (var i = 0; i < n.length; i++) if (function (t, e) {
        var o;
        if (t && e) for (o = t.parentNode; o;) {
          if (e === o) return 1;
          o = o.parentNode;
        }
        return;
      }(e, n[i])) return o ? n[i] : {
        index: i,
        el: n[i],
        rect: T(n[i]),
        offset: S(n[i])
      };

      return o ? null : {
        index: -1,
        el: null,
        rect: {},
        offset: {}
      };
    }

    function $(t, e, o) {
      var n;
      t && e && (t.classList ? t.classList[o ? "add" : "remove"](e) : (n = (" " + t.className + " ").replace(p, " ").replace(" " + e + " ", " "), t.className = (n + (o ? " " + e : "")).replace(p, " ")));
    }

    function M(t, e, o) {
      var n = t && t.style;

      if (n) {
        if (void 0 === o) return document.defaultView && document.defaultView.getComputedStyle ? o = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (o = t.currentStyle), void 0 === e ? o : o[e];
        n[e = e in n || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = o + ("string" == typeof o ? "" : "px");
      }
    }

    function k(o, n, i) {
      var r = null;
      return function () {
        var t = this,
            e = arguments;
        r && clearTimeout(r), i && !r && o.apply(t, e), r = setTimeout(function () {
          o.apply(t, e);
        }, n);
      };
    }

    function P(o, n) {
      var i = null;
      return function () {
        var t = this,
            e = arguments;
        i = i || setTimeout(function () {
          i = null, o.apply(t, e);
        }, n);
      };
    }

    var A = r(function t() {
      o(this, t), this.sortableDown = void 0, this.sortableMove = void 0, this.animationEnd = void 0;
    }),
        C = function () {
      function t() {
        o(this, t), this.from = {
          node: null,
          rect: {},
          offset: {}
        }, this.to = {
          node: null,
          rect: {},
          offset: {}
        };
      }

      return r(t, [{
        key: "get",
        value: function (t) {
          return this[t];
        }
      }, {
        key: "set",
        value: function (t, e) {
          this[t] = e;
        }
      }, {
        key: "destroy",
        value: function () {
          this.from = {
            node: null,
            rect: {},
            offset: {}
          }, this.to = {
            node: null,
            rect: {},
            offset: {}
          };
        }
      }]), t;
    }(),
        L = function () {
      function e(t) {
        o(this, e), this.$el = null, this.distance = {
          x: 0,
          y: 0
        }, this.options = t.options, this.container = t.container;
      }

      return r(e, [{
        key: "init",
        value: function (t, e) {
          this.$el = t;
          var t = this.options,
              o = t.ghostClass,
              t = t.ghostStyle,
              t = void 0 === t ? {} : t;
          $(this.$el, o, !0), M(this.$el, "box-sizing", "border-box"), M(this.$el, "margin", 0), M(this.$el, "top", e.top), M(this.$el, "left", e.left), M(this.$el, "width", e.width), M(this.$el, "height", e.height), M(this.$el, "opacity", "0.8"), M(this.$el, "position", "fixed"), M(this.$el, "zIndex", "100000"), M(this.$el, "pointerEvents", "none"), this.setStyle(t), y(this.$el, "none"), w(this.$el, "translate3d(0px, 0px, 0px)"), this.container.appendChild(this.$el), M(this.$el, "transform-origin", this.distance.x / parseInt(this.$el.style.width) * 100 + "% " + this.distance.y / parseInt(this.$el.style.height) * 100 + "%");
        }
      }, {
        key: "setStyle",
        value: function (t) {
          for (var e in t) M(this.$el, e, t[e]);
        }
      }, {
        key: "rect",
        value: function () {
          return T(this.$el);
        }
      }, {
        key: "move",
        value: function (t, e) {
          this.$el && (y(this.$el, 2 < arguments.length && void 0 !== arguments[2] && arguments[2] ? "".concat(this.options.ghostAnimation, "ms") : "none"), w(this.$el, "translate3d(".concat(t, "px, ").concat(e, "px, 0)")));
        }
      }, {
        key: "destroy",
        value: function (t) {
          var e,
              o,
              n = this;
          this.$el && (o = parseInt(this.$el.style.left), e = parseInt(this.$el.style.top), this.move(t.left - o, t.top - e, !0), (o = this.options.ghostAnimation) ? setTimeout(function () {
            return n.clear();
          }, o) : this.clear());
        }
      }, {
        key: "clear",
        value: function () {
          this.$el && this.$el.remove(), this.distance = {
            x: 0,
            y: 0
          }, this.$el = null;
        }
      }]), e;
    }();

    function O() {
      var i = [];
      return {
        captureAnimationState: function () {
          var t = s(Array.from(this.rootEl.children)),
              e = (o = t, n = this.dragEl, e = this.dropEl, n = o.indexOf(n), o = o.indexOf(e), n < o ? {
            start: n,
            end: o
          } : {
            start: o,
            end: n
          }),
              o = e.start,
              n = e.end;
          i.length = 0, t.slice(o, n + 1).forEach(function (t) {
            i.push({
              target: t,
              rect: T(t)
            });
          });
        },
        animateRange: function () {
          var o = this;
          i.forEach(function (t) {
            var e = t.target,
                t = t.rect;
            o.animate(e, t, o.options.animation);
          });
        },
        animate: function (t, e) {
          var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 150,
              n = T(t),
              i = e.left - n.left,
              e = e.top - n.top;
          y(t, "none"), w(t, "translate3d(".concat(i, "px, ").concat(e, "px, 0)")), t.offsetLeft, y(t, "".concat(o, "ms")), w(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            y(t, ""), w(t, ""), t.animated = null;
          }, o);
        }
      };
    }

    var I = "undefined" != typeof document && !f && !u && "draggable" in document.createElement("div");

    function H(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      this.rootEl = t, this.scrollEl = _(t, !0), this.options = e = Object.assign({}, e), this.ownerDocument = t.ownerDocument;
      var o,
          n = {
        autoScroll: !0,
        scrollStep: 5,
        scrollThreshold: 15,
        delay: 0,
        delayOnTouchOnly: !1,
        disabled: !1,
        animation: 150,
        ghostAnimation: 0,
        ghostClass: "",
        ghostStyle: {},
        chosenClass: "",
        draggable: void 0,
        dragging: void 0,
        onDrag: void 0,
        onMove: void 0,
        onDrop: void 0,
        onChange: void 0,
        fallbackOnBody: !1,
        forceFallback: !1,
        stopPropagation: !1,
        supportPointer: "PointerEvent" in window && !h,
        supportTouch: "ontouchstart" in window
      };

      for (o in n) o in this.options || (this.options[o] = n[o]);

      this.container = this.options.fallbackOnBody ? document.body : this.rootEl, this.nativeDraggable = !this.options.forceFallback && I, this.move = {
        x: 0,
        y: 0
      }, this.state = new A(), this.differ = new C(), this.ghost = new L(this), this.dragEl = null, this.dropEl = null, this.dragStartTimer = null, this.autoScrollTimer = null, Object.assign(this, O(), {
        _bindEventListener: function () {
          var t = this.options,
              e = t.supportPointer,
              t = t.supportTouch;
          b(this.rootEl, e ? "pointerdown" : t ? "touchstart" : "mousedown", this._onStart);
        },
        _unbindEventListener: function () {
          E(this.rootEl, "pointerdown", this._onStart), E(this.rootEl, "touchstart", this._onStart), E(this.rootEl, "mousedown", this._onStart);
        },
        _bindMoveEvents: function (t) {
          this.options.supportPointer ? b(this.ownerDocument, "pointermove", this._onMove) : b(this.ownerDocument, t ? "touchmove" : "mousemove", this._onMove);
        },
        _bindUpEvents: function () {
          b(this.ownerDocument, "pointerup", this._onDrop), b(this.ownerDocument, "pointercancel", this._onDrop), b(this.ownerDocument, "touchend", this._onDrop), b(this.ownerDocument, "touchcancel", this._onDrop), b(this.ownerDocument, "mouseup", this._onDrop);
        },
        _unbindMoveEvents: function () {
          E(this.ownerDocument, "pointermove", this._onMove), E(this.ownerDocument, "touchmove", this._onMove), E(this.ownerDocument, "mousemove", this._onMove);
        },
        _unbindUpEvents: function () {
          E(this.ownerDocument, "pointerup", this._onDrop), E(this.ownerDocument, "pointercancel", this._onDrop), E(this.ownerDocument, "touchend", this._onDrop), E(this.ownerDocument, "touchcancel", this._onDrop), E(this.ownerDocument, "mouseup", this._onDrop);
        }
      }), this._onStart = this._onStart.bind(this), this._onMove = this._onMove.bind(this), this._onDrop = this._onDrop.bind(this), this._bindEventListener(), window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      });
    }

    return H.prototype = {
      constructor: H,
      destroy: function () {
        this._unbindEventListener(), this._clearState();
      },
      set: function (t, e) {
        this.options[t] = e;
      },
      get: function (t) {
        return this.options[t];
      },
      _onStart: function (t) {
        var e = this;

        if (!(/mousedown|pointerdown/.test(t.type) && 0 !== t.button || this.options.disabled)) {
          var o = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t,
              n = o || t;

          if (this.nativeDraggable || !h || !n.target || "SELECT" !== n.target.tagName.toUpperCase()) {
            if (n.target === this.rootEl) return !0;
            this.options.stopPropagation && t.stopPropagation();
            var t = this.options,
                i = t.delay,
                t = t.delayOnTouchOnly;
            !i || t && !o || this.nativeDraggable && (c || l) ? this._onDrag(n, o) : (clearTimeout(this.dragStartTimer), this.dragStartTimer = setTimeout(function () {
              return e._onDrag(n, o);
            }, i));
          }
        }
      },
      _onDrag: function (t, e) {
        var o = this.options,
            n = o.draggable,
            o = o.dragging;

        if ("function" == typeof n) {
          if (!n(t)) return !0;
        } else if ("string" == typeof n) {
          if (!function (t, e) {
            if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
              if (t.matches) return t.matches(e);
              if (t.msMatchesSelector) return t.msMatchesSelector(e);
              if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
            } catch (t) {
              return;
            }
          }(t.target, n)) return !0;
        } else if (void 0 !== n) throw new Error('draggable expected "function" or "string" but received "'.concat(i(n), '"'));

        if (this._removeSelection(), o) {
          if ("function" != typeof o) throw new Error('dragging expected "function" or "string" but received "'.concat(i(o), '"'));
          this.dragEl = o(t);
        } else this.dragEl = x(this.rootEl, t.target, !0);

        if (!this.dragEl || this.dragEl.animated) return !0;
        n = x(this.rootEl, this.dragEl), o = n.rect, n = n.offset;
        this.move = {
          x: t.clientX,
          y: t.clientY
        }, this.differ.from = {
          node: this.dragEl,
          rect: o,
          offset: n
        }, this.ghost.distance = {
          x: t.clientX - o.left,
          y: t.clientY - o.top
        }, this.state.sortableDown = t, this._bindMoveEvents(e), this._bindUpEvents(e);
      },
      _onStarted: function (t, e) {
        var o;
        this.ghost.$el || (o = this.differ.from.rect, this.ghost.init(this.dragEl.cloneNode(!0), o), $(this.dragEl, this.options.chosenClass, !0), this.dragEl.style["touch-action"] = "none", this.dragEl.style["will-change"] = "transform", (o = this.options.onDrag) && "function" == typeof o && o(this.dragEl, t, e), h && M(document.body, "user-select", "none"));
      },
      _onMove: function (t) {
        var e,
            o,
            n,
            i,
            r,
            s,
            a,
            l,
            c = this;
        this.state.sortableDown && (o = (e = (i = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t) || t).clientX, n = e.clientY, i = i ? document.elementFromPoint(o, n) : e.target, s = o - this.move.x, r = n - this.move.y, void 0 !== o && Math.abs(s) <= 0 && void 0 !== n && Math.abs(r) <= 0 || (this.state.sortableMove = e, this.options.stopPropagation && t.stopPropagation && t.stopPropagation(), void 0 !== t.preventDefault && t.cancelable && t.preventDefault(), this._onStarted(e, t), this.ghost.move(s, r), (s = this.options.onMove) && "function" == typeof s && s(this.differ.from, this.ghost.$el, e, t), o < 0 || n < 0 || (s = (r = T(this.rootEl)).top, a = r.right, l = r.bottom, o < r.left || a < o || n < s || l < n || (this._onChange(this, i, e, t), this.autoScrollTimer && clearTimeout(this.autoScrollTimer), this.options.autoScroll && (this.autoScrollTimer = setTimeout(function () {
          return c._autoScroll(c);
        }, 0))))));
      },
      _onChange: k(function (t, e, o, n) {
        var i,
            r,
            s,
            a,
            l,
            c,
            e = x(t.rootEl, e),
            h = e.el,
            u = e.rect,
            e = e.offset;
        h && !h.animated && (t.dropEl = h, c = o.clientX, i = o.clientY, l = u.left, r = u.right, s = u.top, a = u.bottom, l < c && c < r && s < i && i < a && h !== t.dragEl && (t.differ.to = {
          node: t.dropEl,
          rect: u,
          offset: e
        }, t.captureAnimationState(), l = t.options.onChange, c = S(t.dragEl), l && "function" == typeof l && l(t.differ.from, t.differ.to, o, n), c.top < e.top || c.left < e.left ? t.rootEl.insertBefore(t.dragEl, h.nextElementSibling) : t.rootEl.insertBefore(t.dragEl, h), t.animateRange()));
      }, 5),
      _onDrop: function (t) {
        var e, o, n;
        this._unbindMoveEvents(), this._unbindUpEvents(), clearTimeout(this.dragStartTimer), this.options.stopPropagation && t.stopPropagation(), t.cancelable && t.preventDefault(), $(this.dragEl, this.options.chosenClass, !1), this.dragEl.style["touch-action"] = "", this.dragEl.style["will-change"] = "", this.state.sortableDown && this.state.sortableMove && (this.differ.to.offset = S(this.dragEl), this.differ.to.rect = T(this.dragEl), o = (e = this.differ).from, e = e.to, o = o.offset.top !== e.offset.top || o.offset.left !== e.offset.left, (n = this.options.onDrop) && "function" == typeof n && n(o, t), this.ghost.destroy(e.rect)), this.differ.destroy(), this.state = new A(), h && M(document.body, "user-select", "");
      },
      _autoScroll: P(function (t) {
        var e, o, n, i, r, s, a, l, c, h, u, f, d, p, m;
        t.state.sortableDown && t.state.sortableMove && (e = (o = t.state.sortableMove).clientX, o = o.clientY, void 0 !== e && void 0 !== o && t.scrollEl !== t.ownerDocument && (n = (p = t.scrollEl).scrollTop, i = p.scrollLeft, r = p.scrollHeight, p = p.scrollWidth, s = (d = T(t.scrollEl)).top, u = d.right, a = d.bottom, f = d.left, l = d.height, d = d.width, c = (h = t.options).scrollStep, h = h.scrollThreshold, f = 0 < i && f <= e && e <= f + h, d = i + d < p && e <= u && u - h <= e, p = n + l < r && o <= a && a - h <= o, m = {
          x: i,
          y: n
        }, (u = 0 < n && s <= o && o <= s + h) ? (m.x = f ? i - c : d ? i + c : i, m.y = n - c) : p ? (m.x = f ? i - c : d ? i + c : i, m.y = n + c) : f ? (m.x = i - c, m.y = n) : d && (m.x = i + c, m.y = n), (u || f || d || p) && requestAnimationFrame(function () {
          t.scrollEl.scrollTo(m.x, m.y), t._autoScroll(t);
        })));
      }, 10),
      _removeSelection: function () {
        try {
          document.selection ? setTimeout(function () {
            document.selection.empty();
          }, 0) : window.getSelection().removeAllRanges();
        } catch (t) {}
      },
      _clearState: function () {
        this.dragEl = null, this.dropEl = null, this.state = new A(), this.ghost.destroy(), this.differ.destroy();
      }
    }, H.utils = {
      getRect: T,
      getOffset: S,
      debounce: k,
      throttle: P,
      getParentAutoScrollElement: _
    }, H;
  });
  });

  function Sortable(options, onDrag, onDrop) {
    this.options = options;
    this.onDrag = onDrag;
    this.onDrop = onDrop;
    this.list = options.list;
    this.getDataKey = options.getDataKey;
    this.drag = null;
    this.dragElement = null;
    this.dragState = new DragState();
    this.rangeIsChanged = false;
    this.init();
  }

  Sortable.prototype = {
    constructor: Sortable,
    set: function set(key, value) {
      this.options[key] = value;
      this.drag.set(key, value);
    },
    init: function init() {
      var _this = this;

      var _this$options = this.options,
          disabled = _this$options.disabled,
          dragging = _this$options.dragging,
          draggable = _this$options.draggable,
          ghostClass = _this$options.ghostClass,
          ghostStyle = _this$options.ghostStyle,
          chosenClass = _this$options.chosenClass,
          animation = _this$options.animation,
          autoScroll = _this$options.autoScroll,
          scrollStep = _this$options.scrollStep,
          scrollThreshold = _this$options.scrollThreshold;
      var cloneList = new Array();
      this.drag = new sortable_min(this.options.scrollEl, {
        disabled: disabled,
        dragging: dragging,
        draggable: draggable,
        ghostClass: ghostClass,
        ghostStyle: ghostStyle,
        chosenClass: chosenClass,
        animation: animation,
        autoScroll: autoScroll,
        scrollStep: scrollStep,
        scrollThreshold: scrollThreshold,
        onDrag: function onDrag(dragEl) {
          _this.dragElement = dragEl;
          cloneList = _toConsumableArray(_this.list);
          var key = dragEl.getAttribute('data-key');

          var index = _this.list.findIndex(function (el) {
            return _this.getDataKey(el) == key;
          });

          var item = _this.list[index];
          Object.assign(_this.dragState.from, {
            item: item,
            index: index,
            key: key
          });
          _this.rangeIsChanged = false; // drag

          _this.onDrag(_this.dragState.from);
        },
        onChange: function onChange(_old_, _new_) {
          var oldKey = _this.dragState.from.key;

          var newKey = _new_.node.getAttribute('data-key');

          var from = {
            item: null,
            index: -1
          };
          var to = {
            item: null,
            index: -1
          };
          cloneList.forEach(function (el, index) {
            var key = _this.getDataKey(el);

            if (key == oldKey) Object.assign(from, {
              item: el,
              index: index
            });
            if (key == newKey) Object.assign(to, {
              item: el,
              index: index
            });
          });
          cloneList.splice(from.index, 1);
          cloneList.splice(to.index, 0, from.item);
        },
        onDrop: function onDrop(changed) {
          if (_this.rangeIsChanged && _this.dragElement) _this.dragElement.remove();
          var from = _this.dragState.from;
          var index = cloneList.findIndex(function (el) {
            return _this.getDataKey(el) == from.key;
          });
          var item = _this.list[index];
          _this.dragState.to = {
            index: index,
            item: item,
            key: _this.getDataKey(item)
          }; // drop 

          _this.onDrop(cloneList, from, _this.dragState.to, changed);

          _this.list = _toConsumableArray(cloneList);

          _this.clear();
        }
      });
    },
    clear: function clear() {
      this.dragElement = null;
      this.rangeIsChanged = false;
      this.dragState = new DragState();
    },
    destroy: function destroy() {
      this.drag && this.drag.destroy();
      this.drag = null;
    }
  };

  var VirtualProps = {
    // 列表数据
    dataSource: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    // 每一项的key值键值
    dataKey: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      "default": 'vertical' // 纵向滚动(vertical)还是横向滚动(horizontal)

    },
    // 列表展示多少条数据，为0或者不传会自动计算
    keeps: {
      type: Number,
      "default": 30
    },
    // 每一行预估高度
    size: {
      type: Number
    },
    // 防抖延迟时间
    delay: {
      type: Number,
      "default": 0
    },
    rootTag: {
      type: String,
      "default": 'div'
    },
    wrapTag: {
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
    itemStyle: {
      type: Object
    },
    itemClass: {
      type: String,
      "default": ''
    },
    // 禁用拖拽？
    disabled: {
      type: Boolean,
      "default": false
    },
    draggable: {
      type: [Function, String]
    },
    dragging: {
      type: Function
    },
    ghostClass: {
      type: String,
      "default": ''
    },
    // 拖拽时的样式
    ghostStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    chosenClass: {
      type: String,
      "default": ''
    },
    animation: {
      type: Number,
      "default": 150
    },
    autoScroll: {
      type: Boolean,
      "default": true
    },
    scrollStep: {
      type: Number,
      "default": 5
    },
    scrollThreshold: {
      type: Number,
      "default": 15
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
  var Items = Vue__default["default"].component('virtual-draglist-items', {
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
  var Slots = Vue__default["default"].component('virtual-draglist-slots', {
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

  /**
   * 防抖
   * @param {Function} func callback function
   * @param {Number} delay delay time
   * @param {Boolean} immediate whether to execute immediately
   * @returns function
   */
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

  var VirtualDragList = Vue__default["default"].component('virtual-drag-list', {
    props: VirtualProps,
    data: function data() {
      return {
        list: [],
        // 将dataSource克隆一份
        uniqueKeys: [],
        // 通过dataKey获取所有数据的唯一键值
        virtual: null,
        sortable: null,
        range: new Range(),
        dragState: new DragState()
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
        deep: true,
        immediate: true
      },
      disabled: {
        handler: function handler(val) {
          if (this.sortable) this.sortable.set('disabled', val);
        },
        immediate: true
      }
    },
    beforeDestroy: function beforeDestroy() {
      this._destroySortable();
    },
    methods: {
      // --------------------------- emits ------------------------------

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
          this.scrollToOffset(bottom); // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法

          setTimeout(function () {
            var offset = _this2.getOffset();

            var clientSize = Math.ceil(root[_this2.clientSizeKey]);
            var scrollSize = Math.ceil(root[_this2.scrollSizeKey]);
            if (offset + clientSize < scrollSize) _this2.scrollToBottom();
          }, this.delay + 3);
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
          }, this.delay + 3);
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

      /**
       * callback function after drop
       */
      handleDragEnd: function handleDragEnd(list, _old, _new, changed) {
        this.$emit('ondragend', list, _old, _new, changed);
      },
      // --------------------------- init ------------------------------
      init: function init(list) {
        var _this4 = this;

        this.list = _toConsumableArray(list);

        this._updateUniqueKeys();

        this._initVirtual(); // sortable init


        if (!this.sortable) {
          this.$nextTick(function () {
            return _this4._initSortable();
          });
        } else this.sortable.list = _toConsumableArray(list);
      },
      // virtual
      _initVirtual: function _initVirtual() {
        var _this5 = this;

        this.virtual = null;
        this.virtual = new Virtual({
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          isHorizontal: this.isHorizontal
        }, function (range) {
          _this5.range = range;
          var _this5$range = _this5.range,
              start = _this5$range.start,
              end = _this5$range.end;
          var index = _this5.dragState.from.index;

          if (index > -1 && !(index >= start && index <= end)) {
            if (_this5.sortable) _this5.sortable.rangeIsChanged = true;
          }
        });
        this.virtual.updateSizes(this.uniqueKeys);
        this.virtual.updateRange();
      },
      // sortable
      _initSortable: function _initSortable() {
        var _this6 = this;

        this.sortable = new Sortable({
          scrollEl: this.$refs.group,
          getDataKey: this._getDataKey,
          list: this.list,
          disabled: this.disabled,
          dragging: this.dragging,
          draggable: this.draggable,
          ghostClass: this.ghostClass,
          ghostStyle: this.ghostStyle,
          chosenClass: this.chosenClass,
          animation: this.animation,
          autoScroll: this.autoScroll,
          scrollStep: this.scrollStep,
          scrollThreshold: this.scrollThreshold
        }, function (from) {
          // on drag
          _this6.dragState.from = from;
        }, function (list, from, to, changed) {
          // on drop
          _this6.dragState.from = from;
          _this6.dragState.to = to;

          _this6.handleDragEnd(list, from, to, changed);

          if (changed) {
            _this6.list = _toConsumableArray(list);

            _this6._updateUniqueKeys();

            _this6.virtual.updateUniqueKeys(_this6.uniqueKeys);
          }

          setTimeout(function () {
            return _this6.dragState = new DragState();
          }, _this6.delay + 10);
        });
      },
      _destroySortable: function _destroySortable() {
        this.sortable && this.sortable.destroy();
        this.sortable = null;
      },
      // --------------------------- handle scroll ------------------------------
      _handleScroll: function _handleScroll() {
        // mouseup 事件时会触发scroll事件，这里处理为了防止range改变导致页面滚动
        if (this.dragState.to.key) return;
        var root = this.$refs.root;
        var offset = this.getOffset();
        var clientSize = Math.ceil(root[this.clientSizeKey]);
        var scrollSize = Math.ceil(root[this.scrollSizeKey]); // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离

        if (!scrollSize || offset < 0 || offset + clientSize > scrollSize + 1) return;
        this.virtual.handleScroll(offset);

        if (this.virtual.isFront()) {
          if (!!this.list.length && offset <= 0) this.handleToTop(this);
        } else if (this.virtual.isBehind()) {
          if (clientSize + offset >= scrollSize) this.handleToBottom(this);
        }
      },
      handleToTop: debounce(function (_this) {
        _this.$emit('top');
      }),
      handleToBottom: debounce(function (_this) {
        _this.$emit('bottom');
      }),
      // --------------------------- handle size change ------------------------------
      _onItemResized: function _onItemResized(id, size) {
        this.virtual.handleItemSizeChange(id, size);
      },
      _onHeaderResized: function _onHeaderResized(id, size) {
        this.virtual.handleHeaderSizeChange(size);
      },
      _onFooterResized: function _onFooterResized(id, size) {
        this.virtual.handleFooterSizeChange(size);
      },
      // --------------------------- methods ------------------------------
      _updateUniqueKeys: function _updateUniqueKeys() {
        var _this7 = this;

        this.uniqueKeys = this.list.map(function (item) {
          return _this7._getDataKey(item);
        });
      },
      _getDataKey: function _getDataKey(obj) {
        var dataKey = this.dataKey;
        return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
          return (o || {})[k];
        }, obj);
      },
      _getItemIndex: function _getItemIndex(item) {
        var _this8 = this;

        return this.list.findIndex(function (el) {
          return _this8._getDataKey(item) == _this8._getDataKey(el);
        });
      },
      _getItemStyle: function _getItemStyle(itemKey) {
        var key = this.dragState.from.key;
        if (this.sortable && this.sortable.rangeIsChanged && itemKey == key) return {
          display: 'none'
        };
        return {};
      }
    },
    // --------------------------- render ------------------------------
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
      }, [// 顶部插槽 
      header ? h(Slots, {
        props: {
          tag: headerTag,
          dataKey: 'header',
          event: '_onHeaderResized'
        }
      }, header) : null, // 中间内容区域和列表项
      h(wrapTag, {
        ref: 'group',
        attrs: {
          role: 'group'
        },
        "class": wrapClass,
        style: wrapStyle
      }, this.list.slice(start, end + 1).map(function (record) {
        var index = _this9._getItemIndex(record);

        var dataKey = _this9._getDataKey(record);

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
      })), // 底部插槽 
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          dataKey: 'footer',
          event: '_onFooterResized'
        }
      }, footer) : null, // 最底部元素
      h('div', {
        ref: 'bottomItem',
        style: {
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px'
        }
      })]);
    }
  });

  return VirtualDragList;

}));
