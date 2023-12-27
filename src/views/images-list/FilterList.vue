<template>
  <div class="filter-container">
    <div class="filter-content" :class="{ expand: isExpand }">
      <FilterItem
        v-for="item in filterOptions"
        :key="item.title"
        :filterOption="item"
        class="filter-item"
        @mouseover="expand"
        @mouseleave="shrink" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FilterItem from '../../components/common/FilterItem.vue';
import ColorPicker from '../../components/common/ColorPicker.vue';

const filterOptions = [
  {
    title: '类型',
    options: ['照片', '插画', '矢量'],
  },
  {
    title: '构图',
    options: ['横图', '竖图', '方图', '全景图'],
  },
  {
    title: '授权类型',
    options: ['RF', 'RM'],
  },
  {
    title: '格式',
    options: ['JPEG', 'EPS', 'PSD', 'PNG'],
  },
  {
    title: '品牌',
    options: ['Adobe Stock', '图虫 Genius', '图虫精选', '图虫 AIGC', '美好景象', '蓝牛仔', 'TongRo', 'EyeEm', 'PIXTA'],
  },
  {
    title: '性别',
    options: ['女性', '男性'],
  },
  {
    title: '人数',
    options: ['无人', '1人', '2人', '3人及以上'],
  },
  {
    title: '种族',
    options: ['亚洲人', '白色人种', '黑色人种', '中东人'],
  },
  {
    title: '年龄',
    options: ['婴儿', '儿童', '少年', '青年', '中年', '老年'],
  },
  {
    title: '特色功能',
    options: ['大客专供-Premium', '未被购买过', '支持扩展授权'],
  },
  {
    title: '颜色',
    component: ColorPicker,
  },
];

const isExpand = ref(false);

const expand = () => {
  isExpand.value = true;
};
const shrink = () => {
  isExpand.value = false;
};
</script>

<style lang="scss" scoped>
.filter-container {
  position: sticky;
  top: 72px;
  z-index: 4;
  background-color: #fff;
  user-select: none;

  .filter-content {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    background-color: #fff;
    max-height: 60px;
    padding: 20px 30px;
    overflow: hidden;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    transition: all 0.2s;

    .filter-item {
      flex: 1;
    }
  }

  .expand {
    max-height: 500px;
  }
}
</style>
