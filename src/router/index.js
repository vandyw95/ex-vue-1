import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('../views/HistoryPage.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/SearchPage.vue'),
    },
    {
      path: '/news/:newsId',
      name: 'NewsDetails',
      component: () => import('../views/NewsDetailsPage.vue'),
    },
  ],
});

export default router;
