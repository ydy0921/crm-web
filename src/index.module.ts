import Vue from "vue";
import App from "./app.vue";
import router from "./index.router";
import store from "./store";

require("./plugins/element.js");

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue(); // 中央事件通信

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
