<template>
  <div class="img-card" :style="imageStyle">
    <div class="image-container" v-img-lazy:back="image.urls.small">
      <Router-Link :to="{ name: 'imageDetail', query: { imageId: image.id } }">
        <section class="img-desc-top"></section>
        <section class="img-desc-bottom">
          <div class="desc-text">
            <ToolTip :content="content">
              <p>{{ content }}</p>
            </ToolTip>
          </div>
          <div class="more-action">
            <ToolTip content="查找相似图片">
              <span class="more-imgs">
                <i class="iconfont icon-grid" id="iconfont"></i>
              </span>
            </ToolTip>
            <ToolTip content="收藏">
              <span class="collect">
                <i class="iconfont icon-collect"></i>
              </span>
            </ToolTip>
            <ToolTip content="购物车">
              <span class="add-cart">
                <i class="iconfont icon-cart"></i>
              </span>
            </ToolTip>
          </div>
        </section>
      </Router-Link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ToolTip from '../../components/elements/ToolTip.vue';

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  imagePos: {
    type: Object,
    required: true,
  },
});

const content = props.image.description ?? props.image.alt_description;

const imageStyle = computed(() => {
  const imagePos = props.imagePos;
  return `width:${imagePos.width}px;height:${imagePos.height}px;left:${imagePos.left}px;top:${imagePos.top}px`;
});
</script>

<style scoped lang="scss">
.img-card {
  position: absolute;
  background-color: #f5f5f5;

  cursor: pointer;
  transition: all 0.2s ease-out;

  .image-container {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    a {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .img-desc-bottom {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s ease;

        .desc-text {
          color: #fff;
          flex: 1;
          min-width: 0;

          p {
            width: min-content;
            max-width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
          }
        }

        .more-action {
          font-size: 18px;
          color: #fff;
          display: flex;
          gap: 10px;

          span {
            width: 27px;
            height: 27px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      &:hover .img-desc-bottom {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
