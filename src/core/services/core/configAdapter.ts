export class ConfigAdapter implements IConfigAdapter {
  serverConfig: IServerConfig; // 服务配置项引用

  private URL_TPL = "//{DOMAIN}{HOST_API}?appId=APPID&path=PATH&state=!STATE";

  constructor(private apiConfig: any, serverConfig: any) {
    this.serverConfig = serverConfig;
    const {} = apiConfig;
    const {} = serverConfig;
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
export enum ENV {
  DEV = 1,
  DEV1,
  SIT2,
  UAT1,
  MASTER,
}
export interface IApiConfig {
  [key: string]: any;
  hosts: any;
  get?: { [key: string]: string };
  post?: { [key: string]: string };
  put?: { [key: string]: string };
  delete?: { [key: string]: string };
}
//? 自定义服务相关配置项
export interface IServerConfig {}
//? 请求模块相关适配器项
export interface IConfigAdapter {}
