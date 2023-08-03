// 与后端约定的配置节，包含服务地址、回调异常处理等
//! 通常做符合当前项目的特色化配置
import { Env, IServerConfig } from "../core/configAdapter";
import { Utils } from "../core/utils";

export const serverConfig: IServerConfig = {
  env: Env.DEV,
  sites: Utils.getSiteInfo(),
  protocol: window.location.protocol,
  //* 通用的异常响应回调；根据与后端约定好的异常类型、结构做统一的处理提示等
  failCallback: async (res: any, resolve: Function, reject: Function) => {},
};
