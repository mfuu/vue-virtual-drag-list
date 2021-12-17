<template>
  <div id="v-draggable-virtual-list">
    <button @click="toBottom">bottom</button>
    <virtual-list ref="list" :dataSource="dataSource" dataKey="id" :size="50" />
    <!-- <virtual-drag-list ref="list" :dataSource="dataSource" dataKey="id" :size="50">
      <template #item="{ record, index }">
        <div class="list-item">{{ record.desc }}</div>
      </template>
    </virtual-drag-list> -->
    <!-- <div class="header"></div>
    <div class="footer"></div> -->
  </div>
</template>

<script>
import virtualDragList from 'vue-virtual-draglist'

import utils from '../utils'
import { Random } from '../utils/mock'
import getSentences from '../utils/sentences'

import virtualList from './virtual.vue'

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
  components: {virtualList, virtualDragList},
  data() {
    return {
      dataSource: getPageData(100, 0)
    }
  },
  mounted() {
    const scrollElement = document.getElementById('v-draggable-virtual-list')
    // scrollElement.addEventListener('scroll', this.onScroll, {
    //   passive: false
    // })
  },
  methods: {
    toBottom() {
      console.log(this.$refs.list)
      this.$refs.list.scrollToBottom()
    },
    onScroll(event) {
      console.log('scroll', event)
    }
  }
}
</script>

<style>
#v-draggable-virtual-list {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.list-item{
  padding: 16px;
}
</style>