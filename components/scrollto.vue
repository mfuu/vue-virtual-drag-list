<template>
  <div class="oprations">
    <button @click="scrollToIndex">
      scroll to index:
      <input v-model="index" type="number" @click="stopPropagation" />
    </button>
    <button @click="scrollToOffset">
      scroll to offset:
      <input v-model="offset" type="number" @click="stopPropagation" />
    </button>
  </div>
  <virtual-list
    ref="virtualRef"
    v-model="list"
    :keeps="15"
    data-key="id"
    handle=".handle"
    class="scrollto-list"
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
import { reactive, toRefs, ref } from 'vue';
import { getPageData } from '../public/sentence';
export default {
  setup() {
    const virtualRef = ref(null);
    const data = reactive({
      index: 20,
      offset: 5000,
      list: getPageData(100, 0),
    });

    const stopPropagation = (e) => {
      e.stopPropagation()
    }

    const scrollToIndex = () => {
      virtualRef.value.scrollToIndex(data.index);
    };

    const scrollToOffset = () => {
      virtualRef.value.scrollToOffset(data.offset);
    };

    return {
      ...toRefs(data),
      virtualRef,
      stopPropagation,
      scrollToIndex,
      scrollToOffset,
    };
  },
};
</script>

<style scoped>
.oprations {
  padding: 10px 0;
}

.scrollto-list {
  height: 500px;
}

.scrollto-list .list-item {
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

input {
  width: 55px;
  border: 1px solid #aaa;
  border-radius: 2px;
}

input:hover,
input:active,
input:focus-visible {
  border: 1px solid #1984ff;
  outline-width: 0;
}

button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

button+button {
  margin-left: 8px;
}
</style>
