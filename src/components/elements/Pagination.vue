<template>
  <div class="pagination-container">
    <button class="prev" v-if="currentPage !== 1" @click="handlePrev">上一页</button>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="pager"
      @current-change="handlePageChange" />
    <button class="next" v-if="currentPage !== pageCount" @click="handleNext">下一页</button>
    <div class="jump">
      <input type="text" v-model="jumpPageNum" />页 <span class="to" @click="handleJump">前往</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useQueryStore } from '@/stores/routerQuery';

const props = defineProps(['pageSize', 'total']);

const router = useRouter();
const route = useRoute();
const currentPage = ref(1);
const jumpPageNum = ref('');

const queryStore = useQueryStore();
const { queryObj } = storeToRefs(queryStore);
const { setQuery } = queryStore;

watchEffect(() => {
  currentPage.value = +(route.query.page ?? 1);
});

const pageCount = computed(() => Math.ceil(props.total / props.pageSize));

const handlePageChange = () => {
  setQuery('page', currentPage.value);
  router.push({ name: 'search', query: { ...route.query, ...queryObj.value } });
};

const handlePrev = () => {
  currentPage.value--;
  handlePageChange();
};
const handleNext = () => {
  currentPage.value++;
  handlePageChange();
};

const handleJump = () => {
  const jumpPage = +jumpPageNum.value;
  if (jumpPage && jumpPage > 0 && jumpPage <= pageCount.value && jumpPage !== currentPage.value) {
    currentPage.value = jumpPage;
    handlePageChange();
    jumpPageNum.value = '';
  } else {
    alert('请输入正确的页码');
    jumpPageNum.value = '';
  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;

  button {
    background: none;
    border: none;
    outline: none;
    color: #222;
    border: 1px solid #222;
    padding: 10px 28px;
    font-size: 14px;
    margin: 0 40px;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  .jump {
    position: absolute;
    right: 100px;
    display: flex;
    align-items: center;
    color: #666;

    input {
      display: block;
      background: none;
      border: 1px solid #ccc;
      width: 40px;
      height: 32px;
      font-size: 16px;
      text-align: center;
      margin-right: 10px;
    }

    .to {
      margin-left: 20px;
      padding: 2px 4px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      transition: all 0.2s ease-out;

      &:hover {
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
    }
  }
}
</style>

<style lang="scss">
.pagination-container {
  .el-pagination .el-pager {
    gap: 20px;
  }
}
</style>
