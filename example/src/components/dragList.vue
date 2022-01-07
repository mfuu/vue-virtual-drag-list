<template>
  <div id="v-draggable-virtual-list">
    <!-- <button @click="toBottom">bottom</button> -->
    <virtual-list ref="list" :dataSource="dataSource" :data-key="'id'" :keeps="50" :size="60" @top="handleTop" @bottom="handleBottom" @ondragend="ondragend">
      <template #item="{ source, index }">
        <div class="test-item">
          <span class="index" draggable="true">{{ source.index }}</span>
          <span>{{ source.desc }}</span>
        </div>
      </template>
      <template slot="header">
        <div class="loading">top loading...</div>
      </template>
      <template slot="footer">
        <div class="loading">bottom loading...</div>
      </template>
    </virtual-list>
    <!-- <div class="content">
      <div v-for="item in dataSource" :key="item.id" class="test-item">
        <span class="index" draggable="true">{{ item.index }}</span>
        <span>{{ item.desc }}</span>
      </div>
    </div> -->
    <!-- <Table v-virtual :columns="columns" :dataSource="dataSource" rowKey="id" :pagination="false" /> -->
  </div>
</template>

<script>
import virtualList from 'vue-virtual-draglist'

// import virtualList from './virtual'

// import virtualList from '../dist/index'

import { Table } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import utils from '../utils'
import { Random } from '../utils/mock'
import getSentences from '../utils/sentences'

// import virtualList from './virtual.vue'

import './directive'

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
  components: { virtualList, Table },
  data() {
    return {
      dataSource: getPageData(60, 0),
      columns: [
        {
          title: '索引',
          key: '索引',
          width: 80,
          dataIndex: 'index'
        },
        {
          title: 'id',
          key: 'id',
          dataIndex: 'id'
        },
        {
          title: '名称',
          key: '名称',
          dataIndex: 'name'
        },
        {
          title: '描述',
          key: '描述',
          dataIndex: 'desc'
        }
      ]
    }
  },
  methods: {
    ondragend(list) {
      // console.log(list)
    },
    handleTop() {
      setTimeout(() => {
        // this.dataSource = [...getPageData(60, 0), ...this.dataSource]
      }, 500)
    },
    handleBottom() {
      setTimeout(() => {
        // this.dataSource = [...this.dataSource, ...getPageData(60, 0)]
      }, 500)
      
    },
    toBottom() {
      this.$refs.list.scrollToBottom()
    }
  }
}
</script>

<style scoped>
#v-draggable-virtual-list {
  height: 100%;
  /* height: 500px; */
  /* overflow: hidden; */
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