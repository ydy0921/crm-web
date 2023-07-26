import { BaseService } from "./base.serve";

export interface IProjectService {
  findProjectInfo(id: string): Promise<any>;
}

export class ProjectService extends BaseService implements IProjectService {
  constructor() {
    super();
  }

  findProjectInfo(id: string): Promise<any> {
    return this.proxyHttp.get("findProjectInfo", null, [id]);
  }
}
