export const VirtualProps = {
  dataSource: {
    type: Array,
    default: () => [],
  },
  dataKey: {
    type: String,
    required: true,
  },
  scroller: {
    type: [Document, HTMLElement],
  },
  direction: {
    type: String,
    default: 'vertical',
  },
  keeps: {
    type: Number,
    default: 30,
  },
  size: {
    type: Number,
  },
  keepOffset: {
    type: Boolean,
    default: false,
  },
  tableMode: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: String,
    default: '.virtual-dnd-list-item',
  },
  itemClass: {
    type: String,
    default: 'virtual-dnd-list-item',
  },
  sortable: {
    type: Boolean,
    default: true,
  },
  handle: {
    type: [Function, String],
  },
  group: {
    type: [String, Object],
  },
  lockAxis: {
    type: String,
    default: '',
  },
  debounceTime: {
    type: Number,
    default: 0,
  },
  throttleTime: {
    type: Number,
    default: 0,
  },
  animation: {
    type: Number,
    default: 150,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  scrollSpeed: {
    type: Object,
    default: () => ({ x: 10, y: 10 }),
  },
  scrollThreshold: {
    type: Number,
    default: 55,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fallbackOnBody: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
  delayOnTouchOnly: {
    type: Boolean,
    default: false,
  },
  rootTag: {
    type: String,
    default: 'div',
  },
  wrapTag: {
    type: String,
    default: 'div',
  },
  wrapClass: {
    type: String,
    default: '',
  },
  wrapStyle: {
    type: Object,
    default: () => ({}),
  },
  ghostClass: {
    type: String,
    default: '',
  },
  ghostStyle: {
    type: Object,
    default: () => ({}),
  },
  chosenClass: {
    type: String,
    default: '',
  },
};

export const ItemProps = {
  dataKey: {
    type: [String, Number],
  },
  sizeKey: {
    type: String,
  },
};
