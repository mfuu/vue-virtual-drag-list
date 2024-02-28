import Dnd from 'sortable-dnd';
import { debounce, throttle } from './utils';

export const VirtualAttrs = [
  'size',
  'keeps',
  'scroller',
  'direction',
  'debounceTime',
  'throttleTime',
];

const CACLTYPE = {
  INIT: 'INIT',
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC',
};

const SCROLL_DIRECTION = {
  FRONT: 'FRONT',
  BEHIND: 'BEHIND',
  STATIONARY: 'STATIONARY',
};

const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

const scrollDir = {
  [DIRECTION.VERTICAL]: 'scrollTop',
  [DIRECTION.HORIZONTAL]: 'scrollLeft',
};

const offsetDir = {
  [DIRECTION.VERTICAL]: 'offsetTop',
  [DIRECTION.HORIZONTAL]: 'offsetLeft',
};

const scrollSize = {
  [DIRECTION.VERTICAL]: 'scrollHeight',
  [DIRECTION.HORIZONTAL]: 'scrollWidth',
};

const offsetSize = {
  [DIRECTION.VERTICAL]: 'offsetHeight',
  [DIRECTION.HORIZONTAL]: 'offsetWidth',
};

function Virtual(options) {
  this.options = options;

  const defaults = {
    size: 0,
    keeps: 0,
    buffer: 0,
    wrapper: null,
    scroller: null,
    direction: 'vertical',
    uniqueKeys: [],
    debounceTime: null,
    throttleTime: null,
  };

  for (const name in defaults) {
    !(name in this.options) && (this.options[name] = defaults[name]);
  }

  this.sizes = new Map(); // store item size
  this.range = { start: 0, end: 0, front: 0, behind: 0 };
  this.offset = 0;
  this.calcType = CACLTYPE.INIT;
  this.calcSize = { average: 0, total: 0, fixed: 0, header: 0 };
  this.scrollEl = this.getScrollElement(options.scroller);
  this.direction = '';
  this.useWindowScroll = null;
  this.onScroll = null;

  this.updateOnScrollFunction();
  this.addScrollEventListener();
  this.checkIfUpdate(0, options.keeps - 1);
}

Virtual.prototype = {
  constructor: Virtual,

  isFront() {
    return this.direction === SCROLL_DIRECTION.FRONT;
  },

  isBehind() {
    return this.direction === SCROLL_DIRECTION.BEHIND;
  },

  isFixed() {
    return this.calcType === CACLTYPE.FIXED;
  },

  getSize(key) {
    return this.sizes.get(key) || this.getItemSize();
  },

  getOffset() {
    return this.scrollEl[scrollDir[this.options.direction]];
  },

  getScrollSize() {
    return this.scrollEl[scrollSize[this.options.direction]];
  },

  getClientSize() {
    return this.scrollEl[offsetSize[this.options.direction]];
  },

  scrollToOffset(offset) {
    this.scrollEl[scrollDir[this.options.direction]] = offset;
  },

  scrollToIndex(index) {
    if (index >= this.options.uniqueKeys.length - 1) {
      this.scrollToBottom();
    } else {
      const indexOffset = this.getOffsetByIndex(index);
      this.scrollToOffset(indexOffset);
    }
  },

  scrollToBottom() {
    const offset = this.getScrollSize();
    this.scrollToOffset(offset);

    // if the bottom is not reached, execute the scroll method again
    setTimeout(() => {
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();
      const scrollOffset = this.getOffset();
      if (scrollOffset + clientSize + 1 < scrollSize) {
        this.scrollToBottom();
      }
    }, 5);
  },

  option(key, value) {
    const oldValue = this.options[key];

    this.options[key] = value;

    if (key === 'uniqueKeys') {
      this.sizes.forEach((v, k) => {
        if (!value.includes(k)) {
          this.sizes.delete(k);
        }
      });
    }
    if (key === 'scroller') {
      oldValue && Dnd.utils.off(oldValue, 'scroll', this.onScroll);
      this.scrollEl = this.getScrollElement(value);
      this.addScrollEventListener();
    }
  },

  updateRange(range) {
    if (range) {
      this.handleUpdate(range.start, range.end);
      return;
    }

    let start = this.range.start;
    start = Math.max(start, 0);

    this.handleUpdate(start, this.getEndByStart(start));
  },

  onItemResized(key, size) {
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
      this.calcSize.total = [...this.sizes.values()].reduce((t, i) => t + i, 0);
      this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
    }
  },

  onSlotResized(key, size) {
    this.calcSize[key] = size;
  },

  addScrollEventListener() {
    if (this.options.scroller) {
      Dnd.utils.on(this.options.scroller, 'scroll', this.onScroll);
    }
  },

  removeScrollEventListener() {
    if (this.options.scroller) {
      Dnd.utils.off(this.options.scroller, 'scroll', this.onScroll);
    }
  },

  // ========================================= Properties =========================================
  updateOnScrollFunction() {
    const { debounceTime, throttleTime } = this.options;
    if (debounceTime) {
      this.onScroll = debounce(() => this.handleScroll(), debounceTime);
    } else if (throttleTime) {
      this.onScroll = throttle(() => this.handleScroll(), throttleTime);
    } else {
      this.onScroll = () => this.handleScroll();
    }
  },

  handleScroll() {
    const offset = this.getOffset();
    const clientSize = this.getClientSize();
    const scrollSize = this.getScrollSize();

    if (offset === this.offset) {
      this.direction = SCROLL_DIRECTION.STATIONARY;
    } else {
      this.direction = offset < this.offset ? SCROLL_DIRECTION.FRONT : SCROLL_DIRECTION.BEHIND;
    }

    this.offset = offset;

    const top = this.isFront() && offset <= 0;
    const bottom = this.isBehind() && clientSize + offset >= scrollSize;

    this.options.onScroll({ top, bottom, offset, direction: this.direction });

    if (this.isFront()) {
      this.handleScrollFront();
    } else if (this.isBehind()) {
      this.handleScrollBehind();
    }
  },

  handleScrollFront() {
    const scrolls = this.getScrollItems();
    if (scrolls > this.range.start) {
      return;
    }
    const start = Math.max(scrolls - this.options.buffer, 0);
    this.checkIfUpdate(start, this.getEndByStart(start));
  },

  handleScrollBehind() {
    const scrolls = this.getScrollItems();

    if (scrolls < this.range.start + this.options.buffer) {
      return;
    }
    this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
  },

  getScrollItems() {
    const offset = this.offset - this.getScrollStartOffset();

    if (offset <= 0) {
      return 0;
    }

    if (this.isFixed()) {
      return Math.floor(offset / this.calcSize.fixed);
    }

    let low = 0;
    let high = this.options.uniqueKeys.length;
    let middle = 0;
    let middleOffset = 0;

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

  checkIfUpdate(start, end) {
    const keeps = this.options.keeps;
    const total = this.options.uniqueKeys.length;

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

  handleUpdate(start, end) {
    this.range.start = start;
    this.range.end = end;
    this.range.front = this.getFrontOffset();
    this.range.behind = this.getBehindOffset();

    this.options.onUpdate({ ...this.range });
  },

  getFrontOffset() {
    if (this.isFixed()) {
      return this.calcSize.fixed * this.range.start;
    } else {
      return this.getOffsetByIndex(this.range.start);
    }
  },

  getBehindOffset() {
    const end = this.range.end;
    const last = this.getLastIndex();

    if (this.isFixed()) {
      return (last - end) * this.calcSize.fixed;
    }

    return (last - end) * this.getItemSize();
  },

  getOffsetByIndex(index) {
    if (!index) return 0;

    let offset = 0;
    for (let i = 0; i < index; i++) {
      const size = this.sizes.get(this.options.uniqueKeys[i]);
      offset = offset + (typeof size === 'number' ? size : this.getItemSize());
    }

    return offset;
  },

  getEndByStart(start) {
    return Math.min(start + this.options.keeps - 1, this.getLastIndex());
  },

  getLastIndex() {
    const { uniqueKeys, keeps } = this.options;
    return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
  },

  getItemSize() {
    return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
  },

  getScrollElement: function (scroller) {
    if ((scroller instanceof Document && scroller.nodeType === 9) || scroller instanceof Window) {
      this.useWindowScroll = true;
      return document.scrollingElement || document.documentElement || document.body;
    }

    this.useWindowScroll = false;

    return scroller;
  },

  getScrollStartOffset: function () {
    let offset = this.calcSize.header;
    if (this.useWindowScroll && this.options.wrapper) {
      let el = this.options.wrapper;
      do {
        offset += el[offsetDir[this.options.direction]];
      } while ((el = el.offsetParent) && el !== this.options.wrapper.ownerDocument);
    }

    return offset;
  },
};

export { Virtual };
export default Virtual;
