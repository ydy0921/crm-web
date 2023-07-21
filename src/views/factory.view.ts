// 加载异常处理方法
function dealOccurred(error: any, viewName = "") {}

// ! 布局文件-懒加载汇总
// login:登录
export function loginViewPreload() {
  return import("./login/index.vue").catch((error) => {
    return dealOccurred(error, "loginView");
  });
}

// home:系统主体
export function homeViewPreload() {
  return import("./home/index.vue").catch((error) => {
    return dealOccurred(error, "homeView");
  });
}

// error:路由空态
export function errorViewPreload() {
  return import("./error/index.vue").catch((error) => {
    return dealOccurred(error, "errorView");
  });
}

// dashboard:工作台
export function dashboardViewPreload() {
  return import("./dashboard/index.vue").catch((error) => {
    return dealOccurred(error, "dashboardView");
  });
}

// export default const homeViewPreload = () => { import("./home/index.vue")}
