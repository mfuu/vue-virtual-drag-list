# vue-virtual-draglist

[![npm](https://img.shields.io/npm/v/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-draglist)  [![npm](https://img.shields.io/npm/dm/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-draglist)  [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

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
  <div>
    <!--
      :handle="'I'" // use tagName 
      :handle="'.handle'" // use class
      :handle="'#handle'" // use id
      :data-source="list" // or replace with `v-model`
    -->
    <virtual-drag-list
      v-model="list"
      :data-key="'id'"
      :handle="'.handle'"
      @top="handleToTop"
      @bottom="handleToBottom"
      @drag="onDrag"
      @drop="onDrop"
      @add="onAdd"
      @remove="onRemove"
    >
      <template slot="item" slot-scope="{ record, index, dataKey }">
        <i class="handle">{{ record.id }}</span>
        {{ record.text }}
      </template>
      <template slot="header">
        <div class="loading">top loading...</div>
      </template>
      <template slot="footer">
        <div class="loading">bottom loading...</div>
      </template>
    </virtual-drag-list>
  </div>
</template>

<script>
  import virtualDragList from 'vue-virtual-draglist'

  export default {
    name: 'root',
    components: { virtualDragList },
    data () {
      return {
        list: [{id: '1', text: 'asd'}, {id: '2', text: 'fgh'}, ...]
      }
    },
    methods: {
      handleToTop() {
        // code here
      },
      handleToBottom() {
        // code here
      },
      onDrag({ item, key, index }) {
        // code here
      },
      onDrop({ list, from, to, changed }) {
        // code here
      },
      onAdd({ item, key, index }) {
        // code here
      },
      onRemove({ item, key, index }) {
        // code here
      }
    }
  }
</script>
```
## Emits

|   **Emit**   | **Description** |
|--------------|-----------------|
| `top`        | Event fired when scroll to top |
| `bottom`     | Event fired when scroll to bottom |
| `drag`       | Event fired when the drag is started |
| `drop`       | Event fired when the drag is completed |
| `add`        | Event fired when element is dropped into the list from another |
| `remove`     | Event fired when element is removed from the list into another |

## Props

### Required props

| **Prop** | **Type**  | **Description** |
|------------------|-------------|------------------|
| `data-key`       | String      | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `data-source`    | Array       | The data that needs to be rendered  |

### Optional props

**Commonly used**

|   **Prop**   |  **Type**  | **Default** | **Description** |
| ------------ | ---------  | ----------- | --------------- |
| `keeps`      | `Number`   | `30`        | The number of lines rendered by the virtual scroll |
| `size`       | `Number`   | `-`         | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `handle`     | `Function/String` | `-`  | Drag handle selector within list items |
| `group`      | `Function/String` | `-`  | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false/'clone', revertDrag: true/false }` |
| `keepOffset` | `Boolean`  | `false`     | When scrolling up to load data, keep the same offset as the previous scroll |
| `direction`  | `String`   | `vertical`  | `vertical/horizontal`, scroll direction |
| `scroller`   | `HTMLElement`  | `-`     | Virtual list scrolling element |
| `debounceTime`      | `Number`   | `0`         | debounce time on scroll |
| `throttleTime`      | `Number`   | `0`         | throttle time on scroll |


**Uncommonly used**

|  **Prop**    | **Type**   | **Default** | **Description** |
|  --------    | --------   | ----------- | --------------- |
| `draggable`  | `String` | `-`  | Specifies which items inside the element should be draggable. If does not set a value, the default list element can be dragged |
| `disabled`   | `Boolean`  | `false`     | Disables the sortable if set to true |
| `animation`  | `Number`   | `150`       | Animation speed moving items when sorting |
| `autoScroll` | `Boolean`  | `true`      | Automatic scrolling when moving to the edge of the container |
| `scrollThreshold` | `Number` | `55`     | Threshold to trigger autoscroll |
| `delay` | `Number`   | `0`         | Time in milliseconds to define when the sorting should start |
| `delayOnTouchOnly` | `Boolean`   | `false`         | Only delay on press if user is using touch |
| `fallbackOnBody` | `Boolean` | `false`  | Appends the ghost element into the document's body |
| `rootTag`    | `String`   | `div`       | Label type for root element |
| `wrapTag`    | `String`   | `div`       | Label type for list wrap element |
| `itemTag`    | `String`   | `div`       | Label type for list item element |
| `headerTag`  | `String`   | `div`       | Label type for header slot element |
| `headerStyle`| `Object`   | `{}`        | Header slot element style |
| `footerTag`  | `String`   | `div`       | Label type for footer slot element |
| `footerStyle`| `Object`   | `{}`        | Footer slot element style |
| `wrapClass`  | `String`   | `''`        | List wrapper element class |
| `wrapStyle`  | `Object`   | `{}`        | List wrapper element style |
| `itemClass`  | `String`   | `''`        | List item element class |
| `itemStyle`  | `Object`   | `{}`        | List item element style |
| `ghostClass` | `String`   | `''`        | The class of the mask element when dragging |
| `ghostStyle` | `Object`   | `{}`        | The style of the mask element when dragging |
| `chosenClass`| `String`   | `''`        | The class of the selected element when dragging |

## Methods

Use <code><a href="https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements">ref</a></code> to get the method inside the component


| **Method**         | **Description** |
| ------------------ | --------------- |
| `getSize(key)`     | Get the size of the current item by unique key value |
| `getOffset()`      | Get the current scroll height |
| `getClientSize()`  | Get wrapper element client viewport size (width or height) |
| `getScrollSize()`  | Get all scroll size (scrollHeight or scrollWidth) |
| `scrollToTop()`    | Scroll to top of list |
| `scrollToBottom()` | Scroll to bottom of list |
| `scrollToKey(key)`  | Scroll to the specified data-key position |
| `scrollToIndex(index)`  | Scroll to the specified index position |
| `scrollToOffset(offset)` | Scroll to the specified offset |
