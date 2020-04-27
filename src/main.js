import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import Loading from "./plugins/vue-loading-overlay";
import "./permission.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  Loading,
  render: h => h(App)
}).$mount("#app");
