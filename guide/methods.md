# Methods

| **Method**               | **Description**                                            |
| ------------------------ | ---------------------------------------------------------- |
| `getSize(key)`           | Get the size of the current item by unique key value       |
| `getOffset()`            | Get the current scroll height                              |
| `getClientSize()`        | Get wrapper element client viewport size (width or height) |
| `getScrollSize()`        | Get all scroll size (scrollHeight or scrollWidth)          |
| `scrollToTop()`          | Scroll to top of list                                      |
| `scrollToBottom()`       | Scroll to bottom of list                                   |
| `scrollToKey(key)`       | Scroll to the specified data-key position                  |
| `scrollToIndex(index)`   | Scroll to the specified index position                     |
| `scrollToOffset(offset)` | Scroll to the specified offset                             |

## Usage

```vue
<template>
  <button @click="scrollToIndex">scroll To Index</button>

  <virtual-list
    ref="virtualRef"
    v-model="list"
    :data-key="'id'"
    :handle="'.handle'"
  >
    <template slot="item" slot-scope="{ record, index, dataKey }">
      <div class="list-item">
        <span class="handle">{{ record.id }}</span>
        {{ record.text }}
      </div>
    </template>
  </virtual-list>
</template>

<script>
import virtualList from 'vue-virtual-draglist';
import { ref, reactive, toRefs } from 'vue';
export default {
  components: {
    virtualList
  },
  setup() {
    const virtualRef = ref(null);

    const data = reactive({
      list: getPageData(30, 0),
    });

    const scrollToIndex = () => {
      virtualRef.value.scrollToIndex(0);
    }

    return {
      ...toRefs(data),
      virtualRef,
      scrollToIndex
    };
  },
};
```
