import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Vuetify from "vuetify";

Vue.config.productionTip = false;
Vue.use(Vuetify);
const opts = {};
const vuetify = new Vuetify(opts);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
