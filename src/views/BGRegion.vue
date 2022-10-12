<!-- 页面注释 -->
<template>
  <div class="content-bg-region">
    <div v-for="(block,index) in bgList"
         :key="index"
         class="bg-block"
         :style="{bottom: getTop(block.rowIndex), left: getLeft(block.colIndex), zIndex: 0}">
      <img :src="block.src" />
    </div>
  </div>
</template>
  
<script lang="ts">
import { BlockModel } from "@/model/BlockModel";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class BGRegion extends Vue {
  private bgList: any = [];
  private width: number = 0;
  private height: number = 0;
  private classSrc =
    "data:image/png;base64,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";
  mounted() {
    this.getBGList();
  }

  private getBGList() {
    let list = [];
    const width = (this.$el as any).offsetWidth;
    const maxCol = Math.floor(width / 40);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 6; col++) {
        let bgBlock = new BlockModel();
        bgBlock.rowIndex = row;
        bgBlock.colIndex = col;
        bgBlock.src = this.classSrc;
        list.push(bgBlock);
      }
    }
    this.bgList = list;
  }

  private getTop(row: number) {
    // return `${(8 - row) * (40 + 35) - 40}px`;
    return `${row * 12.5}%`
  }

  private getLeft(col: number) {
    return `${col * 18}%`;
  }
}
</script>
  
<style lang="scss" scoped>
@keyframes ani {
    0% {
      height: 40px;
    }

    25% {
      height: 36px;
    }
    50% {
      height: 34px
    }
    75% {
      height: 36px;
    }
    100% {
      height: 40px;

    }
  }
.content-bg-region {
  position: relative;
  height: 75%;
  width: 90%;
  .bg-block {
    position: absolute;
    width: 11%;
    height: 10%;
    animation: ani 0.8s infinite;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>