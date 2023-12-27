<template>
  <Suspense>
    <div class="content">
      <Swiper class="swiper-container"></Swiper>
      <div class="layout-content">
        <Search class="search-bar__home" />
        <h1>Home Page</h1>
      </div>
    </div>
  </Suspense>
</template>

<script setup>
import Search from '../../components/common/Search.vue';
import Swiper from './Swiper.vue';
</script>

<style lang="scss" scoped>
.content {
  height: 300vh;

  .layout-content {
    position: relative;
    background-image: linear-gradient(1.18deg, #fff 84.68%, hsla(0, 0%, 100%, 0.92) 99.07%);
    background-position: top;
    background-size: 100% 487px;
    height: 100%;
    border-radius: 100px;
    margin-top: -100px;
    z-index: 1;

    .search-bar__home {
      position: relative;
      top: -34px;
    }
  }
}
</style>
