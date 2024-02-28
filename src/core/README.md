# virtual-dnd-list-core

example usage [vue-virtual-drag-list](https://github.com/mfuu/vue-virtual-drag-list/blob/main/src/index.js) [vue3-virtual-drag-list](https://github.com/mfuu/vue3-virtual-drag-list/blob/master/src/index.tsx)

### Sortbale

```js
import Sortable from './index.js';

let s$ = new Sortable(elem, {
  list: [],
  dataKey: 'data-key',
  onDrag: (params) => {
    let { item, key, index } = params;
    // code
  },
  onDrop: (params) => {
    let { changed, list, item, key, from, to } = params;
    // code
  },
  onAdd: (params) => {
    let { item, key, index } = params;
    // code
  },
  onRemove: (params) => {
    let { item, key, index } = params;
    // code
  },
});

s$.reRendered; // true: remove the dragged element on drop
```

### Virtual
```js
import Virtual from './index.js';

let v$ = new Virtual({
  size: 0,
  keeps: 0,
  buffer: 0,
  wrapper: document.getElementById('wrapper'),
  scroller: document.getElementById('scroller'),
  direction: 'vertical',
  uniqueKeys: [],
  debounceTime: 0,
  throttleTime: 0,
  onScroll: (params) => {
    let { top, bottom, offset, direction } = params;
    // code
  },
  onUpdate: (range) => {
    let { start, end, front, behind } = range;
    // code
  }
})
```
