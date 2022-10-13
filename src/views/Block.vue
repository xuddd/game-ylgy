<!-- 页面注释 -->
<template>
  <div class="block" @click="handleClick">
    <div class="block-inner">
      <img :src="option.src"/>
    </div>
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
    // this.noticeAudio();
  }

  private noticeAudio() {
    const audio: any = document.getElementById("audio-notice");
    audio.play();
  }
  
}
</script>
  
<style lang="scss" scoped>
.block {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #666666;  
  border-radius: 4px;
  background-color: #339900;
  cursor: pointer;
  .block-inner {
    padding: 5px;
    height: calc(100% - 14px);
    border-radius: 4px;
    background-color: white;
    border-bottom: 1px solid #FFFFCC;
    img {
      width: 100%;
      height: 100%;
      user-select: none;
    }
  }
  
  .mark {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 4px;
    background-color: rgba($color: #000000, $alpha: 0.4);
    pointer-events: none;
  }
}
</style>