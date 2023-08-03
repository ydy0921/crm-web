export class ConfigAdapter implements IConfigAdapter {
  serverConfig: IServerConfig; // 服务配置项引用
  env: Env;
  hosts: IHosts;
  domain: string;
  otherDomain: { [key: string]: string };
  curSite: ISite;
  failCallback?: (res: any, resolve: any, reject: any) => void;

  private URL_TPL = "//{DOMAIN}{HOST_API}?appId=APPID&path=PATH&state=!STATE";

  constructor(private apiConfig: any, serverConfig: any) {
    this.serverConfig = serverConfig;
    const { hosts } = apiConfig;
    const {} = serverConfig;
    this.hosts = hosts;
    this.dealConfig();
  }

  public getTargetApi(method: string, apiKey: string): string {
    if (this.apiConfig[method] && this.apiConfig[method][apiKey]) {
      return this.apiConfig[method][apiKey];
    }
    return "";
  }

  dealConfig() {
    this.curSite = !!this.serverConfig.sites
      ? this.serverConfig.sites[this.env]
      : { local: window.location.host, remote: window.location.host };
    this.domain = this.curSite.remote;
    this.otherDomain = this.curSite.otherRemotes || {};
  }
}

// ====对外的构造函数
type IConfigAdapterConstructor = new (
  apiConfig: IApiConfig,
  serverConfig: IServerConfig
) => IConfigAdapter;
export function createConfigAdapter(
  ctor: IConfigAdapterConstructor,
  apiConfig: IApiConfig,
  serverConfig: IServerConfig
): IConfigAdapter {
  return new ctor(apiConfig, serverConfig);
}

// ====结构类型
export enum Env {
  DEV = 1,
  DEV1,
  SIT2,
  UAT1,
  MASTER,
}
export const EnvKey = {
  [Env.DEV]: Env.DEV,
  [Env.DEV1]: Env.DEV1,
  [Env.SIT2]: Env.SIT2,
  [Env.UAT1]: Env.UAT1,
  [Env.MASTER]: Env.MASTER,
};
export interface ISite {
  local: string;
  remote: string;
  otherRemotes?: { [key: string]: string };
  otherEntrances?: { [key: string]: string };
  entrance?: string;
  appID?: string;
  protocol?: string;
  publicPath?: string;
  plugins?: { [key: string]: any };
}
export declare interface ISites {
  [key: string]: ISite;
}
export interface IHost {
  domain?: string;
  dir: string;
}
export declare interface IHosts {
  [key: string]: IHost;
}
export interface IApiConfig {
  [key: string]: any;
  hosts: IHosts;
  get?: { [key: string]: string };
  post?: { [key: string]: string };
  put?: { [key: string]: string };
  delete?: { [key: string]: string };
}
//? 自定义服务相关配置项
export interface IServerConfig {
  env: Env;
  sites: ISites;
  protocol: string;
  failCallback?: <T>(
    res: T,
    resolve: (value?: T | Promise<T> | undefined) => void,
    reject: Function
  ) => void;
}
//? 请求模块相关适配器项
export interface IConfigAdapter {
  env: Env;
  readonly hosts: IHosts;
  readonly domain: string;
  readonly otherDomain: { [key: string]: string };
  curSite: ISite;

  failCallback?: <T>(
    res: T,
    resolve: (value?: T | Promise<T> | undefined) => void,
    reject: Function
  ) => void;
  getTargetApi(method: string, apiKey: string): string;
}
