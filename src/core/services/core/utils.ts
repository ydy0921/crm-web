import { IConfigAdapter } from "./configAdapter";
import { ServiceFactory } from "./factory";

export interface IUtils {
  dealPath(apiKey: string, method: string): string;
}
export class Utils implements IUtils {
  private configAdapter: IConfigAdapter;

  constructor() {
    this.configAdapter = ServiceFactory.createConfigAdapter();
  }

  public dealPath(apiKey = "", method = "GET") {
    return "";
  }
}

type IUtilsConstructor = new () => IUtils;
export function createUtils(ctor: IUtilsConstructor): IUtils {
  return new ctor();
}
