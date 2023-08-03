import userApi from "./user.api";
import projectApi from "./project.api";

export const apiConfig: any = {
  //! gateway模式下，服务的地址前缀;
  hosts: {
    spmInit: { dir: "" },
    spmHost: { dir: "/sw-spm" },
    spmUser: { dir: "/sw-user" },
    spmPlan: { dir: "/sw-plan" },
  },
  get: {
    defaultGet: "spmHost:/defaultGet/v1",
  },
  post: {
    defaultPost: "spmUser:/defaultPost/v1",
  },
  put: {
    defaultPut: "spmPlan:/defaultPut/v1",
  },
};

//TODO 汇总整个系统的api_path模块；不同模块间需要做path_name去重检查
//! 想办法增加校验，在最少执行的情况下，保证api：url的唯一性，通过注释标注某一接口的使用范围
// 可以放到createVuePlugin()里，内置初始化
const ALL_SERVE_API_KEY = [userApi, projectApi];
ALL_SERVE_API_KEY.map((apis: any) => {
  const { get, post, put } = apis;
  apiConfig.get = Object.assign(apiConfig.get, get);
  apiConfig.post = Object.assign(apiConfig.post, post);
  apiConfig.put = Object.assign(apiConfig.put, put);
  // if (false) {
  //   console.error("服务中出现同名地址,请检查api-key或api-path是否合理！");
  // }
});
