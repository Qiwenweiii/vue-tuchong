<template>
  <el-dropdown popper-class="dropdown">
    <slot></slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="option in options">
          <router-link to="/">{{ option }}</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
defineProps(['options']);
</script>

<style lang="scss">
.dropdown {
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  left: 0;

  .el-dropdown-menu__item {
    height: 40px;
    padding: 5px auto;

    a {
      color: #666;
    }
  }

  .el-dropdown-menu__item:not(.is-disabled):focus {
    color: #333;
    background-color: var(--color-bg-gray);
  }

  .el-popper__arrow {
    display: none;
  }
}
</style>
