# Methods

## `getSize(key: string)`

Get the size of the current item by unique key value

## `getOffset()`

Get the current scroll height

## `getClientSize()`

Get wrapper element client viewport size (width or height)

## `getScrollSize()`

Get all scroll size (scrollHeight or scrollWidth)

## `scrollToTop()`

Scroll to top of list

## `scrollToBottom()`

Scroll to bottom of list

## `scrollToKey(key: string)`

Scroll to the specified `data-key` position

## `scrollToIndex(index: number)`

Scroll to the specified `index` position

## `scrollToOffset(offset: number)`

Scroll to the specified offset

## Example Usage

```vue
<template>
  <button @click="scrollToIndex">scroll To Index</button>

  <virtual-list
    ref="virtualRef"
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
import { ref, reactive, toRefs } from 'vue';
export default {
  components: {
    virtualList
  },
  setup() {
    const virtualRef = ref(null);

    const data = reactive({
      list: [{ id: 'a', text: 'a', id: 'b', text: 'b' }],
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
