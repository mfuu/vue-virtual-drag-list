import Vue from "vue"

Vue.directive('virtual', {
  bind(el, binding, vnode) {
    console.log(el, binding, vnode)
    document.addEventListener('scroll', (e) => {
      console.log(e)
    })
  }
})