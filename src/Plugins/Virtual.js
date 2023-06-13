export class Range {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.front = 0;
    this.behind = 0;
  }
}

class CalcSize {
  constructor() {
    this.average = 0;
    this.total = 0;
    this.fixed = 0;
    this.header = 0;
    this.footer = 0;
  }
}

const CACLTYPE = {
  INIT: 'INIT',
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC',
};

const DIRECTION = {
  FRONT: 'FRONT',
  BEHIND: 'BEHIND',
};

const LEADING_BUFFER = 2;

function Virtual(options, callback) {
  this.options = options;
  this.callback = callback;

  this.sizes = new Map(); // store item size

  this.calcType = CACLTYPE.INIT;
  this.calcSize = new CalcSize();

  this.direction = '';
  this.offset = 0;

  this.range = new Range();

  if (options) {
    this.checkIfUpdate(0, options.keeps - 1);
  }
}

Virtual.prototype = {
  constructor: Virtual,

  isFront() {
    return this.direction === DIRECTION.FRONT;
  },

  isBehind() {
    return this.direction === DIRECTION.BEHIND;
  },

  isFixed() {
    return this.calcType === CACLTYPE.FIXED;
  },

  updateOptions(key, value) {
    if (this.options && key in this.options) {
      if (key === 'uniqueKeys') {
        this.sizes.forEach((v, k) => {
          if (!value.includes(k)) {
            this.sizes.delete(k);
          }
        });
      }
      this.options[key] = value;
    }
  },

  updateRange() {
    let start = this.range.start;
    if (this.isFront()) {
      start -= LEADING_BUFFER;
    } else if (this.isBehind()) {
      start += LEADING_BUFFER;
    }

    start = Math.max(start, 0);

    this.handleUpdate(start, this.getEndByStart(start));
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

  handleScroll(offset) {
    this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
    this.offset = offset;

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
    const offset = this.offset - this.calcSize.header;
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
    this.callback({ ...this.range });
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
    let offset = this.calcSize.header;
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
};

export default Virtual;
