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
  draggable: {
    type: [Function, String],
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
  animation: {
    type: Number,
    default: 150,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  scrollThreshold: {
    type: Number,
    default: 55,
  },
  keepOffset: {
    type: Boolean,
    default: false,
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
  itemTag: {
    type: String,
    default: 'div',
  },
  wrapClass: {
    type: String,
    default: '',
  },
  wrapStyle: {
    type: Object,
  },
  itemStyle: {
    type: Object,
  },
  itemClass: {
    type: String,
    default: '',
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

export const SlotsProps = {
  tag: {
    type: String,
    default: 'div',
  },
  dataKey: {
    type: [String, Number],
  },
  sizeKey: {
    type: String,
  },
};
