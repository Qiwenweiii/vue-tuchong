<template>
  <div class="box"></div>
  <img v-img-lazy="imgDesc" title="未加载的图片" />
  <div class="img-box" v-img-lazy:back="imgDesc" />
  <!-- <img ref="image" data-src="//cdn9-banquan.ituchong.com/weili/image/ml/1867378448071262232.webp" alt="" /> -->
</template>

<script setup>
import { ref } from 'vue';
// import { useIntersectionObserver } from '@vueuse/core';

const imgDesc = ref({ src: '//cdn9-banquan.ituchong.com/weili/image/ml/1867378448071262232.webp', title: '123' });

// const image = ref(null);

// const { stop } = useIntersectionObserver(image, ([{ isIntersecting }], observerElement) => {
//   console.log(isIntersecting);
//   if (isIntersecting) {
//     image.value.src = image.value.dataset.src;
//     image.value.removeAttribute('data-img-src');
//     stop();
//   }
// });
</script>

<style lang="scss" scoped>
.box {
  margin: 50px;
  padding: 20px;
  width: 700px;
  height: 300vh;
  background-color: rgba(34, 34, 34, 0.95);
  display: flex;
  justify-content: space-around;
}

.img-box {
  width: 300px;
  height: 200px;
  background-size: cover;
}
</style>
