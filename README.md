# vue-virtual-draglist

[![npm](https://img.shields.io/npm/v/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-draglist)  [![npm](https://img.shields.io/npm/dt/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-collection)  [![vue2](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

A virtual scrolling list component that can be sorted by dragging, for vue3

### [Live demo](https://mfuu.github.io/vue-virtual-drag-list/)

## Simple usage

```bash
npm i vue-virtual-draglist -D
```

Root component:
```vue

```
## Emits

|   **Emit**   | **Description** |
|--------------|-----------------|
| `top`        | Event fired when scroll to top |
| `bottom`     | Event fired when scroll to bottom |
| `ondragstart`| Event fired when the drag is started |
| `ondragend`  | Event fired when the drag is completed |

## Props

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
| `size`       | `Number`   | `-`         | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `direction`  | `String`   | `vertical`  | `vertical/horizontal`, scroll direction |
| `draggable`  | `Function/String` | `-`  | Specifies which items inside the element should be draggable, the function type must return a boolean |
| `animation`  | `Number`   | `150`       | Animation speed moving items when sorting |
| `keepOffset` | `Boolean`  | `false`     | When scrolling up to load data, keep the same offset as the previous scroll |
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

## Methods

| **Method**         | **Description** |
| ------------------ | --------------- |
| `reset()`          | Reset to initial |
| `getSize(key)`     | Get the size of the current item by unique key value |
| `getOffset()`      | Get the current scroll height |
| `scrollToTop()`    | Scroll to top of list |
| `scrollToBottom()` | Scroll to bottom of list |
| `scrollToIndex(index)`  | Scroll to the specified index position |
| `scrollToOffset(offset)` | Scroll to the specified offset |

## License

[MIT License.](https://github.com/mfuu/vue-virtual-drag-list/blob/main/LICENSE)
