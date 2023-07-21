import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import {
  Container,
  Header,
  Aside,
  Main,
  Button,
  Loading,
  Message,
  MessageBox,
  Notification,
} from "element-ui";

const elementComp = [Container, Button];

elementComp.map((comp) => {
  Vue.use(comp);
});

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$msgBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
