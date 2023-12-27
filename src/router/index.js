import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/images-list/ImagesListView.vue'),
    },
    {
      path: '/image/detail',
      name: 'imageDetail',
      component: () => import('../views/image-detail/ImageDetailView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
