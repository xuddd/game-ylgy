<!-- 页面注释 -->
<template>
  <div class="dialog">
    <div class="dialog-content">
      <i class="el-icon-circle-close config-close" @click="handleClose"></i>
      <slot></slot>
    </div>
  </div>
</template>
  
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
  
@Component({
components: {}
})
export default class Dialog extends Vue {
  handleClose() {
    this.$emit("close");
  }
}
</script>
  
<style lang="scss" scoped>
.dialog {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: rgba($color: #000000, $alpha: 0.2);
  .dialog-content {
    width: 80%;
    height: 70%;
    background: url("~@/assets/images/dialog-bg.jpeg") 0 0 no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    position: relative;
    .config-close {
      position: absolute;
      font-size: 30px;
      color: #fff;
      right: 8px;
      top: 8px;
      cursor: pointer;
      transition: transform 0.4s ease-in;
      &:hover {
        transform: rotate(180deg);
        opacity: 0.7;
      }
    }
  }
}
</style>