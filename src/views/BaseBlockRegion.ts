import { BlockModel } from './../model/BlockModel';
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class BlockRegionMixin extends Vue {
  @Prop()
  theme!: string;
  protected imgMap: any[] = [];
  protected blockList: BlockModel[] = [];
  mounted() {
    for (let index = 0; index < 10; index++) {
      this.imgMap.push(require(`@/assets/images/${this.theme}/block-${index}.jpg`));
    }
  }

  public resort() {
    this.blockList.sort((a, b)=> { return Math.random() > 0.5 ? -1 : 1; });
  }

  public undo(block: BlockModel) {
    this.blockList.push(block);
  }
}