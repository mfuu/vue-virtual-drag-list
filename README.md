<p>
  <a href="https://npm-stat.com/charts.html?package=vue-virtual-draglist">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/vue-virtual-draglist.svg">
  </a>
  <a href="https://www.npmjs.com/package/vue-virtual-draglist">
    <img alt="Version" src="https://img.shields.io/npm/v/vue-virtual-draglist.svg"/>
  </a>
</p>

A virtual scrolling list component that can be sorted by dragging

### [demo](https://mfuu.github.io/vue-virtual-drag-list/)

## Simple usage

```bash
npm i vue-virtual-draglist -D
```

Root component:
```vue
<template>
  <div>
    <virtual-drag-list
      :data-key="'id'"
      :data-source="list"
      :draggable="'.drag'"
      style="height: 500px"
      @top="handleToTop"
      @bottom="handleToBottom"
      @ondragend="ondragend"
    >
      <template slot="item" slot-scope="{ record, index, dataKey }">
        <span class="drag">{{ record.id }}</span>
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
    data () {
      return {
        list: [{id: '1', text: 'asd'}, {id: '2', text: 'fgh'}, ...]
      }
    },
    components: { virtualDragList },
    methods: {
      handleToTop() {
        ...
      },
      handleToBottom() {
        ...
      },
      ondragend(list, from, to, changed) {
        console.log(list, from, to, changed)
      }
    }
  }
</script>
```
## Emits

| **Emit** | **Description** |
|-------------|--------------|
| `top`       | event fired when scroll to top |
| `bottom`    | event fired when scroll to bottom |
| `ondragend` | event fired when the drag is complete |

## Props type

### Required props

| **Prop** | **Type**  | **Description** |
|------------------|-------------|------------------|
| `data-key`       | String      | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `data-source`    | Array       | data list  |

### Optional props

**Commonly used**

|   **Prop**   |  **Type**  | **Default** | **Description** |
| ------------ | ---------  | ----------- | --------------- |
| `keeps`      | `Number`   | `30`        | The number of lines rendered by the virtual scroll |
| `size`       | `Number`   | `50`        | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `direction`  | `String`   | `vertical`  | `vertical/horizontal`, scroll direction |
| `draggable`  | `Function/String` | `-`  | Specifies which items inside the element should be draggable, the function type must return a boolean |
| `animation`  | `Number`   | `150`       | Animation time |
| `autoScroll` | `Boolean`  | `true`      | Automatic scrolling when moving to the edge of the container, **for browsers that do not support HTML5 drag events** |
| `scrollStep` | `Number`   | `5`         | The distance to scroll each frame when autoscrolling |
| `scrollThreshold` | `Number` | `15`     | Threshold to trigger autoscroll |


**Uncommonly used**

|  **Prop**    | **Type**   | **Default** | **Description** |
|  --------    | --------   | ----------- | --------------- |
| `disabled`   | `Boolean`  | `false`     | Disables the sortable if set to true |
| `dragging`   | `Function` | `-`         | Specifies the drag element, which must return an HTMLElement: `(e) => e.target` |
| `delay`      | `Number`   | `10`        | Delay time of debounce function |
| `rootTag`    | `String`   | `div`       | Label type for root element |
| `wrapTag`    | `String`   | `div`       | Label type for list wrap element |
| `itemTag`    | `String`   | `div`       | Label type for list item element |
| `headerTag`  | `String`   | `div`       | Label type for header slot element |
| `footerTag`  | `String`   | `div`       | Label type for footer slot element |
| `wrapClass`  | `String`   | `''`        | List wrapper element class |
| `wrapStyle`  | `Object`   | `{}`        | List wrapper element style |
| `itemClass`  | `String`   | `''`        | List item element class |
| `itemStyle`  | `Object`   | `{}`        | List item element style |
| `ghostClass` | `String`   | `''`        | The class of the mask element when dragging |
| `ghostStyle` | `Object`   | `{}`        | The style of the mask element when dragging |
| `chosenClass`| `String`   | `''`        | The class of the selected element when dragging |

### Public methods

Use <code><a href="https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements">ref</a></code> to get the method inside the component


| **Method**         | **Description** |
| ------------------ | --------------- |
| `reset()`          | Reset to initial |
| `getSize(key)`     | Get the size of the current item by unique key value |
| `getOffset()`      | Get the current scroll height |
| `scrollToTop()`    | Scroll to top of list |
| `scrollToBottom()` | Scroll to bottom of list |
| `scrollToIndex(index)`  | Scroll to the specified index position |
| `scrollToOffset(offset)` | Scroll to the specified offset |
