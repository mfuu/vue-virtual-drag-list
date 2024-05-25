# Emits

| **Emit**      | **Description**                               |
| ------------- | --------------------------------------------- |
| `top`         | scrolled to top                               |
| `bottom`      | scrolled to bottom                            |
| `drag`        | drag is started                               |
| `drop`        | drag is completed                             |
| `add`         | element is dropped into the list from another |
| `remove`      | element is removed from the list into another |
| `rangeChange` | triggered when the range changes              |

## Usage

```vue
<template>
  <virtual-list
    v-model="list"
    data-key="id"
    handle=".handle"
    @drop="onDrop"
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

    const onDrop = () => {
      // code here
    };

    return {
      ...toRefs(data),
      onDrop,
    };
  },
};
</script>
```
