<template>
  <div class="content-container">
    <FilterList />
    <div class="images-list-container">
      <div class="lists-container" ref="listContainer">
        <template v-if="imagesList.length">
          <div class="list-info">
            <div class="search-result__info">
              <div class="title">搜索结果</div>
              <div class="desc">
                <div>
                  搜索到 <span class="count">{{ images.total }}+</span> 个素材
                </div>
                <div class="related">
                  相关搜索：
                  <a href="#">雪原风光</a>
                  <a href="#">冬日的人家</a>
                </div>
              </div>
            </div>
            <div class="sort-by">
              <div
                class="active-block"
                :style="{ transform: `translate(calc((100% + 4px) * ${currentSort}))` }"></div>
              <span class="popular" :class="{ active: isPopular }" @click="() => (currentSort = 0)"
                >热门</span
              >
              <span class="latest" :class="{ active: !isPopular }" @click="() => (currentSort = 1)"
                >最新</span
              >
            </div>
          </div>
          <section class="images-container" :style="listHeight">
            <ImageCard
              class="list-item"
              v-for="(image, index) in imagesList"
              :key="image.id"
              :image="image"
              :imagePos="layoutGeometry.boxes[index]" />
          </section>
          <Pagination :page-size="imagesList.length" :total="images.total" />
        </template>
      </div>
    </div>
  </div>
  <LoadingPage :isLoading="isLoading" />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import _ from 'lodash';
import { searchPhotos } from '@/utils/requests';
import { useLayoutGeometry } from '@/composables/useLayoutGeometry';
import FilterList from './FilterList.vue';
import ImageCard from './ImageCard.vue';
import Pagination from '@/components/elements/Pagination.vue';
import LoadingPage from '@/components/common/LoadingPage.vue';

const route = useRoute();

const listContainer = ref(null);
const images = ref(null);
const imagesList = ref([]);
const targetHeight = ref(270);
const containerWidth = ref(null);
const currentPage = ref(1);
const currentSort = ref(0);
const layoutGeometry = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  currentPage.value = +(route.query.page ?? 1);

  containerWidth.value = listContainer.value.getBoundingClientRect().width;
  window.addEventListener('resize', _.debounce(resize, 300));
  // window.addEventListener('resize', resize);
  await loadImages();
});

// 组件内导航守卫，阻止离开当前页面
// onBeforeRouteLeave((to, from) => {
//   console.log('beforeRouteLeave', to, from);

//   if ((to.name = 'imageDetail')) return false;
// });

const isPopular = computed(() => currentSort.value === 0);
const listHeight = computed(() => `height:${layoutGeometry.value.containerHeight}px`);

watch(containerWidth, (value) => {
  if (value <= 1200) {
    targetHeight.value = 150;
  } else {
    targetHeight.value = 270;
  }

  getGeometry();
});

watch(
  () => route.query,
  async () => {
    currentPage.value = +route.query.page;
    await loadImages();
  }
);

async function loadImages() {
  isLoading.value = true;

  try {
    let getImaegs = [];
    const startIndex = (currentPage.value - 1) * 3 + 1;
    for (let i = startIndex; i <= currentPage.value * 3; i++) {
      getImaegs.push(
        searchPhotos({ query: route.query.keyword, per_page: 30, page: i, lang: 'zh-Hans' })
      );
    }

    const res = await Promise.all(getImaegs);
    images.value = {};
    for (let item of res) {
      for (let key in item) {
        if (key === 'results' && images.value[key] && images.value[key].length !== 0) {
          images.value[key] = [...images.value[key], ...item[key]];
        } else {
          images.value[key] = item[key];
        }
      }
    }

    setTimeout(() => {
      images.value.total_pages = Math.ceil(images.value.total / images.value.results.length);
      imagesList.value = images.value.results;
      isLoading.value = false;

      getGeometry();
    }, 800);
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
}

function getGeometry() {
  layoutGeometry.value = useLayoutGeometry(
    imagesList.value,
    containerWidth.value,
    targetHeight.value
  );
}

function resize() {
  containerWidth.value = listContainer.value.getBoundingClientRect().width;
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  .images-list-container {
    .lists-container {
      min-width: 1200px;
      margin: 60px 40px 0 40px;

      .list-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 45px;
        margin-bottom: 5px;
        color: #666;
        font-size: 14px;

        .search-result__info {
          .title {
            font-size: 16px;
            color: #222;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .desc {
            display: flex;
            gap: 32px;
            font-size: 12px;

            span.count {
              color: var(--color-primary);
            }

            .related {
              display: flex;
              gap: 5px;

              a {
                padding: 0 4px;
                background-color: #f2f2f2;
                border-radius: 2px;
              }
            }
          }
        }

        .sort-by {
          padding: 4px;
          background-color: #f6f6f6;
          display: flex;
          gap: 4px;
          position: relative;

          .active-block {
            position: absolute;
            background-color: #fff;
            width: 52px;
            height: 26px;
            border-radius: 4px;
            z-index: 0;
            transition: all 0.2s ease-in-out;

            &.move {
              transform: translateX(calc(100% + 4px));
            }
          }

          span {
            position: relative;
            width: 52px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &.active {
              color: var(--color-primary);
            }

            &:hover {
              color: var(--color-primary);
            }
          }
        }
      }

      .images-container {
        position: relative;
      }
    }
  }
}
</style>
