<template>
  <virtual-list
    v-model="list"
    data-key="id"
    handle=".handle"
    :scroller="scroller"
  >
    <template v-slot:item="{ record, index, dateKey }">
      <div class="list-item">
        <span class="index">#{{ index }}</span>
        <div class="handle">☰</div>
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
      scroller: document,
      list: getPageData(100, 0),
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style>
.list-item {
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 2px 10px -5px #57bbb4;
  padding: 16px;
}

.index {
  float: left;
}

.handle {
  text-align: right;
}
</style>
