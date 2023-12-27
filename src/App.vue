<template>
  <Header :isHomePage="isHomePage"></Header>
  <Suspense>
    <RouterView />
  </Suspense>
  <!-- <RouterLink to="/demo">Demo</RouterLink> -->
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/common/Header.vue';

const isHomePage = ref(true);
const route = useRoute();

watch(
  () => route.name,
  (value) => {
    if (value === 'home') {
      isHomePage.value = true;
    } else {
      isHomePage.value = false;
    }
  }
);
</script>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
