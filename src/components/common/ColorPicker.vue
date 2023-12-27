<template>
  <div class="color-picker__container" :class="{ expand: isExpand }">
    <div class="color-preset__container">
      <span class="color-preset__item" v-for="color in colorPreset" :style="{ backgroundColor: color }"></span>
      <span class="color-preset__item" @click="toggleExpand">
        <i class="iconfont icon-arrow"></i>
      </span>
    </div>
    <div class="color-picker">
      <Sketch v-model="color" class="color-picker__inner" :preset-colors="null" disableAlpha />
      <span class="color-picker__ensure" @click="colorPicker">确 定</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Sketch } from '@ckpack/vue-color';
const colorPreset = ref([
  'rgb(243, 54, 54)',
  'rgb(255, 152, 0)',
  'rgb(255, 235, 59)',
  'rgb(76, 175, 80)',
  'rgb(0, 187, 212)',
  'rgb(32, 150, 243)',
  'rgb(157, 39, 176)',
  'rgb(255, 255, 255)',
  'rgb(0, 0, 0)',
]);
const isExpand = ref(false);

const color = ref('rgb(255,255,255)');

const colorPicker = () => {
  console.log(color.value);
};

const toggleExpand = () => {
  isExpand.value = !isExpand.value;
};
</script>

<style lang="scss" scoped>
.color-picker__container {
  width: 164px;
  max-height: 74px;
  padding: 12px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
  transition: max-height 0.3s;

  &.expand {
    max-height: 320px;

    i.iconfont {
      transform: rotate(180deg);
    }
  }
  .color-preset__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 6px;

    .color-preset__item {
      width: 20px;
      height: 20px;
      margin: 0 2px 10px;
      border-radius: 2px;
      border: 1px solid rgba($color: #000, $alpha: 0.1);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      i.iconfont {
        color: #222;
        transition: all 0.2s;
      }
    }
  }

  .color-picker {
    .color-picker__inner {
      width: 100%;
      padding: 0;
      box-sizing: border-box;
      box-shadow: none;
    }

    .color-picker__ensure {
      display: block;
      margin: 0 auto;
      width: 66px;
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      background-image: linear-gradient(270deg, #f58365, #ff188a);
      text-align: center;
      line-height: 26px;
      border-radius: 13px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
