<template>
  <div class="common-search">
    <div class="search-bar" :class="{ small: notHomePage }">
      <div class="search-platform__select" :class="{ 'arrow-up': isArrowUp }">
        <el-popover
          popper-class="search-popper"
          :width="130"
          :show-arrow="false"
          @before-enter="handleArrowUp"
          @before-leave="handleArrowDown">
          <template #reference>
            <span class="select">
              图片
              <span class="arrow">
                <i class="iconfont icon-arrow"></i>
              </span>
            </span>
          </template>
          <div class="option">图片</div>
          <div class="option">视频</div>
          <div class="option">音乐</div>
        </el-popover>
      </div>
      <span class="search-split">|</span>
      <div class="search-input__inner">
        <span class="search-rabbit" v-if="!notHomePage">
          <img src="@/assets/rabbit.svg" alt="" />
        </span>
        <input
          type="text"
          placeholder="尝试输入画面描述，如：“卡通机器人”"
          v-model="searchQuery"
          @keyup.enter="searchImage" />
      </div>
      <div class="search-input__icons">
        <span class="icon"><i class="iconfont icon-camera"></i></span>
        <span class="icon" @click="searchImage"><i class="iconfont icon-search"></i></span>
      </div>
    </div>
    <div class="search-keywords" v-if="!notHomePage">
      热门搜索：
      <span class="keyword" v-for="i in 9" @click="hotSearch(`秋天${i}`)">秋天{{ i }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useQueryStore } from '@/stores/routerQuery';

const route = useRoute();
const router = useRouter();
const notHomePage = ref(true);
const isArrowUp = ref(false);
const searchQuery = ref('');

const queryStore = useQueryStore();
const { queryObj } = storeToRefs(queryStore);
const { setQuery } = queryStore;

onMounted(() => {
  if (route.name === 'home') {
    notHomePage.value = false;
  }
});

const handleArrowUp = () => {
  isArrowUp.value = true;
};
const handleArrowDown = () => {
  isArrowUp.value = false;
};

watchEffect(() => {
  if (route.query.keyword) {
    searchQuery.value = route.query.keyword;
  }
});

const searchImage = () => {
  setQuery('keyword', searchQuery.value);
  setQuery('page', 1);
  router.push({ name: 'search', query: queryObj.value });
};

const hotSearch = (keyword) => {
  searchQuery.value = keyword;
  searchImage();
};
</script>

<style lang="scss" scoped>
.common-search {
  max-width: 800px;
  margin: 0 auto;
  backdrop-filter: blur(8px);

  .search-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 68px;
    font-size: 18px;
    padding-right: 32px;
    background-color: hsla(0, 0%, 100%, 0.92);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);

    &.small {
      height: 48px;
      font-size: 16px;
      border: 1px solid #e6e6e6;
      border-radius: 12px;
    }

    .search-platform__select {
      color: #222;
      height: 100%;
      padding-left: 40px;
      cursor: pointer;

      .select {
        display: flex;
        align-items: center;
        height: 100%;

        .arrow {
          margin-left: 10px;
          transition: all 0.3s;
        }
      }

      &.arrow-up {
        .arrow {
          transform: rotate(180deg);
        }
      }
    }

    .search-split {
      color: #e6e6e6;
      font-size: 24px;
      font-weight: 300;
    }

    .search-input__inner {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;

      .search-rabbit {
        display: flex;
        align-items: center;
      }

      input {
        flex: 1;
        border: none;
        outline: none;
        background: none;
        font-size: inherit;
      }
    }

    .search-input__icons {
      display: flex;
      gap: 8px;

      .icon {
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        .iconfont {
          font-size: 24px;
          font-weight: 800;
          color: rgba(34, 34, 34, 0.8);
          transition: all 0.2s;
        }

        &:hover {
          .iconfont {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .search-keywords {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 14px;
    color: #4a4a4a;
    font-weight: 500;

    .keyword {
      max-width: calc(8em + 24px);
      padding: 4px 12px;
      background-color: #edf2f5;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease-out;

      &:hover {
        color: #222;
        background-color: #e6ebee;
      }
    }
  }
}
</style>

<style lang="scss">
.search-popper {
  margin-top: -10px;
  border-radius: 15px;
  overflow: hidden;

  &.el-popover.el-popper {
    padding: 0;
    border-radius: 10px;
    min-width: 130px;
  }

  .option {
    font-size: 14px;
    padding: 16px;
    color: #333;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
