import virtualDragList from './index.vue'

const component = {
  install: function(Vue) {
    Vue.component('virtualDragList', virtualDragList)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(component)
}

export default component