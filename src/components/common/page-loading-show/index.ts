import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "page-loading",
})
export default class PageLoading extends Vue {
  @Prop({ type: Boolean, default: true })
  loading: boolean;

  @Prop({ type: Boolean, default: false })
  showPage: boolean;

  // 对于包裹内容-滚动加载时，当不需要重新计算滚动条，而滚动回头部，此时仅关注第一次是否loading + 有数据
  @Prop({ type: Boolean, default: false })
  onlyOnce: boolean;
  onlyOnceTime: number = 1;

  get customControl() {
    const temp = {
      loading: this.loading,
      showPage: this.showPage,
    };
    if (this.onlyOnce) {
      if (this.onlyOnceTime) {
        this.onlyOnceTime = 0;
      } else {
        temp.loading = false;
        temp.showPage = true;
      }
    }
    return temp;
  }
}
