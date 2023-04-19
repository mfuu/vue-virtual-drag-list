import Vue from 'vue';
import { SlotsProps } from '../props';

const observer = {
  inject: ['virtualList'],
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.onSizeChange();
      });
      this.$el && this.observer.observe(this.$el);
    }
  },
  updated() {
    this.onSizeChange();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
  methods: {
    onSizeChange() {
      this.virtualList[this.event](this.dataKey, this.getCurrentSize());
    },
    getCurrentSize() {
      const sizeKey = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
      return this.$el ? this.$el[sizeKey] : 0;
    },
  },
};

export const Items = Vue.component('virtual-draglist-items', {
  mixins: [observer],
  props: SlotsProps,
  render(h) {
    const { tag, dataKey } = this;
    return h(
      tag,
      {
        key: dataKey,
        attrs: {
          'data-key': dataKey,
        },
      },
      this.$slots.default
    );
  },
});

export const Slots = Vue.component('virtual-draglist-slots', {
  mixins: [observer],
  props: SlotsProps,
  render(h) {
    const { tag, dataKey } = this;
    return h(
      tag,
      {
        key: dataKey,
        attrs: {
          role: dataKey,
        },
      },
      this.$slots.default
    );
  },
});
