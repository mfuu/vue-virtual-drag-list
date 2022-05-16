<p>
  <a href="https://npm-stat.com/charts.html?package=vue-virtual-draglist">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/vue-virtual-draglist.svg">
  </a>
  <a href="https://www.npmjs.com/package/vue-virtual-draglist">
    <img alt="Version" src="https://img.shields.io/npm/v/vue-virtual-draglist.svg"/>
  </a>
</p>

A virtual scrolling list component that can be sorted by dragging



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

| **emit** | **Description** |
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

| **Prop**   | **Type** | **Default** | **Description** |
| --------   | -------- | ----------- | --------------- |
| `keeps`    | `Number` | `30`        | The number of lines rendered by the virtual scroll |
| `size`     | `Number` | `50`        | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `direction`| `String` | `vertical`  | `'vertical' || 'horizontal'`, scroll direction |


**Uncommonly used**

|  **Prop**    | **Type**   | **Default** | **Description** |
|  --------    | --------   | ----------- | --------------- |
| `disabled`   | `Boolean`  | `false`     | Disables the sortable if set to true |
| `draggable`  | `Function/String` | `undefined`    | Specifies which items inside the element should be draggable, the function type must return a boolean |
| `dragging`   | `Function` | `undefined` | Specifies the drag element, which must return an HTMLElement: `(e) => e.target` |
| `animation`  | `Number`   | `150`       | Animation delay |
| `delay`      | `Number`   | `10`        | Delay time of debounce function |
| `itemTag`    | `String`   | `div`       | Label type for header slot |
| `headerTag`  | `String`   | `div`       | Label type for header slot |
| `footerTag`  | `String`   | `div`       | Label type for header slot |
| `wrapClass`  | `String`   | ``          | List wrapper element class |
| `wrapStyle`  | `Object`   | `{}`        | List wrapper element style |
| `itemClass`  | `String`   | ``          | List item element class |
| `itemStyle`  | `Object`   | `{}`        | List item element style |
| `ghostClass` | `String`   | ``          | The class of the mask element when dragging |
| `ghostStyle` | `Object`   | `{}`        | The style of the mask element when dragging |
| `chosenClass`| `String`   | ``          | The class of the selected element when dragging |

### Public methods

Use <code><a href="https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements">ref</a></code> to get the method inside the component


| **Method**         | **Description** |
| ------------------ | --------------- |
| `reset()`          | Reset to initial |
| `getSize()`        | Get the height of the current item by unique key value |
| `getOffset()`      | Get the current scroll height |
| `scrollToTop()`    | Scroll to top of list |
| `scrollToIndex()`  | Scroll to the specified index position |
| `scrollToOffset()` | Scroll to the specified height |
| `scrollToBottom()` | Scroll to bottom of list |
