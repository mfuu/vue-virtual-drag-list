/*!
 * vue-virtual-drag-list v2.6.2
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

  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND'
  };

  var CalcSize = /*#__PURE__*/_createClass(function CalcSize() {
    _classCallCheck(this, CalcSize);

    this.average = undefined; // 计算首次加载每一项的评价高度

    this.total = undefined; // 首次加载的总高度

    this.fixed = undefined; // 记录固定高度值

    this.header = undefined; // 顶部插槽高度

    this.footer = undefined; // 底部插槽高度
  });

  var Range = /*#__PURE__*/_createClass(function Range() {
    _classCallCheck(this, Range);

    this.start = 0;
    this.end = 0;
    this.front = 0;
    this.behind = 0;
  });

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

  var sortable = createCommonjsModule(function (module, exports) {
  /*!
   * sortable-dnd v0.2.1
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


    function on(el, event, fn, sp) {
      if (window.addEventListener) {
        el.addEventListener(event, fn, sp || !IE11OrLess ? captureMode : false);
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


    function off(el, event, fn, sp) {
      if (window.removeEventListener) {
        el.removeEventListener(event, fn, sp || !IE11OrLess ? captureMode : false);
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
      var children = _toConsumableArray(Array.from(group.children)); // 如果能直接在子元素中找到，返回对应的index


      var index = children.indexOf(el);
      if (index > -1) return onlyEl ? children[index] : {
        index: index,
        el: children[index],
        rect: getRect(children[index]),
        offset: getOffset(children[index])
      }; // children 中无法直接找到对应的dom时，需要向下寻找

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

    function _nextTick(fn) {
      return setTimeout(fn, 0);
    }
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
      function Ghost(options) {
        _classCallCheck(this, Ghost);

        this.options = options;
        this.x = 0;
        this.y = 0;
        this.exist = false;
      }

      _createClass(Ghost, [{
        key: "init",
        value: function init(el, rect) {
          if (!el) return;
          this.$el = el;
          var _this$options = this.options,
              ghostClass = _this$options.ghostClass,
              _this$options$ghostSt = _this$options.ghostStyle,
              ghostStyle = _this$options$ghostSt === void 0 ? {} : _this$options$ghostSt;
          var width = rect.width,
              height = rect.height;
          this.$el["class"] = ghostClass;
          this.$el.style.width = width + 'px';
          this.$el.style.height = height + 'px';
          this.$el.style.position = 'fixed';
          this.$el.style.left = 0;
          this.$el.style.top = 0;
          this.$el.style.zIndex = 100000;
          this.$el.style.opacity = 0.8;
          this.$el.style.pointerEvents = 'none';
          this.$el.style.cursor = 'move';
          setTransition(this.$el, 'none');
          setTransform(this.$el, 'translate3d(0px, 0px, 0px)');
          this.setStyle(ghostStyle);
        }
      }, {
        key: "get",
        value: function get(key) {
          return this[key];
        }
      }, {
        key: "set",
        value: function set(key, value) {
          this[key] = value;
          this[key] = value;
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
        value: function move(smooth) {
          var ghostAnimation = this.options.ghostAnimation;
          if (smooth) setTransition(this.$el, "".concat(ghostAnimation, "ms"));else setTransition(this.$el, 'none'); // 将初始化放在 move 事件中，避免与鼠标点击事件冲突

          if (!this.exist) {
            document.body.appendChild(this.$el);
            this.exist = true;
          }

          setTransform(this.$el, "translate3d(".concat(this.x, "px, ").concat(this.y, "px, 0)"));
          if (this.$el.style.cursor !== 'move') this.$el.style.cursor = 'move';
        }
      }, {
        key: "destroy",
        value: function destroy(rect) {
          var _this = this;

          if (rect) {
            this.x = rect.left;
            this.y = rect.top;
            this.move(true);
          }

          var ghostAnimation = this.options.ghostAnimation;
          ghostAnimation ? setTimeout(function () {
            return _this.clear();
          }, ghostAnimation) : this.clear();
        }
      }, {
        key: "clear",
        value: function clear() {
          if (this.$el) this.$el.remove();
          this.$el = null;
          this.x = 0;
          this.y = 0;
          this.exist = false;
        }
      }]);

      return Ghost;
    }();

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
          var children = _toConsumableArray(Array.from(this.$el.children));

          var _getRange = getRange(children, this.dragEl, this.dropEl),
              start = _getRange.start,
              end = _getRange.end;

          animationState.length = 0; // 重置

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

            _this.animate(target, rect, _this.animation);
          });
        },
        animate: function animate(el, preRect) {
          var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;
          var curRect = getRect(el);
          var left = preRect.left - curRect.left;
          var top = preRect.top - curRect.top;
          setTransition(el, 'none');
          setTransform(el, "translate3d(".concat(left, "px, ").concat(top, "px, 0)"));
          el.offsetLeft; // 触发重绘

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
          this._onStart = this._onStart.bind(this);
          this._onMove = this._onMove.bind(this);
          this._onDrop = this._onDrop.bind(this);
          var _this$options = this.options,
              supportPointer = _this$options.supportPointer,
              supportTouch = _this$options.supportTouch,
              supportPassive = _this$options.supportPassive;

          if (supportPointer) {
            on(this.$el, 'pointerdown', this._onStart, supportPassive);
          } else if (supportTouch) {
            on(this.$el, 'touchstart', this._onStart, supportPassive);
          } else {
            on(this.$el, 'mousedown', this._onStart, supportPassive);
          }

          if (this.nativeDraggable) {
            on(this.$el, 'dragover', this);
            on(this.$el, 'dragenter', this);
          }
        },
        _unbindEventListener: function _unbindEventListener() {
          var supportPassive = this.options.supportPassive;
          off(this.$el, 'pointerdown', this._onStart, supportPassive);
          off(this.$el, 'touchstart', this._onStart, supportPassive);
          off(this.$el, 'mousedown', this._onStart, supportPassive);

          if (this.nativeDraggable) {
            off(this.$el, 'dragover', this);
            off(this.$el, 'dragenter', this);
          }
        },
        _onMoveEvents: function _onMoveEvents(touch) {
          var _this$options2 = this.options,
              supportPointer = _this$options2.supportPointer,
              ownerDocument = _this$options2.ownerDocument,
              supportPassive = _this$options2.supportPassive;

          if (supportPointer) {
            on(ownerDocument, 'pointermove', this._onMove, supportPassive);
          } else if (touch) {
            on(ownerDocument, 'touchmove', this._onMove, supportPassive);
          } else {
            on(ownerDocument, 'mousemove', this._onMove, supportPassive);
          }
        },
        _onUpEvents: function _onUpEvents() {
          var _this$options3 = this.options,
              ownerDocument = _this$options3.ownerDocument,
              supportPassive = _this$options3.supportPassive;
          on(ownerDocument, 'pointerup', this._onDrop, supportPassive);
          on(ownerDocument, 'pointercancel', this._onDrop, supportPassive);
          on(ownerDocument, 'touchend', this._onDrop, supportPassive);
          on(ownerDocument, 'touchcancel', this._onDrop, supportPassive);
          on(ownerDocument, 'mouseup', this._onDrop, supportPassive);
        },
        _offMoveEvents: function _offMoveEvents() {
          var _this$options4 = this.options,
              ownerDocument = _this$options4.ownerDocument,
              supportPassive = _this$options4.supportPassive;
          off(ownerDocument, 'pointermove', this._onMove, supportPassive);
          off(ownerDocument, 'touchmove', this._onMove, supportPassive);
          off(ownerDocument, 'mousemove', this._onMove, supportPassive);
        },
        _offUpEvents: function _offUpEvents() {
          var _this$options5 = this.options,
              ownerDocument = _this$options5.ownerDocument,
              supportPassive = _this$options5.supportPassive;
          off(ownerDocument, 'pointerup', this._onDrop, supportPassive);
          off(ownerDocument, 'pointercancel', this._onDrop, supportPassive);
          off(ownerDocument, 'touchend', this._onDrop, supportPassive);
          off(ownerDocument, 'touchcancel', this._onDrop, supportPassive);
          off(ownerDocument, 'mouseup', this._onDrop, supportPassive);
        }
      };
    }

    var documentExists = typeof document !== 'undefined';
    var supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div');
    /**
     * @class  Sortable
     * @param  {HTMLElement}  el
     * @param  {Object}       options
     */

    function Sortable(el, options) {
      if (!(el && el.nodeType && el.nodeType === 1)) {
        throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
      }

      this.$el = el; // root element

      this.options = options = Object.assign({}, options);
      this.scrollEl = getParentAutoScrollElement(this.$el, true); // 获取页面滚动元素

      this.dragEl = null; // 拖拽元素

      this.dropEl = null; // 释放元素

      this.differ = null; // 记录拖拽前后差异

      this.ghost = null; // 拖拽时蒙版元素

      this.calcXY = {
        x: 0,
        y: 0
      }; // 记录拖拽移动时坐标

      var defaults = {
        delay: 0,
        // 定义鼠标选中列表单元可以开始拖动的延迟时间
        delayOnTouchOnly: false,
        // only delay if user is using touch
        disabled: false,
        // 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关
        animation: 150,
        // 定义排序动画的时间
        ghostAnimation: 0,
        // 拖拽元素销毁时动画效果
        ghostClass: '',
        // 拖拽元素Class类名
        ghostStyle: {},
        // 拖拽元素样式
        chosenClass: '',
        // 选中元素样式
        draggable: undefined,
        // String: css选择器, Function: (e) => return true
        dragging: undefined,
        // 设置拖拽元素，必须为函数且必须返回一个 HTMLElement: (e) => return e.target
        onDrag: undefined,
        // 拖拽开始时触发的回调函数: () => {}
        onMove: undefined,
        // 拖拽过程中的回调函数: (from, to) => {}
        onDrop: undefined,
        // 拖拽完成时的回调函数: (from, to, changed) => {}
        onChange: undefined,
        // 拖拽元素改变位置的时候: (from, to) => {}
        forceFallback: false,
        // 忽略 HTML5拖拽行为，强制回调进行
        stopPropagation: false,
        // 阻止捕获和冒泡阶段中当前事件的进一步传播
        supportPassive: supportPassive(),
        supportPointer: 'PointerEvent' in window && !Safari,
        supportTouch: 'ontouchstart' in window,
        ownerDocument: this.$el.ownerDocument
      }; // Set default options

      for (var name in defaults) {
        !(name in this.options) && (this.options[name] = defaults[name]);
      }

      this.nativeDraggable = this.options.forceFallback ? false : supportDraggable;
      this.differ = new Differ();
      this.ghost = new Ghost(this.options);
      Object.assign(this, Animation(), DNDEvent());

      this._bindEventListener();

      this._handleDestroy();
    }

    Sortable.prototype = {
      constructor: Sortable,
      destroy: function destroy() {
        this._unbindEventListener();

        this._resetState();
      },
      // -------------------------------- drag and drop ----------------------------------
      _onStart: function _onStart(
      /** Event|TouchEvent */
      evt) {
        var _this$options = this.options,
            delay = _this$options.delay,
            disabled = _this$options.disabled,
            stopPropagation = _this$options.stopPropagation,
            delayOnTouchOnly = _this$options.delayOnTouchOnly;
        if (/mousedown|pointerdown/.test(evt.type) && evt.button !== 0 || disabled) return; // only left button and enabled

        var touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt;
        var e = touch || evt; // Safari ignores further event handling after mousedown

        if (!this.nativeDraggable && Safari && e.target && e.target.tagName.toUpperCase() === 'SELECT') return;
        if (e.target === this.$el) return true;
        if (stopPropagation) evt.stopPropagation();

        if (delay && (!delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          this.dragStartTimer = setTimeout(this._onDrag(e, touch), delay);
        } else {
          this._onDrag(e, touch);
        }
      },
      _onDrag: function _onDrag(
      /** Event|TouchEvent */
      e, touch) {
        var _this$options2 = this.options,
            draggable = _this$options2.draggable,
            dragging = _this$options2.dragging;

        if (typeof draggable === 'function') {
          if (!draggable(e)) return true;
        } else if (typeof draggable === 'string') {
          if (!matches(e.target, draggable)) return true;
        } else if (draggable !== undefined) {
          throw new Error("draggable expected \"function\" or \"string\" but received \"".concat(_typeof(draggable), "\""));
        }

        try {
          if (document.selection) {
            // Timeout neccessary for IE9
            _nextTick(function () {
              document.selection.empty();
            });
          } else {
            window.getSelection().removeAllRanges();
          }
        } catch (error) {
          throw new Error(error);
        } // 获取拖拽元素                 


        if (dragging) {
          if (typeof dragging === 'function') this.dragEl = dragging(e);else throw new Error("dragging expected \"function\" or \"string\" but received \"".concat(_typeof(dragging), "\""));
        } else {
          this.dragEl = getElement(this.$el, e.target, true);
        } // 不存在拖拽元素时不允许拖拽


        if (!this.dragEl || this.dragEl.animated) return true; // 获取拖拽元素在列表中的位置

        var _getElement = getElement(this.$el, this.dragEl),
            rect = _getElement.rect,
            offset = _getElement.offset;

        window.sortableDndOnDownState = true;
        this.ghost.set('x', rect.left);
        this.ghost.set('y', rect.top);
        this.differ.from = {
          node: this.dragEl,
          rect: rect,
          offset: offset
        };
        this.calcXY = {
          x: e.clientX,
          y: e.clientY
        };

        this._onMoveEvents(touch);

        this._onUpEvents(touch);
      },
      _onMove: function _onMove(
      /** Event|TouchEvent */
      evt) {
        if (evt.preventDefault !== void 0) evt.preventDefault(); // prevent scrolling

        var _this$options3 = this.options,
            chosenClass = _this$options3.chosenClass,
            stopPropagation = _this$options3.stopPropagation,
            onMove = _this$options3.onMove,
            onDrag = _this$options3.onDrag;
        if (stopPropagation) evt.stopPropagation();
        var touch = evt.touches && evt.touches[0];
        var e = touch || evt;
        var clientX = e.clientX,
            clientY = e.clientY;
        var target = touch ? document.elementFromPoint(clientX, clientY) : e.target; // 将初始化放到move事件中，防止与click事件冲突
        // 将拖拽元素克隆一份作为蒙版

        if (!this.ghost.$el) {
          this.ghost.init(this.dragEl.cloneNode(true), this.differ.from.rect);

          if (onDrag !== undefined) {
            if (typeof onDrag === 'function') onDrag(this.dragEl, e,
            /** originalEvent */
            evt);else throw new Error("onDrag expected \"function\" but received \"".concat(_typeof(onDrag), "\""));
          }
        } // 拖拽过程中触发的回调


        if (onMove !== undefined) {
          if (typeof onMove === 'function') onMove(this.differ.from, this.ghost.$el, e,
          /** originalEvent */
          evt);else throw new Error("onMove expected \"function\" but received \"".concat(_typeof(onMove), "\""));
        }

        toggleClass(this.dragEl, chosenClass, true);
        this.ghost.move();
        if (!window.sortableDndOnDownState) return;
        if (clientX < 0 || clientY < 0) return;
        window.sortableDndOnMoveState = true;
        this.ghost.set('x', this.ghost.x + clientX - this.calcXY.x);
        this.ghost.set('y', this.ghost.y + clientY - this.calcXY.y);
        this.calcXY = {
          x: clientX,
          y: clientY
        };
        this.ghost.move(); // 判断边界值

        var rc = getRect(this.$el);

        if (clientX < rc.left || clientX > rc.right || clientY < rc.top || clientY > rc.bottom) {
          this.ghost.setStyle({
            cursor: 'not-allowed'
          });
          return;
        }

        var _getElement2 = getElement(this.$el, target),
            index = _getElement2.index,
            el = _getElement2.el,
            rect = _getElement2.rect,
            offset = _getElement2.offset;

        var left = rect.left,
            right = rect.right,
            top = rect.top,
            bottom = rect.bottom;
        if (!el || index < 0 || top < 0) return; // 加上当前滚动距离

        var _this$scrollEl = this.scrollEl,
            scrollTop = _this$scrollEl.scrollTop,
            scrollLeft = _this$scrollEl.scrollLeft;
        var boundaryL = rc.left + scrollLeft;
        var boundaryT = rc.top + scrollTop; // 如果目标元素超出当前可视区，不允许拖动

        if (this.scrollEl !== this.$el && (rc.left < 0 || rc.top < 0)) {
          if (rc.top < 0 && top < boundaryT || rc.left < 0 && left < boundaryL) return;
        } else if (top < rc.top || left < rc.left) return;

        this.dropEl = el;

        if (clientX > left && clientX < right && clientY > top && clientY < bottom) {
          // 拖拽前后元素不一致时交换
          if (el !== this.dragEl) {
            this.differ.to = {
              node: this.dropEl,
              rect: rect,
              offset: offset
            };
            if (el.animated) return;
            this.captureAnimationState();
            var onChange = this.options.onChange;

            var _offset = getOffset(this.dragEl); // 获取拖拽元素的 offset 值
            // 元素发生位置交换时触发的回调


            if (onChange !== undefined) {
              if (typeof onChange === 'function') onChange(this.differ.from, this.differ.to, e, evt);else throw new Error("onChange expected \"function\" but received \"".concat(_typeof(onChange), "\""));
            } // 优先比较 top 值，top 值相同再比较 left


            if (_offset.top < offset.top || _offset.left < offset.left) {
              this.$el.insertBefore(this.dragEl, el.nextElementSibling);
            } else {
              this.$el.insertBefore(this.dragEl, el);
            }

            this.animateRange();
          }
        }
      },
      _onDrop: function _onDrop(
      /** Event|TouchEvent */
      evt) {
        this._offMoveEvents();

        this._offUpEvents();

        clearTimeout(this.dragStartTimer);
        var _this$options4 = this.options,
            onDrop = _this$options4.onDrop,
            chosenClass = _this$options4.chosenClass,
            stopPropagation = _this$options4.stopPropagation;
        if (stopPropagation) evt.stopPropagation(); // 阻止事件冒泡

        toggleClass(this.dragEl, chosenClass, false);

        if (window.sortableDndOnDownState && window.sortableDndOnMoveState) {
          // 重新获取一次拖拽元素的 offset 和 rect 值作为拖拽完成后的值
          this.differ.to.offset = getOffset(this.dragEl);
          this.differ.to.rect = getRect(this.dragEl);
          var _this$differ = this.differ,
              from = _this$differ.from,
              to = _this$differ.to; // 通过 offset 比较是否进行了元素交换

          var changed = from.offset.top !== to.offset.top || from.offset.left !== to.offset.left; // 拖拽完成触发回调函数

          if (onDrop !== undefined) {
            if (typeof onDrop === 'function') onDrop(changed, evt);else throw new Error("onDrop expected \"function\" but received \"".concat(_typeof(onDrop), "\""));
          }

          this.ghost.destroy(getRect(this.dragEl));
        }

        this.differ.destroy();

        this._removeWindowState();
      },
      // -------------------------------- reset state ----------------------------------
      _resetState: function _resetState() {
        this.dragEl = null;
        this.dropEl = null;
        this.ghost.destroy();
        this.differ.destroy();
        this.calcXY = {
          x: 0,
          y: 0
        };

        this._removeWindowState();
      },
      _removeWindowState: function _removeWindowState() {
        window.sortableDndOnDownState = null;
        window.sortableDndOnMoveState = null;
        window.sortableDndAnimationEnd = null;
        delete window.sortableDndOnDownState;
        delete window.sortableDndOnMoveState;
        delete window.sortableDndAnimationEnd;
      },
      // -------------------------------- auto destroy ----------------------------------
      _handleDestroy: function _handleDestroy() {
        var _this = this;

        var observer = null;
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (MutationObserver) {
          var ownerDocument = this.options.ownerDocument;
          if (!ownerDocument) return;
          observer = new MutationObserver(function () {
            if (!ownerDocument.body.contains(_this.$el)) {
              observer.disconnect();
              observer = null;

              _this._unbindEventListener();

              _this._resetState();
            }
          });
          observer.observe(this.$el.parentNode, {
            childList: true,
            // 观察目标子节点的变化，是否有添加或者删除
            attributes: false,
            // 观察属性变动
            subtree: false // 观察后代节点，默认为 false

          });
        }

        window.onbeforeunload = function () {
          if (observer) observer.disconnect();
          observer = null;

          _this._unbindEventListener();

          _this._resetState();
        };
      }
    };
    return Sortable;
  });
  });

  /**
   * sortable
   */

  var Sortable = {
    data: function data() {
      return {
        dragState: {
          from: {
            key: null,
            // 拖拽起始节点唯一值
            item: null,
            // 拖拽起始节点数据
            index: null // 拖拽起始节点索引

          },
          to: {
            key: null,
            // 拖拽结束节点唯一值
            item: null,
            // 拖拽结束节点数据
            index: null // 拖拽结束节点索引

          }
        }
      };
    },
    methods: {
      _initSortable: function _initSortable() {
        var _this = this;

        var tempList = [];
        var dragIndex = -1;
        var dragElement = null;
        var flag = false;

        this._destroySortable();

        this.drag = new sortable(this.$refs.wrapper, {
          disabled: this.disabled,
          ghostStyle: this.dragStyle,
          draggable: this.draggable,
          dragging: this.dragging,
          chosenClass: this.chosenClass,
          animation: this.animation,
          onDrag: function onDrag(dragEl) {
            dragElement = dragEl;
            tempList = _toConsumableArray(_this.list);
            var key = dragEl.getAttribute('data-key');
            dragIndex = _this.list.findIndex(function (el) {
              return _this._getUniqueKey(el) === key;
            });
            _this.dragState.from.index = dragIndex;
            _this.dragState.from.key = key;
          },
          onChange: function onChange(_old_, _new_) {
            if (!flag) {
              flag = true;

              _this.list.splice(dragIndex, 1);
            }

            var oldKey = _this.dragState.from.key;

            var newKey = _new_.node.getAttribute('data-key');

            _this.dragState.to.key = newKey;
            tempList.forEach(function (el, index) {
              var key = _this._getUniqueKey(el);

              if (key === oldKey) Object.assign(_this.dragState.from, {
                item: el,
                index: index
              });
              if (key === newKey) Object.assign(_this.dragState.to, {
                item: el,
                index: index
              });
            });
            var _this$dragState = _this.dragState,
                from = _this$dragState.from,
                to = _this$dragState.to;
            tempList.splice(from.index, 1);
            tempList.splice(to.index, 0, from.item);
          },
          onDrop: function onDrop(changed) {
            _this.dragState.to.index = tempList.findIndex(function (el) {
              return _this._getUniqueKey(el) === _this.dragState.from.key;
            });
            var _this$dragState2 = _this.dragState,
                from = _this$dragState2.from,
                to = _this$dragState2.to;
            if (flag && dragElement) dragElement.remove();

            _this.handleDragEnd(tempList, from, to, changed);

            _this.list = tempList;
            _this.uniqueKeys = _this.list.map(function (item) {
              return _this._getUniqueKey(item);
            });
            dragElement = null;
            flag = false;
          }
        });
      },
      _destroySortable: function _destroySortable() {
        this.drag && this.drag.destroy();
        this.drag = null;
      }
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
    // 虚拟列表高度
    height: {
      type: String,
      "default": '100%'
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
    rootStyle: {
      type: Object
    },
    rootClass: {
      type: String,
      "default": ''
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
        return {
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'
        };
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
    uniqueKey: {
      type: [String, Number]
    },
    isHorizontal: {
      type: Boolean
    }
  };

  var observer = {
    inject: ['virtual'],
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
        this.virtual[this.event](this.uniqueKey, this.getCurrentSize());
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
          uniqueKey = this.uniqueKey;
      return h(tag, {
        key: uniqueKey,
        attrs: {
          'data-key': uniqueKey
        }
      }, this.$slots["default"]);
    }
  });
  var Slots = Vue__default["default"].component('virtual-draglist-slots', {
    mixins: [observer],
    props: SlotsProps,
    render: function render(h) {
      var tag = this.tag,
          uniqueKey = this.uniqueKey;
      return h(tag, {
        key: uniqueKey,
        attrs: {
          role: uniqueKey
        }
      }, this.$slots["default"]);
    }
  });

  var VirtualDragList = Vue__default["default"].component('virtual-drag-list', {
    mixins: [Sortable],
    props: VirtualProps,
    data: function data() {
      return {
        list: [],
        // 将dataSource克隆一份
        uniqueKeys: [],
        // 通过dataKey获取所有数据的唯一键值
        virtual: null,
        range: {
          start: 0,
          end: 0,
          front: 0,
          behind: 0
        },
        drag: null
      };
    },
    provide: function provide() {
      return {
        virtual: this
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
          this.initVirtual(val);
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
        this.initVirtual(this.dataSource);
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
      handleDragEnd: function handleDragEnd(list, _old, _new, changed) {
        this.virtual.updateUniqueKeys(this.uniqueKeys);
        this.$emit('ondragend', list, _old, _new, changed);
      },
      // --------------------------- init ------------------------------
      initVirtual: function initVirtual(list) {
        var _this5 = this;

        this.list = _toConsumableArray(list);
        this.uniqueKeys = this.list.map(function (item) {
          return _this5._getUniqueKey(item);
        });
        this.virtual = new Virtual({
          size: this.size,
          keeps: this.keeps,
          uniqueKeys: this.uniqueKeys,
          isHorizontal: this.isHorizontal
        }, function (range) {
          _this5.range = range;
        });
        this.virtual.updateRange();
        this.virtual.updateSizes(this.uniqueKeys);
      },
      // --------------------------- handle scroll ------------------------------
      _handleScroll: function _handleScroll(event) {
        var root = this.$refs.root;
        var offset = this.getOffset();
        var clientSize = Math.ceil(root[this.clientSizeKey]);
        var scrollSize = Math.ceil(root[this.scrollSizeKey]); // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离

        if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) return;
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
      _getUniqueKey: function _getUniqueKey(obj) {
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var dataKey = this.dataKey;
        return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
          return (o || {})[k];
        }, obj) || defaultValue;
      },
      _getItemIndex: function _getItemIndex(item) {
        var _this6 = this;

        return this.list.findIndex(function (el) {
          return _this6._getUniqueKey(item) == _this6._getUniqueKey(el);
        });
      }
    },
    // --------------------------- render ------------------------------
    render: function render(h) {
      var _this7 = this;

      var _this$$slots = this.$slots,
          header = _this$$slots.header,
          footer = _this$$slots.footer;
      var height = this.height,
          isHorizontal = this.isHorizontal,
          rootClass = this.rootClass,
          headerTag = this.headerTag,
          footerTag = this.footerTag,
          itemTag = this.itemTag,
          itemStyle = this.itemStyle,
          itemClass = this.itemClass,
          wrapClass = this.wrapClass;
      var _this$range = this.range,
          start = _this$range.start,
          end = _this$range.end,
          front = _this$range.front,
          behind = _this$range.behind;

      var rootStyle = _objectSpread2(_objectSpread2({}, this.rootStyle), {}, {
        height: height,
        overflow: isHorizontal ? 'auto hidden' : 'hidden auto'
      });

      var wrapStyle = _objectSpread2(_objectSpread2({}, this.wrapStyle), {}, {
        padding: isHorizontal ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
      });

      return h('div', {
        ref: 'root',
        "class": rootClass,
        style: rootStyle,
        on: {
          '&scroll': debounce(this._handleScroll, this.delay)
        }
      }, [// 顶部插槽 
      header ? h(Slots, {
        props: {
          tag: headerTag,
          uniqueKey: 'header',
          event: '_onHeaderResized'
        }
      }, header) : null, // 中间内容区域和列表项
      h('div', {
        ref: 'wrapper',
        attrs: {
          role: 'wrapper'
        },
        "class": wrapClass,
        style: wrapStyle
      }, this.list.slice(start, end + 1).map(function (record) {
        var index = _this7._getItemIndex(record);

        var uniqueKey = _this7._getUniqueKey(record);

        var props = {
          isHorizontal: isHorizontal,
          uniqueKey: uniqueKey,
          tag: itemTag,
          event: '_onItemResized'
        };
        return _this7.$scopedSlots.item ? h(Items, {
          key: uniqueKey,
          props: props,
          style: itemStyle,
          "class": itemClass
        }, _this7.$scopedSlots.item({
          record: record,
          index: index,
          dataKey: uniqueKey
        })) : h(itemTag, {
          key: uniqueKey,
          attrs: {
            'data-key': uniqueKey
          },
          style: _objectSpread2(_objectSpread2({}, itemStyle), {}, {
            height: "".concat(_this7.size, "px")
          }),
          "class": itemClass
        }, uniqueKey);
      })), // 底部插槽 
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          uniqueKey: 'footer',
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
