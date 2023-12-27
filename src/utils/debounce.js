function debounce(func, delay, immediate = false) {
  let timer;

  // 返回一个函数作为事件处理程序
  return function (...args) {
    // 这个函数里面的 this 和 event 都是正确的

    if (timer) clearTimeout(timer);

    if (immediate) {
      // timer 为 falsy 时可以执行 func
      const callNow = !timer;

      // 经过 delay 后将 timer 设置为 null
      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) func.call(this, ...args);
    } else {
      timer = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    }
  };
}

function simple_debounce(func, delay) {
  let timer;

  return function (...args) {
    // 等待期间如果再次触发事件则清除定时器
    clearTimeout(timer);

    // delay 时间内没有清除定时器就会执行 func
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export { simple_debounce as debounce };
