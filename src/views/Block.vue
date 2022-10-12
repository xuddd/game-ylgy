<!-- 页面注释 -->
<template>
  <div class="block" @click="handleClick">
    <img :src="option.src"/>
    <!-- <span>{{option.z}}-{{option.colIndex}}-{{option.rowIndex}}</span> -->
    <div class="mark" v-if="isMark"></div>
  </div>
</template>
  
<script lang="ts">
import { BlockModel } from "@/model/BlockModel";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
  
@Component({
  components: {}
})
export default class Block extends Vue {
  @Prop({
    type: Number,
    default: 0
  })
  type!: number;
  @Prop({
    type: String,
    default: ""
  })
  imgSrc!: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isMark!: boolean;
  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  option!: BlockModel;

  handleClick() {
    this.$emit("clickBlock");
  }
  
}
</script>
  
<style lang="scss" scoped>
.block {
  position: relative;
  width: 36px;
  height: 50px;
  padding: 5px;
  border: 2px solid black;
  border-radius: 4px;
  background-color: whitesmoke;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  .mark {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 4px;
    background-color: #0009;
    pointer-events: none;
  }
  // &::after {
  //   content: "";
  //   position: absolute;
  //   bottom: -10px;
  //   height: 10px;
  //   width: 100%;
  //   background: #CCFF99;
  //   border-radius: 0 0 4px;
  // }
}
</style>