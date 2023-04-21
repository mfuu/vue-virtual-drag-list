export const VirtualProps = {
  dataSource: {
    type: Array,
    default: () => {
      return [];
    },
  },
  dataKey: {
    type: String,
    required: true,
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
  delay: {
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
    default: 15,
  },
  keepOffset: {
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
  },
  headerTag: {
    type: String,
    default: 'div',
  },
  footerTag: {
    type: String,
    default: 'div',
  },
  itemTag: {
    type: String,
    default: 'div',
  },
  itemStyle: {
    type: Object,
  },
  itemClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  ghostClass: {
    type: String,
    default: '',
  },
  ghostStyle: {
    type: Object,
    default: () => {
      return {};
    },
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
  event: {
    type: String,
  },
  dataKey: {
    type: [String, Number],
  },
  isHorizontal: {
    type: Boolean,
  },
};