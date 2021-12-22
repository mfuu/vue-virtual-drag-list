可拖拽排序的虚拟滚动列表组件


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
      @ondragend="ondragend"
    >
      <template #item="{ record, index, dataKey }">
        <span draggable="true">{{ record.id }}</span>
        {{ record.text }}
      </template>
      <template slot="header"></template>
      <template slot="footer"></template>
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
      ondragend(list) {
        console.log(list)
      }
    }
  }
</script>
```


## Props type

### Required props

| **Prop** | **Type**  | **Description** |
|------------------|------------------|------------------|
| `data-key`       | String | 每一条数据的唯一标识 |
| `data-source`   | Array    | 数据源 |

### Optional props

<details open>
  <summary><strong>Commonly used</strong></summary>
  <p></p>
  <table>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>keeps</code></td>
      <td>Number</td>
      <td>30</td>
      <td>虚拟滚动展示的数据量</td>
    </tr>
    <tr>
      <td><code>size</code></td>
      <td>Number</td>
      <td>50</td>
      <td>每一条数据的预估高度，可选择传或不传，会自动计算</td>
    </tr>
    <tr>
      <td><code>draggable</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td>默认可拖拽，需要手动指定拖拽元素，设置draggable="true"</td>
    </tr>
  </table>
</details>

<details open>
  <summary><strong>Uncommonly used</strong></summary>
  <p></p>
  <table>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>headerTag</code></td>
      <td>String</td>
      <td>div</td>
      <td>顶部插槽的标签类型</td>
    </tr>
    <tr>
      <td><code>footerTag</code></td>
      <td>String</td>
      <td>div</td>
      <td>底部插槽的标签类型</td>
    </tr>
    <tr>
      <td><code>itemTag</code></td>
      <td>String</td>
      <td>div</td>
      <td>item的标签类型</td>
    </tr>
    <tr>
      <td><code>itemStyle</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>item样式</td>
    </tr>
    <tr>
      <td><code>itemClass</code></td>
      <td>String</td>
      <td>''</td>
      <td>item类名</td>
    </tr>
    <tr>
      <td><code>draggable</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td>是否可拖拽</td>
    </tr>
    <tr>
      <td><code>dragStyle</code></td>
      <td>Object</td>
      <td><code>{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)' }</code></td>
      <td>item样式</td>
    </tr>
  </table>
</details>

### Public methods

<details open>
  <summary><strong>Usefull public methods</strong></summary>
  <p></p>
  <p>使用 <code><a href="https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements">ref</a></code> 去获取组件内部的方法</p>
  <table>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>scrollToBottom()</code></td>
      <td>滚动到底部</td>
    </tr>
    <tr>
      <td><code>scrollToIndex(index)</code></td>
      <td>滚动到指定index值位置</td>
    </tr>
    <tr>
      <td><code>scrollToOffset(offset)</code></td>
      <td>滚动到指定高度</td>
    </tr>
  </table>
</details>
