import Vue from "vue";
import VueRouter from "vue-router";
import ShuttlePage from "../views/ShuttlePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Shuttle Page",
    component: ShuttlePage,
  },
  {
    path: "/subway",
    name: "Subway Page",
    component: () => import("../views/SubwayPage.vue"),
  },
  {
    path: "/bus",
    name: "Intercity Bus Page",
    component: () => import("../views/BusPage"),
  },
  {
    path: "/cafeteria",
    name: "Cafeteria Menu Page",
    component: () => import("../views/CafeteriaPage"),
  },
  {
    path: "/more",
    name: "More Menu Page",
    component: () => import("../views/MenuPage"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
