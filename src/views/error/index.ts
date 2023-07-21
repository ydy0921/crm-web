import Component from "vue-class-component";
import Vue from "vue";

@Component({})
export default class errorView extends Vue {
  backToPrevPage() {
    if (window.history.length <= 1) {
      this.$router.push({ path: "/" });
      return false;
    } else {
      this.$router.go(-1);
    }
    setTimeout(() => {
      this.$router.push({ path: "/" });
    }, 500);
  }
}
