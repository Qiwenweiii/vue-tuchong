import { useIntersectionObserver } from '@vueuse/core';

// 如果有参数 back，则代表是设置背景图片，否则就是设置 img 元素的 src
export const imgLazy = {
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (binding.arg === 'back') {
          el.style.backgroundImage = `url(${binding.value})`;
        } else {
          el.src = binding.value;
        }
        stop();
      }
    });
  },
};
