import { RouteConfig } from "vue-router";
import * as ViewFactory from "@/views/factory.view";

const DASHBOARD_ROUTE: RouteConfig = {
  path: "dashboard",
  name: "工作台",
  component: ViewFactory.dashboardViewPreload,
};

export default DASHBOARD_ROUTE;
