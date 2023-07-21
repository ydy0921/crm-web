import Vue from "vue";
import VueRouter, { Location, Route, RouteConfig } from "vue-router";
import * as ViewFactory from "@/views/factory.view";
import childRoutes from "./router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: "入口",
    component: ViewFactory.homeViewPreload,
    children: childRoutes,
    redirect: (to: Route) => {
      // TODO: 判断用户登录状态？检查路由权限？
      const defaultRoute: Location = {
        name: "登录",
        params: to.params,
        query: to.query,
      };
      return defaultRoute;
    },
  },
  {
    path: "/login",
    name: "登录",
    component: ViewFactory.loginViewPreload,
  },
  { path: "/404", name: "page404", component: ViewFactory.errorViewPreload },
  { path: "*", name: "page404", component: ViewFactory.errorViewPreload },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 前置路由拦截
router.beforeEach(async (to: any, from: any, next) => {
  next();
});

// 后置路由拦截
router.afterEach((to: any, from: any) => {});

export default router;
