/*!
 * vue-virtual-drag-list v2.5.2
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortable = createCommonjsModule(function (module, exports) {
  /*!
   * sortable-dnd v0.0.6
   * open source under the MIT license
   * https://github.com/mfuu/sortable-dnd#readme
   */
  (function (global, factory) {
    module.exports = factory() ;
  })(commonjsGlobal, function () {

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
    var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
    var captureMode = {
      capture: false,
      passive: false
    };
    var utils = {
      on: function on(el, event, fn) {
        el.addEventListener(event, fn, !IE11OrLess && captureMode);
      },
      off: function off(el, event, fn) {
        el.removeEventListener(event, fn, !IE11OrLess && captureMode);
      },
      getWindowScrollingElement: function getWindowScrollingElement() {
        var scrollingElement = document.scrollingElement;

        if (scrollingElement) {
          return scrollingElement;
        } else {
          return document.documentElement;
        }
      },
      index: function index(group, el) {
        if (!el || !el.parentNode) return -1;

        var children = _toConsumableArray(Array.from(group.children));

        return children.indexOf(el);
      },
      getRect: function getRect(children, index) {
        if (!children.length) return {};
        if (index < 0) return {};
        return children[index].getBoundingClientRect();
      },
      getElement: function getElement(group, dragging) {
        var result = {
          index: -1,
          el: null,
          rect: {}
        };

        var children = _toConsumableArray(Array.from(group.children)); // 如果能直接在子元素中找到，返回对应的index


        var index = children.indexOf(dragging);
        if (index > -1) Object.assign(result, {
          index: index,
          el: children[index],
          rect: children[index].getBoundingClientRect()
        }); // children 中无法直接找到对应的dom时，需要向下寻找

        for (var i = 0; i < children.length; i++) {
          if (this.isChildOf(dragging, children[i])) Object.assign(result, {
            index: i,
            el: children[i],
            rect: children[i].getBoundingClientRect()
          });
        }

        return result;
      },
      // 判断子元素是否包含在父元素中
      isChildOf: function isChildOf(child, parent) {
        var parentNode;

        if (child && parent) {
          parentNode = child.parentNode;

          while (parentNode) {
            if (parent === parentNode) return true;
            parentNode = parentNode.parentNode;
          }
        }

        return false;
      },
      animate: function animate(el, preRect) {
        var _this = this;

        var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
        var curRect = el.getBoundingClientRect();
        var left = preRect.left - curRect.left;
        var top = preRect.top - curRect.top;
        this.css(el, 'transition', 'none');
        this.css(el, 'transform', "translate3d(".concat(left, "px, ").concat(top, "px, 0)"));
        el.offsetLeft; // 触发重绘

        this.css(el, 'transition', "all ".concat(animation, "ms"));
        this.css(el, 'transform', 'translate3d(0px, 0px, 0px)');
        clearTimeout(el.animated);
        el.animated = setTimeout(function () {
          _this.css(el, 'transition', '');

          _this.css(el, 'transform', '');

          el.animated = null;
        }, animation);
      },
      css: function css(el, prop, val) {
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
      },
      debounce: function debounce(fn, delay) {
        return function () {
          var _this2 = this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          clearTimeout(fn.id);
          fn.id = setTimeout(function () {
            fn.call.apply(fn, [_this2].concat(args));
          }, delay);
        };
      }
    };
    /**
     * 拖拽前后差异初始化
     */

    var Diff = /*#__PURE__*/function () {
      function Diff() {
        _classCallCheck(this, Diff);

        this.old = {
          node: null,
          rect: {}
        };
        this["new"] = {
          node: null,
          rect: {}
        };
      }

      _createClass(Diff, [{
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
          this.old = {
            node: null,
            rect: {}
          };
          this["new"] = {
            node: null,
            rect: {}
          };
        }
      }]);

      return Diff;
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
          if (!el) {
            console.error('Ghost Element is required');
            return;
          }

          this.$el = el;
          this.rect = rect;
          var _this$options = this.options,
              ghostClass = _this$options.ghostClass,
              _this$options$ghostSt = _this$options.ghostStyle,
              ghostStyle = _this$options$ghostSt === void 0 ? {} : _this$options$ghostSt;
          var width = rect.width,
              height = rect.height;
          this.$el["class"] = ghostClass;
          this.$el.style.width = width + 'px';
          this.$el.style.height = height + 'px';
          this.$el.style.transform = '';
          this.$el.style.transition = '';
          this.$el.style.position = 'fixed';
          this.$el.style.left = 0;
          this.$el.style.top = 0;
          this.$el.style.zIndex = 100000;
          this.$el.style.opacity = 0.8;
          this.$el.style.pointerEvents = 'none';

          for (var key in ghostStyle) {
            utils.css(this.$el, key, ghostStyle[key]);
          }
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
        key: "move",
        value: function move() {
          // 将初始化放在 move 事件中，避免与鼠标点击事件冲突
          if (!this.exist) {
            document.body.appendChild(this.$el);
            this.exist = true;
          }

          this.$el.style.transform = "translate3d(".concat(this.x, "px, ").concat(this.y, "px, 0)");
        }
      }, {
        key: "destroy",
        value: function destroy() {
          if (this.$el) this.$el.remove();
          this.exist = false;
        }
      }]);

      return Ghost;
    }();
    /**
     * @interface Options {
     * 
     * group: HTMLElement,
     * 
     * draggable?: Function, return element node selected when dragging, or null
     * 
     * dragEnd?: Function, The callback function when the drag is completed
     * 
     * ghostStyle?: Object,
     * 
     * ghostClass?: String,
     * 
     * }
     */


    var Sortable = /*#__PURE__*/function () {
      function Sortable(options) {
        _classCallCheck(this, Sortable);

        this.group = options.group; // 父级元素

        this.dragging = options.dragging; // 必须为函数且必须返回一个 HTMLElement (e) => return e.target

        this.dragEnd = options.dragEnd; // 拖拽完成时的回调函数，返回两个值(olddom, newdom) => {}

        this.ghostStyle = options.ghostStyle; // 克隆元素包含的属性

        this.ghostClass = options.ghostClass; // 克隆元素的类名

        this.animation = options.animation || 300; // 动画延迟

        this.isMousedown = false; // 记录鼠标按下

        this.isMousemove = false; // 记录鼠标移动

        this.dragEl = null; // 拖拽元素

        this.dropEl = null; // 释放元素

        this.diff = new Diff(); // 记录拖拽前后差异

        this.ghost = new Ghost({
          ghostClass: this.ghostClass,
          ghostStyle: this.ghostStyle
        });
        this.supportPointer = 'PointerEvent' in window && !Safari;
        this.calcXY = {
          x: 0,
          y: 0
        };
        utils.debounce(this.init(), 50); // 避免重复执行多次
      }

      _createClass(Sortable, [{
        key: "init",
        value: function init() {
          if (!this.group) {
            console.error('Error: group is required');
            return;
          }

          this._bindEventListener();
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._unbindEventListener();

          this._resetState();
        }
      }, {
        key: "_onStart",
        value: function _onStart(e) {
          if (e.button !== 0) return true;
          if (e.target === this.group) return true;

          try {
            // 获取拖拽元素
            var element = this.dragging ? this.dragging(e) : e.target; // 不存在拖拽元素时不允许拖拽

            if (!element) return true;
            if (element.animated) return;
            this.dragEl = element;
          } catch (e) {
            //
            return true;
          }

          this.isMousedown = true; // 获取当前元素在列表中的位置

          var _utils$getElement = utils.getElement(this.group, this.dragEl),
              index = _utils$getElement.index,
              el = _utils$getElement.el,
              rect = _utils$getElement.rect;

          if (!el || index < 0) return true; // 将拖拽元素克隆一份作为蒙版

          var ghostEl = this.dragEl.cloneNode(true);
          this.ghost.init(ghostEl, rect);
          this.diff.old.rect = rect;
          this.ghost.set('x', rect.left);
          this.ghost.set('y', rect.top); // 记录拖拽移动时坐标

          this.calcXY = {
            x: e.clientX,
            y: e.clientY
          };

          this._onMoveEvents();

          this._onUpEvents();
        }
      }, {
        key: "_onMove",
        value: function _onMove(e) {
          this.ghost.move();
          e.preventDefault();
          if (!this.isMousedown) return;
          if (e.clientX < 0 || e.clientY < 0) return;
          document.body.style.cursor = 'grabbing';
          this.isMousemove = true;
          this.ghost.set('x', this.ghost.x + e.clientX - this.calcXY.x);
          this.ghost.set('y', this.ghost.y + e.clientY - this.calcXY.y);
          this.calcXY = {
            x: e.clientX,
            y: e.clientY
          };
          this.ghost.move();

          this._checkRange(e);

          var _utils$getElement2 = utils.getElement(this.group, e.target),
              index = _utils$getElement2.index,
              el = _utils$getElement2.el,
              rect = _utils$getElement2.rect;

          var left = rect.left,
              right = rect.right,
              top = rect.top,
              bottom = rect.bottom;
          if (!el || index < 0) return;
          if (top < 0 || top - this.ghost.rect.height / 3 < 0) return;

          if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) {
            this.dropEl = el; // 拖拽前后元素不一致时交换

            if (this.dropEl !== this.dragEl) {
              var dragRect = this.dragEl.getBoundingClientRect();
              var dropRect = this.dropEl.getBoundingClientRect();
              if (this.dropEl.animated) return;

              if (utils.index(this.group, this.dragEl) < index) {
                this.group.insertBefore(this.dragEl, this.dropEl.nextElementSibling);
              } else {
                this.group.insertBefore(this.dragEl, this.dropEl);
              } // 设置动画


              utils.animate(this.dragEl, dragRect, this.animation);
              utils.animate(this.dropEl, dropRect, this.animation);
              this.diff.old.node = this.dragEl;
              this.diff["new"].node = this.dropEl;
            }

            this.diff["new"].rect = this.dropEl.getBoundingClientRect();
          }
        }
      }, {
        key: "_onDrop",
        value: function _onDrop() {
          this._offMoveEvents();

          this._offUpEvents();

          document.body.style.cursor = '';

          if (this.isMousedown && this.isMousemove) {
            // 拖拽完成触发回调函数
            if (this.dragEnd && typeof this.dragEnd === 'function') this.dragEnd(this.diff.old, this.diff["new"]);
          }

          this.isMousedown = false;
          this.isMousemove = false;
          this.diff.destroy();
          this.ghost.destroy();
        }
      }, {
        key: "_checkRange",
        value: function _checkRange(e) {
          var _this$group$getBoundi = this.group.getBoundingClientRect(),
              top = _this$group$getBoundi.top,
              left = _this$group$getBoundi.left,
              right = _this$group$getBoundi.right,
              bottom = _this$group$getBoundi.bottom;

          if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
            document.body.style.cursor = 'not-allowed';
          }
        }
      }, {
        key: "_resetState",
        value: function _resetState() {
          this.isMousedown = false;
          this.isMousemove = false;
          this.dragEl = null;
          this.dropEl = null;
          this.ghost.destroy();
          this.diff = new Diff();
        }
      }, {
        key: "_bindEventListener",
        value: function _bindEventListener() {
          this._onStart = this._onStart.bind(this);
          this._onMove = this._onMove.bind(this);
          this._onDrop = this._onDrop.bind(this);

          if (this.supportPointer) {
            utils.on(this.group, 'pointerdown', this._onStart);
          } else {
            utils.on(this.group, 'mousedown', this._onStart);
          }
        }
      }, {
        key: "_onMoveEvents",
        value: function _onMoveEvents() {
          if (this.supportPointer) {
            utils.on(document, 'pointermove', this._onMove);
          } else {
            utils.on(document, 'mousemove', this._onMove);
          }
        }
      }, {
        key: "_onUpEvents",
        value: function _onUpEvents() {
          if (this.supportPointer) {
            utils.on(document, 'pointerup', this._onDrop);
          } else {
            utils.on(document, 'mouseup', this._onDrop);
          }
        }
      }, {
        key: "_unbindEventListener",
        value: function _unbindEventListener() {
          utils.off(this.group, 'mousedown', this._onStart);
          utils.off(this.group, 'pointerdown', this._onStart);
        }
      }, {
        key: "_offMoveEvents",
        value: function _offMoveEvents() {
          utils.off(document, 'mousemove', this._onMove);
          utils.off(document, 'pointermove', this._onMove);
        }
      }, {
        key: "_offUpEvents",
        value: function _offUpEvents() {
          utils.off(document, 'mouseup', this._onDrop);
          utils.off(document, 'pointerup', this._onDrop);
        }
      }]);

      return Sortable;
    }();

    return Sortable;
  });
  });

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
        return this.$el ? this.$el.offsetHeight : 0;
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
      "default": 10
    },
    // 是否可拖拽，需要指定拖拽元素，设置draggable属性为true
    draggable: {
      type: Boolean,
      "default": true
    },
    // 是否只允许拖拽设置了draggable属性的元素，为 true 时选中父元素也不会产生拖拽效果
    draggableOnly: {
      type: Boolean,
      "default": true
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
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    itemClass: {
      type: String,
      "default": ''
    },
    // 拖拽时的样式
    dragStyle: {
      type: Object,
      "default": function _default() {
        return {
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'
        };
      }
    },
    dragElement: {
      type: Function
    }
  };
  var SlotItemProps = {
    tag: {
      type: String,
      "default": 'div'
    },
    event: {
      type: String
    },
    dragStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    uniqueKey: {
      type: [String, Number]
    }
  };

  var Items = Vue__default["default"].component('virtual-draglist-items', {
    mixins: [observer],
    props: SlotItemProps,
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
    props: SlotItemProps,
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

  var utils = {
    /**
     * 防抖
     * @param {Function} func callback function
     * @param {Number} delay delay time
     * @param {Boolean} immediate whether to execute immediately
     * @returns function
     */
    debounce: function debounce(func) {
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
  };

  var virtualDragList = Vue__default["default"].component('virtual-drag-list', {
    props: VirtualProps,
    data: function data() {
      return {
        list: [],
        // 将dataSource克隆一份
        sizeStack: new Map(),
        // 保存每个item的高度
        start: 0,
        // 起始索引
        end: 0,
        // 结束索引
        offset: 0,
        // 记录滚动高度
        direction: '',
        // 记录滚动方向
        uniqueKeys: [],
        // 通过dataKey获取所有数据的唯一键值
        lastCalcIndex: 0,
        calcType: 'INIT',
        // 初始化标致
        calcSize: {
          average: 0,
          // 计算首次加载每一项的评价高度
          total: 0,
          // 首次加载的总高度
          fixed: 0,
          // 记录固定高度值
          header: 0,
          // 顶部插槽高度
          footer: 0 // 底部插槽高度

        },
        padding: {
          front: 0,
          behind: 0
        },
        dragState: {
          oldNode: null,
          // 拖拽起始dom元素
          oldItem: null,
          // 拖拽起始节点数据
          oldIndex: null,
          // 拖拽起始节点索引
          newNode: null,
          // 拖拽结束目标dom元素
          newItem: null,
          // 拖拽结束节点数据
          newIndex: null // 拖拽结束节点索引

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
      uniqueKeyLen: function uniqueKeyLen() {
        return this.uniqueKeys.length - 1;
      },
      isFixedType: function isFixedType() {
        return this.calcType === 'FIXED';
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
      draggable: {
        handler: function handler(val) {
          var _this = this;

          if (val) {
            this.$nextTick(function () {
              _this.initDraggable();
            });
          } else {
            this.destroyDraggable();
          }
        },
        deep: true,
        immediate: true
      }
    },
    mounted: function mounted() {
      this.end = this.start + this.keeps;
    },
    beforeDestroy: function beforeDestroy() {
      this.destroyDraggable();
    },
    methods: {
      // 通过key值获取当前行的高度
      getSize: function getSize(key) {
        return this.sizeStack.get(key);
      },
      // 返回当前滚动高度
      getOffset: function getOffset() {
        return this.offset;
      },
      // 滚动到底部
      scrollToBottom: function scrollToBottom() {
        var _this2 = this;

        var _this$$refs = this.$refs,
            bottomItem = _this$$refs.bottomItem,
            virtualDragList = _this$$refs.virtualDragList;

        if (bottomItem) {
          var offset = bottomItem.offsetTop;
          this.scrollToOffset(offset);
        }

        var clientHeight = this.$el.clientHeight;
        var scrollTop = virtualDragList.scrollTop;
        var scrollHeight = virtualDragList.scrollHeight; // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法

        setTimeout(function () {
          if (scrollTop + clientHeight < scrollHeight) {
            _this2.scrollToBottom();
          }
        }, 10);
      },
      // 滚动到顶部
      scrollToTop: function scrollToTop() {
        var virtualDragList = this.$refs.virtualDragList;
        virtualDragList.scrollTop = 0;
      },
      // 滚动到指定高度
      scrollToOffset: function scrollToOffset(offset) {
        var virtualDragList = this.$refs.virtualDragList;
        virtualDragList.scrollTop = offset;
      },
      // 滚动到指定索引值位置
      scrollToIndex: function scrollToIndex(index) {
        if (index >= this.list.length - 1) {
          this.scrollToBottom();
        } else {
          var offset = this.getOffsetByIndex(index);
          this.scrollToOffset(offset);
        }
      },
      setList: function setList(list) {
        this.list = list;
      },
      setDragState: function setDragState(state) {
        this.dragState = Object.assign({}, this.dragState, state);
      },
      handleDragEnd: function handleDragEnd(list) {
        this.$emit('ondragend', list);
      },
      init: function init(list) {
        var _this3 = this;

        this.list = _toConsumableArray(list);
        this.uniqueKeys = this.list.map(function (item) {
          return _this3.uniqueId(item);
        });
        this.handleSourceDataChange();
        this.updateSizeStack();
      },
      handleScroll: function handleScroll(event) {
        var virtualDragList = this.$refs.virtualDragList;
        var clientHeight = Math.ceil(this.$el.clientHeight);
        var scrollTop = Math.ceil(virtualDragList.scrollTop);
        var scrollHeight = Math.ceil(virtualDragList.scrollHeight); // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离

        if (scrollTop < 0 || scrollTop + clientHeight > scrollHeight + 1 || !scrollHeight) return; // 记录上一次滚动的距离，判断当前滚动方向

        this.direction = scrollTop < this.offset ? 'FRONT' : 'BEHIND';
        this.offset = scrollTop;
        var overs = this.getScrollOvers();

        if (this.direction === 'FRONT') {
          this.handleFront(overs);
          if (!!this.list.length && scrollTop <= 0) this.$emit('top');
        } else if (this.direction === 'BEHIND') {
          this.handleBehind(overs);
          if (clientHeight + scrollTop >= scrollHeight) this.$emit('bottom');
        }
      },
      handleFront: function handleFront(overs) {
        if (overs > this.start) {
          return;
        }

        var start = Math.max(overs - Math.round(this.keeps / 3), 0);
        this.checkRange(start, this.getEndByStart(start));
      },
      handleBehind: function handleBehind(overs) {
        if (overs < this.start + Math.round(this.keeps / 3)) {
          return;
        }

        this.checkRange(overs, this.getEndByStart(overs));
      },
      // 更新每个子组件高度
      onItemResized: function onItemResized(uniqueKey, size) {
        this.sizeStack.set(uniqueKey, size); // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值

        if (this.calcType === 'INIT') {
          this.calcSize.fixed = size;
          this.calcType = 'FIXED';
        } else if (this.calcType === 'FIXED' && this.calcSize.fixed !== size) {
          this.calcType = 'DYNAMIC';
          delete this.calcSize.fixed;
        }

        if (this.calcType !== 'FIXED' && this.calcSize.total !== 'undefined') {
          if (this.sizeStack.size < Math.min(this.keeps, this.uniqueKeys.length)) {
            this.calcSize.total = _toConsumableArray(this.sizeStack.values()).reduce(function (acc, cur) {
              return acc + cur;
            }, 0);
            this.calcSize.average = Math.round(this.calcSize.total / this.sizeStack.size);
          } else {
            delete this.calcSize.total;
          }
        }
      },
      onHeaderResized: function onHeaderResized(id, size) {
        this.calcSize.header = size;
      },
      onFooterResized: function onFooterResized(id, size) {
        this.calcSize.footer = size;
      },
      // 原数组改变重新计算
      handleSourceDataChange: function handleSourceDataChange() {
        var start = Math.max(this.start, 0);
        this.updateRange(this.start, this.getEndByStart(start));
      },
      // 更新缓存
      updateSizeStack: function updateSizeStack() {
        var _this4 = this;

        this.sizeStack.forEach(function (v, key) {
          if (!_this4.uniqueKeys.includes(key)) {
            _this4.sizeStack["delete"](key);
          }
        });
      },
      checkRange: function checkRange(start, end) {
        var keeps = this.keeps;
        var total = this.uniqueKeys.length;

        if (total <= keeps) {
          start = 0;
          end = this.uniqueKeyLen;
        } else if (end - start < keeps - 1) {
          start = end - keeps + 1;
        }

        if (this.start !== start) {
          this.updateRange(start, end);
        }
      },
      updateRange: function updateRange(start, end) {
        this.start = start;
        this.end = end;
        this.padding = {
          front: this.getFront(),
          behind: this.getBehind()
        };
      },
      // 二分法查找
      getScrollOvers: function getScrollOvers() {
        // 如果有header插槽，需要减去header的高度
        var offset = this.offset - this.calcSize.header;
        if (offset <= 0) return 0;
        if (this.isFixedType) return Math.floor(offset / this.calcSize.fixed);
        var low = 0;
        var middle = 0;
        var middleOffset = 0;
        var high = this.uniqueKeys.length;

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
      getFront: function getFront() {
        if (this.isFixedType) {
          return this.calcSize.fixed * this.start;
        } else {
          return this.getOffsetByIndex(this.start);
        }
      },
      getBehind: function getBehind() {
        var last = this.uniqueKeyLen;

        if (this.isFixedType) {
          return (last - this.end) * this.calcSize.fixed;
        }

        if (this.lastCalcIndex === last) {
          return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.end);
        } else {
          return (last - this.end) * this.getItemSize();
        }
      },
      // 通过索引值获取滚动高度
      getOffsetByIndex: function getOffsetByIndex(index) {
        if (!index) return 0;
        var offset = 0;
        var indexSize = 0;

        for (var i = 0; i < index; i++) {
          indexSize = this.sizeStack.get(this.uniqueKeys[i]);
          offset = offset + (typeof indexSize === 'number' ? indexSize : this.getItemSize());
        }

        this.lastCalcIndex = Math.max(this.lastCalcIndex, index - 1);
        this.lastCalcIndex = Math.min(this.lastCalcIndex, this.uniqueKeyLen);
        return offset;
      },
      getItemIndex: function getItemIndex(item) {
        var _this5 = this;

        return this.list.findIndex(function (el) {
          return _this5.uniqueId(item) == _this5.uniqueId(el);
        });
      },
      // 获取每一项的高度
      getItemSize: function getItemSize() {
        return this.isFixedType ? this.calcSize.fixed : this.calcSize.average || this.size;
      },
      getEndByStart: function getEndByStart(start) {
        return Math.min(start + this.keeps, this.uniqueKeyLen);
      },
      uniqueId: function uniqueId(obj) {
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var dataKey = this.dataKey;
        return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
          return (o || {})[k];
        }, obj) || defaultValue;
      },
      initDraggable: function initDraggable() {
        var _this6 = this;

        this.destroyDraggable();
        this.drag = new sortable({
          group: this.$refs.content,
          ghostStyle: this.dragStyle,
          dragging: function dragging(e) {
            var draggable = e.target.getAttribute('draggable');
            if (_this6.draggableOnly && !draggable) return null;

            if (_this6.dragElement) {
              return _this6.dragElement(e, _this6.$refs.content);
            } else {
              var result = e.target;

              while ([].indexOf.call(_this6.$refs.content.children, result) < 0) {
                result = result.parentNode;
              }

              return result;
            }
          },
          dragEnd: function dragEnd(pre, cur) {
            if (pre.rect.top === cur.rect.top) return;
            var oldKey = pre.node.getAttribute('data-key');
            var newKey = cur.node.getAttribute('data-key');
            _this6.dragState.oldNode = pre.node;
            _this6.dragState.newNode = cur.node;

            _this6.list.forEach(function (el, index) {
              if (_this6.uniqueId(el) === oldKey) {
                _this6.dragState.oldItem = el;
                _this6.dragState.oldIndex = index;
              }

              if (_this6.uniqueId(el) === newKey) {
                _this6.dragState.newItem = el;
                _this6.dragState.newIndex = index;
              }
            });

            var newArr = _toConsumableArray(_this6.list);

            newArr.splice(_this6.dragState.oldIndex, 1);
            newArr.splice(_this6.dragState.newIndex, 0, _this6.dragState.oldItem);

            _this6.setList(newArr);

            _this6.handleDragEnd(newArr);
          }
        });
      },
      destroyDraggable: function destroyDraggable() {
        this.drag && this.drag.destroy();
        this.drag = null;
      },
      reset: function reset() {
        this.scrollToTop();
        this.init(this.dataSource);
      }
    },
    render: function render(h) {
      var _this7 = this;

      var _this$$slots = this.$slots,
          header = _this$$slots.header,
          footer = _this$$slots.footer;
      var height = this.height,
          padding = this.padding,
          headerTag = this.headerTag,
          footerTag = this.footerTag,
          itemTag = this.itemTag,
          itemStyle = this.itemStyle,
          itemClass = this.itemClass,
          dragStyle = this.dragStyle,
          list = this.list,
          start = this.start,
          end = this.end;
      return h('div', {
        ref: 'virtualDragList',
        on: {
          '&scroll': utils.debounce(this.handleScroll, this.delay)
        },
        style: {
          height: height,
          overflow: 'hidden auto',
          position: 'relative'
        }
      }, [// 顶部插槽 
      header ? h(Slots, {
        props: {
          tag: headerTag,
          uniqueKey: 'header',
          event: 'onHeaderResized'
        }
      }, header) : null, // 中间内容区域和列表项
      h('div', {
        ref: 'content',
        attrs: {
          role: 'content'
        },
        style: {
          padding: "".concat(padding.front, "px 0px ").concat(padding.behind, "px")
        }
      }, list.slice(start, end + 1).map(function (record) {
        var index = _this7.getItemIndex(record);

        var uniqueKey = _this7.uniqueId(record);

        return _this7.$scopedSlots.item ? h(Items, {
          key: uniqueKey,
          props: {
            uniqueKey: uniqueKey,
            dragStyle: dragStyle,
            tag: itemTag,
            event: 'onItemResized'
          },
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
          style: _objectSpread2({
            height: "".concat(_this7.size, "px")
          }, itemStyle),
          "class": itemClass
        }, uniqueKey);
      })), // 底部插槽 
      footer ? h(Slots, {
        props: {
          tag: footerTag,
          uniqueKey: 'footer',
          event: 'onFooterResized'
        }
      }, footer) : null, // 最底部元素
      h('div', {
        ref: 'bottomItem'
      })]);
    }
  });

  return virtualDragList;

}));
