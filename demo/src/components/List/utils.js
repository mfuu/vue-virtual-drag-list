export default {
  /**
   * 防抖
   * @param {Function} func callback function
   * @param {Number} delay delay time
   * @param {Boolean} immediate whether to execute immediately
   * @returns function
   */
  debounce(func, delay = 50, immediate = false){
    let timer = null
    let result
    let debounced = function(...args){
      if(timer) clearTimeout(timer)
      if(immediate){
        let callNow = !timer
        timer = setTimeout(()=>{
          timer = null
        }, delay)
        if(callNow) result = func.apply(this, args)
      } else{
        timer = setTimeout(()=>{
          func.apply(this, args)
        }, delay)
      }
      return result
    }
    debounced.cancel = function(){
      clearTimeout(timer)
      timer = null
    }
    return debounced
  },
  /**
   * 找到目标 dom 在数组中的位置
   * @param {Object} e event
   * @param {Object} vm vue实例
   * @param {Object} virtual 父组件 provide
   * @returns 
   */
  getSwitchTarget(e, vm, virtual) {
    const { list, uniqueId } = virtual
    let dataKey, target
    if (vm) {
      target = vm.$el
      dataKey = target.getAttribute('data-key')
    } else {
      // 如果当前拖拽超出了item范围，则不允许拖拽，否则查找dataKey属性
      target = e.target
      dataKey = target.getAttribute('data-key')
      if (!dataKey) {
        const path = e.path || []
        for(let i = 0; i < path.length; i++) {
          target = path[i]
          dataKey = target.getAttribute('data-key')
          if (dataKey || target == document.documentElement) break
        }
      }
    }
    const item = dataKey ? list.find(item => uniqueId(item) == dataKey) : null
    return { target, item }
  },
  /**
   * 设置动画
   * @param {Object} rect getBoundingClientRect()
   * @param {HTMLElement} target DOM
   */
  setAnimate(rect, target) {
    const delay = 300
    if (delay) {
      var cRect = target.getBoundingClientRect()
      if (rect.nodeType === 1) rect = rect.getBoundingClientRect()
      this.setStyle(target, 'transition', 'none')
      this.setStyle(target, 'transform', `translate3d(${rect.left - cRect.left}px, ${rect.top - cRect.top}px, 0)`)
      target.offsetWidth // 触发重绘
      this.setStyle(target, 'transition', `all ${delay}ms`)
      this.setStyle(target, 'transform', 'translate3d(0, 0, 0)')
      clearTimeout(target.animated)
      target.animated = setTimeout(() => {
        this.setStyle(target, 'transition', '')
        this.setStyle(target, 'transform', '')
        target.animated = false
      }, delay)
    }
  },
  /**
   * 为dom添加样式
   * @param {HTMLElement} el 
   * @param {String} prop style name
   * @param {String} val style value
   * @returns 
   */
  setStyle(el, prop, val) {
    const style = el && el.style
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '')
        } else if (el.currentStyle) {
          val = el.currentStyle
        }
        return prop === void 0 ? val : val[prop]
      } else {
        if (!(prop in style)) prop = '-webkit-' + prop
        style[prop] = val + (typeof val === 'string' ? '' : 'px')
      }
    }
  }
}