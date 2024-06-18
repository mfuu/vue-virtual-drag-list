<template>
  <virtual-list
    v-model="list"
    :keeps="15"
    data-key="id"
    handle=".handle"
    class="infinity-list"
    @bottom="bottomLoading"
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
    <template v-slot:footer>
      <div class="footer">
        <div class="loading"></div>
      </div>
    </template>
  </virtual-list>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import { getPageData } from '../public/sentence';
export default {
  setup() {
    const data = reactive({
      list: getPageData(30, 0),
    });

    const bottomLoading = () => {
      setTimeout(() => {
        const index = data.list.length - 1;
        const loadedList = getPageData(10, index);
        data.list.push(...loadedList);
      }, 1000);
    };

    return {
      ...toRefs(data),
      bottomLoading,
    };
  },
};
</script>

<style scoped>
.infinity-list {
  height: 500px;
}

.infinity-list .list-item {
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

.footer {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.loading {
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid #000;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-right-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;

  animation: circle infinite 0.75s linear;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
