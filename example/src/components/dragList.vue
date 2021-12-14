<template>
  <div id="v-draggable-virtual-list">
    <virtual-table :dataSource="dataSource" />
    <div class="header"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import utils from '../utils'
import { Random } from '../utils/mock'
import getSentences from '../utils/sentences'

import virtualTable from './table.vue'

const getPageData = (count, currentLength) => {
  const DataItems = []
  for (let i = 0; i < count; i++) {
    const index = currentLength + i
    DataItems.push({
      index,
      name: Random.name(),
      id: utils.getUniqueId(index),
      desc: getSentences()
    })
  }
  return DataItems
}
export default {
  name: 'v-draggable-virtual-list', 
  components: {virtualTable},
  data() {
    return {
      dataSource: getPageData(100, 0)
    }
  },
  mounted() {
    const scrollElement = document.getElementById('v-draggable-virtual-list')
    scrollElement.addEventListener('scroll', this.onScroll, {
      passive: false
    })
  },
  methods: {
    onScroll(event) {
      console.log('scroll', event)
    }
  }
}
</script>

<style>
#v-draggable-virtual-list {
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>