<template>
  <div class="image-detail__content">
    <section class="image-detail__main">
      <div class="image-preview__container">
        <div class="image-preview" @click="toggleShow">
          <WaterMarkImage :imageDetail="imageDetail" class="image-limit" oncontextmenu="return false" />
          <!-- 在伪元素中写入文本，不需要单独添加一个元素了 -->
          <!-- <p>点击查看大图</p> -->
        </div>
        <div class="image-actions"></div>
      </div>
      <div class="image-desc__container">
        <div class="image-desc__content">
          <span class="image-desc__title" :data-hint="descTitle">
            <h1>
              <!-- 一些标志 -->
              <span>{{ subTitle }}</span>
            </h1>
          </span>
          <div class="image-desc__infos">
            <div class="image-desc__infos-item">
              <label class="info-item__label">编号</label>
              <div class="info-item__value">{{ imageDetail.id }}</div>
            </div>
            <div class="image-desc__infos-item">
              <label class="info-item__label">署名</label>
              <div class="info-item__value">
                <a :href="imageDetail.user.links.html" target="_blank">{{ imageDetail.user.name }}</a> / 图虫创意
              </div>
            </div>
            <div class="image-desc__infos-item">
              <label class="info-item__label">拍摄地点</label>
              <div class="info-item__value">{{ imageDetail.location.name }}</div>
            </div>
            <div class="image-desc__infos-item">
              <label class="info-item__label">最大尺寸</label>
              <div class="info-item__value">{{ imageDetail.width }} x {{ imageDetail.height }} px (300dpi)</div>
            </div>
            <div class="image-desc__infos-item">
              <label class="info-item__label">上传时间</label>
              <div class="info-item__value">{{ imageDetail.created_at.replace(/T|Z/g, ' ') }}</div>
            </div>
            <div class="image-desc__infos-item">
              <label class="info-item__label">用途</label>
              <div class="info-item__value usage">商业用途，可用于营利性的商业、广告目的</div>
            </div>
            <div class="image-desc__infos-item">
              <label class="info-item__label">授权书</label>
              <div class="info-item__value auth"><span>预览模板</span></div>
            </div>
          </div>
        </div>
        <div class="image-download__container">
          <div class="select-image-auth">
            <div class="select-image-auth__header">
              <span class="header-text">授权选择</span>
              <span class="header-tip"
                >如何选择
                <span>?</span>
              </span>
            </div>
            <div class="select-image-auth__main">
              <div
                class="auth-option"
                :class="{ active: selectedOption === option }"
                v-for="option in authOption"
                @click="handleSelectOption(option)">
                <label class="ui-radio" :class="{ 'is-checked': selectedOption === option }">
                  <input class="ui-radio-input" type="radio" :value="option" v-model="selectedOption" />
                </label>
                <span class="auth-type">{{ option }}</span>
                <span class="image-format">JPEG</span>
                <span class="scale-name">原图</span>
                <span class="image-size">{{ imageDetail.width }} x {{ imageDetail.height }}px (300dpi)</span>
              </div>
            </div>
          </div>
          <div class="image-download__actions">
            <button class="image-download__origin" @click="downloadOrigin(imageDetail)">立即下载原图</button>
            <button class="image-download__preview" @click="downloadOrigin(imageDetail, 'preview')">样图</button>
            <UIButton hoverText="购物车" class="image-add-cart">
              <i class="iconfont icon-cart"></i>
            </UIButton>
            <UIButton hoverText="收藏" class="image-collect">
              <i class="iconfont icon-collect"></i>
            </UIButton>
          </div>
        </div>
      </div>
    </section>
    <section class="image-detail__keywords">
      <div class="keywords-header">
        <div class="header-title">关键词</div>
        <div class="more-keywords">查看更多<i class="iconfont icon-arrow"></i></div>
      </div>
      <div class="keywords-container">
        <router-link
          :to="{ name: 'search', query: { keyword: keyword.title, page: 1, platform: 'image', searchForm: 'hot' } }"
          class="keywords-item"
          v-for="keyword in imageDetail.tags"
          :key="keyword.title"
          >{{ keyword.title }}</router-link
        >
      </div>
    </section>
    <section class="image-detail__related">333</section>
  </div>
  <UIDialog :showDialog="showImage">
    <WaterMarkImage :imageDetail="imageDetail" class="big-image-limit" />
    <span class="image-show__close" @click="toggleShow">
      <i class="iconfont icon-close"></i>
    </span>
  </UIDialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import WaterMarkImage from '@/components/common/WaterMarkImage.vue';
import UIDialog from '@/components/UI/UIDialog.vue';
import UIButton from '@/components/UI/UIButton.vue';
import { getStrBytesLength } from '@/utils/getStrBytesLength';
import { downloadOrigin } from '@/composables/useDownload';

const authOption = ['标准', '扩展'];
const selectedOption = ref('标准');

const props = defineProps({
  imageDetail: {
    type: Object,
    required: true,
  },
});

const showImage = ref(false);

const descTitle = props.imageDetail.description ?? props.imageDetail.alt_description;

const toggleShow = () => {
  showImage.value = !showImage.value;

  // 大图打开时阻止页面滚动
  if (showImage.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

const subTitle = computed(() => {
  if (!descTitle || descTitle === undefined) return '';
  if (getStrBytesLength(descTitle) < 70) return descTitle;

  let result = '';
  let num = 0;
  for (let i = 0; i < descTitle.length; i++) {
    num += descTitle.charCodeAt(i) > 255 ? 2 : 1; // 中文两个字节，英文一个字节
    if (num > 70) {
      break;
    } else {
      result = descTitle.substring(0, i + 1);
    }
  }

  return result + '...';
});

function handleSelectOption(option) {
  selectedOption.value = option;
}
</script>

<style lang="scss" scoped>
.image-detail__content {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .image-detail__main {
    display: flex;
    gap: 16px;

    .image-preview__container {
      width: 680px;
      display: flex;
      flex-direction: column;
      gap: 18px;

      .image-preview {
        height: 400px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        position: relative;

        .image-limit {
          max-width: 100%;
          max-height: 100%;
        }

        &::before {
          content: '点击查看大图';
          display: block;
          width: 100%;
          height: 100%;
          background-color: rgba($color: #000000, $alpha: 0.2);
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;

          display: flex;
          justify-content: center;
          align-items: center;
          color: #f9f9f9;
          letter-spacing: 1em;
        }

        &:hover {
          &::before {
            opacity: 1;
          }
        }
      }

      .image-actions {
        height: 42px;
        background-color: blue;
      }
    }

    .image-desc__container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .image-desc__content {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .image-desc__title {
          display: inline-block;
          cursor: pointer;
          position: relative;
          width: max-content;

          &::before {
            content: attr(data-hint);
            background: rgba(56, 56, 56, 0.8);
            color: #fff;
            font-size: 12px;
            padding: 8px 10px;
            width: max-content;
            max-width: 300px;
            border-radius: 5px;
            position: absolute;
            top: calc(80% + 14px);
            left: 50%;
          }

          &::after {
            content: '';
            width: 0;
            height: 0;
            border: 7px solid transparent;
            border-bottom-color: rgba(56, 56, 56, 0.8);
            position: absolute;
            top: 80%;
            left: 50%;
          }

          &::after,
          &::before {
            opacity: 0;
            visibility: hidden;
            transform: translateX(-50%) translateY(0);
            transition: all 0.3s ease-in-out;
          }

          &:hover::after,
          &:hover::before {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(10px);
          }

          h1 {
            margin: 0;
            font-size: 18px;
            line-height: 26px;
            font-weight: bold;
            color: #222;
            word-break: all;
          }
        }

        .image-desc__infos {
          padding: 11px 16px;
          border: 1px solid #e7e7e7;
          border-radius: 4px;
          color: #222;
          background-color: #fff;
          font-size: 14px;

          .image-desc__infos-item {
            display: flex;
            align-items: center;
            gap: 14px;
            min-height: 30px;

            label.info-item__label {
              width: 7em;
              color: #7b7f81;
            }

            .info-item__value {
              flex: 1;
              a {
                text-decoration: underline;
              }

              &.usage {
                color: var(--color-primary);
              }

              &.auth span {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }

      .image-download__container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .select-image-auth {
          padding: 0 15px 10px;
          border: 1px solid #e7e7e7;
          border-radius: 4px;

          .select-image-auth__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            color: #222;
            font-size: 14px;

            .header-text {
              font-weight: 500;
              color: #000;
            }

            .header-tip {
              display: flex;
              align-items: center;
              gap: 4px;
              cursor: pointer;

              span {
                width: 14px;
                height: 14px;
                color: #fff;
                background-color: #999;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                line-height: 14px;
                border-radius: 50%;
              }
            }
          }

          .select-image-auth__main {
            .auth-option {
              display: flex;
              align-items: center;
              gap: 12px;
              height: 42px;
              padding: 0 12px;
              font-size: 14px;
              border-radius: 4px;
              color: #222;
              cursor: pointer;

              &.active {
                background-color: #f5f5f5;
              }

              label.ui-radio {
                width: 14px;
                height: 14px;
                margin: 0;
                padding: 0;
                position: relative;
                cursor: pointer;

                &::before {
                  content: '';
                  width: 14px;
                  height: 14px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 50%;
                  border: 2px solid #222;
                }
                &::after {
                  content: '';
                  width: 8px;
                  height: 8px;
                  position: absolute;
                  left: 3px;
                  top: 3px;
                  border-radius: 50%;
                  background-image: linear-gradient(270deg, #f58365, #ff188a);
                  transform: scale(0);
                  transition: all 0.2s ease-out;
                }

                &.is-checked::after {
                  // background-image: linear-gradient(270deg, #f58365, #ff188a);
                  transform: scale(1);
                }

                input.ui-radio-input {
                  width: 0;
                  height: 0;
                  margin: 0;
                  padding: 0;
                  opacity: 0;
                  appearance: none;
                  border: none;
                  position: absolute;
                }
              }

              .auth-type {
                font-weight: 500;
                flex: 1;
              }

              .image-format {
                width: 80px;
              }

              .scale-name {
                width: 40px;
              }
            }
          }
        }

        .image-download__actions {
          padding-top: 5px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 16px;

          button {
            border: none;
            outline: none;
            background: none;
            font-size: 16px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;

            &.image-download__origin {
              flex: 1;
              height: 42px;
              color: #fff;
              background-color: var(--color-primary);
              transition: all 0.1s ease-out;

              &:hover {
                background-color: var(--color-secondary);
              }
            }

            &.image-download__preview {
              background-color: #fff;
              border: 1px solid var(--color-primary);
              color: var(--color-primary);
              width: 80px;
              height: 42px;
            }
          }

          .iconfont {
            font-size: 24px;
          }

          .image-add-cart,
          .image-collect {
            width: 80px;
            height: 42px;
          }
        }
      }
    }
  }

  .image-detail__keywords {
    .keywords-header {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-title {
        font-size: 16px;
        font-weight: 600;
      }

      .more-keywords {
        font-size: 14px;
      }
    }

    .keywords-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-height: 54px;
      overflow: hidden;
      font-size: 14px;

      .keywords-item {
        padding: 0 14px;
        color: #6d6d6d;
        background-color: #f4f4f4;
        line-height: 24px;
        border-radius: 4px;
      }
    }
  }
}

.big-image-limit {
  max-height: 100vh;
  max-width: 1000px;
}

.image-show__close {
  color: #222;
  text-shadow: 0 0 2px #222;
  cursor: pointer;
  position: absolute;
  right: -30px;
}
</style>
