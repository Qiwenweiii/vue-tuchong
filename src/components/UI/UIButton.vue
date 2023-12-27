<template>
  <div class="ui-btn" @mouseenter="handleShow" @mouseleave="handleHidden">
    <!-- <Transition name="fade"> -->
    <span v-if="!showHoverText">
      <slot></slot>
    </span>
    <span v-else>{{ hoverText }}</span>
    <!-- </Transition> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps(['hoverText']);

const showHoverText = ref(false);

function handleShow() {
  showHoverText.value = true;
}
function handleHidden() {
  showHoverText.value = false;
}
</script>

<style lang="scss" scoped>
.ui-btn {
  border: 1px solid #eee;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: -1;
    transition: all 0.2s ease-out;
  }

  &:hover {
    color: #fff;
    border-color: #000;

    &:after {
      top: 0;
    }
  }
}
</style>
