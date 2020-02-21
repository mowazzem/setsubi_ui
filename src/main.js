import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

Vue.config.productionTip = false;

// if (screen.availWidth <= 1024) {
//   console.log(screen.availWidth);
//   store.state.drawer = false;
// }

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
