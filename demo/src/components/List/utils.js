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
  }
}