import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout
  },
  {
    path: "/login",
    component: () => import("@/views/login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
