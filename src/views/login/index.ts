import Vue from "vue";
import Component from "vue-class-component";

import { AutowiredService } from "@/core/services/core/decorators";
import { UserService, ProjectService } from "@/core/services/serve/index.serve";

@Component({
  name: "login-view",
  methods: {},
})
export default class LoginView extends Vue {
  @AutowiredService(UserService)
  userService: any;

  @AutowiredService(ProjectService)
  projectService: any;

  async onLogin() {
    const res = await this.userService.getUserInfo("11223");
  }

  async onLogin2() {
    // const res = await this.projectService.findProjectInfo("33323");
  }
}
