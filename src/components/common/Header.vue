<template>
  <header :class="{ 'is-scroll-top': isScrollTop && isHomePage, fixed: isHomePage }">
    <div class="header-content">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="" v-if="isScrollTop && isHomePage" />
        <img src="@/assets/logo.black.png" alt="" v-else />
      </router-link>
      <div class="header-navs">
        <template v-if="isHomePage">
          <Dropdown class="header-navs__item" :options="['图片主页', '精选图片专题']">
            <router-link class="header-navs__item" to="/">图片</router-link>
          </Dropdown>
          <Dropdown class="header-navs__item" :options="['视频主页', '精选视频专题']">
            <router-link class="header-navs__item" to="/">视频</router-link>
          </Dropdown>
          <Dropdown class="header-navs__item" :options="['音乐主页', '精选音乐专题']">
            <router-link class="header-navs__item" to="/">音乐</router-link>
          </Dropdown>
          <div class="header-navs__item"><router-link class="header-navs__item" to="/">API</router-link></div>
          <div class="header-navs__item"><router-link class="header-navs__item" to="/">我要卖图</router-link></div>
        </template>
        <template v-else>
          <div class="spread-menu">
            <div class="spread-icon">
              <i class="iconfont icon-spread"></i>
            </div>
            <div class="spread-menu__list">
              <router-link to="/" class="spread-menu__item">图片</router-link>
              <router-link to="/" class="spread-menu__item">视频</router-link>
              <router-link to="/" class="spread-menu__item">音乐</router-link>
              <router-link to="/" class="spread-menu__item">API</router-link>
              <router-link to="/" class="spread-menu__item">我要卖图</router-link>
            </div>
          </div>
        </template>
      </div>
      <div class="search-bar__container">
        <Search v-if="!isHomePage" />
      </div>
      <div class="header-operations">
        <el-button type="primary" round>立即购买</el-button>
        <div class="icon">
          <i class="iconfont icon-cart1"></i>
        </div>
        <div class="icon">
          <i class="iconfont icon-message"></i>
        </div>
        <div class="account-nologin">
          <span class="login">登录</span>
          <span>|</span>
          <span class="sign">注册</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { debounce } from '@/utils/debounce.js';

import Search from './Search.vue';
import Dropdown from '../elements/Dropdown.vue';

const props = defineProps({
  isHomePage: {
    type: Boolean,
    default: false,
    require: true,
  },
});

const isScrollTop = ref(true);

// 防抖版的滚动监听函数
const windowScrollFunc = debounce(windowScroll, 10);
onMounted(() => {
  window.addEventListener('scroll', windowScrollFunc);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', windowScrollFunc);
});

function windowScroll() {
  isScrollTop.value = window.scrollY <= 0;
}
</script>

<style lang="scss" scoped>
header {
  // 占用空间
  position: relative;
  z-index: 5;
  height: 72px;

  .header-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100vw;
    min-width: 1280px;
    height: 72px;
    padding: 0 40px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    box-shadow: 0 2px 40px 0 hsla(0, 0%, 91.8%, 0.5);
    display: flex;
    align-items: center;
    gap: 32px;
    transition: background-color 0.2s ease-in;

    .logo {
      cursor: pointer;

      img {
        width: 133px;
        height: 37px;
        object-fit: contain;
      }
    }

    .header-navs {
      font-size: 16px;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 32px;

      .header-navs__item {
        font-size: 16px;
        color: inherit;
        cursor: pointer;

        &:hover {
          text-shadow: 0 0 0.5px currentColor, 0 0 0.5px currentColor, 0 0 0.5px currentColor, 0 0 0.5px currentColor;
        }
      }

      .spread-menu {
        width: 50px;
        height: 72px;
        position: relative;
        display: flex;
        justify-content: center;

        .spread-icon {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
          cursor: pointer;
        }

        .spread-menu__list {
          width: 120px;
          position: absolute;
          top: 70px;
          margin-left: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
          overflow: hidden;
          visibility: hidden;
          opacity: 0;
          transition: all 0.2s ease-in-out;

          .spread-menu__item {
            color: #333;
            display: block;
            padding: 12px;
            text-align: center;
            cursor: pointer;

            &:hover {
              color: var(--color-primary);
              background-color: var(--color-bg-gray);
            }
          }
        }

        &:hover .spread-menu__list {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    .search-bar__container {
      flex: 1;
    }

    .header-operations {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 32px;

      .el-button {
        height: 36px;
      }

      .icon .iconfont {
        font-size: 20px;
        cursor: pointer;
      }

      .account-nologin {
        display: flex;
        cursor: pointer;

        .login,
        .sign {
          padding: 0 4px;
        }
      }
    }
  }
}

header.is-scroll-top {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));

  .header-content {
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
  }
}

header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
}
</style>
