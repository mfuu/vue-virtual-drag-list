<template>
  <div id="v-draggable-virtual-list">
    <!-- <button @click="toBottom">bottom</button> -->
    <virtual-list ref="list" :dataSource="dataSource" dataKey="id" :keeps="50" :size="60" @top="handleTop" @bottom="handleBottom" @ondragend="ondragend">
      <template #item="{ source, index }">
        <div class="test-item">
          <span class="index" draggable="true">{{ source.index }}</span>
          <span>{{ source.desc }}</span>
        </div>
      </template>
      <template slot="footer">
        <div class="loading">加载中...</div>
      </template>
    </virtual-list>
    <!-- <div class="content">
      <div v-for="item in dataSource" :key="item.id" class="test-item">
        <span class="index" draggable="true">{{ item.index }}</span>
        <span>{{ item.desc }}</span>
      </div>
    </div> -->
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
      dataSource: getPageData(60, 0)
    }
  },
  mounted() {
    const scrollElement = document.getElementById('v-draggable-virtual-list')
    // scrollElement.addEventListener('scroll', this.onScroll, {
    //   passive: false
    // })
  },
  methods: {
    ondragend(list, e) {
      // console.log(list, e)
    },
    handleTop() {
      setTimeout(() => {
        this.dataSource = [...getPageData(60, 0), ...this.dataSource]
      }, 500)
    },
    handleBottom() {
      setTimeout(() => {
        this.dataSource = [...this.dataSource, ...getPageData(60, 0)]
      }, 500)
      
    },
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

<style scoped>
#v-draggable-virtual-list {
  /* height: 100%; */
  height: 500px;
  overflow: hidden;
  position: relative;
}
.content {
  height: 100%;
  overflow: auto;
}
.index {
  display: inline-block;
  min-width: 30px;
  color: #1984ff;
  cursor: grab;
}
.test-item {
  padding: 16px;
  border-bottom: 1px solid #1984ff;
}
.loading {
  font-size: 16px;
  height: 20px;
  text-align: center;
}
</style>