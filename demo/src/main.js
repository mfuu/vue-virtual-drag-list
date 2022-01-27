import Vue from 'vue'
import App from './App.vue'

// import virtualDragList from 'v-draggable-virtual-list'

// import virtualDragList from './components/dragList.vue'

Vue.config.devtools = false
Vue.config.productionTip = false

// Vue.component('virtualDragList', virtualDragList)
// Vue.use(virtualDragList)

new Vue({
  render: h => h(App),
}).$mount('#app')
