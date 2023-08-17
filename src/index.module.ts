import Vue from "vue";
import App from "./app.vue";
import router from "./index.router";
import store from "./store";

import { ConfigAdapter } from "./core/services/core/configAdapter";
import { Global } from "./utils/global";
import { ServiceFactory } from "./core/services/core/factory";
import { apiConfig } from "./core/services/api/api.config";

require("./plugins/element.js");

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue(); // 中央事件通信

// const { env, sites } = ConfigAdapter.getConfig();

(() => {
  Global.init()
    .then(async (res) => {
      // 自定义请求配置初始化
      const { serverConfig } = require("@/core/services/api/serve.config");
      Vue.use(ServiceFactory.createVuePlugin(), { apiConfig, serverConfig });

      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount("#app");
    })
    .catch((err: any) => {
      window.alert("global-config init error：" + err);
    });
})();
