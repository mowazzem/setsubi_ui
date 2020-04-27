import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "home",
        path: "",
        component: () => import("@/views/dashboard")
      },
      {
        path: "setsubi-data",
        name: "setsubi-data",
        meta: { permissions: ["SUPER_ADMIN","COMPANY_ADMIN","BRANCH_ADMIN","USER"] },
        component: () => import("@/views/setsubi-datas")
      },
      {
        path: "setsubi-category",
        name: "setsubi-category",
        meta: { permissions: ["SUPER_ADMIN"] },
        component: () => import("@/views/setsubi-category")
      },
      {
        path: "error",
        name: "error",
        component: () => import("@/views/Error.vue")
      },
      {
        path: "client",
        name: "client",
        meta: { permissions: ["SUPER_ADMIN"] },
        component: () => import("@/views/client")
      },
      {
        path: "company",
        name: "comapny",
        meta: { permissions: ["SUPER_ADMIN"] },
        component: () => import("@/views/company")
      },
      {
        path: "branch",
        name: "branch",
        meta: { permissions: ["SUPER_ADMIN"] },
        component: () => import("@/views/branch")
      },
      {
        path: "role",
        name: "role",
        meta: { permissions: ["SUPER_ADMIN"] },
        component: () => import("@/views/role")
      },
      {
        path: "resource",
        name: "resource",
        meta: { permissions: ["SUPER_ADMIN"] },
        component: () => import("@/views/resource")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/document/",
    name: "document",
    component: () => import("@/views/document")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
