<template>
  <div class="infinity-list-item">
    <slot name="item" :record="item" :index="index"></slot>
  </div>
</template>

<script>
export default {
  name: 'vue-virtual-draglist-item',
  props: {
    item: {},
    index: {},
    uniqueKey: {}
  },
  data() {
    return {
      resizeObserver: null
    }
  },
  updated () {
    this.dispatchSizeChange()
  },
  mounted() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.dispatchSizeChange()
      })
      this.resizeObserver.observe(this.$el)
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  },
  methods: {
    dispatchSizeChange() {
      this.$emit('resize', this.uniqueKey, this.getCurrentSize())
    },
    getCurrentSize () {
      return this.$el ? this.$el.offsetHeight : 0
    }
  }
}
</script>

<style></style>