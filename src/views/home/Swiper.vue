<template>
  <div class="swiper-container">
    <el-carousel :height="`${maxHeiht}px`">
      <el-carousel-item v-for="image in imagesList" :key="image.id">
        <a class="image-link" href="#" :style="{ backgroundImage: ` url(${image.urls.full})` }"></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPhotos } from '@/utils/requests';

const maxHeiht = ref(500);
const imagesList = ref(null);

try {
  imagesList.value = await getPhotos({ count: 8 });
} catch (error) {
  console.log(error);
}
</script>

<style lang="scss">
.swiper-container {
  min-height: 500px;
  background-color: #f5f5f5;

  .el-carousel__item a.image-link {
    color: #fff;
    opacity: 0.75;
    line-height: 300px;
    text-align: center;
    font-size: 10em;
    display: block;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-carousel__indicators {
    bottom: 143px;

    .el-carousel__button {
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #fff;
      opacity: 0.9;
    }

    .el-carousel__indicator.is-active .el-carousel__button {
      width: 23px;
      background-color: var(--color-primary);
    }
  }
}
</style>
