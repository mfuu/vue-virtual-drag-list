/*!
 * vue-virtual-drag-list v2.0.8
 * open source under the MIT license
 * https://github.com/mf-note/vue-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualDragList = factory(global.Vue));
})(this, (function (Vue) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

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

  var mixin = {
    data: function data() {
      return {
        observer: null,
        mask: null
      };
    },
    mounted: function mounted() {
      var _this = this;

      if (typeof ResizeObserver !== 'undefined') {
        this.observer = new ResizeObserver(function () {
          _this.onSizeChange();
        });
        this.observer.observe(this.$el);
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
        this.$emit('resize', this.uniqueKey, this.getCurrentSize());
      },
      getCurrentSize: function getCurrentSize() {
        return this.$el ? this.$el.offsetHeight : 0;
      },
      mousedown: function mousedown(e) {
        var _this2 = this;

        // 仅设置了draggable=true的元素才可拖动
        var draggable = e.target.getAttribute('draggable');
        if (!draggable) return; // 记录初始拖拽元素

        var _this$getTarget = this.getTarget(e),
            target = _this$getTarget.target,
            item = _this$getTarget.item;

        this.$parent.dragState.oldNode = target;
        this.$parent.dragState.oldItem = item;
        this.setMask('init', e.clientX, e.clientY);

        document.onmousemove = function (evt) {
          evt.preventDefault();

          _this2.setMask('move', evt.clientX, evt.clientY);

          var _this2$getTarget = _this2.getTarget(evt),
              _this2$getTarget$targ = _this2$getTarget.target,
              target = _this2$getTarget$targ === void 0 ? null : _this2$getTarget$targ,
              _this2$getTarget$item = _this2$getTarget.item,
              item = _this2$getTarget$item === void 0 ? null : _this2$getTarget$item; // 如果没找到目标节点，取消拖拽事件


          if (!target || !item) {
            document.body.style.cursor = 'not-allowed';
            return;
          }

          document.body.style.cursor = 'grabbing'; // 记录拖拽目标元素

          _this2.$parent.dragState.newNode = target;
          _this2.$parent.dragState.newItem = item;
          var _this2$$parent$dragSt = _this2.$parent.dragState,
              oldNode = _this2$$parent$dragSt.oldNode,
              newNode = _this2$$parent$dragSt.newNode,
              oldItem = _this2$$parent$dragSt.oldItem,
              newItem = _this2$$parent$dragSt.newItem; // 拖拽前后不一致，改变拖拽节点位置

          if (oldItem != newItem) {
            if (newNode && newNode.animated) return;

            var oldIndex = _this2.dataSource.indexOf(oldItem);

            var newIndex = _this2.dataSource.indexOf(newItem);

            var oldRect = oldNode.getBoundingClientRect();
            var newRect = newNode.getBoundingClientRect();
            _this2.$parent.dragState.oldIndex = oldIndex;
            _this2.$parent.dragState.newIndex = newIndex;

            if (oldIndex < newIndex) {
              newNode.parentNode.insertBefore(oldNode, newNode.nextSibling);
            } else {
              newNode.parentNode.insertBefore(oldNode, newNode);
            }

            _this2.animate(oldRect, oldNode);

            _this2.animate(newRect, newNode);
          }
        };

        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;

          _this2.setMask('destory'); // 当前拖拽位置不在允许的范围内时不需要对数组重新赋值


          if (document.body.style.cursor != 'not-allowed') {
            var _this2$$parent$dragSt2 = _this2.$parent.dragState,
                oldItem = _this2$$parent$dragSt2.oldItem,
                oldIndex = _this2$$parent$dragSt2.oldIndex,
                newIndex = _this2$$parent$dragSt2.newIndex; // 拖拽前后不一致，数组重新赋值

            if (oldIndex != newIndex) {
              var newArr = _toConsumableArray(_this2.dataSource);

              newArr.splice(oldIndex, 1);
              newArr.splice(newIndex, 0, oldItem);
              _this2.$parent.list = newArr;

              _this2.$parent.$emit('ondragend', newArr);
            }
          }

          document.body.style.cursor = 'auto';
        };
      },
      setMask: function setMask(type, left, top) {
        if (type == 'init') {
          this.mask = document.createElement('div');

          for (var key in this.dragStyle) {
            this.setStyle(this.mask, key, this.dragStyle[key]);
          }

          this.mask.style.position = 'absolute';
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
      },
      // 找到目标dom在数组中的位置
      getTarget: function getTarget(e) {
        var _this3 = this;

        var dataKey = e.target.getAttribute('data-key');
        var target = e.target;

        if (!dataKey) {
          // 如果当前拖拽超出了item范围，则不允许拖拽，否则向上查找dataKey属性
          if (target.contains(this.$el)) return {};

          for (var node = e.target; node = node.parentNode;) {
            if (node) {
              target = node;
              dataKey = node.getAttribute('data-key');
              if (node == document.documentElement || dataKey) break;
            } else {
              break;
            }
          }
        }

        var item = this.dataSource.find(function (item) {
          return _this3.$parent.uniqueId(item) == dataKey;
        });
        return {
          target: target,
          item: item
        };
      },
      // 设置动画
      animate: function animate(rect, target) {
        var _this4 = this;

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
            _this4.setStyle(target, 'transition', '');

            _this4.setStyle(target, 'transform', '');

            target.animated = false;
          }, delay);
        }
      },
      // 为dom添加样式
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
    }
  };
  var Items = Vue__default["default"].component('virtual-draglist-items', {
    mixins: [mixin],
    props: {
      tag: {},
      index: {},
      source: {},
      dragStyle: {},
      uniqueKey: {},
      itemStyle: {},
      itemClass: {},
      dataSource: {}
    },
    render: function render(h) {
      var tag = this.tag,
          itemStyle = this.itemStyle,
          itemClass = this.itemClass,
          source = this.source,
          index = this.index,
          uniqueKey = this.uniqueKey;
      return h(tag, {
        key: uniqueKey,
        style: itemStyle,
        "class": itemClass,
        attrs: {
          'data-key': uniqueKey
        },
        props: {
          source: source,
          index: index,
          uniqueKey: uniqueKey
        },
        on: {
          mousedown: this.mousedown
        }
      }, [this.$scopedSlots.item({
        source: source,
        index: index,
        uniqueKey: uniqueKey
      })]);
    }
  });
  var Slots = Vue__default["default"].component('virtual-draglist-slots', {
    mixins: [mixin],
    props: {
      tag: {},
      slots: {},
      uniqueKey: {}
    },
    render: function render(h) {
      var tag = this.tag,
          uniqueKey = this.uniqueKey;
      return h(tag, {
        key: uniqueKey,
        attrs: {
          role: uniqueKey
        }
      }, this.slots);
    }
  });

  var virtualDragList = {
  render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"virtualDragList",staticClass:"virtual-drag-list",style:({ height: _vm.height, overflow: 'hidden auto', position: 'relative' }),on:{"scroll":function($event){return _vm.handleScroll($event)}}},[(_vm.header)?_c('Slots',{attrs:{"slots":_vm.header,"tag":_vm.headerTag,"uniqueKey":"header"},on:{"resize":_vm.onHeaderResized}}):_vm._e(),_vm._v(" "),_c('div',{ref:"content",style:({ padding: ((_vm.padding.front) + "px 0px " + (_vm.padding.behind) + "px") }),attrs:{"role":"group"}},_vm._l((_vm.visibleData),function(item){return _c('Items',{key:_vm.uniqueId(item),attrs:{"tag":_vm.itemTag,"source":item,"dataSource":_vm.list,"dragStyle":_vm.dragStyle,"index":_vm.getIndex(item),"itemStyle":_vm.itemStyle,"itemClass":_vm.itemClass,"uniqueKey":_vm.uniqueId(item)},on:{"resize":_vm.onItemResized},scopedSlots:_vm._u([{key:"item",fn:function(ref){
  var source = ref.source;
  var index = ref.index;
  var uniqueKey = ref.uniqueKey;
  return [_vm._t("item",null,{"source":source,"index":index,"dataKey":uniqueKey})]}}],null,true)})}),1),_vm._v(" "),(_vm.footer)?_c('Slots',{attrs:{"slots":_vm.footer,"tag":_vm.footerTag,"uniqueKey":"footer"},on:{"resize":_vm.onFooterResized}}):_vm._e(),_vm._v(" "),_c('div',{ref:"bottomItem"})],1)},
  staticRenderFns: [],
    name: 'infinity-list',
    components: { Items, Slots },
    props: {
      // 列表数据
      dataSource: {
        type: Array,
        default: () => []
      },
      // 每一项的key值键值
      dataKey: {
        type: String,
        required: true
      },
      // 虚拟列表高度
      height: {
        type: String,
        default: '100%'
      },
      // 列表展示多少条数据，为0或者不传会自动计算
      keeps: {
        type: Number,
        default: 30
      },
      // 每一行预估高度
      size: {
        type: Number
      },
      // 是否可拖拽，需要指定拖拽元素，设置draggable属性为true
      draggable: {
        type: Boolean,
        default: true
      },
      headerTag: {
        type: String,
        default: 'div'
      },
      footerTag: {
        type: String,
        default: 'div'
      },
      itemTag: {
        type: String,
        default: 'div'
      },
      itemStyle: {
        type: Object,
        default: () => {}
      },
      itemClass: {
        type: String,
        default: ''
      },
      // 拖拽时的样式
      dragStyle: {
        type: Object,
        default: () => {
          return {
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'
          }
        }
      }
    },
    data() {
      return {
        list: [], // 将dataSource深克隆一份

        sizeStack: new Map(), // 保存每个item的高度

        start: 0, // 起始索引
        end: 0, // 结束索引
        offset: 0, // 记录滚动高度
        direction: '', // 记录滚动方向

        uniqueKeys: [], // 通过dataKey获取所有数据的唯一键值

        lastCalcIndex: 0,
        calcType: 'INIT', // 初始化标致
        calcSize: {
          average: 0, // 计算首次加载每一项的评价高度
          total: 0, // 首次加载的总高度
          fixed: 0, // 记录固定高度值
          header: 0, // 顶部插槽高度
          footer: 0 // 底部插槽高度
        },

        padding: {
          front: 0,
          behind: 0
        },

        dragState: {
          oldNode: null, // 拖拽起始dom元素
          oldItem: null, // 拖拽起始节点数据
          oldIndex: null, // 拖拽起始节点索引
          newNode: null, // 拖拽结束目标dom元素
          newItem: null, // 拖拽结束节点数据
          newIndex: null // 拖拽结束节点索引
        }
      }
    },
    computed: {
      visibleData() {
        return this.list.slice(this.start, this.end)
      },
      getIndex() {
        return function(item) {
          return this.list.findIndex(el => this.uniqueId(item) == this.uniqueId(el))
        }
      },
      uniqueKeyLen() {
        return this.uniqueKeys.length - 1
      },
      isFixedType() {
        return this.calcType === 'FIXED'
      }
    },
    watch: {
      dataSource: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val));
          this.uniqueKeys = this.list.map(item => this.uniqueId(item));
          this.handleSourceDataChange();
          this.updateSizeStack();
        },
        deep: true,
        immediate: true
      }
    },
    beforeCreate() {
      const { header, footer } = this.$slots;
      this.header = header;
      this.footer = footer;
    },
    mounted() {
      this.end = this.start + this.keeps;
    },
    methods: {
      // 滚动到底部
      scrollToBottom() {
        const { bottomItem, virtualDragList } = this.$refs;
        if (bottomItem) {
          const offset = bottomItem.offsetTop;
          this.scrollToOffset(offset);
        }
        const clientHeight = this.$el.clientHeight;
        const scrollTop = virtualDragList.scrollTop;
        const scrollHeight = virtualDragList.scrollHeight;
        // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
        setTimeout(() => {
          if (scrollTop + clientHeight < scrollHeight) {
            this.scrollToBottom();
          }
        }, 10);
      },
      // 滚动到指定高度
      scrollToOffset(offset) {
        const { virtualDragList } = this.$refs;
        virtualDragList.scrollTop = offset;
      },
      // 滚动到指定索引值位置
      scrollToIndex(index) {
        if (index >= this.list.length - 1) {
          this.scrollToBottom();
        } else {
          const offset = this.getOffsetByIndex(index);
          this.scrollToOffset(offset);
        }
      },
      handleScroll(event) {
        const { virtualDragList } = this.$refs;
        const clientHeight = Math.ceil(this.$el.clientHeight);
        const scrollTop = Math.ceil(virtualDragList.scrollTop);
        const scrollHeight = Math.ceil(virtualDragList.scrollHeight);
        // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离
        if (scrollTop < 0 || (scrollTop + clientHeight > scrollHeight + 1) || !scrollHeight) return
        // 记录上一次滚动的距离，判断当前滚动方向
        this.direction = scrollTop < this.offset ? 'FRONT' : 'BEHIND';
        this.offset = scrollTop;
        const overs = this.getScrollOvers();
        if (this.direction === 'FRONT') {
          this.handleFront(overs);
          if (!!this.list.length && scrollTop <= 0) this.$emit('top');
        } else if (this.direction === 'BEHIND') {
          this.handleBehind(overs);
          if (clientHeight + scrollTop >= scrollHeight) this.$emit('bottom');
        }
      },
      handleFront(overs) {
        if (overs > this.start) {
          return
        }
        const start = Math.max(overs - Math.round(this.keeps / 3), 0);
        this.checkRange(start, this.getEndByStart(start));
      },
      handleBehind(overs) {
        if (overs < this.start + Math.round(this.keeps / 3)) {
          return
        }
        this.checkRange(overs, this.getEndByStart(overs));
      },
      // 更新每个子组件高度
      onItemResized(uniqueKey, size) {
        this.sizeStack.set(uniqueKey, size);
        // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值
        if (this.calcType === 'INIT') {
          this.calcSize.fixed = size;
          this.calcType = 'FIXED';
        } else if (this.calcType === 'FIXED' && this.calcSize.fixed !== size) {
          this.calcType = 'DYNAMIC';
          delete this.calcSize.fixed;
        }
        if (this.calcType !== 'FIXED' && this.calcSize.total !== 'undefined') {
          if (this.sizeStack.size < Math.min(this.keeps, this.uniqueKeys.length)) {
            this.calcSize.total = [...this.sizeStack.values()].reduce((acc, cur) => acc + cur, 0);
            this.calcSize.average = Math.round(this.calcSize.total / this.sizeStack.size);
          } else {
            delete this.calcSize.total;
          }
        }
      },
      onHeaderResized(id, size) {
        this.calcSize.header = size;
      },
      onFooterResized(id, size) {
        this.calcSize.footer = size;
      },
      // 原数组改变重新计算
      handleSourceDataChange() {
        let start = Math.max(this.start, 0);
        this.updateRange(this.start, this.getEndByStart(start));
      },
      // 更新缓存
      updateSizeStack() {
        this.sizeStack.forEach((v, key) => {
          if (!this.uniqueKeys.includes(key)) {
            this.sizeStack.delete(key);
          }
        });
      },
      checkRange(start, end) {
        const keeps = this.keeps;
        const total = this.uniqueKeys.length;
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
      updateRange(start, end) {
        this.start = start;
        this.end = end;
        this.padding = {
          front: this.getFront(),
          behind: this.getBehind()
        };
      },
      // 二分法查找
      getScrollOvers() {
        // 如果有header插槽，需要减去header的高度
        const offset = this.offset - this.calcSize.header;
        if (offset <= 0) return 0
        if (this.isFixedType) return Math.floor(offset / this.calcSize.fixed)
        let low = 0;
        let middle = 0;
        let middleOffset = 0;
        let high = this.uniqueKeys.length;
        while (low <= high) {
          middle = low + Math.floor((high - low) / 2);
          middleOffset = this.getOffsetByIndex(middle);
          if (middleOffset === offset) {
            return middle
          } else if (middleOffset < offset) {
            low = middle + 1;
          } else if (middleOffset > offset) {
            high = middle - 1;
          }
        }
        return low > 0 ? --low : 0
      },
      getFront() {
        if (this.isFixedType) {
          return this.calcSize.fixed * this.start
        } else {
          return this.getOffsetByIndex(this.start)
        }
      },
      getBehind() {
        const last = this.uniqueKeyLen;
        if (this.isFixedType) {
          return (last - this.end) * this.calcSize.fixed
        }
        if (this.lastCalcIndex === last) {
          return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.end)
        } else {
          return (last - this.end) * this.getItemSize()
        }
      },
      // 通过滚动高度获取索引
      getOffsetByIndex(index) {
        if (!index) return 0
        let offset = 0;
        let indexSize = 0;
        for (let i = 0; i < index; i++) {
          indexSize = this.sizeStack.get(this.uniqueKeys[i]);
          offset = offset + (typeof indexSize === 'number' ? indexSize : this.getItemSize());
        }
        this.lastCalcIndex = Math.max(this.lastCalcIndex, index - 1);
        this.lastCalcIndex = Math.min(this.lastCalcIndex, this.uniqueKeyLen);
        return offset
      },
      // 获取每一项的高度
      getItemSize() {
        return this.isFixedType ? this.calcSize.fixed : (this.calcSize.average || this.size)
      },
      getEndByStart(start) {
        return Math.min(start + this.keeps, this.uniqueKeyLen)
      },
      uniqueId(obj, defaultValue = '') {
        const keys = this.dataKey;
        return (!Array.isArray(keys) ? keys.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : keys).reduce((o, k) => (o || {})[k], obj) || defaultValue
      }
    }
  };

  return virtualDragList;

}));
