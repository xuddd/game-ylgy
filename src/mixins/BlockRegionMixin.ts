import Vue from "vue";
import { Prop } from "vue-property-decorator";
export default class BlockRegionMixin extends Vue {
  @Prop()
  theme!: string;
  protected imgMap: any[] = [];
  mounted() {
    for (let index = 0; index < 10; index++) {
      this.imgMap.push(require(`@/assets/images/${this.theme}/block-${index}.jpg`));
    }
  }
}