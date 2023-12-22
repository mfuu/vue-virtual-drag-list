/*!
 * vue-virtual-drag-list v2.8.0
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortableDnd_min = createCommonjsModule(function (module, exports) {
  !function (t, e) {
     module.exports = e() ;
  }(commonjsGlobal, function () {

    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }
    var L = {
        capture: !1,
        passive: !1
      },
      W = /\s+/g;
    function t(t) {
      if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
    }
    var R,
      e,
      r,
      l,
      h = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
      k = t(/Edge/i),
      B = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
      F = (R = !1, document.addEventListener("checkIfSupportPassive", null, {
        get passive() {
          return R = !0;
        }
      }), R),
      j = "undefined" == typeof window || "undefined" == typeof document ? {} : (e = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"], e = (Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/) || "" === e.OLink && ["", "o"])[1], {
        dom: "WebKit|Moz|MS|O".match(new RegExp("(" + e + ")", "i"))[1],
        lowercase: e,
        css: "-" + e + "-",
        js: e[0].toUpperCase() + e.substr(1)
      });
    function z(t, e) {
      t.style["".concat(j.css, "transition-duration")] = null == e ? "" : "".concat(e, "ms");
    }
    function a(t, e) {
      t.style["".concat(j.css, "transform")] = e ? "".concat(e) : "";
    }
    function c(t, e, n) {
      window.addEventListener ? t.addEventListener(e, n, !(!F && h) && L) : window.attachEvent ? t.attachEvent("on" + e, n) : t["on" + e] = n;
    }
    function n(t, e, n) {
      window.removeEventListener ? t.removeEventListener(e, n, !(!F && h) && L) : window.detachEvent ? t.detachEvent("on" + e, n) : t["on" + e] = null;
    }
    function G(t) {
      var e = t,
        n = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0],
        t = n ? document.elementFromPoint(n.clientX, n.clientY) : t.target;
      return !n || "clientX" in e || (e.clientX = n.clientX, e.clientY = n.clientY, e.pageX = n.pageX, e.pageY = n.pageY, e.screenX = n.screenX, e.screenY = n.screenY), {
        touch: n,
        event: e,
        target: t
      };
    }
    function V() {
      return document.scrollingElement || document.documentElement;
    }
    function f(t, e, n) {
      if (t.getBoundingClientRect || t === window) {
        var o,
          i,
          s,
          r,
          l,
          a,
          c = t !== window && t.parentNode && t !== V() ? (i = (o = t.getBoundingClientRect()).top, s = o.left, r = o.bottom, l = o.right, a = o.height, o.width) : (s = i = 0, r = window.innerHeight, l = window.innerWidth, a = window.innerHeight, window.innerWidth);
        if (e && t !== window) {
          n = n || t.parentNode;
          do {
            if (n && n.getBoundingClientRect) {
              var h = n.getBoundingClientRect();
              i -= h.top + parseInt(m(n, "border-top-width")), s -= h.left + parseInt(m(n, "border-left-width")), r = i + o.height, l = s + o.width;
              break;
            }
          } while (n = n.parentNode);
        }
        return {
          top: i,
          left: s,
          bottom: r,
          right: l,
          width: c,
          height: a
        };
      }
    }
    function u(t, e, n, o) {
      if (t) {
        n = n || document;
        do {
          if (null == e) {
            var i = Array.prototype.slice.call(n.children),
              s = i.indexOf(t);
            if (-1 < s) return i[s];
            for (var r = 0; r < i.length; r++) if (q(t, i[r])) return i[r];
          } else if ((">" !== e[0] || t.parentNode === n) && p(t, e) || o && t === n) return t;
        } while (t = t.parentNode);
      }
      return null;
    }
    function q(t, e) {
      if (t && e) {
        if (e.compareDocumentPosition) return e === t || 16 & e.compareDocumentPosition(t);
        if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
        for (; t = t.parentNode;) if (t === e) return 1;
      }
    }
    function i(t, e) {
      var n = 0;
      if (!t || !t.parentNode) return -1;
      for (; t = t.previousElementSibling;) "TEMPLATE" === t.nodeName.toUpperCase() || e && !p(t, e) || "none" === m(t, "display") || n++;
      return n;
    }
    function U(t, e, n, o) {
      for (var i = 0, s = 0, r = t.children; i < r.length;) {
        if (r[i] !== H.ghost && "none" !== m(r[i], "display") && u(r[i], n, t, !1) && (o || r[i] !== H.dragged)) {
          if (s === e) return r[i];
          s++;
        }
        i++;
      }
      return null;
    }
    function K(t, e) {
      var n,
        o = m(t),
        i = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth),
        s = U(t, 0, e),
        t = U(t, 1, e),
        e = s && m(s),
        r = t && m(t),
        l = e && parseInt(e.marginLeft) + parseInt(e.marginRight) + f(s).width,
        a = r && parseInt(r.marginLeft) + parseInt(r.marginRight) + f(t).width,
        c = k || h ? "cssFloat" : "float";
      return "flex" === o.display ? "column" === o.flexDirection || "column-reverse" === o.flexDirection ? "vertical" : "horizontal" : "grid" === o.display ? o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal" : s && e.float && "none" !== e.float ? (n = "left" === e.float ? "left" : "right", !t || "both" !== r.clear && r.clear !== n ? "horizontal" : "vertical") : s && ("block" === e.display || "flex" === e.display || "table" === e.display || "grid" === e.display || i <= l && "none" === o[c] || t && "none" === o[c] && i < l + a) ? "vertical" : "horizontal";
    }
    function d(t, e, n) {
      var o;
      t && e && (t.classList ? t.classList[n ? "add" : "remove"](e) : (o = (" " + t.className + " ").replace(W, " ").replace(" " + e + " ", " "), t.className = (o + (n ? " " + e : "")).replace(W, " ")));
    }
    function p(t, e) {
      if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
        if (t.matches) return t.matches(e);
        if (t.msMatchesSelector) return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
      } catch (t) {
        return;
      }
    }
    function m(t, e, n) {
      var o = t && t.style;
      if (o) {
        if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
        o[e = e in o || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = n + ("string" == typeof n ? "" : "px");
      }
    }
    function s(t, e) {
      e = e;
      t = (t = t).compareDocumentPosition ? t.compareDocumentPosition(e) : t.contains ? (t != e && t.contains(e) && 16) + (t != e && e.contains(t) && 8) + (0 <= t.sourceIndex && 0 <= e.sourceIndex ? (t.sourceIndex < e.sourceIndex && 4) + (t.sourceIndex > e.sourceIndex && 2) : 1) + 0 : 0;
      return 2 === t ? 1 : 4 === t ? -1 : 0;
    }
    function Z(t) {
      void 0 !== t.preventDefault && t.cancelable && t.preventDefault();
    }
    function g(t) {
      var e = t.sortable,
        n = t.name,
        t = t.params,
        e = e.options[n];
      "function" == typeof e && e(Object.assign({}, t));
    }
    function J(t) {
      this.options = t, this.autoScrollAnimationFrame = null;
    }
    function Q(t) {
      this.options = t, this.animations = [];
    }
    function $(t) {
      this.options = t || {}, this.selectedElements = [];
    }
    window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
      return setTimeout(t, 17);
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    }), J.prototype = {
      destroy: function () {
        null != this.autoScrollAnimationFrame && (cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = null);
      },
      update: function (t, e, n) {
        var o = this;
        cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = requestAnimationFrame(function () {
          e && n && o.autoScroll(t, n), o.update(t, e, n);
        });
      },
      autoScroll: function (t, e) {
        var n, o, i, s, r, l, a, c, h, u, d, p, m;
        t && void 0 !== e.clientX && void 0 !== e.clientY && (u = f(t)) && (n = e.clientX, e = e.clientY, o = u.top, i = u.right, s = u.bottom, r = u.left, p = u.height, u = u.width, e < o || i < n || s < e || n < r || (l = (a = this.options).scrollThreshold, a = a.scrollSpeed, d = t.scrollTop, c = t.scrollLeft, m = t.scrollHeight, h = 0 < d && o <= e && e <= o + l, u = c + u < t.scrollWidth && n <= i && i - l <= n, d = d + p < m && e <= s && s - l <= e, (m = p = 0) < c && r <= n && n <= r + l && (p = Math.floor(Math.max(-1, (n - r) / l - 1) * a.x)), u && (p = Math.ceil(Math.min(1, (n - i) / l + 1) * a.x)), h && (m = Math.floor(Math.max(-1, (e - o) / l - 1) * a.y)), (m = d ? Math.ceil(Math.min(1, (e - s) / l + 1) * a.y) : m) && (t.scrollTop += m), p && (t.scrollLeft += p)));
      }
    }, Q.prototype = {
      collect: function (t) {
        if (t) {
          for (var e = f(t), n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, i = Math.min(e.right, n), s = Math.min(e.bottom, o), r = Array.prototype.slice.call(t.children), l = [], a = 0; a <= r.length; a++) {
            var c = r[a];
            if (c && c !== H.ghost && "none" !== m(c, "display")) {
              var h = f(c);
              if (!(h.bottom < 0 || h.right < 0)) {
                if (h.top > s || h.left > i) break;
                l.push({
                  node: c,
                  rect: h
                });
              }
            }
          }
          this.animations.push(l);
        }
      },
      animate: function () {
        for (var t = this.animations.pop(), e = 0, n = t.length; e < n; e++) {
          var o = t[e],
            i = o.node,
            o = o.rect;
          this._excute(i, o);
        }
      },
      _excute: function (t, e) {
        var n = e.left,
          e = e.top,
          o = f(t);
        o.top === e && o.left === n || (e = e - o.top, n = n - o.left, z(t), a(t, "translate3d(".concat(n, "px, ").concat(e, "px, 0)")), t.offsetWidth, z(t, this.options.animation), a(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
          z(t), a(t, ""), t.animated = null;
        }, this.options.animation));
      }
    }, $.prototype = {
      destroy: function () {
        r = l = null;
      },
      active: function () {
        return !!r;
      },
      setParams: function (t) {
        t.nodes = r || [], t.clones = l || [];
      },
      select: function (t) {
        d(t, this.options.selectedClass, !0), this.selectedElements.push(t), this.selectedElements.sort(s);
      },
      deselect: function (t) {
        var e = this.selectedElements.indexOf(t);
        -1 < e && (d(t, this.options.selectedClass, !1), this.selectedElements.splice(e, 1));
      },
      getGhostElement: function () {
        var n;
        return r ? (n = document.createElement("div"), this.selectedElements.forEach(function (t, e) {
          t = t.cloneNode(!0);
          t.style = "position: absolute;left: 0;top: 0;bottom: 0;right: 0;opacity: ".concat(0 === e ? 1 : .5, ";z-index: ").concat(e, ";"), n.appendChild(t);
        }), n) : null;
      },
      toggleSelected: function (e, t) {
        var n = this;
        t ? e.forEach(function (t) {
          return n.selectedElements.push(t);
        }) : this.selectedElements = this.selectedElements.filter(function (t) {
          return e.indexOf(t) < 0;
        });
      },
      toggleClass: function (t) {
        if (r) for (var e = 0; e < r.length; e++) d(r[e], this.options.chosenClass, t);
      },
      toggleVisible: function (t) {
        r && (t ? (t = r.indexOf(H.dragged), this._viewElements(r, t, H.dragged)) : this._hideElements(r));
      },
      onChoose: function () {
        !this.options.multiple || !this.selectedElements.length || this.selectedElements.indexOf(H.dragged) < 0 || (this.selectedElements.sort(s), r = this.selectedElements, this.toggleClass(!0));
      },
      onDrag: function (t) {
        r && (t.animator.collect(H.dragged.parentNode), this._hideElements(r), t.animator.animate(), this.toggleClass(!1));
      },
      onDrop: function (t, e, n) {
        var o, i, s;
        r && (i = H.clone, s = r.indexOf(o = H.dragged), e.animator.collect(i.parentNode), t !== e && "clone" === n ? (m(i, "display", "none"), l = r.map(function (t) {
          return t.cloneNode(!0);
        }), this._viewElements(l, s, i), this._viewElements(r, s, o)) : this._viewElements(r, s, i), e.animator.animate(), t !== e) && (e.multiplayer.toggleSelected(l || r, !0), "clone" !== n) && t.multiplayer.toggleSelected(r, !1);
      },
      onSelect: function (t, e, n, o) {
        var e = G(e).event;
        !H.dragged && this._isClick(t, e) && (t = this.selectedElements.indexOf(n), d(n, this.options.selectedClass, t < 0), e = {
          from: o.el,
          event: e,
          node: n,
          index: i(n)
        }, t < 0 ? (this.selectedElements.push(n), g({
          sortable: o,
          name: "onSelect",
          params: e
        })) : (this.selectedElements.splice(t, 1), g({
          sortable: o,
          name: "onDeselect",
          params: e
        })), this.selectedElements.sort(s));
      },
      _viewElements: function (t, e, n) {
        for (var o, i = 0; i < t.length; i++) m(t[i], "display", ""), i < e ? n.parentNode.insertBefore(t[i], n) : (o = 0 < i ? t[i - 1] : n, n.parentNode.insertBefore(t[i], o.nextSibling));
      },
      _hideElements: function (t) {
        for (var e = 0; e < t.length; e++) t[e] != H.dragged && m(t[e], "display", "none");
      },
      _isClick: function (t, e) {
        var n = e.clientX - t.clientX,
          e = e.clientY - t.clientY,
          t = Math.sqrt(n * n + e * e);
        return 0 <= t && t <= 1;
      }
    };
    var v,
      y,
      w,
      tt,
      b,
      _,
      S,
      E,
      x,
      C,
      D,
      M,
      et,
      N,
      T,
      I,
      O,
      P,
      X,
      Y,
      A = "Sortable" + Date.now(),
      nt = [],
      ot = function (t) {
        var e = {},
          n = t.group;
        n && "object" == o(n) || (n = {
          name: n,
          pull: !0,
          put: !0,
          revertDrag: !0
        }), e.name = n.name, e.pull = n.pull, e.put = n.put, e.revertDrag = n.revertDrag, t.group = e;
      };
    function H(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable-dnd: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      (t[A] = this).el = t, this.options = e = Object.assign({}, e);
      var n,
        o,
        i = {
          store: null,
          disabled: !1,
          group: "",
          animation: 150,
          draggable: null,
          handle: null,
          multiple: !1,
          selectHandle: null,
          customGhost: null,
          direction: function () {
            return K(t, e.draggable);
          },
          autoScroll: !0,
          scrollThreshold: 55,
          scrollSpeed: {
            x: 10,
            y: 10
          },
          delay: 0,
          delayOnTouchOnly: !1,
          touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
          ghostClass: "",
          ghostStyle: {},
          chosenClass: "",
          selectedClass: "",
          swapOnDrop: !0,
          fallbackOnBody: !1,
          supportTouch: "ontouchstart" in window,
          emptyInsertThreshold: -5
        };
      for (n in i) n in this.options || (this.options[n] = i[n]);
      for (o in ot(e), this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));
      var s = this.options.supportTouch;
      c(t, s ? "touchstart" : "mousedown", this._onDrag), nt.push(t), this.autoScroller = new J(this.options), this.multiplayer = new $(this.options), this.animator = new Q(this.options);
    }
    return H.prototype = {
      constructor: H,
      _onDrag: function (t) {
        var e,
          n,
          o,
          i,
          s = this;
        y || this.options.disabled || !this.options.group.pull || /mousedown|pointerdown/.test(t.type) && 0 !== t.button || (t = G(t), e = t.touch, n = t.event, t = t.target, B && t && "SELECT" === t.tagName.toUpperCase()) || !(o = u(t, this.options.draggable, this.el)) || o.animated || (y = o, E = n, c(D = e ? y : document, "mouseup", this._onDrop), c(D, "touchend", this._onDrop), c(D, "touchcancel", this._onDrop), i = (o = this.options).handle, "function" == typeof (o = o.selectHandle) && o(n)) || "string" == typeof o && p(t, o) || "function" == typeof i && !i(n) || "string" == typeof i && !p(t, i) || (t = (o = this.options).delay, i = o.delayOnTouchOnly, !t || i && !e || k || h ? this._onStart(e, n) : (c(this.el.ownerDocument, "touchmove", this._delayMoveHandler), c(this.el.ownerDocument, "mousemove", this._delayMoveHandler), c(this.el.ownerDocument, "mouseup", this._cancelStart), c(this.el.ownerDocument, "touchend", this._cancelStart), c(this.el.ownerDocument, "touchcancel", this._cancelStart), et = setTimeout(function () {
          return s._onStart(e, n);
        }, t)));
      },
      _delayMoveHandler: function (t) {
        t = t.touches ? t.touches[0] : t;
        Math.max(Math.abs(t.clientX - E.clientX), Math.abs(t.clientY - E.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
      },
      _cancelStart: function () {
        clearTimeout(et), n(this.el.ownerDocument, "touchmove", this._delayMoveHandler), n(this.el.ownerDocument, "mousemove", this._delayMoveHandler), n(this.el.ownerDocument, "mouseup", this._cancelStart), n(this.el.ownerDocument, "touchend", this._cancelStart), n(this.el.ownerDocument, "touchcancel", this._cancelStart);
      },
      _onStart: function (t, e) {
        var n = i(y);
        N = this.el, T = this.el, X = P = O = n, Y = y, v = this.el, b = y.cloneNode(!0), S = y.parentNode, I = this.options.group.pull, H.clone = b, H.active = this, d(H.dragged = y, this.options.chosenClass, !0), this.multiplayer.onChoose(), g({
          sortable: this,
          name: "onChoose",
          params: this._getParams(e)
        }), c(D, t ? "touchmove" : "mousemove", this._nearestSortable);
        try {
          document.selection ? setTimeout(function () {
            return document.selection.empty();
          }, 0) : window.getSelection().removeAllRanges();
        } catch (t) {}
      },
      _onStarted: function () {
        d(b, this.options.chosenClass, !0), this._appendGhost(), this.multiplayer.onDrag(this), g({
          sortable: this,
          name: "onDrag",
          params: this._getParams(E)
        }), m(y, "display", "none"), d(y, this.options.chosenClass, !1), y.parentNode.insertBefore(b, y), B && m(document.body, "user-select", "none");
      },
      _getGhostElement: function () {
        var t = this.options.customGhost;
        return "function" == typeof t ? t((t = this.multiplayer.selectedElements).length ? t : [y]) : this.multiplayer.getGhostElement() || y;
      },
      _appendGhost: function () {
        if (!_) {
          var t,
            e = this.options,
            n = e.fallbackOnBody,
            o = e.ghostClass,
            e = e.ghostStyle,
            n = n ? document.body : this.el,
            i = this._getGhostElement(),
            i = (d(_ = i.cloneNode(!0), o, !0), f(y)),
            s = Object.assign({
              position: "fixed",
              top: i.top,
              left: i.left,
              width: i.width,
              height: i.height,
              minWidth: i.width,
              minHeight: i.height,
              opacity: "0.8",
              overflow: "hidden",
              "z-index": "100000",
              "box-sizing": "border-box",
              "pointer-events": "none"
            }, e);
          for (t in s) m(_, t, s[t]);
          o = "none", _.style["".concat(j.css, "transition")] = o ? "none" === o ? "none" : "".concat(o) : "", a(_, "translate3d(0px, 0px, 0px)"), H.ghost = _, n.appendChild(_);
          e = (E.clientX - i.left) / parseInt(_.style.width) * 100, o = (E.clientY - i.top) / parseInt(_.style.height) * 100;
          m(_, "transform-origin", "".concat(e, "% ").concat(o, "%")), m(_, "transform", "translateZ(0)"), m(_, "will-change", "transform");
        }
      },
      _nearestSortable: function (t) {
        var e, n, o, i, s, r, l;
        Z(t), !E || !y || (o = x || E, i = (e = t).clientX, e = e.clientY, n = i - o.clientX, o = e - o.clientY, void 0 !== i && void 0 !== e && Math.abs(n) <= 0 && Math.abs(o) <= 0) || (x || this._onStarted(), e = (i = G(t)).event, n = i.target, o = (x = e).clientX - E.clientX, t = e.clientY - E.clientY, a(_, "translate3d(".concat(o, "px, ").concat(t, "px, 0)")), this.options.autoScroll && (i = function (t, e) {
          if (t && t.getBoundingClientRect) {
            var n = t,
              o = !1;
            do {
              if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                var i = m(n);
                if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                  if (!n.getBoundingClientRect || n === document.body) return V();
                  if (o || e) return n;
                  o = !0;
                }
              }
            } while (n = n.parentNode);
          }
          return V();
        }(n, !0), this.autoScroller.update(i, E, x)), s = e.clientX, r = e.clientY, nt.some(function (t) {
          var e,
            n,
            o = t[A].options.emptyInsertThreshold;
          if (null != o) return n = f(t), e = s >= n.left - o && s <= n.right + o, n = r >= n.top - o && r <= n.bottom + o, e && n ? l = t : void 0;
        }), l && l[A]._onMove(e, n));
      },
      _allowPut: function () {
        var t, e, n;
        return v === this.el || !!this.options.group.put && (t = (e = this.options.group).name, e = e.put, n = v[A].options.group, e.join && -1 < e.indexOf(n.name) || n.name && t && n.name === t);
      },
      _allowSwap: function () {
        var t = s(b, w),
          e = (tt = t < 0 ? w.nextSibling : w, f(w)),
          n = "function" == typeof this.options.direction ? this.options.direction.call(x, y, this) : this.options.direction,
          o = "vertical" === n,
          i = o ? x.clientY : x.clientX,
          n = w["vertical" === n ? "offsetHeight" : "offsetWidth"],
          i = i >= (o ? e.top : e.left) && i < (o ? e.bottom : e.right) - n / 2 ? -1 : 1;
        return C !== w ? (M = i, !0) : M !== i && ((M = i) < 0 ? 0 < t : t < 0);
      },
      _onMove: function (t, e) {
        var n, o, i;
        this._allowPut() && (g({
          sortable: this,
          name: "onMove",
          params: this._getParams(t)
        }), this.el === T || e !== this.el && function (t, e) {
          for (var n = t.lastElementChild; n && (n === H.ghost || "none" === m(n, "display") || e && !p(n, e));) n = n.previousElementSibling;
          return n;
        }(this.el) ? (w = u(e, this.options.draggable, this.el)) && !w.animated && this._allowSwap() && (C = (w === b || q(w, b) || (this.el !== T ? this._onInsert(t) : (n = t, o = S, i = i || f(o), n.clientX <= i.right && n.clientX >= i.left && n.clientY >= i.top && n.clientY <= i.bottom && e === S || this._onChange(t))), w)) : (w = C = null, this._onInsert(t)));
      },
      _onInsert: function (t) {
        var e = w || b,
          n = "clone" === I && this.el !== v && T === v,
          o = "clone" === I && this.el === v && T !== v;
        N = this.el, O = i(b), Y = e, S = w ? w.parentNode : this.el, T[A].animator.collect(b.parentNode), this.animator.collect(S), n && (m(y, "display", ""), v[A].multiplayer.toggleVisible(!0), v[A].options.group.revertDrag || T.insertBefore(y, b)), o && (O = i(y), m(y, "display", "none"), this.multiplayer.toggleVisible(!1)), w ? S.insertBefore(b, M < 0 ? w : w.nextSibling) : S.appendChild(b), P = i(b), n && v[A].options.group.revertDrag && g({
          sortable: v[A],
          name: "onChange",
          params: this._getParams(t, {
            to: v,
            target: y,
            newIndex: X,
            revertDrag: !0
          })
        }), n || g({
          sortable: T[A],
          name: "onRemove",
          params: this._getParams(t)
        }), o && w !== y && g({
          sortable: this,
          name: "onChange",
          params: this._getParams(t, {
            from: v,
            backToOrigin: !0
          })
        }), o || g({
          sortable: this,
          name: "onAdd",
          params: this._getParams(t)
        }), T[A].animator.animate(), this.animator.animate(), T = this.el;
      },
      _onChange: function (t) {
        w !== y && (S = w.parentNode, O = i(b), Y = w, this.animator.collect(S), S.insertBefore(b, tt), P = i(b), g({
          sortable: this,
          name: "onChange",
          params: this._getParams(t)
        }), this.animator.animate(), T = this.el);
      },
      _onDrop: function (t) {
        Z(t), this._cancelStart(), n(D, "touchmove", this._nearestSortable), n(D, "mousemove", this._nearestSortable), n(D, "mouseup", this._onDrop), n(D, "touchend", this._onDrop), n(D, "touchcancel", this._onDrop), d(y, this.options.chosenClass, !1), v && (T = v, O = X, Y === b && (Y = y), this.multiplayer.toggleClass(!1), g({
          sortable: this,
          name: "onUnchoose",
          params: this._getParams(t)
        }), x) && this._onEnd(t), !x && this.options.multiple && this.multiplayer.onSelect(E, t, y, this), _ && _.parentNode && _.parentNode.removeChild(_), this.multiplayer.destroy(), this.autoScroller.destroy(), this._nulling();
      },
      _onEnd: function (t) {
        t = this._getParams(t);
        this.multiplayer.onDrop(T[A], N[A], I), !this.options.swapOnDrop || "clone" === I && T !== N || S.insertBefore(y, b), "clone" !== I || T === N || this.multiplayer.active() ? b && b.parentNode && b.parentNode.removeChild(b) : d(b, this.options.chosenClass, !1), m(y, "display", ""), B && m(document.body, "user-select", ""), T !== N && g({
          sortable: T[A],
          name: "onDrop",
          params: t
        }), g({
          sortable: N[A],
          name: "onDrop",
          params: t
        });
      },
      _getParams: function (t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          n = Object.create(null);
        return n.event = t, n.to = N, n.from = T, n.node = y, n.clone = b, n.target = Y, n.oldIndex = O, n.newIndex = P, n.pullMode = I, this.multiplayer.setParams(n), Object.assign(n, e), n.relative = n.target === y ? 0 : s(n.target, b), n;
      },
      _nulling: function () {
        N = T = v = y = w = tt = b = _ = S = I = O = P = X = E = x = Y = C = D = M = et = H.clone = H.ghost = H.active = H.dragged = null;
      },
      destroy: function () {
        this._nulling(), this._cancelStart(), n(this.el, "touchstart", this._onDrag), n(this.el, "mousedown", this._onDrag), nt.splice(nt.indexOf(this.el), 1), this.el[A] = this.animator = this.multiplayer = this.autoScroller = null;
      },
      option: function (t, e) {
        if (void 0 === e) return this.options[t];
        this.options[t] = e, this.animator.options[t] = e, this.multiplayer.options[t] = e, this.autoScroller.options[t] = e, "group" === t && ot(this.options);
      },
      select: function (t) {
        this.multiplayer.select(t);
      },
      deselect: function (t) {
        this.multiplayer.deselect(t);
      },
      getSelectedElements: function () {
        return this.multiplayer.selectedElements;
      }
    }, H.utils = {
      on: c,
      off: n,
      css: m,
      index: i,
      closest: u,
      getRect: f,
      toggleClass: d,
      detectDirection: K
    }, H.get = function (t) {
      return t[A];
    }, H.create = function (t, e) {
      return new H(t, e);
    }, H;
  });
  });

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
  function throttle(fn, delay) {
    var timer = null;
    return function () {
      var context = this,
        args = arguments;
      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(context, args);
        }, delay);
      }
    };
  }
  function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
      return (o || {})[k];
    }, item);
  }

  var _scrollType, _scrollSize, _offsetSize, _offsetType;
  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var SCROLL_DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND',
    STATIONARY: 'STATIONARY'
  };
  var DIRECTION = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
  };
  var scrollType = (_scrollType = {}, _defineProperty(_scrollType, DIRECTION.VERTICAL, 'scrollTop'), _defineProperty(_scrollType, DIRECTION.HORIZONTAL, 'scrollLeft'), _scrollType);
  var scrollSize = (_scrollSize = {}, _defineProperty(_scrollSize, DIRECTION.VERTICAL, 'scrollHeight'), _defineProperty(_scrollSize, DIRECTION.HORIZONTAL, 'scrollWidth'), _scrollSize);
  var offsetSize = (_offsetSize = {}, _defineProperty(_offsetSize, DIRECTION.VERTICAL, 'offsetHeight'), _defineProperty(_offsetSize, DIRECTION.HORIZONTAL, 'offsetWidth'), _offsetSize);
  var offsetType = (_offsetType = {}, _defineProperty(_offsetType, DIRECTION.VERTICAL, 'offsetTop'), _defineProperty(_offsetType, DIRECTION.HORIZONTAL, 'offsetLeft'), _offsetType);
  var attributes = ['size', 'keeps', 'scroller', 'direction', 'debounceTime', 'throttleTime'];
  function Virtual(options) {
    this.options = options;
    var defaults = {
      size: 0,
      keeps: 0,
      buffer: 0,
      wrapper: null,
      scroller: null,
      direction: 'vertical',
      uniqueKeys: [],
      debounceTime: null,
      throttleTime: null
    };
    for (var name in defaults) {
      !(name in this.options) && (this.options[name] = defaults[name]);
    }
    this.sizes = new Map(); // store item size
    this.range = {
      start: 0,
      end: 0,
      front: 0,
      behind: 0
    };
    this.offset = 0;
    this.calcType = CACLTYPE.INIT;
    this.calcSize = {
      average: 0,
      total: 0,
      fixed: 0,
      header: 0
    };
    this.direction = '';
    this.useWindowScroll = null;
    this._updateScrollElement();
    this._updateOnScrollFunction();
    this.addScrollEventListener();
    this._checkIfUpdate(0, options.keeps - 1);
  }
  Virtual.prototype = {
    constructor: Virtual,
    // ========================================= Public Methods =========================================
    isFront: function isFront() {
      return this.direction === SCROLL_DIRECTION.FRONT;
    },
    isBehind: function isBehind() {
      return this.direction === SCROLL_DIRECTION.BEHIND;
    },
    isFixed: function isFixed() {
      return this.calcType === CACLTYPE.FIXED;
    },
    getSize: function getSize(key) {
      return this.sizes.get(key) || this._getItemSize();
    },
    getOffset: function getOffset() {
      return this.scrollEl[scrollType[this.options.direction]];
    },
    getScrollSize: function getScrollSize() {
      return this.scrollEl[scrollSize[this.options.direction]];
    },
    getClientSize: function getClientSize() {
      return this.scrollEl[offsetSize[this.options.direction]];
    },
    scrollToOffset: function scrollToOffset(offset) {
      this.scrollEl[scrollType[this.options.direction]] = offset;
    },
    scrollToIndex: function scrollToIndex(index) {
      if (index >= this.options.uniqueKeys.length - 1) {
        this.scrollToBottom();
      } else {
        var indexOffset = this._getOffsetByIndex(index);
        this.scrollToOffset(indexOffset);
      }
    },
    scrollToBottom: function scrollToBottom() {
      var _this = this;
      var offset = this.getScrollSize();
      this.scrollToOffset(offset);

      // if the bottom is not reached, execute the scroll method again
      setTimeout(function () {
        var clientSize = _this.getClientSize();
        var scrollSize = _this.getScrollSize();
        var scrollOffset = _this.getOffset();
        if (scrollOffset + clientSize + 1 < scrollSize) {
          _this.scrollToBottom();
        }
      }, 5);
    },
    updateOptions: function updateOptions(key, value) {
      var _this2 = this;
      var oldValue = this.options[key];
      this.options[key] = value;
      if (key === 'uniqueKeys') {
        this.sizes.forEach(function (v, k) {
          if (!value.includes(k)) {
            _this2.sizes["delete"](k);
          }
        });
      } else if (key === 'scroller') {
        oldValue === null || oldValue === void 0 ? void 0 : oldValue.removeEventListener('scroll', this._onScroll);
        this._updateScrollElement();
        this.addScrollEventListener();
      }
    },
    updateRange: function updateRange(range) {
      if (range) {
        this._handleUpdate(range.start, range.end);
        return;
      }
      var start = this.range.start;
      start = Math.max(start, 0);
      this._handleUpdate(start, this._getEndByStart(start));
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
    addScrollEventListener: function addScrollEventListener() {
      var _this$options$scrolle;
      (_this$options$scrolle = this.options.scroller) === null || _this$options$scrolle === void 0 ? void 0 : _this$options$scrolle.addEventListener('scroll', this._onScroll, false);
    },
    removeScrollEventListener: function removeScrollEventListener() {
      var _this$options$scrolle2;
      (_this$options$scrolle2 = this.options.scroller) === null || _this$options$scrolle2 === void 0 ? void 0 : _this$options$scrolle2.removeEventListener('scroll', this._onScroll);
    },
    // ========================================= Properties =========================================
    _updateOnScrollFunction: function _updateOnScrollFunction() {
      var _this3 = this;
      var _this$options = this.options,
        debounceTime = _this$options.debounceTime,
        throttleTime = _this$options.throttleTime;
      if (debounceTime) {
        this._onScroll = debounce(function () {
          return _this3._handleScroll();
        }, debounceTime);
      } else if (throttleTime) {
        this._onScroll = throttle(function () {
          return _this3._handleScroll();
        }, throttleTime);
      } else {
        this._onScroll = function () {
          return _this3._handleScroll();
        };
      }
      this._onScroll = this._onScroll.bind(this);
    },
    _updateScrollElement: function _updateScrollElement() {
      this.scrollEl = this._getScrollElement(this.options.scroller);
    },
    _handleScroll: function _handleScroll() {
      var offset = this.getOffset();
      var clientSize = this.getClientSize();
      var scrollSize = this.getScrollSize();
      if (offset === this.offset) {
        this.direction = SCROLL_DIRECTION.STATIONARY;
      } else {
        this.direction = offset < this.offset ? SCROLL_DIRECTION.FRONT : SCROLL_DIRECTION.BEHIND;
      }
      this.offset = offset;
      var top = this.isFront() && offset <= 0;
      var bottom = this.isBehind() && clientSize + offset >= scrollSize;
      this.options.onScroll({
        top: top,
        bottom: bottom,
        offset: offset,
        direction: this.direction
      });
      if (this.isFront()) {
        this._handleScrollFront();
      } else if (this.isBehind()) {
        this._handleScrollBehind();
      }
    },
    _handleScrollFront: function _handleScrollFront() {
      var scrolls = this._getScrollItems();
      if (scrolls > this.range.start) {
        return;
      }
      var start = Math.max(scrolls - this.options.buffer, 0);
      this._checkIfUpdate(start, this._getEndByStart(start));
    },
    _handleScrollBehind: function _handleScrollBehind() {
      var scrolls = this._getScrollItems();
      if (scrolls < this.range.start + this.options.buffer) {
        return;
      }
      this._checkIfUpdate(scrolls, this._getEndByStart(scrolls));
    },
    _getScrollItems: function _getScrollItems() {
      var offset = this.offset - this._getScrollStartOffset();
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
        middleOffset = this._getOffsetByIndex(middle);
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
    _checkIfUpdate: function _checkIfUpdate(start, end) {
      var keeps = this.options.keeps;
      var total = this.options.uniqueKeys.length;
      if (total <= keeps) {
        start = 0;
        end = this._getLastIndex();
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1;
      }
      if (this.range.start !== start) {
        this._handleUpdate(start, end);
      }
    },
    _handleUpdate: function _handleUpdate(start, end) {
      this.range.start = start;
      this.range.end = end;
      this.range.front = this._getFrontOffset();
      this.range.behind = this._getBehindOffset();
      this.options.onUpdate(_objectSpread2({}, this.range));
    },
    _getFrontOffset: function _getFrontOffset() {
      if (this.isFixed()) {
        return this.calcSize.fixed * this.range.start;
      } else {
        return this._getOffsetByIndex(this.range.start);
      }
    },
    _getBehindOffset: function _getBehindOffset() {
      var end = this.range.end;
      var last = this._getLastIndex();
      if (this.isFixed()) {
        return (last - end) * this.calcSize.fixed;
      }
      return (last - end) * this._getItemSize();
    },
    _getOffsetByIndex: function _getOffsetByIndex(index) {
      if (!index) return 0;
      var offset = 0;
      for (var i = 0; i < index; i++) {
        var size = this.sizes.get(this.options.uniqueKeys[i]);
        offset = offset + (typeof size === 'number' ? size : this._getItemSize());
      }
      return offset;
    },
    _getEndByStart: function _getEndByStart(start) {
      return Math.min(start + this.options.keeps - 1, this._getLastIndex());
    },
    _getLastIndex: function _getLastIndex() {
      var _this$options2 = this.options,
        uniqueKeys = _this$options2.uniqueKeys,
        keeps = _this$options2.keeps;
      return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
    },
    _getItemSize: function _getItemSize() {
      return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
    },
    _getScrollElement: function _getScrollElement(scroller) {
      if (scroller instanceof Document && scroller.nodeType === 9 || scroller instanceof Window) {
        this.useWindowScroll = true;
        return document.scrollingElement || document.documentElement || document.body;
      }
      this.useWindowScroll = false;
      return scroller;
    },
    _getScrollStartOffset: function _getScrollStartOffset() {
      var offset = this.calcSize.header;
      if (this.useWindowScroll && this.options.wrapper) {
        var el = this.options.wrapper;
        do {
          offset += el[offsetType[this.options.direction]];
        } while ((el = el.offsetParent) && el !== this.options.wrapper.ownerDocument);
      }
      return offset;
    }
  };

  var attributes$1 = ['delay', 'group', 'handle', 'disabled', 'draggable', 'animation', 'autoScroll', 'ghostClass', 'ghostStyle', 'chosenClass', 'fallbackOnBody', 'scrollThreshold', 'delayOnTouchOnly'];
  function Sortable(ctx, onDrag, onDrop) {
    var _this = this;
    this.ctx = ctx;
    this.onDrag = onDrag;
    this.onDrop = onDrop;
    this.list = _toConsumableArray(ctx.list);
    this.store = {};
    var props = attributes$1.reduce(function (res, key) {
      res[key] = _this.ctx[key];
      return res;
    }, {});
    this.sortable = new sortableDnd_min(this.ctx.$refs.groupRef, _objectSpread2(_objectSpread2({}, props), {}, {
      swapOnDrop: false,
      onDrag: function onDrag(params) {
        return _this._onDrag(params);
      },
      onAdd: function onAdd(params) {
        return _this._onAdd(params);
      },
      onRemove: function onRemove(params) {
        return _this._onRemove(params);
      },
      onChange: function onChange(params) {
        return _this._onChange(params);
      },
      onUnchoose: function onUnchoose(params) {
        return _this._onUnchoose(params);
      },
      onDrop: function onDrop(params) {
        return _this._onDrop(params);
      }
    }));
  }
  Sortable.prototype = {
    constructor: Sortable,
    destroy: function destroy() {
      this.sortable && this.sortable.destroy();
      this.sortable = this.store = null;
    },
    setValue: function setValue(key, value) {
      if (key === 'list') {
        this.list = _toConsumableArray(value);
      } else {
        this.sortable.option(key, value);
      }
    },
    _onDrag: function _onDrag(params) {
      var key = params.node.dataset.key;
      var index = this._getIndex(this.list, key);
      var item = this.list[index];

      // store the drag item
      this.store = {
        item: item,
        key: key,
        origin: {
          index: index,
          list: this.list
        },
        from: {
          index: index,
          list: this.list
        },
        to: {
          index: index,
          list: this.list
        }
      };
      this.sortable.option('store', this.store);
      this.onDrag({
        list: this.list
      });
      this.ctx.$emit('drag', {
        item: item,
        index: index,
        key: key
      });
    },
    _onRemove: function _onRemove(params) {
      var key = params.node.dataset.key;
      var index = this._getIndex(this.list, key);
      var item = this.list[index];
      this.list.splice(index, 1);
      Object.assign(this.store, {
        key: key,
        item: item
      });
      this.sortable.option('store', this.store);
      this.ctx.$emit('remove', {
        item: item,
        index: index,
        key: key
      });
    },
    _onAdd: function _onAdd(params) {
      var from = params.from,
        target = params.target,
        relative = params.relative;
      var _Dnd$get$option = sortableDnd_min.get(from).option('store'),
        key = _Dnd$get$option.key,
        item = _Dnd$get$option.item;
      var index = this._getIndex(this.list, target.dataset.key);
      if (relative === -1) {
        index += 1;
      }
      this.list.splice(index, 0, item);
      Object.assign(this.store, {
        to: {
          index: index,
          list: this.list
        }
      });
      this.sortable.option('store', this.store);
      this.ctx.$emit('add', {
        item: item,
        index: index,
        key: key
      });
    },
    _onChange: function _onChange(params) {
      var store = sortableDnd_min.get(params.from).option('store');
      if (params.revertDrag) {
        this.list = _toConsumableArray(this.ctx.list);
        Object.assign(this.store, {
          from: store.origin
        });
        return;
      }
      var node = params.node,
        target = params.target,
        relative = params.relative,
        backToOrigin = params.backToOrigin;
      var fromIndex = this._getIndex(this.list, node.dataset.key);
      var fromItem = this.list[fromIndex];
      var toIndex = this._getIndex(this.list, target.dataset.key);
      if (backToOrigin) {
        if (relative === 1 && store.from.index < toIndex) {
          toIndex -= 1;
        }
        if (relative === -1 && store.from.index > toIndex) {
          toIndex += 1;
        }
      }
      this.list.splice(fromIndex, 1);
      this.list.splice(toIndex, 0, fromItem);
      Object.assign(this.store, {
        from: {
          index: toIndex,
          list: this.list
        },
        to: {
          index: toIndex,
          list: this.list
        }
      });
    },
    _onUnchoose: function _onUnchoose(params) {
      var _this$_getStore = this._getStore(params),
        from = _this$_getStore.from,
        to = _this$_getStore.to;
      if (params.from === params.to && from.origin.index === to.to.index) {
        this.sortable.option('swapOnDrop', true);
      }
    },
    _onDrop: function _onDrop(params) {
      var _this$_getStore2 = this._getStore(params),
        from = _this$_getStore2.from,
        to = _this$_getStore2.to;
      var changed = params.from !== params.to || from.origin.index !== to.to.index;
      this.onDrop({
        list: this.list
      });
      this.ctx.$emit('drop', {
        changed: changed,
        list: this.list,
        item: from.item,
        key: from.key,
        from: from.origin,
        to: to.to
      });
      if (params.from !== params.to && params.pullMode === 'clone') {
        var _params$clone;
        (_params$clone = params.clone) === null || _params$clone === void 0 ? void 0 : _params$clone.remove();
      }
      if (params.from === params.to && from.origin.index !== to.to.index) {
        var _Dnd$dragged;
        (_Dnd$dragged = sortableDnd_min.dragged) === null || _Dnd$dragged === void 0 ? void 0 : _Dnd$dragged.remove();
      }
      this.sortable.option('swapOnDrop', false);
    },
    _getIndex: function _getIndex(list, key) {
      for (var i = 0; i < list.length; i++) {
        if (getDataKey(list[i], this.ctx.dataKey) == key) {
          return i;
        }
      }
      return -1;
    },
    _getStore: function _getStore(params) {
      return {
        from: sortableDnd_min.get(params.from).option('store'),
        to: sortableDnd_min.get(params.to).option('store')
      };
    }
  };

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
    scroller: {
      type: [Window, Document, HTMLElement]
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
    debounceTime: {
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
    delay: {
      type: Number,
      "default": 0
    },
    delayOnTouchOnly: {
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
        start: 0,
        timer: null,
        range: {
          start: 0,
          end: 0,
          front: 0,
          behind: 0
        },
        virtual: null,
        sortable: null,
        lastLength: null,
        uniqueKeys: []
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
      itemSizeKey: function itemSizeKey() {
        return this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
      },
      virtualAttributes: function virtualAttributes() {
        var _this2 = this;
        return attributes.reduce(function (res, key) {
          res[key] = _this2[key];
          return res;
        }, {});
      },
      sortableAttributes: function sortableAttributes() {
        var _this3 = this;
        return attributes$1.reduce(function (res, key) {
          res[key] = _this3[key];
          return res;
        }, {});
      }
    },
    watch: {
      dataSource: {
        handler: function handler() {
          this._onUpdate();
        },
        deep: true
      },
      virtualAttributes: {
        handler: function handler(newVal, oldVal) {
          if (!this.virtual) return;
          for (var key in newVal) {
            if (newVal[key] != oldVal[key]) {
              this.virtual.updateOptions(key, newVal[key]);
            }
          }
        },
        deep: true
      },
      sortableAttributes: {
        handler: function handler(newVal, oldVal) {
          if (!this.sortable) return;
          for (var key in newVal) {
            if (newVal[key] != oldVal[key]) {
              this.sortable.setValue(key, newVal[key]);
            }
          }
        },
        deep: true
      }
    },
    activated: function activated() {
      // set back offset when awake from keep-alive
      this.scrollToOffset(this.virtual.offset);
      this.virtual.addScrollEventListener();
    },
    deactivated: function deactivated() {
      this.virtual.removeScrollEventListener();
    },
    created: function created() {
      this.range.end = this.keeps - 1;
      this._initVirtual();
      this._onUpdate();
    },
    mounted: function mounted() {
      this.virtual.updateOptions('wrapper', this.$refs.groupRef);
      if (!this.scroller) {
        this.virtual.updateOptions('scroller', this.$refs.rootRef);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.sortable && this.sortable.destroy();
      this.virtual.removeScrollEventListener();
      this.sortable = this.virtual = null;
    },
    methods: {
      /**
       * Git item size by data-key
       * @param {any} key data-key
       */
      getSize: function getSize(key) {
        return this.virtual.getSize(key);
      },
      /**
       * Get the current scroll height
       */
      getOffset: function getOffset() {
        return this.virtual.getOffset();
      },
      /**
       * Get client viewport size
       */
      getClientSize: function getClientSize() {
        return this.virtual.getClientSize();
      },
      /**
       * Get all scroll size
       */
      getScrollSize: function getScrollSize() {
        return this.virtual.getScrollSize();
      },
      /**
       * Scroll to the specified data-key
       * @param {Number|String} key
       */
      scrollToKey: function scrollToKey(key) {
        var index = this.uniqueKeys.indexOf(key);
        if (index > -1) {
          this.virtual.scrollToIndex(index);
        }
      },
      /**
       * Scroll to the specified index position
       * @param {Number} index
       */
      scrollToIndex: function scrollToIndex(index) {
        this.virtual.scrollToIndex(index);
      },
      /**
       * Scroll to the specified offset
       * @param {Number} offset
       */
      scrollToOffset: function scrollToOffset(offset) {
        this.virtual.scrollToOffset(offset);
      },
      /**
       * Scroll to top of list
       */
      scrollToTop: function scrollToTop() {
        this.virtual.scrollToOffset(0);
      },
      /**
       * Scroll to bottom of list
       */
      scrollToBottom: function scrollToBottom() {
        this.virtual.scrollToBottom();
      },
      _onUpdate: function _onUpdate() {
        var _this4 = this;
        var oldList = _toConsumableArray(this.list);
        this.list = this.dataSource;
        this._updateUniqueKeys();
        if (this.virtual.sizes.size) {
          this._updateRange(oldList, this.list);
        } else {
          clearTimeout(this.timer);
          this.timer = setTimeout(function () {
            return _this4.virtual.updateRange();
          }, 17);
        }
        if (!this.sortable) {
          this.$nextTick(function () {
            return _this4._initSortable();
          });
        } else {
          this.sortable.setValue('list', this.list);
        }

        // auto scroll to the last offset
        if (this.lastLength && this.keepOffset) {
          var index = Math.abs(this.list.length - this.lastLength);
          this.scrollToIndex(index);
          this.lastLength = null;
        }
        this.$forceUpdate();
      },
      // virtual init
      _initVirtual: function _initVirtual() {
        var _this5 = this;
        this.virtual = new Virtual({
          size: this.size,
          keeps: this.keeps,
          buffer: Math.round(this.keeps / 3),
          scroller: this.scroller,
          direction: this.direction,
          uniqueKeys: this.uniqueKeys,
          debounceTime: this.debounceTime,
          throttleTime: this.throttleTime,
          onScroll: function onScroll(params) {
            if (!!_this5.list.length && params.top) {
              _this5._handleToTop();
            } else if (params.bottom) {
              _this5._handleToBottom();
            }
          },
          onUpdate: function onUpdate(range) {
            _this5.range = range;
          }
        });
      },
      // sortable init
      _initSortable: function _initSortable() {
        var _this6 = this;
        this.sortable = new Sortable(this, function () {
          _this6.start = _this6.range.start;
        }, function (_ref) {
          var list = _ref.list;
          if (list.length === _this6.list.length && _this6.start < _this6.range.start) {
            _this6.range.front += sortableDnd_min.clone[_this6.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
            _this6.start = _this6.range.start;
          }
          _this6.$emit('updateDataSource', list);
        });
      },
      _updateRange: function _updateRange(oldList, newList) {
        var range = _objectSpread2({}, this.range);
        if (this.range.start > 0) {
          var index = newList.indexOf(oldList[this.range.start]);
          if (index > -1) {
            range.start = index;
            range.end = index + this.keeps - 1;
          }
        }
        if (newList.length > oldList.length && this.range.end === oldList.length - 1 && this._scrolledToBottom()) {
          range.end++;
          range.start = Math.max(0, range.end - this.keeps + 1);
        }
        this.virtual.updateRange(range);
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
      _updateUniqueKeys: function _updateUniqueKeys() {
        var _this7 = this;
        this.uniqueKeys = this.list.map(function (item) {
          return getDataKey(item, _this7.dataKey);
        });
        this.virtual.updateOptions('uniqueKeys', this.uniqueKeys);
      },
      _getItemStyle: function _getItemStyle(itemKey) {
        var _Dnd$dragged;
        var fromKey = (_Dnd$dragged = sortableDnd_min.dragged) === null || _Dnd$dragged === void 0 ? void 0 : _Dnd$dragged.dataset.key;
        if (itemKey == fromKey) {
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
      var pageMode = this.virtual.useWindowScroll;
      var _this$range2 = this.range,
        front = _this$range2.front,
        behind = _this$range2.behind;
      var isHorizontal = this.isHorizontal,
        headerTag = this.headerTag,
        footerTag = this.footerTag,
        rootTag = this.rootTag,
        wrapTag = this.wrapTag,
        wrapClass = this.wrapClass;
      var wrapStyle = _objectSpread2(_objectSpread2({}, this.wrapStyle), {}, {
        padding: isHorizontal ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
      });
      return h(rootTag, {
        ref: 'rootRef',
        style: !pageMode && {
          overflow: isHorizontal ? 'auto hidden' : 'hidden auto'
        }
      }, [this._renderSlots(h, 'header', headerTag), h(wrapTag, {
        ref: 'groupRef',
        "class": wrapClass,
        style: wrapStyle
      }, this._renderItems(h)), this._renderSlots(h, 'footer', footerTag)]);
    }
  });

  return VirtualDragList;

})));
