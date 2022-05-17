var THROTTLE_FLAG = true

module.exports = {
  getUniqueId(prefix) {
    return `${prefix}$${Math.random().toString(16).substr(9)}`
  },
  throttle(fn, delay = 300, immediate = true) {
    return function(...args) {
      if (!THROTTLE_FLAG) return
      THROTTLE_FLAG = false
      immediate && fn(...args)
      setTimeout(() => {
        !immediate && fn(...args)
        THROTTLE_FLAG = true
      }, delay)
    }
  },
  debounce(func,wait = 50,immediate = false){
    let timer = null;
    let result;
    let debounced = function(...args){
      if(timer){
          clearTimeout(timer)
      }
      if(immediate){
          let callNow = !timer
          timer = setTimeout(()=>{
              timer = null
          },wait)
          if(callNow){
              result = func.apply(this,args)
          }
      }else{
          timer = setTimeout(()=>{
              func.apply(this,args)
          },wait)
      }
      return result
    }
    debounced.cancel = function(){
        clearTimeout(timer)
        timer = null
    }
    return debounced
  },
  getUniqueValue(target, key, defaultValue = '') {
    return (
      (!Array.isArray(keys) ? keys.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : keys).reduce((o, k) => (o || {})[key], obj) || defaultValue
    )
  }
}