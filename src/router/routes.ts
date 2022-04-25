import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'shuttle'},
      { path: 'shuttle', component: () => import('pages/ShuttlePage.vue') },
      { path: 'shuttle/timetable/:stopCode/:heading', component: () => import('pages/ShuttleTimetablePage.vue') },
      { path: 'subway', component: () => import('pages/SubwayPage.vue') },
      { path: 'bus', component: () => import('pages/BusPage.vue') },
      { path: 'cafeteria', component: () => import('pages/CafeteriaPage.vue') },
      { path: 'menu', component: () => import('pages/MenuPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: 'shuttle',
  },
];

export default routes;
