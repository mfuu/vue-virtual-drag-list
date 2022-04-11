/*!
 * vue-virtual-drag-list v2.5.1
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

  var draggable = createCommonjsModule(function (module, exports) {
  /*!
   * js-draggable-list v0.0.7
   * open source under the MIT license
   * https://github.com/mfuu/js-draggable-list#readme
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

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;

          var F = function () {};

          return {
            s: F,
            n: function () {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function (e) {
              throw e;
            },
            f: F
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var normalCompletion = true,
          didErr = false,
          err;
      return {
        s: function () {
          it = it.call(o);
        },
        n: function () {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function (e) {
          didErr = true;
          err = e;
        },
        f: function () {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }
    /**
     * @interface Options {
     * @groupElement: HTMLElement
     * @scrollElement?: HTMLElement, // if not set, same as `groupElement`
     * @dragElement?: Function, return element node selected when dragging, or null
     * @dragEnd?: Function, The callback function when the drag is completed
     * @cloneElementStyle?: Object
     * @cloneElementClass?: String
     * @
     * }
     */


    var Draggable = /*#__PURE__*/function () {
      function Draggable(options) {
        _classCallCheck(this, Draggable);

        this.parent = options.groupElement; // 父级元素

        this.scrollElement = options.scrollElement || options.groupElement; // 滚动节点

        this.dragElement = options.dragElement; // 必须为函数且必须返回一个 HTMLElement (e) => return e.target

        this.dragEnd = options.dragEnd; // 拖拽完成时的回调函数，返回两个值(olddom, newdom) => {}

        this.cloneElementStyle = options.cloneElementStyle; // 克隆元素包含的属性

        this.cloneElementClass = options.cloneElementClass; // 克隆元素的类名

        this.delay = options.delay || 300; // 动画延迟

        this.rectList = []; // 用于保存拖拽项getBoundingClientRect()方法获得的数据

        this.isMousedown = false; // 记录鼠标按下

        this.isMousemove = false; // 记录鼠标移动

        this.drag = {
          element: null,
          index: 0,
          lastIndex: 0
        }; // 拖拽元素

        this.drop = {
          element: null,
          index: 0,
          lastIndex: 0
        }; // 释放元素

        this.clone = {
          element: null,
          x: 0,
          y: 0,
          exist: false
        }; // 拖拽蒙版

        this.diff = {
          old: {
            node: null,
            rect: {}
          },
          "new": {
            node: null,
            rect: {}
          }
        }; // 记录拖拽前后差异

        this._debounce(this.init(), 50); // 避免重复执行多次

      }

      _createClass(Draggable, [{
        key: "init",
        value: function init() {
          if (!this.parent) {
            console.error('Error: groupElement is required');
            return;
          }

          this._bindEventListener();

          this._getChildrenRect();
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._unbindEventListener();

          this._resetState();
        } // 获取元素位置信息

      }, {
        key: "_getChildrenRect",
        value: function _getChildrenRect() {
          this.rectList.length = 0;

          var _iterator = _createForOfIteratorHelper(this.parent.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              this.rectList.push(item.getBoundingClientRect());
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }, {
        key: "_handleMousedown",
        value: function _handleMousedown(e) {
          var _this = this;

          if (e.button !== 0) return true;
          if (e.target === this.parent) return true;
          if (!this.rectList.length) this._getChildrenRect();

          try {
            // 获取拖拽元素
            var element = this.dragElement ? this.dragElement(e) : e.target; // 不存在拖拽元素时不允许拖拽

            if (!element) return true;
            this.drag.element = element;
          } catch (e) {
            //
            return true;
          }

          this.isMousedown = true; // 记录拖拽移动时坐标

          var calcXY = {
            x: e.clientX,
            y: e.clientY
          }; // 将拖拽元素克隆一份作为蒙版

          this.clone.element = this.drag.element.cloneNode(true); // 获取当前元素在列表中的位置

          var index = this._getElementIndex();

          this.diff.old.rect = this.rectList[index];
          this.clone.x = this.rectList[index].left;
          this.clone.y = this.rectList[index].top;
          this.drag.index = index;
          this.drag.lastIndex = index;

          document.onmousemove = function (e) {
            // 将初始化放在 move 事件中，避免与鼠标点击事件冲突
            _this._initCloneElement();

            _this._handleCloneMove();

            e.preventDefault();
            if (!_this.isMousedown) return;
            _this.isMousemove = true;
            _this.clone.x += e.clientX - calcXY.x;
            _this.clone.y += e.clientY - calcXY.y;
            calcXY.x = e.clientX;
            calcXY.y = e.clientY;

            _this._handleCloneMove();

            for (var i = 0; i < _this.rectList.length; i++) {
              var _this$rectList$i = _this.rectList[i],
                  left = _this$rectList$i.left,
                  right = _this$rectList$i.right,
                  top = _this$rectList$i.top,
                  bottom = _this$rectList$i.bottom;

              if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) {
                _this.drop.element = _this.parent.children[i];
                _this.drop.lastIndex = i;

                if (_this.drag.element !== _this.drop.element) {
                  if (_this.drag.index < i) {
                    _this.parent.insertBefore(_this.drag.element, _this.drop.element.nextElementSibling);

                    _this.drop.index = i - 1;
                  } else {
                    _this.parent.insertBefore(_this.drag.element, _this.drop.element);

                    _this.drop.index = i + 1;
                  }

                  _this.drag.index = i; // 设置动画

                  _this._animate(_this.drag.element, _this.rectList[_this.drag.index], _this.rectList[_this.drag.lastIndex]);

                  _this._animate(_this.drop.element, _this.rectList[_this.drop.index], _this.rectList[_this.drop.lastIndex]);

                  _this.drag.lastIndex = i;
                  _this.diff.old.node = _this.drag.element;
                  _this.diff["new"].node = _this.drop.element;
                }

                _this.diff["new"].rect = _this.rectList[i];
                break;
              }
            }
          };

          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;

            if (_this.isMousedown && _this.isMousemove) {
              // 拖拽完成触发回调函数
              if (_this.dragEnd) _this.dragEnd(_this.diff.old, _this.diff["new"]);
            }

            _this.isMousedown = false;
            _this.isMousemove = false;

            _this._destroyClone();

            _this._clearDiff();
          };
        }
      }, {
        key: "_initCloneElement",
        value: function _initCloneElement() {
          this.clone.element["class"] = this.cloneElementClass;
          this.clone.element.style.transition = 'none';
          this.clone.element.style.position = 'fixed';
          this.clone.element.style.left = 0;
          this.clone.element.style.top = 0;

          for (var key in this.cloneElementStyle) {
            this._styled(this.clone.element, key, this.cloneElementStyle[key]);
          }

          if (!this.clone.element.exist) {
            document.body.appendChild(this.clone.element);
            this.clone.element.exist = true;
          }
        }
      }, {
        key: "_handleCloneMove",
        value: function _handleCloneMove() {
          this.clone.element.style.transform = "translate3d(".concat(this.clone.x, "px, ").concat(this.clone.y, "px, 0)");
        }
      }, {
        key: "_destroyClone",
        value: function _destroyClone() {
          if (this.clone.element) this.clone.element.remove();
          this.clone = {
            element: null,
            x: 0,
            y: 0,
            exist: false
          };
        }
      }, {
        key: "_getElementIndex",
        value: function _getElementIndex() {
          var children = Array.from(this.parent.children);
          var element = this.drag.element; // 如果能直接在子元素中找到，返回对应的index

          var index = children.indexOf(element);
          if (index > -1) return index; // children 中无法直接找到对应的dom时，需要向下寻找

          for (var i = 0; i < children.length; i++) {
            if (this._isChildOf(element, children[i])) return i;
          }
        } // 判断子元素是否包含在父元素中

      }, {
        key: "_isChildOf",
        value: function _isChildOf(child, parent) {
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
      }, {
        key: "_animate",
        value: function _animate(element, rect, lastRect) {
          var _this2 = this;

          this._styled(element, 'transition', 'none');

          this._styled(element, 'transform', "translate3d(".concat(lastRect.left - rect.left, "px, ").concat(lastRect.top - rect.top, "px, 0)"));

          element.offsetLeft; // 触发重绘

          this._styled(element, 'transition', "all ".concat(this.delay, "ms"));

          this._styled(element, 'transform', 'translate3d(0px, 0px, 0px)');

          clearTimeout(element.animated);
          element.animated = setTimeout(function () {
            _this2._styled(element, 'transition', '');

            _this2._styled(element, 'transform', '');

            element.animated = null;
          }, this.delay);
        }
      }, {
        key: "_styled",
        value: function _styled(el, prop, val) {
          var style = el && el.style;

          if (style) {
            if (val === void 0) {
              if (document.defaultView && document.defaultView.getComputedStyle) val = document.defaultView.getComputedStyle(el, '');else if (el.currentStyle) val = el.currentStyle;
              return prop === void 0 ? val : val[prop];
            } else {
              if (!(prop in style)) prop = '-webkit-' + prop;
              style[prop] = val + (typeof val === 'string' ? '' : 'px');
            }
          }
        }
      }, {
        key: "_resetState",
        value: function _resetState() {
          this.isMousedown = false;
          this.isMousemove = false;
          this.rectList.length = 0;
          this.drag = {
            element: null,
            index: 0,
            lastIndex: 0
          };
          this.drop = {
            element: null,
            index: 0,
            lastIndex: 0
          };

          this._destroyClone();

          this._clearDiff();
        }
      }, {
        key: "_clearDiff",
        value: function _clearDiff() {
          this.diff = {
            old: {
              node: null,
              rect: {}
            },
            "new": {
              node: null,
              rect: {}
            }
          };
        }
      }, {
        key: "_bindEventListener",
        value: function _bindEventListener() {
          this._handleMousedown = this._handleMousedown.bind(this);
          this._getChildrenRect = this._getChildrenRect.bind(this);
          this.parent.addEventListener('mousedown', this._handleMousedown);
          this.scrollElement.addEventListener('scroll', this._debounce(this._getChildrenRect, 50));
          window.addEventListener('scroll', this._debounce(this._getChildrenRect, 50));
          window.addEventListener('resize', this._debounce(this._getChildrenRect, 50));
          window.addEventListener('orientationchange', this._debounce(this._getChildrenRect, 50));
        }
      }, {
        key: "_unbindEventListener",
        value: function _unbindEventListener() {
          this.parent.removeEventListener('mousedown', this._handleMousedown);
          this.scrollElement.removeEventListener('scroll', this._getChildrenRect);
          window.removeEventListener('scroll', this._getChildrenRect);
          window.removeEventListener('resize', this._getChildrenRect);
          window.removeEventListener('orientationchange', this._getChildrenRect);
        }
      }, {
        key: "_debounce",
        value: function _debounce(fn, delay) {
          return function () {
            var _this3 = this;

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            clearTimeout(fn.id);
            fn.id = setTimeout(function () {
              fn.call.apply(fn, [_this3].concat(args));
            }, delay);
          };
        }
      }]);

      return Draggable;
    }();

    return Draggable;
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
        this.drag = new draggable({
          groupElement: this.$refs.content,
          cloneElementStyle: this.dragStyle,
          scrollElement: this.$refs.virtualDragList,
          dragElement: function dragElement(e) {
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
