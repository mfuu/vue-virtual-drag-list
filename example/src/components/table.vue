<template>
  <div class="virtual-list-table">
    <template v-for="item in dataSource">
      <div :key="item.id" class="list-items">
        {{ item.desc }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'virtual-list-table',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.virtual-list-table {
  height: 100%;
}
.list-items {
  padding: 16px;
}
</style>