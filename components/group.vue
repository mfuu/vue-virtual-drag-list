<template>
  <div class="group-list">
    <virtual-list
      v-model="list1"
      :keeps="15"
      data-key="id"
      handle=".handle"
      :group="group"
      class="virtual-list"
    >
      <template v-slot:item="{ record, index, dateKey }">
        <div class="list-item">
          <div class="item-title">
            <span class="index">#{{ index }}</span>
            <span class="handle">☰</span>
          </div>
          <p>{{ record.desc }}</p>
        </div>
      </template>
    </virtual-list>

    <virtual-list
      v-model="list2"
      :keeps="15"
      data-key="id"
      handle=".handle"
      :group="group"
      class="virtual-list"
    >
      <template v-slot:item="{ record, index, dateKey }">
        <div class="list-item">
          <div class="item-title">
            <span class="index">#{{ index }}</span>
            <span class="handle">☰</span>
          </div>
          <p>{{ record.desc }}</p>
        </div>
      </template>
    </virtual-list>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { getPageData } from '../public/sentence';
export default {
  setup() {
    const data = reactive({
      list1: getPageData(100, 0),
      list2: getPageData(100, 0),
      group: { name: 'group', pull: true, put: true },
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style>
.group-list {
  display: flex;
  justify-content: space-between;
}

.group-list .virtual-list {
  height: 500px;
  width: 49%;
  display: inline-block;
}

.group-list .list-item {
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 2px 10px -5px #57bbb4;
  padding: 16px;
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
</style>
