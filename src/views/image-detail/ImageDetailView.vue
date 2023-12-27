<template>
  <div class="image-detail__page">
    <ImageDetailContent :imageDetail="imageDetail" v-if="imageDetail" />
  </div>

  <LoadingPage :isLoading="isLoading" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPhoto } from '@/utils/requests';

import ImageDetailContent from './ImageDetailContent.vue';
import LoadingPage from '@/components/common/LoadingPage.vue';

const route = useRoute();
const imageDetail = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    imageDetail.value = await getPhoto(route.query.imageId);
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.image-detail__page {
  width: 1200px;
  margin: 40px auto;
}
</style>
