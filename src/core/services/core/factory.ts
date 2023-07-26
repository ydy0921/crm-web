import { IProxyHttp, ProxyHttp, createProxyHttp } from "./proxyHttp";

//! Service构建相关--单一实例--工厂函数
// 静态方法；不会被实例继承：直接通过类调用
export abstract class ServiceFactory {
  public static instantiatedServices: Object[] = []; //! 已经实例化的service模块
  public static proxyHttp: IProxyHttp; //! 实际发送请求的axios实例
  public static configAdapter: any;

  // 单例创建服务模块实例
  public static createService(Type: Function) {
    if (!Type) {
      // throw new Error("服务定义错误");
      console.error("service class is none or error");
      return;
    }

    let serveTemp = null;
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
  public static createConfigAdapter() {
    if (!this.configAdapter) {
    } else {
      throw new Error("");
    }
  }
}
