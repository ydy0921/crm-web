import userApi from "./user.api";
import projectApi from "./project.api";

export const apiConfig: any = {
  host: {
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

const ALL_API_PATH = [userApi, projectApi];
ALL_API_PATH.map((apis: any) => {
  const { get, post, put } = apis;
  apiConfig.get = Object.assign(apiConfig.get, get);
  apiConfig.post = Object.assign(apiConfig.post, post);
  apiConfig.put = Object.assign(apiConfig.put, put);
});
