import { Env, EnvKey, IConfigAdapter, IHost, ISites } from "./configAdapter";
import { ServiceFactory } from "./factory";

export interface IUtils {
  dealPath(apiKey: string, method: string): string;
}

declare var SITE_INFO: string;

export class Utils implements IUtils {
  private configAdapter: IConfigAdapter;

  constructor() {
    this.configAdapter = ServiceFactory.createConfigAdapter();
  }

  public dealPath(apiKey = "", method = "GET") {
    method = method.toLocaleLowerCase();
    const api = this.configAdapter.getTargetApi(method, apiKey);
    let url = apiKey;
    if (api === "") {
      console.error(`${apiKey}-${method}方法未定义对应的api-path!`);
    }

    if (api.indexOf(":") !== -1 && api.split(":").length === 2) {
      url = "{PROTOCOL}//{DOMAIN}{HOST}{API}";
      const path = api.split(":");
      path[0] = this.trim(path[0]);
      path[1] = this.trim(path[1]);
      const host: IHost = this.configAdapter.hosts[path[0]];
      // const domain =
      //   host && host.domain
      //     ? this.configAdapter.otherDomain[host.domain]
      //     : this.configAdapter.domain;
      url = url
        .replace(
          /\{PROTOCOL}/,
          this.configAdapter.curSite.protocol || location.protocol
        )
        // .replace(/\{DOMAIN}/, domain)
        .replace(/\{HOST}/, host.dir)
        .replace(/\{API}/, path[1]);
    } else {
      url = api;
    }
    return url;
  }

  public trim(str: string): string {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  static getSiteInfo(): ISites {
    const siteInfo: any = SITE_INFO;
    return Object.keys(EnvKey).reduce((results: ISites, envKey: any) => {
      if (!results[Env[envKey]]) {
        results[envKey] = siteInfo[Env[envKey]];
      }
      return results;
    }, {});
  }
}

type IUtilsConstructor = new () => IUtils;
export function createUtils(ctor: IUtilsConstructor): IUtils {
  return new ctor();
}
