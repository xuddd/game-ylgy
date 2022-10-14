<!-- 页面注释 -->
<template>
  <div class="dialog">
    <slot></slot>
  </div>
</template>
  
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
  
@Component({
components: {}
})
export default class Dialog extends Vue {
  
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
  background-color: rgba($color: #000000, $alpha: 0.3);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>