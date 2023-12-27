<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="dialog__container" v-if="showDialog">
        <div class="dialog__content">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.dialog__container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: hsla(0, 0%, 85.5%, 0.9);
  z-index: 999999;

  display: flex;
  justify-content: center;
  align-items: center;

  .dialog__content {
    position: relative;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease-in-out;
}
</style>
