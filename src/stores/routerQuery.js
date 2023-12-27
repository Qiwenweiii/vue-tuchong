import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useQueryStore = defineStore('routeQuery', () => {
  const queryObj = reactive({
    page: 1,
    platform: 'image',
    searchFrom: 'hot',
  });

  const getQuery = () => {
    return queryObj;
  };

  const setQuery = (key, value) => {
    queryObj[key] = value;
  };

  const setFilterItem = (key, value) => {};

  const removeFilterItem = (key) => {};

  const clearFilterList = () => {};

  return { queryObj, getQuery, setQuery };
});

// Pinia 热更新，如果需要，则每个 store 文件中都应该有这段代码
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQueryStore, import.meta.hot));
}
