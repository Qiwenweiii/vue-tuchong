<template>
  <div class="filter-item">
    <span class="filter-item__title">
      {{ filterOption.title }}
      <i class="iconfont icon-arrow"></i>
    </span>
    <span v-if="filterOption.options" class="filter-item__option" v-for="option in filterOption.options">
      {{ option }}
    </span>
    <template v-else>
      <component :is="filterOption.component" />
    </template>
  </div>
</template>

<script setup>
defineProps(['filterOption']);
</script>

<style lang="scss" scoped>
.filter-item {
  font-size: 14px;
  display: flex;
  flex-direction: column;

  span {
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #222;
    cursor: pointer;
    white-space: nowrap;

    &.filter-item__title {
      font-weight: 500;
      margin-bottom: 22px;

      i.iconfont {
        font-size: 18px;
        margin-top: 2px;
      }
    }

    &.filter-item__option {
      min-height: 24px;
      line-height: 24px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        color: var(--color-primary-dark);
      }
    }
  }
}
</style>
