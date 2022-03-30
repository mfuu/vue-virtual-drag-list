/*!
 * vue-virtual-drag-list v2.3.0
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
    },

    /**
     * 找到目标 dom 在数组中的位置
     * @param {Object} e event
     * @param {Object} vm vue实例
     * @param {Object} virtual 父组件 provide
     * @returns 
     */
    getSwitchTarget: function getSwitchTarget(e, vm, virtual) {
      var list = virtual.list,
          uniqueId = virtual.uniqueId;
      var dataKey, target;

      if (vm) {
        target = vm.$el;
        dataKey = target.getAttribute('data-key');
      } else {
        // 如果当前拖拽超出了item范围，则不允许拖拽，否则查找dataKey属性
        target = e.target;
        dataKey = target.getAttribute('data-key');

        if (!dataKey) {
          var path = e.path || [];

          for (var i = 0; i < path.length; i++) {
            target = path[i];
            dataKey = target.getAttribute('data-key');
            if (dataKey || target == document.documentElement) break;
          }
        }
      }

      var item = dataKey ? list.find(function (item) {
        return uniqueId(item) == dataKey;
      }) : null;
      return {
        target: target,
        item: item
      };
    },

    /**
     * 设置动画
     * @param {Object} rect getBoundingClientRect()
     * @param {HTMLElement} target DOM
     */
    setAnimate: function setAnimate(rect, target) {
      var _this2 = this;

      var delay = 300;

      {
        var cRect = target.getBoundingClientRect();
        if (rect.nodeType === 1) rect = rect.getBoundingClientRect();
        this.setStyle(target, 'transition', 'none');
        this.setStyle(target, 'transform', "translate3d(".concat(rect.left - cRect.left, "px, ").concat(rect.top - cRect.top, "px, 0)"));
        target.offsetWidth; // 触发重绘

        this.setStyle(target, 'transition', "all ".concat(delay, "ms"));
        this.setStyle(target, 'transform', 'translate3d(0, 0, 0)');
        clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          _this2.setStyle(target, 'transition', '');

          _this2.setStyle(target, 'transform', '');

          target.animated = false;
        }, delay);
      }
    },

    /**
     * 为dom添加样式
     * @param {HTMLElement} el 
     * @param {String} prop style name
     * @param {String} val style value
     * @returns 
     */
    setStyle: function setStyle(el, prop, val) {
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
          if (!(prop in style)) prop = '-webkit-' + prop;
          style[prop] = val + (typeof val === 'string' ? '' : 'px');
        }
      }
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
        return this.$el ? this.$el.offsetHeight : 0;
      }
    }
  };
  var draggable = {
    data: function data() {
      return {
        mask: null,
        switched: false
      };
    },
    methods: {
      mousedown: function mousedown(e, vm) {
        var _this2 = this;

        // 每次拖拽将状态重置
        this.switched = false; // 仅设置了draggable=true的元素才可拖动

        var draggable = e.target.getAttribute('draggable');
        if (!draggable) return; // 记录初始拖拽元素

        var _utils$getSwitchTarge = utils.getSwitchTarget(e, vm, this.virtual),
            target = _utils$getSwitchTarge.target,
            item = _utils$getSwitchTarge.item;

        this.virtual.setDragState({
          oldNode: target,
          oldItem: item
        });
        this.setMask('init', e.clientX, e.clientY);

        document.onmousemove = function (evt) {
          evt.preventDefault();

          _this2.setMask('move', evt.clientX, evt.clientY);

          var _utils$getSwitchTarge2 = utils.getSwitchTarget(evt, null, _this2.virtual),
              _utils$getSwitchTarge3 = _utils$getSwitchTarge2.target,
              target = _utils$getSwitchTarge3 === void 0 ? null : _utils$getSwitchTarge3,
              _utils$getSwitchTarge4 = _utils$getSwitchTarge2.item,
              item = _utils$getSwitchTarge4 === void 0 ? null : _utils$getSwitchTarge4; // 如果没找到目标节点，取消拖拽事件


          if (!target || !item) {
            document.body.style.cursor = 'not-allowed';
            return;
          }

          document.body.style.cursor = 'grabbing'; // 记录拖拽目标元素

          _this2.virtual.setDragState({
            newNode: target,
            newItem: item
          });

          var _this2$virtual$dragSt = _this2.virtual.dragState,
              oldNode = _this2$virtual$dragSt.oldNode,
              newNode = _this2$virtual$dragSt.newNode,
              oldItem = _this2$virtual$dragSt.oldItem,
              newItem = _this2$virtual$dragSt.newItem; // 拖拽前后不一致，改变拖拽节点位置

          if (oldItem != newItem) {
            if (newNode && newNode.animated) return;
            _this2.switched = true;

            var oldIndex = _this2.virtual.list.indexOf(oldItem);

            var newIndex = _this2.virtual.list.indexOf(newItem);

            var oldRect = oldNode.getBoundingClientRect();
            var newRect = newNode.getBoundingClientRect(); // 记录前后位置

            _this2.virtual.setDragState({
              oldIndex: oldIndex,
              newIndex: newIndex
            });

            if (oldIndex < newIndex) {
              newNode.parentNode.insertBefore(oldNode, newNode.nextSibling);
            } else {
              newNode.parentNode.insertBefore(oldNode, newNode);
            }

            utils.setAnimate(oldRect, oldNode);
            utils.setAnimate(newRect, newNode);
          }
        };

        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;

          _this2.setMask('destory'); // 当前拖拽位置不在允许的范围内时不需要对数组重新赋值


          if (_this2.switched) {
            var _this2$virtual$dragSt2 = _this2.virtual.dragState,
                oldItem = _this2$virtual$dragSt2.oldItem,
                oldIndex = _this2$virtual$dragSt2.oldIndex,
                newIndex = _this2$virtual$dragSt2.newIndex; // 拖拽前后不一致，数组重新赋值

            if (oldIndex != newIndex) {
              var newArr = _toConsumableArray(_this2.virtual.list);

              newArr.splice(oldIndex, 1);
              newArr.splice(newIndex, 0, oldItem);

              _this2.virtual.setList(newArr);

              _this2.virtual.handleDragEnd(newArr);
            }

            _this2.switched = false;
          }

          document.body.style.cursor = '';
        };
      },
      setMask: function setMask(type, left, top) {
        if (type == 'init') {
          this.mask = document.createElement('div');

          for (var key in this.dragStyle) {
            utils.setStyle(this.mask, key, this.dragStyle[key]);
          }

          this.mask.style.position = 'fixed';
          this.mask.style.left = left + 'px';
          this.mask.style.top = top + 'px';
          this.mask.innerHTML = this.$el.innerHTML;
          document.body.appendChild(this.mask);
        } else if (type == 'move') {
          this.mask.style.left = left + 'px';
          this.mask.style.top = top + 'px';
        } else {
          document.body.removeChild(this.mask);
        }
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
    // 是否可拖拽，需要指定拖拽元素，设置draggable属性为true
    draggable: {
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
    mixins: [observer, draggable],
    props: SlotItemProps,
    render: function render(h) {
      var _this = this;

      var tag = this.tag,
          uniqueKey = this.uniqueKey;
      return h(tag, {
        key: uniqueKey,
        attrs: {
          'data-key': uniqueKey
        },
        on: {
          mousedown: function mousedown(e) {
            return _this.mousedown(e, _this);
          }
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

        }
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
      }
    },
    mounted: function mounted() {
      this.end = this.start + this.keeps;
    },
    methods: {
      reset: function reset() {
        this.scrollToTop();
        this.init(this.dataSource);
      },
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
        var _this = this;

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
            _this.scrollToBottom();
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
        var _this2 = this;

        this.list = _toConsumableArray(list);
        this.uniqueKeys = this.list.map(function (item) {
          return _this2.uniqueId(item);
        });
        this.handleSourceDataChange();
        this.updateSizeStack();
      },
      handleScroll: function handleScroll(event) {
        var _this3 = this;

        utils.debounce(function () {
          var virtualDragList = _this3.$refs.virtualDragList;
          var clientHeight = Math.ceil(_this3.$el.clientHeight);
          var scrollTop = Math.ceil(virtualDragList.scrollTop);
          var scrollHeight = Math.ceil(virtualDragList.scrollHeight); // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离

          if (scrollTop < 0 || scrollTop + clientHeight > scrollHeight + 1 || !scrollHeight) return; // 记录上一次滚动的距离，判断当前滚动方向

          _this3.direction = scrollTop < _this3.offset ? 'FRONT' : 'BEHIND';
          _this3.offset = scrollTop;

          var overs = _this3.getScrollOvers();

          if (_this3.direction === 'FRONT') {
            _this3.handleFront(overs);

            if (!!_this3.list.length && scrollTop <= 0) _this3.$emit('top');
          } else if (_this3.direction === 'BEHIND') {
            _this3.handleBehind(overs);

            if (clientHeight + scrollTop >= scrollHeight) _this3.$emit('bottom');
          }
        }, 50)();
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
      }
    },
    render: function render(h) {
      var _this6 = this;

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
          '&scroll': this.handleScroll
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
        attrs: {
          role: 'content'
        },
        style: {
          padding: "".concat(padding.front, "px 0px ").concat(padding.behind, "px")
        }
      }, list.slice(start, end + 1).map(function (record) {
        var index = _this6.getItemIndex(record);

        var uniqueKey = _this6.uniqueId(record);

        return _this6.$scopedSlots.item ? h(Items, {
          props: {
            uniqueKey: uniqueKey,
            dragStyle: dragStyle,
            tag: itemTag,
            event: 'onItemResized'
          },
          key: uniqueKey,
          style: itemStyle,
          "class": itemClass
        }, _this6.$scopedSlots.item({
          record: record,
          index: index,
          dataKey: uniqueKey
        })) : h(itemTag, {
          key: uniqueKey,
          attrs: {
            'data-key': uniqueKey
          },
          style: _objectSpread2({
            height: "".concat(_this6.size, "px")
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
