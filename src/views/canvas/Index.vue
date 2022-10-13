<!-- 有一个DOM节点，放canvas -->
<!-- 页面注释 -->
<template>
  <div id="canvasWrapper" style="width: 100vw; height: 100vh"></div>
</template>
  
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CanvasFlake from './index'
@Component({
components: {}
})
export default class Test extends Vue {
  mounted() {
    new CanvasFlake({
      parentNode: document.getElementById('canvasWrapper'),
      maxFlake: 780,
      fallSpeed: 5,
      flakeSize: 15
    }).start()
  }
}
</script>
  
<style lang="scss" scoped>
  
</style>


