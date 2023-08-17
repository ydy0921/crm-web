import axios from "axios";
//! 全局配置项构造 - Global.SITE_INFO
export abstract class Global {
  public static SITE_INFO: any = {};

  private static getEnv() {
    let env = "development";
    if (process.env.NODE_ENV) {
      env = process.env.NODE_ENV;
    }
    return env;
  }

  private static getRootUrl() {
    let pathName = location.pathname.split("/");
    pathName.splice(pathName.length - 1, 1);
    let str = pathName.join("/");
    return location.protocol + "//" + location.host + str;
  }

  public static init() {
    return new Promise((resolve: any, reject: any) => {
      const env = this.getEnv();
      axios
        .get(
          this.getRootUrl() +
            `/config/global.${env}.json?v=${new Date().getTime()}`
        )
        .then((res: any) => {
          const params = res.data;
          this.SITE_INFO = Object.assign({}, params);
          resolve(true);
        })
        .catch((err) => {
          console.error(
            `global.${this.getEnv()}.json init error, please check your configuration`,
            err
          );
          reject(true);
        });
    });
  }
}
