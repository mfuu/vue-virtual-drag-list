import { debounce, throttle } from '../utils';

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

const scrollType = {
  [DIRECTION.VERTICAL]: 'scrollTop',
  [DIRECTION.HORIZONTAL]: 'scrollLeft',
};

const scrollSize = {
  [DIRECTION.VERTICAL]: 'scrollHeight',
  [DIRECTION.HORIZONTAL]: 'scrollWidth',
};

const offsetSize = {
  [DIRECTION.VERTICAL]: 'offsetHeight',
  [DIRECTION.HORIZONTAL]: 'offsetWidth',
};

const offsetType = {
  [DIRECTION.VERTICAL]: 'offsetTop',
  [DIRECTION.HORIZONTAL]: 'offsetLeft',
};

export const attributes = [
  'size',
  'keeps',
  'scroller',
  'direction',
  'debounceTime',
  'throttleTime',
];

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
    return this.sizes.get(key) || this._getItemSize();
  },

  getOffset() {
    return this.scrollEl[scrollType[this.options.direction]];
  },

  getScrollSize() {
    return this.scrollEl[scrollSize[this.options.direction]];
  },

  getClientSize() {
    return this.scrollEl[offsetSize[this.options.direction]];
  },

  scrollToOffset(offset) {
    this.scrollEl[scrollType[this.options.direction]] = offset;
  },

  scrollToIndex(index) {
    if (index >= this.options.uniqueKeys.length - 1) {
      this.scrollToBottom();
    } else {
      const indexOffset = this._getOffsetByIndex(index);
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

  updateOptions(key, value) {
    const oldValue = this.options[key];

    this.options[key] = value;

    if (key === 'uniqueKeys') {
      this.sizes.forEach((v, k) => {
        if (!value.includes(k)) {
          this.sizes.delete(k);
        }
      });
    } else if (key === 'scroller') {
      oldValue?.removeEventListener('scroll', this._onScroll);

      this._updateScrollElement();
      this.addScrollEventListener();
    }
  },

  updateRange(range) {
    if (range) {
      this._handleUpdate(range.start, range.end);
      return;
    }

    let start = this.range.start;
    start = Math.max(start, 0);

    this._handleUpdate(start, this._getEndByStart(start));
  },

  handleItemSizeChange(key, size) {
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

  handleSlotSizeChange(key, size) {
    this.calcSize[key] = size;
  },

  addScrollEventListener() {
    this.options.scroller?.addEventListener('scroll', this._onScroll, false);
  },

  removeScrollEventListener() {
    this.options.scroller?.removeEventListener('scroll', this._onScroll);
  },

  // ========================================= Properties =========================================
  _updateOnScrollFunction() {
    const { debounceTime, throttleTime } = this.options;
    if (debounceTime) {
      this._onScroll = debounce(() => this._handleScroll(), debounceTime);
    } else if (throttleTime) {
      this._onScroll = throttle(() => this._handleScroll(), throttleTime);
    } else {
      this._onScroll = () => this._handleScroll();
    }

    this._onScroll = this._onScroll.bind(this);
  },

  _updateScrollElement() {
    this.scrollEl = this._getScrollElement(this.options.scroller);
  },

  _handleScroll() {
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
      this._handleScrollFront();
    } else if (this.isBehind()) {
      this._handleScrollBehind();
    }
  },

  _handleScrollFront() {
    const scrolls = this._getScrollItems();
    if (scrolls > this.range.start) {
      return;
    }
    const start = Math.max(scrolls - this.options.buffer, 0);
    this._checkIfUpdate(start, this._getEndByStart(start));
  },

  _handleScrollBehind() {
    const scrolls = this._getScrollItems();

    if (scrolls < this.range.start + this.options.buffer) {
      return;
    }
    this._checkIfUpdate(scrolls, this._getEndByStart(scrolls));
  },

  _getScrollItems() {
    const offset = this.offset - this._getScrollStartOffset();

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

  _checkIfUpdate(start, end) {
    const keeps = this.options.keeps;
    const total = this.options.uniqueKeys.length;

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

  _handleUpdate(start, end) {
    this.range.start = start;
    this.range.end = end;
    this.range.front = this._getFrontOffset();
    this.range.behind = this._getBehindOffset();

    this.options.onUpdate({ ...this.range });
  },

  _getFrontOffset() {
    if (this.isFixed()) {
      return this.calcSize.fixed * this.range.start;
    } else {
      return this._getOffsetByIndex(this.range.start);
    }
  },

  _getBehindOffset() {
    const end = this.range.end;
    const last = this._getLastIndex();

    if (this.isFixed()) {
      return (last - end) * this.calcSize.fixed;
    }

    return (last - end) * this._getItemSize();
  },

  _getOffsetByIndex(index) {
    if (!index) return 0;

    let offset = 0;
    for (let i = 0; i < index; i++) {
      const size = this.sizes.get(this.options.uniqueKeys[i]);
      offset = offset + (typeof size === 'number' ? size : this._getItemSize());
    }

    return offset;
  },

  _getEndByStart(start) {
    return Math.min(start + this.options.keeps - 1, this._getLastIndex());
  },

  _getLastIndex() {
    const { uniqueKeys, keeps } = this.options;
    return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
  },

  _getItemSize() {
    return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
  },

  _getScrollElement(scroller) {
    if ((scroller instanceof Document && scroller.nodeType === 9) || scroller instanceof Window) {
      this.useWindowScroll = true;
      return document.scrollingElement || document.documentElement || document.body;
    }

    this.useWindowScroll = false;

    return scroller;
  },

  _getScrollStartOffset() {
    let offset = this.calcSize.header;
    if (this.useWindowScroll && this.options.wrapper) {
      let el = this.options.wrapper;
      do {
        offset += el[offsetType[this.options.direction]];
      } while ((el = el.offsetParent) && el !== this.options.wrapper.ownerDocument);
    }

    return offset;
  },
};

export default Virtual;
