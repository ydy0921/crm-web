export class ConfigAdapter implements IConfigAdapter {
  constructor(private apiConfig: any, serverConfig: any) {}
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
export interface IApiConfig {
  [key: string]: any;
  hosts: any;
  get?: { [key: string]: string };
  post?: { [key: string]: string };
  put?: { [key: string]: string };
  delete?: { [key: string]: string };
}
export interface IServerConfig {}
export interface IConfigAdapter {}
