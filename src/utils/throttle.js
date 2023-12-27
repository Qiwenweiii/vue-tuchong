function throttle1(func, delay) {
  let previous = 0;

  return function (...args) {
    const now = Date.now();
    if (now - previous > delay) {
      func.apply(this, args);
      previous = now;
    }
  };
}

function throttle2(func, delay) {
  let timer,
    previous = 0;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, delay);
    }
  };
}
