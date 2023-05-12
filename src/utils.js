export function debounce(func, delay = 50, immediate = false) {
  let timer = null;
  let result;
  let debounced = function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) result = func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

export function throttle(fn, delay) {
  let timer = null;
  return function () {
    const context = this,
      args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(context, args);
      }, delay);
    }
  };
}

export function getDataKey(item, dataKey) {
  return (
    !Array.isArray(dataKey)
      ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
      : dataKey
  ).reduce((o, k) => (o || {})[k], item);
}
