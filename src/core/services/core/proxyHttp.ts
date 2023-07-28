import Axios, { AxiosResponse } from "axios";
import { IConfigAdapter } from "./configAdapter";
import { ServiceFactory } from "./factory";

import { IUtils, Utils } from "./utils";

// 请求对象: 汇总模块内的各类方法
export interface IProxyHttp {
  get<T, K>(api: string, params: K, path?: string[]): Promise<T>;
  // ...
  initInterceptors(): void;
}

export class ProxyHttp implements IProxyHttp {
  private configAdapter: IConfigAdapter;
  private utils: IUtils;
  private reqInterceptor: any;
  private resInterceptor: any;

  constructor() {
    this.configAdapter = ServiceFactory.createConfigAdapter();
    this.utils = ServiceFactory.createUtils();
    this.initInterceptors();
  }

  //! 初始化构造：Axios实例的全局配置
  initInterceptors(): void {
    Axios.interceptors.request.eject(this.reqInterceptor);
    this.reqInterceptor = Axios.interceptors.request.use(
      (request: any) => {
        return request;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    //...
    Axios.interceptors.response.eject(this.resInterceptor);
    this.resInterceptor = Axios.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  private fulfilled = <T>(res: AxiosResponse) => {
    const promise = new Promise<T>((resolve: any, reject: any) => {});
    return promise;
  };

  // ...
  get<T, K>(api: string, params: K, path?: string[]): Promise<T> {
    let url = "http://sw-control-gateway-api.dev1.yaoyanshe.net/" + api;
    this.utils.dealPath("", "");
    if (path) {
      url += "/" + path.join("/");
    }
    return Axios.get(url, { params }).then<T>(this.fulfilled);
  }
}

// ...
type IProxyHttpConstructor = new () => IProxyHttp;
export function createProxyHttp(ctor: IProxyHttpConstructor): IProxyHttp {
  return new ctor();
}
