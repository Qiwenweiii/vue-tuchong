<template>
  <div role="tooltip" class="tooltip">
    <el-tooltip :content="content" placement="top" :effect="effect" :placement="placement">
      <slot />
    </el-tooltip>
  </div>
  <div id="popper">
    <div data-popper-arrow class="my-arrow"></div>
  </div>
</template>

<script setup>
// ['content', 'effect', 'placement']
defineProps({
  content: {
    type: String,
    required: true,
  },
  effect: {
    type: String,
    default: 'back',
  },
  placement: {
    type: String,
    default: 'top',
  },
});
</script>

<style>
.el-popper {
  max-width: 380px;
}

.el-popper.is-back {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
}

.el-popper.is-back .el-popper__arrow::before {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
