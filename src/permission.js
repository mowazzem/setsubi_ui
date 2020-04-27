import router from "./router";
import Cookies from "js-cookie";
import {  isValid } from "@/utils/auth.js";

router.beforeEach((to, from, next) => {
  let token = Cookies.get("token");
  let { permissions } = to.meta;
  if (token) {
    if (to.path == "/login") {
      next({ name: "home" });
    } else {
      if (
        to.path != "/" &&
        !to.path.includes("/document") &&
        !to.path.includes("error") &&
        !isValid(permissions)
      ) {
        console.log(to.path);
        next({ path: "/error", query: { status: 401 } });
      } else {
        next();
      }
    }
  } else {
    if (to.path != "/login") {
      next("/login");
    } else next();
  }
});

router.afterEach(() => {});
