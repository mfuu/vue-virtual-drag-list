export const observer = {
  inject: ['virtual'],
  data () {
    return {
      observer: null
    }
  },
  mounted () {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.onSizeChange()
      })
      this.$el && this.observer.observe(this.$el)
    }
  },
  updated () {
    this.onSizeChange()
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  },
  methods: {
    onSizeChange () {
      this.virtual[this.event](this.uniqueKey, this.getCurrentSize())
    },
    getCurrentSize () {
      return this.$el ? this.$el.offsetHeight : 0
    }
  }
}