import Vue from "vue"

Vue.directive('virtual', {
  bind(el, binding, vnode) {
    console.log(el, binding, vnode)
    // document.addEventListener('scroll', (e) => {
    //   console.log(e)
    // })
    // vnode.context.dataSource = vnode.context.dataSource.slice(0, 10)
    el.addEventListener('scroll', () => {
      console.log('-----')
    })
  }
})