import Vue from "vue";
import Component from "vue-class-component";

import { AutowiredService } from "@/core/services/core/decorators";
import { UserService } from "@/core/services/api/user.serve";

@Component({
  name: "login-view",
})
export default class LoginView extends Vue {
  @AutowiredService(UserService)
  userService: any;

  count: any = 2;

  async onLogin() {
    const res = await this.userService.getUserInfo("11223");
  }
}
