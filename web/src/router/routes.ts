import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', redirect: 'shuttle'},
      { path: '/shuttle', component: () => import('pages/ShuttlePage.vue') },
      { path: '/shuttle/timetable/:stopCode/:heading', component: () => import('pages/ShuttleTimetablePage.vue') },
      { path: '/subway', component: () => import('pages/SubwayPage.vue') },
      { path: '/subway/timetable/:lineCode', component: () => import('pages/SubwayTimetablePage.vue') },
      { path: '/bus', component: () => import('pages/BusPage.vue') },
      { path: '/bus/timetable/:lineCode', component: () => import('pages/BusTimetablePage.vue') },
      { path: '/cafeteria', component: () => import('pages/CafeteriaPage.vue') },
      { path: '/menu', component: () => import('pages/MenuPage.vue') },
      { path: '/library', component: () => import('pages/ReadingRoomPage.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
];

export default routes;
