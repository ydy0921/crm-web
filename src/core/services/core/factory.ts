import { IProxyHttp, ProxyHttp, createProxyHttp } from "./proxyHttp";
import { IUtils, Utils, createUtils } from "./utils";
import {
  IApiConfig,
  IServerConfig,
  ConfigAdapter,
  createConfigAdapter,
} from "./configAdapter";

//! Service构建相关--单一实例--工厂函数
// 静态方法；不会被实例继承：直接通过类调用
export abstract class ServiceFactory {
  public static configAdapter: any;
  public static instantiatedServices: Object[] = []; //! 已经实例化的service模块
  public static proxyHttp: IProxyHttp; //! 实际发送请求的axios实例
  public static utils: IUtils;

  // 单例创建服务模块实例
  public static createService(Type: Function) {
    if (!Type) {
      console.error("service class is none or error");
      return;
    }

    let serveTemp: any = null;
    serveTemp = this.instantiatedServices.find((serve) => {
      return serve instanceof Type;
    });

    if (!serveTemp) {
      // @ts-ignore
      serveTemp = new Type();
      this.instantiatedServices.push(serveTemp);
    }
    return serveTemp;
  }

  // 单例创建Axios承载对象实例
  public static createProxyHttp(): IProxyHttp {
    if (!this.proxyHttp) {
      this.proxyHttp = createProxyHttp(ProxyHttp);
    }
    return this.proxyHttp;
  }

  // 单例创建axios、config配置项
  public static createConfigAdapter(
    apiConfig?: IApiConfig,
    serverConfig?: IServerConfig
  ) {
    if (!this.configAdapter) {
      if (!!apiConfig && !!serverConfig) {
        this.configAdapter = createConfigAdapter(
          ConfigAdapter,
          apiConfig,
          serverConfig
        );
      } else {
        console.log("config init fail!");
      }
    }
    return this.configAdapter;
  }

  // 单例创建Utils工具类
  public static createUtils() {
    if (!this.utils) {
      this.utils = createUtils(Utils);
    }
    return this.utils;
  }

  //! 单例-初始化构建-请求配置项
  public static createVuePlugin() {
    return {
      install: (vue: any, { apiConfig, serverConfig }: any) => {
        const configAdapter = this.createConfigAdapter(apiConfig, serverConfig);
        // ...向每个组件中注入依赖
      },
    };
  }
}
