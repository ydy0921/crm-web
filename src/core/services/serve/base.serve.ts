import { IProxyHttp } from "../core/proxyHttp";
import { ServiceFactory } from "../core/factory";

//! 整个系统中, proxyHttp永远只有一个实例
export class BaseService {
  protected proxyHttp: IProxyHttp;

  constructor() {
    this.proxyHttp = ServiceFactory.createProxyHttp();
  }
}
