import { IProxyHttp, ProxyHttp, createProxyHttp } from "./proxyHttp";

export abstract class ServiceFactory {
  public static proxyHttp: IProxyHttp;

  public static createProxyHttp(): IProxyHttp {
    if (!this.proxyHttp) {
      this.proxyHttp = createProxyHttp(ProxyHttp);
    }
    return this.proxyHttp;
  }
}
