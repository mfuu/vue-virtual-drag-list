<template>
  <div class="group-list">
    <virtual-list
      v-model="list1"
      :keeps="15"
      data-key="id"
      handle=".handle"
      :group="group"
      chosen-class="chosen"
      class="virtual-list"
    >
      <template v-slot:item="{ record, index, dateKey }">
        <div class="list-item">
          <div class="item-title">
            <span class="index">#  {{ index }}-{{ record.name }}</span>
            <span class="handle">☰</span>
          </div>
        </div>
      </template>
    </virtual-list>

    <virtual-list
      v-model="list2"
      :keeps="15"
      data-key="id"
      handle=".handle"
      :group="group"
      chosen-class="chosen"
      class="virtual-list"
    >
      <template v-slot:item="{ record, index, dateKey }">
        <div class="list-item">
          <div class="item-title">
            <span class="index">#  {{ index }}-{{ record.name }}</span>
            <span class="handle">☰</span>
          </div>
        </div>
      </template>
    </virtual-list>
  </div>
</template>

<script>
import { getPageData } from '../public/sentence';
export default {
  data() {
    return {
      list1: getPageData(1000, 0),
      list2: getPageData(1000, 0),
      group: { name: 'group', pull: true, put: true },
    };
  },
};
</script>

<style scoped>
.group-list {
  display: flex;
  justify-content: space-between;
}

.virtual-list {
  height: 500px;
  width: 49%;
  padding: 5px;
  display: inline-block;
}

.list-item {
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 2px 10px -5px #57bbb4;
  padding: 16px;
  height: 50px;
  overflow: hidden;
  box-sizing: border-box;
}

.item-title {
  display: flex;
  justify-content: space-between;
}

.index {
  float: left;
}

.handle {
  cursor: grab;
  text-align: right;
}

.chosen {
  box-shadow: 0px 0px 0px 2px #30a46c;
}
</style>
