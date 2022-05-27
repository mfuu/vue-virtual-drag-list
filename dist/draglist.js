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

    function d(t) {
      return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
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

    function i(t, e, o) {
      e && n(t.prototype, e), o && n(t, o), Object.defineProperty(t, "prototype", {
        writable: !1
      });
    }

    function r(t) {
      return function (t) {
        if (Array.isArray(t)) return s(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
      }(t) || function (t, e) {
        if (t) {
          if ("string" == typeof t) return s(t, e);
          var o = Object.prototype.toString.call(t).slice(8, -1);
          return "Map" === (o = "Object" === o && t.constructor ? t.constructor.name : o) || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? s(t, e) : void 0;
        }
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function s(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var o = 0, n = new Array(e); o < e; o++) n[o] = t[o];

      return n;
    }

    function t(t) {
      if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
    }

    var a = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        l = t(/Edge/i),
        f = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
        e = t(/iP(ad|od|hone)/i),
        h = t(/chrome/i) && t(/android/i),
        c = {
      capture: !1,
      passive: !1
    },
        u = /\s+/g,
        p = ["-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition", "transition"],
        v = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"];

    function m(e, o) {
      o ? "none" === o ? p.forEach(function (t) {
        return D(e, t, "none");
      }) : p.forEach(function (t) {
        return D(e, t, "".concat(t.split("transition")[0], "transform ").concat(o));
      }) : p.forEach(function (t) {
        return D(e, t, "");
      });
    }

    function g(e, o) {
      o ? v.forEach(function (t) {
        return D(e, t, "".concat(t.split("transform")[0]).concat(o));
      }) : v.forEach(function (t) {
        return D(e, t, "");
      });
    }

    function w(t, e, o, n) {
      window.addEventListener ? t.addEventListener(e, o, !(!n && a) && c) : window.attachEvent && t.attachEvent("on" + e, o);
    }

    function y(t, e, o, n) {
      window.removeEventListener ? t.removeEventListener(e, o, !(!n && a) && c) : window.detachEvent && t.detachEvent("on" + e, o);
    }

    function b(t) {
      for (var e = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
      }, o = (e.height = t.offsetHeight, e.width = t.offsetWidth, e.top = t.offsetTop, e.left = t.offsetLeft, t.offsetParent); null !== o;) e.top += o.offsetTop, e.left += o.offsetLeft, o = o.offsetParent;

      return e;
    }

    function E(t) {
      var e, o;
      if (t.getBoundingClientRect || t === window) return e = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0
      }, t !== window && t.parentNode && t !== (!(o = document.scrollingElement) || o.contains(document.body) ? document : o) ? (o = t.getBoundingClientRect(), e.top = o.top, e.left = o.left, e.bottom = o.bottom, e.right = o.right, e.height = o.height, e.width = o.width) : (e.top = 0, e.left = 0, e.bottom = window.innerHeight, e.right = window.innerWidth, e.height = window.innerHeight, e.width = window.innerWidth), e;
    }

    function S(t, e, o) {
      var n = r(Array.from(t.children)),
          t = n.indexOf(e);
      if (-1 < t) return o ? n[t] : {
        index: t,
        el: n[t],
        rect: E(n[t]),
        offset: b(n[t])
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
        rect: E(n[i]),
        offset: b(n[i])
      };

      return o ? null : {
        index: -1,
        el: null,
        rect: {},
        offset: {}
      };
    }

    function _(t, e, o) {
      var n;
      t && e && (t.classList ? t.classList[o ? "add" : "remove"](e) : (n = (" " + t.className + " ").replace(u, " ").replace(" " + e + " ", " "), t.className = (n + (o ? " " + e : "")).replace(u, " ")));
    }

    function D(t, e, o) {
      var n = t && t.style;

      if (n) {
        if (void 0 === o) return document.defaultView && document.defaultView.getComputedStyle ? o = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (o = t.currentStyle), void 0 === e ? o : o[e];
        n[e = e in n || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = o + ("string" == typeof o ? "" : "px");
      }
    }

    var x = function () {
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

      return i(t, [{
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
        $ = function () {
      function e(t) {
        o(this, e), this.options = t, this.diff = {
          x: 0,
          y: 0
        }, this.position = {
          x: 0,
          y: 0
        }, this.exist = !1;
      }

      return i(e, [{
        key: "init",
        value: function (t, e) {
          var o, n;
          this.$el && this.$el.remove(), t && (this.$el = t, o = (t = this.options).ghostClass, t = void 0 === (t = t.ghostStyle) ? {} : t, n = e.width, e = e.height, this.$el.class = o, this.$el.style.width = n + "px", this.$el.style.height = e + "px", this.$el.style.position = "fixed", this.$el.style.left = 0, this.$el.style.top = 0, this.$el.style.zIndex = 1e5, this.$el.style.opacity = .8, this.$el.style.pointerEvents = "none", this.$el.style.cursor = "move", m(this.$el, "none"), g(this.$el, "translate3d(0px, 0px, 0px)"), this.setStyle(t));
        }
      }, {
        key: "setPosition",
        value: function (t, e) {
          this.position = {
            x: t - this.diff.x,
            y: e - this.diff.y
          };
        }
      }, {
        key: "setStyle",
        value: function (t) {
          for (var e in t) D(this.$el, e, t[e]);
        }
      }, {
        key: "rect",
        value: function () {
          return E(this.$el);
        }
      }, {
        key: "move",
        value: function (t) {
          var e;
          this.$el && (e = this.options.ghostAnimation, m(this.$el, t ? "".concat(e, "ms") : "none"), this.exist || (document.body.appendChild(this.$el), this.exist = !0), g(this.$el, "translate3d(".concat(this.position.x, "px, ").concat(this.position.y, "px, 0)")), "move" !== this.$el.style.cursor && (this.$el.style.cursor = "move"));
        }
      }, {
        key: "destroy",
        value: function (t) {
          var e = this,
              t = (t && (this.position = {
            x: t.left,
            y: t.top
          }, this.move(!0)), this.options.ghostAnimation);
          t ? setTimeout(function () {
            return e.clear();
          }, t) : this.clear();
        }
      }, {
        key: "clear",
        value: function () {
          this.$el && this.$el.remove(), this.$el = null, this.diff = {
            x: 0,
            y: 0
          }, this.position = {
            x: 0,
            y: 0
          }, this.exist = !1;
        }
      }]), e;
    }();

    function P() {
      var i = [];
      return {
        captureAnimationState: function () {
          var t = r(Array.from(this.$el.children)),
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
              rect: E(t)
            });
          });
        },
        animateRange: function () {
          var o = this;
          i.forEach(function (t) {
            var e = t.target,
                t = t.rect;
            o.animate(e, t, o.animation);
          });
        },
        animate: function (t, e) {
          var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 150,
              n = E(t),
              i = e.left - n.left,
              e = e.top - n.top;
          m(t, "none"), g(t, "translate3d(".concat(i, "px, ").concat(e, "px, 0)")), t.offsetLeft, m(t, "".concat(o, "ms")), g(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            m(t, ""), g(t, ""), t.animated = null;
          }, o);
        }
      };
    }

    var M = "undefined" != typeof document && !h && !e && "draggable" in document.createElement("div");

    function O(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      this.$el = t, this.options = e = Object.assign({}, e), this.dragEl = null, this.dropEl = null, this.differ = null, this.ghost = null;
      var o,
          n,
          i = {
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
        forceFallback: !1,
        stopPropagation: !1,
        supportPassive: (o = !1, document.addEventListener("checkIfSupportPassive", null, {
          get passive() {
            return o = !0;
          }

        }), o),
        supportPointer: "PointerEvent" in window && !f,
        supportTouch: "ontouchstart" in window,
        ownerDocument: this.$el.ownerDocument
      };

      for (n in i) n in this.options || (this.options[n] = i[n]);

      this.nativeDraggable = !this.options.forceFallback && M, this.differ = new x(), this.ghost = new $(this.options), Object.assign(this, P(), {
        _bindEventListener: function () {
          this._onStart = this._onStart.bind(this), this._onMove = this._onMove.bind(this), this._onDrop = this._onDrop.bind(this);
          var t = this.options,
              e = t.supportPointer,
              o = t.supportTouch,
              t = t.supportPassive;
          w(this.$el, e ? "pointerdown" : o ? "touchstart" : "mousedown", this._onStart, t);
        },
        _unbindEventListener: function () {
          var t = this.options.supportPassive;
          y(this.$el, "pointerdown", this._onStart, t), y(this.$el, "touchstart", this._onStart, t), y(this.$el, "mousedown", this._onStart, t);
        },
        _bindMoveEvents: function (t) {
          var e = this.options,
              o = e.supportPointer,
              n = e.ownerDocument,
              e = e.supportPassive;
          w(n, o ? "pointermove" : t ? "touchmove" : "mousemove", this._onMove, e);
        },
        _bindUpEvents: function () {
          var t = this.options,
              e = t.ownerDocument,
              t = t.supportPassive;
          w(e, "pointerup", this._onDrop, t), w(e, "pointercancel", this._onDrop, t), w(e, "touchend", this._onDrop, t), w(e, "touchcancel", this._onDrop, t), w(e, "mouseup", this._onDrop, t);
        },
        _unbindMoveEvents: function () {
          var t = this.options,
              e = t.ownerDocument,
              t = t.supportPassive;
          y(e, "pointermove", this._onMove, t), y(e, "touchmove", this._onMove, t), y(e, "mousemove", this._onMove, t);
        },
        _unbindUpEvents: function () {
          var t = this.options,
              e = t.ownerDocument,
              t = t.supportPassive;
          y(e, "pointerup", this._onDrop, t), y(e, "pointercancel", this._onDrop, t), y(e, "touchend", this._onDrop, t), y(e, "touchcancel", this._onDrop, t), y(e, "mouseup", this._onDrop, t);
        }
      }), this._bindEventListener(), this._handleDestroy();
    }

    return O.prototype = {
      constructor: O,
      destroy: function () {
        this._unbindEventListener(), this._resetState();
      },
      _onStart: function (t) {
        var e = this.options,
            o = e.delay,
            n = e.disabled,
            i = e.stopPropagation,
            e = e.delayOnTouchOnly;

        if (!(/mousedown|pointerdown/.test(t.type) && 0 !== t.button || n)) {
          var n = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t,
              r = n || t;

          if (this.nativeDraggable || !f || !r.target || "SELECT" !== r.target.tagName.toUpperCase()) {
            if (r.target === this.$el) return !0;
            i && t.stopPropagation(), !o || e && !n || this.nativeDraggable && (l || a) ? this._onDrag(r, n) : this.dragStartTimer = setTimeout(this._onDrag(r, n), o);
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
        } else if (void 0 !== n) throw new Error('draggable expected "function" or "string" but received "'.concat(d(n), '"'));

        try {
          document.selection ? setTimeout(function () {
            document.selection.empty();
          }, 0) : window.getSelection().removeAllRanges();
        } catch (t) {
          throw new Error(t);
        }

        if (o) {
          if ("function" != typeof o) throw new Error('dragging expected "function" or "string" but received "'.concat(d(o), '"'));
          this.dragEl = o(t);
        } else this.dragEl = S(this.$el, t.target, !0);

        if (!this.dragEl || this.dragEl.animated) return !0;
        n = S(this.$el, this.dragEl), o = n.rect, n = n.offset;
        window.sortableDndOnDownState = !0, this.ghost.setPosition(o.left, o.top), this.ghost.diff = {
          x: t.clientX - o.left,
          y: t.clientY - o.top
        }, this.differ.from = {
          node: this.dragEl,
          rect: o,
          offset: n
        }, this._bindMoveEvents(e), this._bindUpEvents(e);
      },
      _onMove: function (t) {
        void 0 !== t.preventDefault && t.preventDefault();
        var e = this.options,
            o = e.chosenClass,
            n = e.stopPropagation,
            i = e.onMove,
            e = e.onDrag,
            n = (n && t.stopPropagation(), t.touches && t.touches[0]),
            r = n || t,
            s = r.clientX,
            a = r.clientY,
            n = n ? document.elementFromPoint(s, a) : r.target;

        if (!this.ghost.$el && (this.ghost.init(this.dragEl.cloneNode(!0), this.differ.from.rect), void 0 !== e)) {
          if ("function" != typeof e) throw new Error('onDrag expected "function" but received "'.concat(d(e), '"'));
          e(this.dragEl, r, t);
        }

        if (void 0 !== i) {
          if ("function" != typeof i) throw new Error('onMove expected "function" but received "'.concat(d(i), '"'));
          i(this.differ.from, this.ghost.$el, r, t);
        }

        if (_(this.dragEl, o, !0), this.ghost.move(), window.sortableDndOnDownState && !(s < 0 || a < 0)) {
          window.sortableDndOnMoveState = !0, this.ghost.setPosition(s, a), this.ghost.move();
          e = E(this.$el);
          if (s < e.left || s > e.right || a < e.top || a > e.bottom) this.ghost.setStyle({
            cursor: "not-allowed"
          });else {
            var i = S(this.$el, n),
                o = i.index,
                e = i.el,
                n = i.rect,
                i = i.offset,
                l = n.left,
                f = n.right,
                h = n.top,
                c = n.bottom;

            if (e && !(o < 0) && (this.dropEl = e, l < s && s < f && h < a && a < c && e !== this.dragEl && (this.differ.to = {
              node: this.dropEl,
              rect: n,
              offset: i
            }, !e.animated))) {
              this.captureAnimationState();
              o = this.options.onChange, l = b(this.dragEl);

              if (void 0 !== o) {
                if ("function" != typeof o) throw new Error('onChange expected "function" but received "'.concat(d(o), '"'));
                o(this.differ.from, this.differ.to, r, t);
              }

              l.top < i.top || l.left < i.left ? this.$el.insertBefore(this.dragEl, e.nextElementSibling) : this.$el.insertBefore(this.dragEl, e), this.animateRange();
            }
          }
        }
      },
      _onDrop: function (t) {
        this._unbindMoveEvents(), this._unbindUpEvents(), clearTimeout(this.dragStartTimer);
        var e = this.options,
            o = e.onDrop,
            n = e.chosenClass;

        if (e.stopPropagation && t.stopPropagation(), _(this.dragEl, n, !1), window.sortableDndOnDownState && window.sortableDndOnMoveState) {
          this.differ.to.offset = b(this.dragEl), this.differ.to.rect = E(this.dragEl);
          e = this.differ, n = e.from, e = e.to, n = n.offset.top !== e.offset.top || n.offset.left !== e.offset.left;

          if (void 0 !== o) {
            if ("function" != typeof o) throw new Error('onDrop expected "function" but received "'.concat(d(o), '"'));
            o(n, t);
          }

          this.ghost.destroy(E(this.dragEl));
        }

        this.differ.destroy(), this._removeWindowState();
      },
      _resetState: function () {
        this.dragEl = null, this.dropEl = null, this.ghost.destroy(), this.differ.destroy(), this._removeWindowState();
      },
      _removeWindowState: function () {
        window.sortableDndOnDownState = null, window.sortableDndOnMoveState = null, window.sortableDndAnimationEnd = null, delete window.sortableDndOnDownState, delete window.sortableDndOnMoveState, delete window.sortableDndAnimationEnd;
      },
      _handleDestroy: function () {
        var t = this,
            e = null,
            o = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (o) {
          var n = this.options.ownerDocument;
          if (!n) return;
          (e = new o(function () {
            n.body.contains(t.$el) || (e.disconnect(), e = null, t._unbindEventListener(), t._resetState());
          })).observe(this.$el.parentNode, {
            childList: !0,
            attributes: !1,
            subtree: !1
          });
        }

        window.onbeforeunload = function () {
          e && e.disconnect(), e = null, t._unbindEventListener(), t._resetState();
        };
      }
    }, O;
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
    init: function init() {
      var _this = this;

      var _this$options = this.options,
          disabled = _this$options.disabled,
          dragging = _this$options.dragging,
          draggable = _this$options.draggable,
          ghostClass = _this$options.ghostClass,
          ghostStyle = _this$options.ghostStyle,
          chosenClass = _this$options.chosenClass,
          animation = _this$options.animation;
      var cloneList = new Array();
      this.drag = new sortable_min(this.options.scrollEl, {
        disabled: disabled,
        dragging: dragging,
        draggable: draggable,
        ghostClass: ghostClass,
        ghostStyle: ghostStyle,
        chosenClass: chosenClass,
        animation: animation,
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
          var _this2 = this;

          if (!val) this.$nextTick(function () {
            return _this2._initSortable();
          });else this._destroySortable();
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
        var _this3 = this;

        var _this$$refs = this.$refs,
            bottomItem = _this$$refs.bottomItem,
            root = _this$$refs.root;

        if (bottomItem) {
          var bottom = bottomItem[this.offsetSizeKey];
          this.scrollToOffset(bottom); // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法

          setTimeout(function () {
            var offset = _this3.getOffset();

            var clientSize = Math.ceil(root[_this3.clientSizeKey]);
            var scrollSize = Math.ceil(root[_this3.scrollSizeKey]);
            if (offset + clientSize < scrollSize) _this3.scrollToBottom();
          }, this.delay + 3);
        }
      },

      /**
       * Scroll to the specified index position
       * @param {Number} index 
       */
      scrollToIndex: function scrollToIndex(index) {
        var _this4 = this;

        if (index >= this.list.length - 1) {
          this.scrollToBottom();
        } else {
          var indexOffset = this.virtual.getOffsetByIndex(index);
          this.scrollToOffset(indexOffset);
          setTimeout(function () {
            var offset = _this4.getOffset();

            var indexOffset = _this4.virtual.getOffsetByIndex(index);

            if (offset !== indexOffset) _this4.scrollToIndex(index);
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
        this.list = _toConsumableArray(list);

        this._updateUniqueKeys();

        this._initVirtual(); // sortable init


        if (this.sortable) this.sortable.list = _toConsumableArray(list);
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

        this._destroySortable();

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
          animation: this.animation
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
//# sourceMappingURL=draglist.js.map
