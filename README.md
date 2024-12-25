# vue-virtual-draglist

[![npm](https://img.shields.io/npm/v/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-draglist) [![npm](https://img.shields.io/npm/dm/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-draglist) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/) [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

A virtual scrolling list component that can be sorted by dragging

For Vue 3 support, see [here](https://github.com/mfuu/vue3-virtual-drag-list)

### [Live demo](https://mfuu.github.io/vue-virtual-drag-list/)

## Simple usage

```bash
npm i vue-virtual-draglist
```

Root component:

```vue
<template>
  <!--
    :handle="'I'" // use tagName 
    :handle="'.handle'" // use class
    :handle="'#handle'" // use id
  -->
  <virtual-list v-model="list" :data-key="'id'" :handle="'.handle'">
    <template slot="item" slot-scope="{ record, index, dataKey }">
      <div>
        <span class="handle">{{ record.id }}</span>
        <p>{{ record.text }}</p>
      </div>
    </template>
    <template slot="header">
      <div class="header">header</div>
    </template>
    <template slot="footer">
      <div class="footer">footer</div>
    </template>
  </virtual-list>
</template>

<script>
import virtualList from 'vue-virtual-draglist';

export default {
  name: 'root',
  components: { virtualList },
  data () {
    return {
      list: [{ id: '1', text: 'a' }, { id: '2', text: 'b' }, ...];
    }
  },
}
</script>
```

## Emits

| **Emit**      | **Description**    |
| ------------- | ------------------ |
| `top`         | scrolled to top    |
| `bottom`      | scrolled to bottom |
| `drag`        | drag is started    |
| `drop`        | drag is completed  |
| `rangeChange` | range changed      |

## Props

### Required props

| **Prop**   | **Type** | **Description**                                                       |
| ---------- | -------- | --------------------------------------------------------------------- |
| `data-key` | String   | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `v-model`  | Array    | The data that needs to be rendered                                    |

### Optional props

**Commonly used**

| **Prop**       | **Type**                  | **Default** | **Description**                                                                                                   |
| -------------- | ------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `keeps`        | `Number`                  | `30`        | The number of lines rendered by the virtual scroll                                                                |
| `size`         | `Number`                  | `-`         | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `handle`       | `Function/String`         | `-`         | Drag handle selector within list items                                                                            |
| `group`        | `Function/String`         | `-`         | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false/'clone', revertDrag: true/false }`  |
| `direction`    | `vertical \| horizontal`  | `vertical`  | Scroll direction                                                                                                  |
| `scroller`     | `Document \| HTMLElement` | `-`         | Virtual list scrolling element                                                                                    |
| `lockAxis`     | `x \| y`                  | `-`         | Axis on which dragging will be locked                                                                             |
| `tableMode`    | `Boolean`                 | `false`     | display with table and tbody                                                                                      |
| `keepOffset`   | `Boolean`                 | `false`     | When scrolling up to load data, keep the same offset as the previous scroll                                       |
| `debounceTime` | `Number`                  | `0`         | debounce time on scroll                                                                                           |
| `throttleTime` | `Number`                  | `0`         | throttle time on scroll                                                                                           |

**Uncommonly used**

| **Prop**           | **Type**  | **Default**              | **Description**                                              |
| ------------------ | --------- | ------------------------ | ------------------------------------------------------------ |
| `sortable`         | `Boolean` | `true`                   | Whether the current list can be sorted by dragging           |
| `draggable`        | `String`  | `.virtual-dnd-list-item` | Specifies which items inside the element should be draggable |
| `itemClass`        | `String`  | `virtual-dnd-list-item`  | Default list item class                                      |
| `disabled`         | `Boolean` | `false`                  | Disables the sortable if set to true                         |
| `animation`        | `Number`  | `150`                    | Animation speed moving items when sorting                    |
| `autoScroll`       | `Boolean` | `true`                   | Automatic scrolling when moving to the edge of the container |
| `scrollSpeed`      | `Object`  | `{ x: 10, y: 10 }`       | Vertical&Horizontal scrolling speed (px)                     |
| `scrollThreshold`  | `Number`  | `55`                     | Threshold to trigger autoscroll                              |
| `delay`            | `Number`  | `0`                      | Time in milliseconds to define when the sorting should start |
| `delayOnTouchOnly` | `Boolean` | `false`                  | Only delay on press if user is using touch                   |
| `fallbackOnBody`   | `Boolean` | `false`                  | Appends the ghost element into the document's body           |
| `rootTag`          | `String`  | `div`                    | Label type for root element                                  |
| `wrapTag`          | `String`  | `div`                    | Label type for list wrap element                             |
| `wrapClass`        | `String`  | `''`                     | List wrapper element class                                   |
| `wrapStyle`        | `Object`  | `{}`                     | List wrapper element style                                   |
| `ghostClass`       | `String`  | `''`                     | The class of the mask element when dragging                  |
| `ghostStyle`       | `Object`  | `{}`                     | The style of the mask element when dragging                  |
| `chosenClass`      | `String`  | `''`                     | Class name for the chosen item                               |
| `placeholderClass` | `String`  | `''`                     | Class name for the drop placeholder                          |

## Methods

Use <code><a href="https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements">ref</a></code> to get the method inside the component

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
