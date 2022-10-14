<!-- 页面注释 -->
<template>
  <div class="block-region">
    <div class="col"
         v-for="(block,index) in blockList"
         :key="index"
         :style="{top: `${block.y}`, left: `${block.x}`, zIndex:block.z + 1, height: height+'px', width: width+'px'}">
      <Block :option="block"
             :isMark="isMark(block)"
             @clickBlock="handleClickBlock(block, index)"></Block>
    </div>
  </div>
</template>
  
<script lang="ts">
import { BlockModel } from "@/model/BlockModel";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Block from "./Block.vue";

@Component({
  components: {
    Block,
  },
})
export default class BlockRegion extends Vue {
  @Prop()
  width!: number;
  @Prop()
  height!: number;
  private blockList: BlockModel[] = [];
  private imgMap = [
    require("@/assets/images/block-0.jpg"),
    require("@/assets/images/block-1.jpg"),
    require("@/assets/images/block-2.jpg"),
    require("@/assets/images/block-3.jpg"),
    require("@/assets/images/block-4.jpg"),
    require("@/assets/images/block-5.jpg"),
    require("@/assets/images/block-6.jpg"),
    require("@/assets/images/block-7.jpg"),
    require("@/assets/images/block-8.jpg"),
    require("@/assets/images/block-9.jpg")
  ]
  mounted() {
    setTimeout(() => {
      this.getList();
    },200);
  }

  private getTop(row: number, start: number) {
    return `${row * this.height + start}px`;
  }

  private getLeft(col: number, start: number) {
    return `${col * this.width + start}px`;
  }

  private isMark(block: BlockModel) {
    const index = this.blockList.findIndex((b) => {
      return (
        b.z - block.z === 1 &&
        (
          (block.colIndex === b.colIndex && block.rowIndex ===  b.rowIndex) ||
          (block.colIndex + 1 === b.colIndex && block.rowIndex ===  b.rowIndex) ||
          (block.colIndex === b.colIndex && block.rowIndex + 1 ===  b.rowIndex) ||
          (block.colIndex + 1 === b.colIndex && block.rowIndex + 1 ===  b.rowIndex)
        )
      );
    });
    return index > -1;
  }

  private getMock() {
    let list: number[] = [];
    for (let index = 1; index <= 18; index++) {
      list.push(...[0,1,2,3,4,5,6,7,8,9]);
    }
    list.push(...[0,1,2,3,4,5]);
    return list.sort((a, b)=> { return Math.random() > 0.5 ? -1 : 1; });
  }

  private getList() {
    let list = [];
    const imgIndexList = this.getMock();
    let count = 0;
    for (let zindex = 0; zindex < 7; zindex++) {
      let startTop = zindex * (this.height / 2);
      let startLeft = zindex * (this.width / 2);
      for (let row = 0; row < 8 - zindex; row++) {
        for (let col = 0; col < 7 - zindex; col++) {
          let block = new BlockModel();
          block.x = this.getLeft(col, startLeft);
          block.y = this.getTop(row, startTop);
          block.rowIndex = row;
          block.colIndex = col;
          // block.type = imgIndexList[count++];
          // block.src = this.imgMap[block.type];
          block.z = 5 - zindex;
          block.isEmpty = Math.random() > 0.6 //Number((Math.random() * 10).toFixed(0)) % 2 === 0;
          list.push(block);
        }
      }
    }
    let filterList = list.filter((b) => !b.isEmpty);
    if(filterList.length % 3 != 0) {
      for (let index = 0; index < 3 - filterList.length % 3; index++) {
        const firstIndex = list.findIndex(b => b.isEmpty);
        list[firstIndex].isEmpty = false;
      }
    }

    let blockArr = list.filter((b) => !b.isEmpty);
    const groupNum = blockArr.length / 3;
    const imgGroups = imgIndexList.splice(0, groupNum);
    let imgs = [...imgGroups, ...imgGroups, ...imgGroups];
    imgs = imgs.sort((a, b)=> { return Math.random() > 0.5 ? -1 : 1; });
    blockArr.map((b, index) => {
      b.type = imgs[index];
      b.src = this.imgMap[b.type];
    });
    this.blockList = blockArr;
  }

  private handleClickBlock(block: any, index: number) {
    if(!this.isMark(block)) {
      this.blockList.splice(index, 1);
      this.$emit("clickBlock", block, this.blockList.length, "count1");
    }
    
  }
}
</script>
  
<style lang="scss" scoped>
.block-region {
  position: relative;
  width: 90%;
  height: 95%;
  .col {
    position: absolute;
  }
}
</style>