/*!
 * vue-virtual-drag-list v2.6.15
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
    delay: {
      type: Number,
      "default": 10
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
    },
    keepOffset: {
      type: Boolean,
      "default": false
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
  }; // scroll range

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
      key: undefined,
      item: undefined,
      index: -1
    };
    this.to = {
      key: undefined,
      item: undefined,
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
      var _this2 = this;

      // check if need to update until loaded enough list item
      var start = Math.max(this.range.start, 0);
      var length = Math.min(this.options.keeps, this.options.uniqueKeys.length);

      if (this.sizes.size >= length - 1) {
        this.handleUpdate(start, this.getEndByStart(start));
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(function () {
            return _this2.updateRange();
          });
        } else {
          setTimeout(function () {
            return _this2.updateRange();
          }, 3);
        }
      }
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
    isFixed: function isFixed() {
      return this.calcType === CACLTYPE.FIXED;
    },
    getScrollItems: function getScrollItems(offset) {
      var _this$calcSize = this.calcSize,
          fixed = _this$calcSize.fixed,
          header = _this$calcSize.header; // 减去顶部插槽高度

      if (header) offset -= header;
      if (offset <= 0) return 0; // 固定高度

      if (this.isFixed()) return Math.floor(offset / fixed); // 非固定高度使用二分查找

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
    // --------------------------- size change ------------------------------
    // 获取列表项的高度
    getItemSize: function getItemSize() {
      return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
    },
    // 列表项高度变化
    handleItemSizeChange: function handleItemSizeChange(id, size) {
      this.sizes.set(id, size); // 'INIT' 状态表示每一项的高度都相同

      if (this.calcType === CACLTYPE.INIT) {
        this.calcType = CACLTYPE.FIXED; // 固定高度

        this.calcSize.fixed = size;
      } else if (this.isFixed() && this.calcSize.fixed !== size) {
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

  var sortable = createCommonjsModule(function (module, exports) {
  /*!
   * sortable-dnd v0.2.7
   * open source under the MIT license
   * https://github.com/mfuu/sortable-dnd#readme
   */
  (function (global, factory) {
    module.exports = factory() ;
  })(commonjsGlobal, function () {

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
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

    function userAgent(pattern) {
      if (typeof window !== 'undefined' && window.navigator) {
        return !! /*@__PURE__*/navigator.userAgent.match(pattern);
      }
    }

    var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
    var Edge = userAgent(/Edge/i);
    var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
    var IOS = userAgent(/iP(ad|od|hone)/i);
    var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
    var captureMode = {
      capture: false,
      passive: false
    };
    var R_SPACE = /\s+/g;
    var CSSTRANSITIONS = ['-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition', 'transition'];
    var CSSTRANSFORMS = ['-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform', 'transform'];
    var SUPPORTPASSIVE = supportPassive();
    /**
     * set transition style
     * @param {HTMLElement} el 
     * @param {String | Function} transition 
     */

    function setTransition(el, transition) {
      if (transition) {
        if (transition === 'none') CSSTRANSITIONS.forEach(function (ts) {
          return css(el, ts, 'none');
        });else CSSTRANSITIONS.forEach(function (ts) {
          return css(el, ts, "".concat(ts.split('transition')[0], "transform ").concat(transition));
        });
      } else CSSTRANSITIONS.forEach(function (ts) {
        return css(el, ts, '');
      });
    }
    /**
     * set transform style
     * @param {HTMLElement} el 
     * @param {String} transform 
     */


    function setTransform(el, transform) {
      if (transform) CSSTRANSFORMS.forEach(function (tf) {
        return css(el, tf, "".concat(tf.split('transform')[0]).concat(transform));
      });else CSSTRANSFORMS.forEach(function (tf) {
        return css(el, tf, '');
      });
    }
    /**
     * get touch event and current event
     * @param {Event} evt 
     */


    function getEvent(evt) {
      var touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt;
      var e = touch || evt;
      var target = touch ? document.elementFromPoint(e.clientX, e.clientY) : e.target;
      return {
        touch: touch,
        e: e,
        target: target
      };
    }
    /**
     * detect passive event support
     */


    function supportPassive() {
      // https://github.com/Modernizr/Modernizr/issues/1894
      var supportPassive = false;
      document.addEventListener('checkIfSupportPassive', null, {
        get passive() {
          supportPassive = true;
          return true;
        }

      });
      return supportPassive;
    }
    /**
    * add specified event listener
    * @param {HTMLElement} el 
    * @param {String} event 
    * @param {Function} fn 
    * @param {Boolean} sp
    */


    function on(el, event, fn) {
      if (window.addEventListener) {
        el.addEventListener(event, fn, SUPPORTPASSIVE || !IE11OrLess ? captureMode : false);
      } else if (window.attachEvent) {
        el.attachEvent('on' + event, fn);
      }
    }
    /**
    * remove specified event listener
    * @param {HTMLElement} el 
    * @param {String} event 
    * @param {Function} fn 
    * @param {Boolean} sp
    */


    function off(el, event, fn) {
      if (window.removeEventListener) {
        el.removeEventListener(event, fn, SUPPORTPASSIVE || !IE11OrLess ? captureMode : false);
      } else if (window.detachEvent) {
        el.detachEvent('on' + event, fn);
      }
    }
    /**
     * get element's offetTop
     * @param {HTMLElement} el 
     */


    function getOffset(el) {
      var result = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
      };
      result.height = el.offsetHeight;
      result.width = el.offsetWidth;
      result.top = el.offsetTop;
      result.left = el.offsetLeft;
      var parent = el.offsetParent;

      while (parent !== null) {
        result.top += parent.offsetTop;
        result.left += parent.offsetLeft;
        parent = parent.offsetParent;
      }

      return result;
    }
    /**
     * get scroll element
     * @param {HTMLElement} el 
     * @param {Boolean} includeSelf whether to include the passed element
     * @returns {HTMLElement} scroll element
     */


    function getParentAutoScrollElement(el, includeSelf) {
      // skip to window
      if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
      var elem = el;
      var gotSelf = false;

      do {
        // we don't need to get elem css if it isn't even overflowing in the first place (performance)
        if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
          var elemCSS = css(elem);

          if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
            if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
            if (gotSelf || includeSelf) return elem;
            gotSelf = true;
          }
        }
      } while (elem = elem.parentNode);

      return getWindowScrollingElement();
    }

    function getWindowScrollingElement() {
      var scrollingElement = document.scrollingElement;

      if (scrollingElement) {
        return scrollingElement.contains(document.body) ? document : scrollingElement;
      } else {
        return document;
      }
    }
    /**
     * Returns the "bounding client rect" of given element
     * @param {HTMLElement} el  The element whose boundingClientRect is wanted
     */


    function getRect(el) {
      if (!el.getBoundingClientRect && el !== window) return;
      var rect = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0
      };
      var elRect;

      if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
        elRect = el.getBoundingClientRect();
        rect.top = elRect.top;
        rect.left = elRect.left;
        rect.bottom = elRect.bottom;
        rect.right = elRect.right;
        rect.height = elRect.height;
        rect.width = elRect.width;
      } else {
        rect.top = 0;
        rect.left = 0;
        rect.bottom = window.innerHeight;
        rect.right = window.innerWidth;
        rect.height = window.innerHeight;
        rect.width = window.innerWidth;
      }

      return rect;
    }
    /**
     * get target Element in group
     * @param {HTMLElement} group 
     * @param {HTMLElement} el 
     * @param {Boolean} onlyEl only get element
     */


    function getElement(group, el, onlyEl) {
      var children = _toConsumableArray(Array.from(group.children)); // If it can be found directly in the child element, return


      var index = children.indexOf(el);
      if (index > -1) return onlyEl ? children[index] : {
        index: index,
        el: children[index],
        rect: getRect(children[index]),
        offset: getOffset(children[index])
      }; // When the dom cannot be found directly in children, need to look down

      for (var i = 0; i < children.length; i++) {
        if (isChildOf(el, children[i])) {
          return onlyEl ? children[i] : {
            index: i,
            el: children[i],
            rect: getRect(children[i]),
            offset: getOffset(children[i])
          };
        }
      }

      return onlyEl ? null : {
        index: -1,
        el: null,
        rect: {},
        offset: {}
      };
    }
    /**
     * Check if child element is contained in parent element
     * @param {HTMLElement} child 
     * @param {HTMLElement} parent 
     * @returns {Boolean} true | false
     */


    function isChildOf(child, parent) {
      var parentNode;

      if (child && parent) {
        parentNode = child.parentNode;

        while (parentNode) {
          if (parent === parentNode) return true;
          parentNode = parentNode.parentNode;
        }
      }

      return false;
    }
    /**
     * add or remove element's class
     * @param {HTMLElement} el element
     * @param {String} name class name
     * @param {Boolean} state true: add, false: remove
     */


    function toggleClass(el, name, state) {
      if (el && name) {
        if (el.classList) {
          el.classList[state ? 'add' : 'remove'](name);
        } else {
          var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
          el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
        }
      }
    }
    /**
     * Check if a DOM element matches a given selector
     * @param {HTMLElement} el 
     * @param {String} selector 
     * @returns 
     */


    function matches(el, selector) {
      if (!selector) return;
      selector[0] === '>' && (selector = selector.substring(1));

      if (el) {
        try {
          if (el.matches) {
            return el.matches(selector);
          } else if (el.msMatchesSelector) {
            return el.msMatchesSelector(selector);
          } else if (el.webkitMatchesSelector) {
            return el.webkitMatchesSelector(selector);
          }
        } catch (error) {
          return false;
        }
      }

      return false;
    }

    function css(el, prop, val) {
      var style = el && el.style;

      if (style) {
        if (val === void 0) {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            val = document.defaultView.getComputedStyle(el, '');
          } else if (el.currentStyle) {
            val = el.currentStyle;
          }

          return prop === void 0 ? val : val[prop];
        } else {
          if (!(prop in style) && prop.indexOf('webkit') === -1) {
            prop = '-webkit-' + prop;
          }

          style[prop] = val + (typeof val === 'string' ? '' : 'px');
        }
      }
    }

    function debounce(fn, delay, immediate) {
      var timer = null;
      return function () {
        var context = this,
            args = arguments;
        timer && clearTimeout(timer);
        immediate && !timer && fn.apply(context, args);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
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

    function _nextTick(fn) {
      return setTimeout(fn, 0);
    }

    var State = /*#__PURE__*/_createClass(function State() {
      _classCallCheck(this, State);

      this.sortableDown = undefined;
      this.sortableMove = undefined;
      this.animationEnd = undefined;
    });
    /**
     * 拖拽前后差异初始化
     */


    var Differ = /*#__PURE__*/function () {
      function Differ() {
        _classCallCheck(this, Differ);

        this.from = {
          node: null,
          rect: {},
          offset: {}
        };
        this.to = {
          node: null,
          rect: {},
          offset: {}
        };
      }

      _createClass(Differ, [{
        key: "get",
        value: function get(key) {
          return this[key];
        }
      }, {
        key: "set",
        value: function set(key, value) {
          this[key] = value;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.from = {
            node: null,
            rect: {},
            offset: {}
          };
          this.to = {
            node: null,
            rect: {},
            offset: {}
          };
        }
      }]);

      return Differ;
    }();
    /**
     * 拖拽中的元素
     */


    var Ghost = /*#__PURE__*/function () {
      function Ghost(sortable) {
        _classCallCheck(this, Ghost);

        this.$el = null;
        this.distance = {
          x: 0,
          y: 0
        };
        this.options = sortable.options;
        this.container = sortable.container;
      }

      _createClass(Ghost, [{
        key: "init",
        value: function init(el, rect) {
          var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          this.$el = el;
          var _this$options = this.options,
              ghostClass = _this$options.ghostClass,
              _this$options$ghostSt = _this$options.ghostStyle,
              ghostStyle = _this$options$ghostSt === void 0 ? {} : _this$options$ghostSt;
          toggleClass(this.$el, ghostClass, true);
          css(this.$el, 'box-sizing', 'border-box');
          css(this.$el, 'margin', 0);
          css(this.$el, 'top', rect.top);
          css(this.$el, 'left', rect.left);
          css(this.$el, 'width', rect.width);
          css(this.$el, 'height', rect.height);
          css(this.$el, 'opacity', '0.8'); // css(this.$el, 'position', IOS ? 'absolute' : 'fixed')

          css(this.$el, 'position', 'fixed');
          css(this.$el, 'zIndex', '100000');
          css(this.$el, 'pointerEvents', 'none');
          this.setStyle(ghostStyle);
          setTransition(this.$el, 'none');
          setTransform(this.$el, 'translate3d(0px, 0px, 0px)');
          if (append) this.container.appendChild(this.$el);
          css(this.$el, 'transform-origin', this.distance.x / parseInt(this.$el.style.width) * 100 + '% ' + this.distance.y / parseInt(this.$el.style.height) * 100 + '%');
        }
      }, {
        key: "setStyle",
        value: function setStyle(style) {
          for (var key in style) {
            css(this.$el, key, style[key]);
          }
        }
      }, {
        key: "rect",
        value: function rect() {
          return getRect(this.$el);
        }
      }, {
        key: "move",
        value: function move(x, y) {
          var smooth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          if (!this.$el) return;
          setTransition(this.$el, smooth ? "".concat(this.options.ghostAnimation, "ms") : 'none');
          setTransform(this.$el, "translate3d(".concat(x, "px, ").concat(y, "px, 0)"));
        }
      }, {
        key: "destroy",
        value: function destroy(rect) {
          var _this = this;

          if (!this.$el) return;
          var left = parseInt(this.$el.style.left);
          var top = parseInt(this.$el.style.top);
          this.move(rect.left - left, rect.top - top, true);
          var ghostAnimation = this.options.ghostAnimation;
          ghostAnimation ? setTimeout(function () {
            return _this.clear();
          }, ghostAnimation) : this.clear();
        }
      }, {
        key: "clear",
        value: function clear() {
          this.$el && this.$el.remove();
          this.distance = {
            x: 0,
            y: 0
          };
          this.$el = null;
        }
      }]);

      return Ghost;
    }();

    function AutoScroll() {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
          return setTimeout(callback, 17);
        };
      }

      return {
        _autoScroll: throttle(function (_this) {
          // check if is moving now
          if (!(_this.state.sortableDown && _this.state.sortableMove)) return;
          var _this$state$sortableM = _this.state.sortableMove,
              clientX = _this$state$sortableM.clientX,
              clientY = _this$state$sortableM.clientY;
          if (clientX === void 0 || clientY === void 0) return;
          if (_this.scrollEl === _this.ownerDocument) ;else {
            var _this$scrollEl = _this.scrollEl,
                scrollTop = _this$scrollEl.scrollTop,
                scrollLeft = _this$scrollEl.scrollLeft,
                scrollHeight = _this$scrollEl.scrollHeight,
                scrollWidth = _this$scrollEl.scrollWidth;

            var _getRect = getRect(_this.scrollEl),
                top = _getRect.top,
                right = _getRect.right,
                bottom = _getRect.bottom,
                left = _getRect.left,
                height = _getRect.height,
                width = _getRect.width;

            var _this$options = _this.options,
                scrollStep = _this$options.scrollStep,
                scrollThreshold = _this$options.scrollThreshold; // check direction

            var totop = scrollTop > 0 && clientY >= top && clientY <= top + scrollThreshold;
            var toleft = scrollLeft > 0 && clientX >= left && clientX <= left + scrollThreshold;
            var toright = scrollLeft + width < scrollWidth && clientX <= right && clientX >= right - scrollThreshold;
            var tobottom = scrollTop + height < scrollHeight && clientY <= bottom && clientY >= bottom - scrollThreshold; // scroll position

            var position = {
              x: scrollLeft,
              y: scrollTop
            };

            if (totop) {
              if (toleft) {
                // to top-left
                position.x = scrollLeft - scrollStep;
              } else if (toright) {
                // to top-right
                position.x = scrollLeft + scrollStep;
              } else {
                // to top
                position.x = scrollLeft;
              }

              position.y = scrollTop - scrollStep;
            } else if (tobottom) {
              if (toleft) {
                // to bottom-left
                position.x = scrollLeft - scrollStep;
              } else if (toright) {
                // to bottom-right
                position.x = scrollLeft + scrollStep;
              } else {
                // to bottom
                position.x = scrollLeft;
              }

              position.y = scrollTop + scrollStep;
            } else if (toleft) {
              // to left
              position.x = scrollLeft - scrollStep;
              position.y = scrollTop;
            } else if (toright) {
              // to right
              position.x = scrollLeft + scrollStep;
              position.y = scrollTop;
            } // if need to scroll


            if (totop || toleft || toright || tobottom) {
              requestAnimationFrame(function () {
                _this.scrollEl.scrollTo(position.x, position.y);

                _this._autoScroll(_this);
              });
            }
          }
        }, 10)
      };
    }

    function Animation() {
      var animationState = [];

      function getRange(children, drag, drop) {
        var start = children.indexOf(drag);
        var end = children.indexOf(drop);
        return start < end ? {
          start: start,
          end: end
        } : {
          start: end,
          end: start
        };
      }

      return {
        captureAnimationState: function captureAnimationState() {
          var children = _toConsumableArray(Array.from(this.rootEl.children));

          var _getRange = getRange(children, this.dragEl, this.dropEl),
              start = _getRange.start,
              end = _getRange.end;

          animationState.length = 0; // reset

          children.slice(start, end + 1).forEach(function (child) {
            animationState.push({
              target: child,
              rect: getRect(child)
            });
          });
        },
        animateRange: function animateRange() {
          var _this = this;

          animationState.forEach(function (state) {
            var target = state.target,
                rect = state.rect;

            _this.animate(target, rect, _this.options.animation);
          });
        },
        animate: function animate(el, preRect) {
          var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;
          var curRect = getRect(el);
          var left = preRect.left - curRect.left;
          var top = preRect.top - curRect.top;
          setTransition(el, 'none');
          setTransform(el, "translate3d(".concat(left, "px, ").concat(top, "px, 0)"));
          el.offsetLeft; // trigger repaint

          setTransition(el, "".concat(animation, "ms"));
          setTransform(el, 'translate3d(0px, 0px, 0px)');
          clearTimeout(el.animated);
          el.animated = setTimeout(function () {
            setTransition(el, '');
            setTransform(el, '');
            el.animated = null;
          }, animation);
        }
      };
    }

    function DNDEvent() {
      return {
        _bindEventListener: function _bindEventListener() {
          this._onDrag = this._onDrag.bind(this);
          this._onMove = this._onMove.bind(this);
          this._onDrop = this._onDrop.bind(this);
          var _this$options = this.options,
              supportPointer = _this$options.supportPointer,
              supportTouch = _this$options.supportTouch;

          if (supportPointer) {
            on(this.rootEl, 'pointerdown', this._onDrag);
          } else if (supportTouch) {
            on(this.rootEl, 'touchstart', this._onDrag);
          } else {
            on(this.rootEl, 'mousedown', this._onDrag);
          }
        },
        _clearEvent: function _clearEvent() {
          off(this.rootEl, 'pointerdown', this._onDrag);
          off(this.rootEl, 'touchstart', this._onDrag);
          off(this.rootEl, 'mousedown', this._onDrag);
        },
        _bindMoveEvents: function _bindMoveEvents(touch) {
          if (this.options.supportPointer) {
            on(this.ownerDocument, 'pointermove', this._onMove);
          } else if (touch) {
            on(this.ownerDocument, 'touchmove', this._onMove);
          } else {
            on(this.ownerDocument, 'mousemove', this._onMove);
          }
        },
        _unbindMoveEvents: function _unbindMoveEvents() {
          off(this.ownerDocument, 'pointermove', this._onMove);
          off(this.ownerDocument, 'touchmove', this._onMove);
          off(this.ownerDocument, 'mousemove', this._onMove);
        },
        _unbindDropEvents: function _unbindDropEvents() {
          off(this.ownerDocument, 'pointerup', this._onDrop);
          off(this.ownerDocument, 'pointercancel', this._onDrop);
          off(this.ownerDocument, 'touchend', this._onDrop);
          off(this.ownerDocument, 'touchcancel', this._onDrop);
          off(this.ownerDocument, 'mouseup', this._onDrop);
        },
        _unbindDragEvents: function _unbindDragEvents() {
          if (this.nativeDraggable) {
            off(this.rootEl, 'dragstart', this._onDragStart);
            off(this.rootEl, 'dragover', this._onDragOver);
            off(this.rootEl, 'dragend', this._onDrop);
          }
        }
      };
    }

    var documentExists = typeof document !== 'undefined';
    var supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div');
    /**
     * @class  Sortable
     * @param  {HTMLElement}  el group element
     * @param  {Object}       options
     */

    function Sortable(el, options) {
      if (!(el && el.nodeType && el.nodeType === 1)) {
        throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
      }

      this.rootEl = el; // root element

      this.scrollEl = getParentAutoScrollElement(el, true); // scroll element

      this.options = options = Object.assign({}, options);
      this.ownerDocument = el.ownerDocument;
      var defaults = {
        autoScroll: true,
        // Auto scrolling when dragging to the edge of the container
        scrollStep: 5,
        // The distance to scroll each frame
        scrollThreshold: 15,
        // Autoscroll threshold
        delay: 0,
        // Defines the delay time after which the mouse-selected list cell can start dragging
        delayOnTouchOnly: false,
        // only delay if user is using touch
        disabled: false,
        // Defines whether the sortable object is available or not. When it is true, the sortable object cannot drag and drop sorting and other functions. When it is false, it can be sorted, which is equivalent to a switch.
        animation: 150,
        // Define the timing of the sorting animation
        ghostAnimation: 0,
        // Animation when the ghost element is destroyed
        ghostClass: '',
        // Ghost element class name
        ghostStyle: {},
        // Ghost element style
        chosenClass: '',
        // Chosen element style
        draggable: undefined,
        // String: css selector, Function: (e) => return true
        dragging: undefined,
        // Set the drag element, must be a function and must return an HTMLElement: (e) => return e.target
        onDrag: undefined,
        // The callback function triggered when dragging starts: () => {}
        onMove: undefined,
        // The callback function during drag and drop: (from, to) => {}
        onDrop: undefined,
        // The callback function when the drag is completed: (from, to, changed) => {}
        onChange: undefined,
        // The callback function when dragging an element to change its position: (from, to) => {}
        fallbackOnBody: false,
        forceFallback: false,
        // Ignore HTML5 drag and drop behavior, force callback to proceed
        stopPropagation: false,
        // Prevents further propagation of the current event in the capture and bubbling phases
        supportPointer: 'PointerEvent' in window && !Safari,
        supportTouch: 'ontouchstart' in window
      }; // Set default options

      for (var name in defaults) {
        !(name in this.options) && (this.options[name] = defaults[name]);
      }

      this.container = this.options.fallbackOnBody ? document.body : this.rootEl;
      this.nativeDraggable = this.options.forceFallback ? false : supportDraggable;
      this.move = {
        x: 0,
        y: 0
      };
      this.state = new State(); // Status record during drag and drop

      this.differ = new Differ(); // Record the difference before and after dragging

      this.ghost = new Ghost(this); // Mask element while dragging

      this.dragEl = null; // Drag element

      this.dropEl = null; // Drop element

      this.dragStartTimer = null; // setTimeout timer

      this.autoScrollTimer = null;
      Object.assign(this, DNDEvent(), Animation(), AutoScroll());

      this._bindEventListener();
    }

    Sortable.prototype = {
      constructor: Sortable,

      /**
       * Destroy
       */
      destroy: function destroy() {
        this._clearState();

        this._clearEvent(); // Remove draggable attributes


        Array.prototype.forEach.call(this.rootEl.querySelectorAll('[draggable]'), function (el) {
          el.removeAttribute('draggable');
        });
      },

      /**
       * set value for options by key
       */
      set: function set(key, value) {
        this.options[key] = value;
      },

      /**
       * get value from options by key
       */
      get: function get(key) {
        return this.options[key];
      },
      // -------------------------------- prepare start ----------------------------------
      _onDrag: function _onDrag(
      /** Event|TouchEvent */
      evt) {
        var _this2 = this;

        if (/mousedown|pointerdown/.test(evt.type) && evt.button !== 0 || this.options.disabled) return; // only left button and enabled

        var _getEvent = getEvent(evt),
            touch = _getEvent.touch,
            e = _getEvent.e,
            target = _getEvent.target; // Safari ignores further event handling after mousedown


        if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') return;
        if (target === this.rootEl) return true;
        if (this.options.stopPropagation) evt.stopPropagation();
        var _this$options = this.options,
            draggable = _this$options.draggable,
            dragging = _this$options.dragging;

        if (typeof draggable === 'function') {
          if (!draggable(e)) return true;
        } else if (typeof draggable === 'string') {
          if (!matches(target, draggable)) return true;
        } else if (draggable !== undefined) {
          throw new Error("draggable expected \"function\" or \"string\" but received \"".concat(_typeof(draggable), "\""));
        } // Get the dragged element               


        if (dragging) {
          if (typeof dragging === 'function') this.dragEl = dragging(e);else throw new Error("dragging expected \"function\" or \"string\" but received \"".concat(_typeof(dragging), "\""));
        } else {
          this.dragEl = getElement(this.rootEl, target, true);
        } // No dragging is allowed when there is no dragging element


        if (!this.dragEl || this.dragEl.animated) return true; // solve the problem that the mobile cannot be dragged

        if (touch) this.dragEl.style['touch-action'] = 'none'; // get the position of the dragged element in the list

        var _getElement = getElement(this.rootEl, this.dragEl),
            rect = _getElement.rect,
            offset = _getElement.offset;

        this.move = {
          x: e.clientX,
          y: e.clientY
        };
        this.differ.from = {
          node: this.dragEl,
          rect: rect,
          offset: offset
        };
        this.ghost.distance = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        this.state.sortableDown = e; // sortable state down is active
        // Solve the problem that `dragend` does not take effect when the `dragover` event is not triggered

        on(this.ownerDocument, 'pointerup', this._onDrop);
        on(this.ownerDocument, 'touchend', this._onDrop);
        on(this.ownerDocument, 'mouseup', this._onDrop);
        var _this$options2 = this.options,
            delay = _this$options2.delay,
            delayOnTouchOnly = _this$options2.delayOnTouchOnly;

        if (delay && (!delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          clearTimeout(this.dragStartTimer); // delay to start

          this.dragStartTimer = setTimeout(function () {
            return _this2._onStart(e, touch);
          }, delay);
        } else {
          this._onStart(e, touch);
        }
      },
      _onStart: function _onStart(
      /** Event|TouchEvent */
      e, touch) {
        if (!this.nativeDraggable || touch) {
          this._bindMoveEvents(touch);

          on(this.ownerDocument, 'pointercancel', this._onDrop);
          on(this.ownerDocument, 'touchcancel', this._onDrop);
        } else {
          // allow HTML5 drag event
          this.dragEl.draggable = true;
          this._onDragStart = this._onDragStart.bind(this);
          this._onDragOver = this._onDragOver.bind(this);
          on(this.rootEl, 'dragstart', this._onDragStart);
        } // clear selection


        try {
          if (document.selection) {
            // Timeout neccessary for IE9
            _nextTick(function () {
              document.selection.empty();
            });
          } else {
            window.getSelection().removeAllRanges();
          }
        } catch (error) {//
        }
      },
      // -------------------------------- drag event ----------------------------------
      _onDragStart: function _onDragStart(evt) {
        // elements can only be dragged after firefox sets setData
        evt.dataTransfer.setData('te', evt.target.innerText);
        on(this.rootEl, 'dragover', this._onDragOver);
        on(this.rootEl, 'dragend', this._onDrop);
      },
      _onDragOver: function _onDragOver(evt) {
        if (!this.state.sortableDown) return;
        var stopPropagation = this.options.stopPropagation;
        stopPropagation && evt.stopPropagation && evt.stopPropagation(); // prevent events from bubbling

        evt.preventDefault !== void 0 && evt.cancelable && evt.preventDefault(); // prevent scrolling

        var clientX = evt.clientX,
            clientY = evt.clientY;
        var distanceX = clientX - this.move.x;
        var distanceY = clientY - this.move.y;

        if (clientX !== void 0 && Math.abs(distanceX) <= 0 && clientY !== void 0 && Math.abs(distanceY) <= 0) {
          return;
        } // truly started


        this._onStarted(evt, evt);

        if (evt.target === this.rootEl) return;

        this._onChange(this, evt.target, evt, evt);
      },
      // -------------------------------- on move ----------------------------------
      _onMove: function _onMove(
      /** Event|TouchEvent */
      evt) {
        var _this3 = this;

        if (!this.state.sortableDown) return;

        var _getEvent2 = getEvent(evt),
            e = _getEvent2.e,
            target = _getEvent2.target;

        var clientX = e.clientX,
            clientY = e.clientY;
        var distanceX = clientX - this.move.x;
        var distanceY = clientY - this.move.y;

        if (clientX !== void 0 && Math.abs(distanceX) <= 0 && clientY !== void 0 && Math.abs(distanceY) <= 0) {
          return;
        }

        var stopPropagation = this.options.stopPropagation;
        stopPropagation && evt.stopPropagation && evt.stopPropagation(); // prevent events from bubbling

        evt.preventDefault !== void 0 && evt.cancelable && evt.preventDefault(); // prevent scrolling

        this._onStarted(e, evt);

        this.ghost.move(distanceX, distanceY); // onMove callback

        var onMove = this.options.onMove;
        if (onMove && typeof onMove === 'function') onMove(this.differ.from, this.ghost.$el, e, evt); // boundary value judgment

        if (clientX < 0 || clientY < 0) return;

        var _getRect = getRect(this.rootEl),
            top = _getRect.top,
            right = _getRect.right,
            bottom = _getRect.bottom,
            left = _getRect.left;

        if (clientX < left || clientX > right || clientY < top || clientY > bottom) return; // check if element will exchange

        this._onChange(this, target, e, evt); // auto scroll


        this.autoScrollTimer && clearTimeout(this.autoScrollTimer);

        if (this.options.autoScroll) {
          this.autoScrollTimer = setTimeout(function () {
            return _this3._autoScroll(_this3);
          }, 0);
        }
      },
      _onStarted: function _onStarted(e,
      /** originalEvent */
      evt) {
        this.state.sortableMove = e; // sortable state move is active

        if (!this.ghost.$el) {
          // onDrag callback
          var onDrag = this.options.onDrag;
          if (onDrag && typeof onDrag === 'function') onDrag(this.dragEl, e, evt); // Init in the move event to prevent conflict with the click event

          var rect = this.differ.from.rect;
          var ghostEl = this.dragEl.cloneNode(true);
          this.ghost.init(ghostEl, rect, !this.nativeDraggable); // add class for drag element

          toggleClass(this.dragEl, this.options.chosenClass, true);
          this.dragEl.style['will-change'] = 'transform';
          if (Safari) css(document.body, 'user-select', 'none');
          if (this.nativeDraggable) this._unbindDropEvents();
        }
      },
      _onChange: debounce(function (_this, target, e, evt) {
        var _getElement2 = getElement(_this.rootEl, target),
            el = _getElement2.el,
            rect = _getElement2.rect,
            offset = _getElement2.offset;

        if (!el || el && el.animated) return;
        _this.dropEl = el;
        var clientX = e.clientX,
            clientY = e.clientY;
        var left = rect.left,
            right = rect.right,
            top = rect.top,
            bottom = rect.bottom;

        if (clientX > left && clientX < right && clientY > top && clientY < bottom) {
          // swap when the elements before and after the drag are inconsistent
          if (el !== _this.dragEl) {
            _this.differ.to = {
              node: _this.dropEl,
              rect: rect,
              offset: offset
            };

            _this.captureAnimationState();

            var onChange = _this.options.onChange;

            var _offset = getOffset(_this.dragEl); // onChange callback


            if (onChange && typeof onChange === 'function') onChange(_this.differ.from, _this.differ.to, e, evt); // the top value is compared first, and the left is compared if the top value is the same

            if (_offset.top < offset.top || _offset.left < offset.left) {
              _this.rootEl.insertBefore(_this.dragEl, el.nextElementSibling);
            } else {
              _this.rootEl.insertBefore(_this.dragEl, el);
            }

            _this.animateRange();
          }
        }
      }, 5),
      // -------------------------------- on drop ----------------------------------
      _onDrop: function _onDrop(
      /** Event|TouchEvent */
      evt) {
        this._unbindDragEvents();

        this._unbindMoveEvents();

        this._unbindDropEvents();

        this.dragStartTimer && clearTimeout(this.dragStartTimer);
        var stopPropagation = this.options.stopPropagation;
        stopPropagation && evt.stopPropagation();
        evt.preventDefault && evt.preventDefault();

        var _getEvent3 = getEvent(evt),
            touch = _getEvent3.touch; // clear style and class


        toggleClass(this.dragEl, this.options.chosenClass, false);
        if (this.nativeDraggable) this.dragEl.draggable = false;
        if (touch) this.dragEl.style['touch-action'] = '';
        this.dragEl.style['will-change'] = '';

        if (this.state.sortableDown && this.state.sortableMove) {
          // re-acquire the offset and rect values of the dragged element as the value after the drag is completed
          this.differ.to.offset = getOffset(this.dragEl);
          this.differ.to.rect = getRect(this.dragEl);
          var _this$differ = this.differ,
              from = _this$differ.from,
              to = _this$differ.to; // compare whether the element is swapped by offset

          var changed = from.offset.top !== to.offset.top || from.offset.left !== to.offset.left; // onDrop callback

          var onDrop = this.options.onDrop;
          if (onDrop && typeof onDrop === 'function') onDrop(changed, evt);
        }

        if (Safari) css(document.body, 'user-select', '');
        this.ghost.destroy(this.differ.to.rect);
        this.state = new State();
      },
      // -------------------------------- clear ----------------------------------
      _clearState: function _clearState() {
        this.state = new State();
        this.differ.destroy();
        this.dragEl = null;
        this.dropEl = null;
      }
    };
    Sortable.prototype.utils = {
      getRect: getRect,
      getOffset: getOffset,
      debounce: debounce,
      throttle: throttle,
      getParentAutoScrollElement: getParentAutoScrollElement
    };
    return Sortable;
  });
  });

  function Sortable(options, onDrag, onDrop) {
    this.options = options;
    this.onDrag = onDrag;
    this.onDrop = onDrop;
    this.list = options.list;
    this.cloneList = new Array();
    this.drag = null;
    this.dragElement = null;
    this.rangeIsChanged = false;
    this.dragState = new DragState();
    this.init();
  }

  Sortable.prototype = {
    constructor: Sortable,
    set: function set(key, value) {
      if (key === 'list') {
        this.list = value; // When the list data changes when dragging, need to execute onDrag function

        if (this.dragElement) this.dragStart(this.dragElement, false);
      } else {
        this.options[key] = value;
        this.drag.set(key, value);
      }
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
      this.drag = new sortable(this.options.scrollEl, {
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
        onChange: function onChange(from, to) {
          return _this.onChange(from, to);
        },
        onDrag: function onDrag(dragEl) {
          return _this.dragStart(dragEl);
        },
        onDrop: function onDrop(changed) {
          return _this.dragEnd(changed);
        }
      });
    },
    dragStart: function dragStart(dragEl) {
      var _this2 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.dragElement = dragEl;
      this.cloneList = _toConsumableArray(this.list);
      var key = dragEl.getAttribute('data-key');
      this.list.forEach(function (item, index) {
        if (_this2.options.getDataKey(item) == key) Object.assign(_this2.dragState.from, {
          item: item,
          index: index,
          key: key
        });
      });

      if (callback) {
        this.rangeIsChanged = false; // on-drag callback

        this.onDrag(this.dragState.from, dragEl);
      } else {
        this.rangeIsChanged = true;
      }
    },
    onChange: function onChange(_old_, _new_) {
      var _this3 = this;

      var oldKey = this.dragState.from.key;

      var newKey = _new_.node.getAttribute('data-key');

      var from = {
        item: null,
        index: -1
      };
      var to = {
        item: null,
        index: -1
      };
      this.cloneList.forEach(function (el, index) {
        var key = _this3.options.getDataKey(el);

        if (key == oldKey) Object.assign(from, {
          item: el,
          index: index
        });
        if (key == newKey) Object.assign(to, {
          item: el,
          index: index
        });
      });
      this.cloneList.splice(from.index, 1);
      this.cloneList.splice(to.index, 0, from.item);
    },
    dragEnd: function dragEnd(changed) {
      var _this4 = this;

      if (this.rangeIsChanged && this.dragElement) this.dragElement.remove();
      var getDataKey = this.options.getDataKey;
      var from = this.dragState.from;
      this.cloneList.forEach(function (el, index) {
        if (getDataKey(el) == from.key) _this4.dragState.to = {
          index: index,
          item: _this4.list[index],
          key: getDataKey(el)
        };
      }); // on-drop callback

      this.onDrop(this.cloneList, from, this.dragState.to, changed);
      this.list = _toConsumableArray(this.cloneList);
      this.clear();
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
   * @param {Number} delay debounce time
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
  /**
   * 节流
   * @param {Function} fn callback function
   * @param {Number} delay throttle time
   * @returns 
   */

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

  var VirtualDragList = Vue__default["default"].component('virtual-drag-list', {
    props: VirtualProps,
    data: function data() {
      return {
        list: [],
        uniqueKeys: [],
        virtual: null,
        sortable: null,
        lastItem: null,
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
    created: function created() {
      var _this2 = this;

      this.range.end = this.keeps - 1;
      this._clearDragState = throttle(function () {
        _this2.dragState = new DragState();
      }, this.delay + 17);
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
          this.scrollToOffset(bottom); // The first scroll height may change, if the bottom is not reached, execute the scroll method again

          setTimeout(function () {
            var offset = _this3.getOffset();

            var clientSize = Math.ceil(root[_this3.clientSizeKey]);
            var scrollSize = Math.ceil(root[_this3.scrollSizeKey]);
            if (offset + clientSize < scrollSize) _this3.scrollToBottom();
          }, 5);
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

      /**
       * callback function after drop
       */
      handleDragEnd: function handleDragEnd(list, _old, _new, changed) {
        this.$emit('ondragend', list, _old, _new, changed);
      },
      // --------------------------- init ------------------------------
      init: function init(list) {
        var _this5 = this;

        this.list = _toConsumableArray(list);

        this._updateUniqueKeys(); // virtual init


        if (!this.virtual) {
          this._initVirtual();
        } else {
          this.virtual.updateUniqueKeys(this.uniqueKeys);
          this.virtual.updateSizes(this.uniqueKeys);
          this.virtual.updateRange();
        } // sortable init


        if (!this.sortable) {
          this.$nextTick(function () {
            return _this5._initSortable();
          });
        } else this.sortable.set('list', _toConsumableArray(list)); // if auto scroll to the last offset


        if (this.lastItem && this.keepOffset) {
          var index = this._getItemIndex(this.lastItem);

          this.scrollToIndex(index);
          this.lastItem = null;
        }
      },
      // virtual init
      _initVirtual: function _initVirtual() {
        var _this6 = this;

        this.virtual = new Virtual({
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          isHorizontal: this.isHorizontal
        }, function (range) {
          if (_this6.dragState.to.key === undefined) _this6.range = range;
          var _this6$range = _this6.range,
              start = _this6$range.start,
              end = _this6$range.end;
          var index = _this6.dragState.from.index;

          if (index > -1 && !(index >= start && index <= end)) {
            if (_this6.sortable) _this6.sortable.rangeIsChanged = true;
          }
        });
        this.virtual.updateSizes(this.uniqueKeys);
        this.virtual.updateRange();
      },
      // sortable init
      _initSortable: function _initSortable() {
        var _this7 = this;

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
        }, function (from, node) {
          // on drag
          _this7.dragState.from = from;

          _this7.$emit('ondragstart', _this7.list, from, node);
        }, function (list, from, to, changed) {
          // on drop
          _this7.dragState.to = to;

          _this7.handleDragEnd(list, from, to, changed);

          if (changed) {
            // recalculate the range once when scrolling down
            if (_this7.sortable.rangeIsChanged && _this7.virtual.direction && _this7.range.start > 0) {
              var index = list.indexOf(_this7.list[_this7.range.start]);

              if (index > -1) {
                _this7.range.start = index;
                _this7.range.end = index + _this7.keeps - 1;
              }
            } // list change


            _this7.list = _toConsumableArray(list);

            _this7._updateUniqueKeys();

            _this7.virtual.updateUniqueKeys(_this7.uniqueKeys);
          }

          _this7._clearDragState();
        });
      },
      _destroySortable: function _destroySortable() {
        this.sortable && this.sortable.destroy();
        this.sortable = null;
      },
      // --------------------------- handle scroll ------------------------------
      _handleScroll: function _handleScroll() {
        // The scroll event is triggered when the mouseup event occurs, which is handled here to prevent the page from scrolling due to range changes.
        if (this.dragState.to.key !== undefined) {
          this._clearDragState();

          return;
        }

        var root = this.$refs.root;
        var offset = this.getOffset();
        var clientSize = Math.ceil(root[this.clientSizeKey]);
        var scrollSize = Math.ceil(root[this.scrollSizeKey]);
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

        _this.lastItem = _this.list[0];
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
        var _this8 = this;

        this.uniqueKeys = this.list.map(function (item) {
          return _this8._getDataKey(item);
        });
      },
      _getDataKey: function _getDataKey(obj) {
        var dataKey = this.dataKey;
        return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
          return (o || {})[k];
        }, obj);
      },
      _getItemIndex: function _getItemIndex(item) {
        var _this9 = this;

        return this.list.findIndex(function (el) {
          return _this9._getDataKey(item) == _this9._getDataKey(el);
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
      var _this10 = this;

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
      }, [// header-slot
      header ? h(Slots, {
        props: {
          tag: headerTag,
          dataKey: 'header',
          event: '_onHeaderResized'
        }
      }, header) : null, // list content
      h(wrapTag, {
        ref: 'group',
        attrs: {
          role: 'group'
        },
        "class": wrapClass,
        style: wrapStyle
      }, this.list.slice(start, end + 1).map(function (record) {
        var index = _this10._getItemIndex(record);

        var dataKey = _this10._getDataKey(record);

        var props = {
          isHorizontal: isHorizontal,
          dataKey: dataKey,
          tag: itemTag,
          event: '_onItemResized'
        };
        return _this10.$scopedSlots.item ? h(Items, {
          key: dataKey,
          props: props,
          style: _objectSpread2(_objectSpread2({}, itemStyle), _this10._getItemStyle(dataKey)),
          "class": itemClass
        }, _this10.$scopedSlots.item({
          record: record,
          index: index,
          dataKey: dataKey
        })) : h(itemTag, {
          key: dataKey,
          attrs: {
            'data-key': dataKey
          },
          style: _objectSpread2(_objectSpread2({}, itemStyle), {}, {
            height: "".concat(_this10.size, "px")
          }),
          "class": itemClass
        }, dataKey);
      })), // footer-slot
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          dataKey: 'footer',
          event: '_onFooterResized'
        }
      }, footer) : null, // last element
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
