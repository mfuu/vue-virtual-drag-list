# Getting Started

## Installation

::: code-group

```sh [npm]
$ npm i vue-virtual-draglist
```

```sh [yarn]
$ yarn add vue-virtual-draglist
```

:::

## Usage

```vue
<template>
  <virtual-list
    v-model="list"
    :data-key="'id'"
    :handle="'.handle'"
  >
    <template v-slot:item="{ record, index, dataKey }">
      <div class="list-item">
        <span class="handle">{{ record.id }}</span>
        {{ record.text }}
      </div>
    </template>
  </virtual-list>
</template>

<script>
import virtualList from 'vue-virtual-draglist';
import { reactive, toRefs } from 'vue';
export default {
  components: {
    virtualList
  },
  setup() {
    const data = reactive({
      list: getPageData(30, 0),
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>
```
