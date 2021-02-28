import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "@/router/router.js";
import VueToasted from "vue-toasted";

Vue.config.productionTip = false;
Vue.use(VueToasted);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
