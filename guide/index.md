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

## Simple Usage

```vue
<template>
  <virtual-list
    v-model="list"
    data-key="id"
  >
    <template v-slot:item="{ record, index, dataKey }">
      item slot content
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
      list: [{ id: 'a', text: 'a', id: 'b', text: 'b' }],
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>
```
