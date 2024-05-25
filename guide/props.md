# Props

## Required props

| **Prop**   | **Type**        | **Description**                                                       |
| ---------- | --------------- | --------------------------------------------------------------------- |
| `data-key` | `String`        | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `v-model`  | `Array  \| Ref` | The data that needs to be rendered                                    |

## Optional props

**Commonly used**

| **Prop**       | **Type**                  | **Default** | **Description**                                                                                                   |
| -------------- | ------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `keeps`        | `Number`                  | `30`        | The number of lines rendered by the virtual scroll                                                                |
| `size`         | `Number`                  | `-`         | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `handle`       | `Function/String`         | `-`         | Drag handle selector within list items                                                                            |
| `group`        | `Function/String`         | `-`         | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false/'clone', revertDrag: true/false }`  |
| `keepOffset`   | `Boolean`                 | `false`     | When scrolling up to load data, keep the same offset as the previous scroll                                       |
| `direction`    | `vertical \| horizontal`  | `vertical`  | Scroll direction                                                                                                  |
| `scroller`     | `Document \| HTMLElement` | `-`         | Virtual list scrolling element                                                                                    |
| `lockAxis`     | `x \| y`                  | `-`         | Axis on which dragging will be locked                                                                             |
| `debounceTime` | `Number`                  | `0`         | debounce time on scroll                                                                                           |
| `throttleTime` | `Number`                  | `0`         | throttle time on scroll                                                                                           |

**Uncommonly used**

| **Prop**           | **Type**  | **Default**              | **Description**                                              |
| ------------------ | --------- | ------------------------ | ------------------------------------------------------------ |
| `sortable`         | `Boolean` | `true`                   | Whether the current list can be sorted by dragging           |
| `draggable`        | `String`  | `.virtual-dnd-list-item` | Specifies which items inside the element should be draggable |
| `disabled`         | `Boolean` | `false`                  | Disables the sortable if set to true                         |
| `animation`        | `Number`  | `150`                    | Animation speed moving items when sorting                    |
| `autoScroll`       | `Boolean` | `true`                   | Automatic scrolling when moving to the edge of the container |
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
