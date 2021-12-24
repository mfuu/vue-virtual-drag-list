<template>
  <div id="app">
    <div class="content">
      <!-- <virtual-drag-list class="asdas" /> -->
      <drag-list />
    </div>
  </div>
</template>

<script>
import dragList from './components/dragList.vue'
export default {
  name: 'App',
  components: { dragList }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
}
.content {
  /* height: 500px; */
  height: 100%;
}
</style>
