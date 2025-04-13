# Getting Started

## Installation

```sh [npm]
$ npm i vue-virtual-sortable
```

```sh [yarn]
$ yarn add vue-virtual-sortable
```

## Simple Usage

```vue
<template>
  <virtual-list
    v-model="list"
    data-key="id"
  >
    <template slot="item" slot-scope="{ record, index, dataKey }">
      <!-- content -->
    </template>
  </virtual-list>
</template>

<script>
import virtualList from 'vue-virtual-sortable';
import { reactive, toRefs } from 'vue';
export default {
  components: {
    virtualList
  },
  data() {
    return {
      list: [{ id: 'a', text: 'a', id: 'b', text: 'b' }],
    }
  },
};
</script>
```
