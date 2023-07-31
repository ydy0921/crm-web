import Vue from "vue";
import { ServiceFactory } from "./core/services/core/factory";
import { apiConfig } from "./core/services/api/api.config";
import { serverConfig } from "./core/services/api/serve.config";

// 自定义请求配置初始化
Vue.use(ServiceFactory.createVuePlugin(), { apiConfig, serverConfig });
// 项目启动依赖
require("./index.module");
require("./styles/index.scss");
