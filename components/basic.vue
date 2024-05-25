<template>
  <virtual-list
    v-model="list"
    :keeps="15"
    data-key="id"
    handle=".handle"
    class="basic-list"
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
</template>

<script>
import { reactive, toRefs } from 'vue';
import { getPageData } from '../public/sentence';
export default {
  setup() {
    const data = reactive({
      list: getPageData(100, 0),
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style>
.basic-list {
  height: 500px;
}

.basic-list .list-item {
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
