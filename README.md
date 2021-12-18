可拖拽排序的表格组件（暂不支持拖拽和表格）


## Simple usage

```bash
npm i vue-virtual-draglist -D
```

Root component:
```vue
<template>
  <div>
    <virtual-drag-list
      :data-key="'uid'"
      :data-source="list"
    >
      <template #item="{ record, index, dataKey }">
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
        list: [{id: '1', text: 'asd'}, {uid: '2', text: 'fgh'}, ...]
      }
    },
    components: { virtualDragList }
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
      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
