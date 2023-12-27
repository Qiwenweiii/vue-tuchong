<template>
  <img :src="imageSrc" class="image-preview__small" v-if="imageSrc" ref="bigImage" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Logo from '@/assets/logo.png';

const props = defineProps({
  imageDetail: {
    type: Object,
    required: true,
  },
});

const imageSrc = ref('');
const bigImage = ref(null);

onMounted(() => {
  let logo = new Image();
  logo.src = Logo;

  let img = new Image();
  img.setAttribute('crossOrigin', '*'); // 没有这一行会报错，跨域引起的错误
  img.src = props.imageDetail.urls.regular;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let topStart = img.height * 0.9;
    const ratio = img.width / img.height;
    if (ratio > 1) {
      topStart = img.height * 0.75;
    }

    ctx.fillStyle = 'rgba(30, 30, 30, 0.4)';
    ctx.fillRect(0, topStart, 300, 100);

    ctx.globalAlpha = 0.6;
    ctx.drawImage(
      logo,
      0,
      0,
      logo.width,
      logo.height - 70,
      40,
      topStart + 10,
      200,
      (logo.height - 70) * (200 / logo.width)
    );

    ctx.globalAlpha = 1;
    ctx.font = '24px Arial';
    ctx.fillStyle = 'rgba(255,255,255,.6)';
    ctx.fillText(`ID: ${props.imageDetail.id}`, 45, topStart + 80);

    imageSrc.value = canvas.toDataURL('image/webp');

    img = null;
  };
});
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
}
</style>
