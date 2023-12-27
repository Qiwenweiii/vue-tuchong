<template>
  <Teleport to="body">
    <Transition name="load">
      <div class="container" v-if="isLoading">
        <div class="loading-animation">
          <div class="dot"></div>
          <p>加载中...</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps(['isLoading']);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 4;
  background-color: rgba($color: #000000, $alpha: 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  .loading-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 117px;
    height: 100px;
    background-color: #fff;
    font-size: 12px;
    color: #666;
    border-radius: 3px;
    box-shadow: 0px 2px 12px rgba($color: #000000, $alpha: 0.5);

    .dot {
      display: flex;
      gap: 10px;

      &::before,
      &::after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-image: linear-gradient(180deg, #f59465, #ff4b88);
        animation: loading-anmi 1s ease infinite;
      }

      &::after {
        background: #42e798;
        animation-delay: 0.5s;
      }
    }
  }
}

@keyframes loading-anmi {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(2);
  }

  100% {
    transform: scale(1);
  }
}

.load-leave-to {
  opacity: 0;
}
.load-leave-active {
  transition: opacity 0.05s ease-out;
}
</style>
