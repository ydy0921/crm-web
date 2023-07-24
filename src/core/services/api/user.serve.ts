import { BaseService } from "./base.serve";

// UserService-api-interface
export interface IUserService {
  getUserInfo(id: string): Promise<any>;
}

// UserService-api-function
export class UserService extends BaseService implements IUserService {
  constructor() {
    super();
  }

  getUserInfo(id: string): Promise<any> {
    return this.proxyHttp.get("getUserInfo", null, [id]);
  }
}

// UserService-api-constructor
// type IUserServiceConstructor = new () => IUserService;
// export function createUserServiceConstructor(
//   ctor: IUserServiceConstructor
// ): IUserService {
//   return new ctor();
// }
