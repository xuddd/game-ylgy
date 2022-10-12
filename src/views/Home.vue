<template>
  <div class="home-index" ref="home">
    <div class="header">
      <h2>包子的🐑</h2>
    </div>
    <div class="home-content">
      <BGRegion></BGRegion>
      <div class="content-wrapper">
        <template v-if="!isStarted">
          <div class="start-box">
            <div class="start-content">

            </div>
            <div class="start-bottom">
              <el-button type="primary" size="medium" @click="handleStart">开始游戏</el-button>
            </div>
            
          </div>
        </template>
        <template v-else>
          <div class="content">
            <BlockRegion @clickBlock="handleClickBlock"></BlockRegion>
          </div>
          <div class="region">
            <Block v-for="(block,index) in bottomList"
                    :key="index"
                    :option="block"></Block>
          </div>
        </template>
      </div>
      <audio id="audio" v-show="false" controls muted loop autoplay src="@/assets/audio/BGM.flac">
      </audio>
      <audio id="audio-notice" v-show="false" src="@/assets/audio/咚.wav" volume="1.0"></audio>
    </div>
    <div class="home-footer">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Block from "./Block.vue";
import BlockRegion from "./BlockRegion.vue"
import BGRegion from "./BGRegion.vue"
import {BlockModel} from "@/model/BlockModel"
@Component({
  components: {
    Block,
    BlockRegion,
    BGRegion
  },
})
export default class Home extends Vue {
  private bottomList: any[] = [];
  private bgList: any =  [];
  private isStarted = false;
  private classSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAN/klEQVR4Xu1ae5gcVZX/neruQUBCEiXPSVdlCSFACMuKwoLrR/TbVREQViczXZOACZmqiQpq+FzcFZd8iu9V5CVT1cMzpGomg4CJiPK5Cz4gIGEXUR5GwKrOA4GEZJMQkunuOvvdqq7q6p6e6cdEvlVS/1XVufec+zvn3HvuOYfwFn/oLb5+HALgkAW8xRE45AINGwCDFt/cfizl87tXr3j5lYbHvYmEHf3tkw/Q/vy6Zdv3gsCNsG7aArr6Zp3GhMmD+uYHGmHwZtF0m/KHIfHuNctzDzfDs2kAxOQdNx7z9lTyyCV5r7BuaMWWrc0wPNi0iw15ehHUmXpbfvUdF2/d0ez8LQEQMukylV6Wir+iorRAAl3MhMOIuQDgkfyk4teHFm15o1mBxqLv7kufWExIU6SEl7OW5V7MmOmTCNK5luZ8s1U+4wJgcX/7HK+YfAKECdUCMOM5MC+ze90NrQoXjssY6fcSyADRidFcjFcYeK3QhoVDS50/tcqjZQA6+2fNTxQTD9dafEyYPV4RCwZWOE6rAnZl0x8nj2wiStacg3lnUcJZgz3us63waBmAjCH/iIg+EjJlYfpEDxNwOoC3lTXFd1u6+7FWhBOaB9FDBEqMNZ6ZN9i6e2YrPFoCoOOm9pmpRHJLbPEb3mijc+5d6uxS+2fL7PEDBMwV/xnMBc4rQ/q2XLMCqqbyPwD+NuIDXAsevlqCNJ2RvAGE94X/iPD3a3qcR5vl0RIAXVnlbInxYCSYx2fGfb2rL/0BSZJ+FhP8W7bmXNGMcF2mfKEEujvm80OW7iwK3zuy8uwU04sxHv9ma87Xm+EhaFsCQDWVDwL4ScScCqfYPVueijNXDfnpaNNi3rHzQGrm/Zc9f6BRATOm/AyBTvDpmb0ivLmD+uYXKniYym4ARwWWhqZBbhmA7jsnT+B9E/637AL4V1t3vlEJgLIChO+XrcRbYvfm7mwEALHxSSwNxWhvszRnaXxst9F+MlMyAp3hXWZruesbmT9O05IFiAkyhvw4EZ0WaAg5S3OUePh5njHjiKPQ9lJ4SjSzUcW1z+AiJ/OzB5Zt21xlYWtApIbfJKlw3J3Ltzz/pgGgZuVLwNQfMvSYzx3Q3fviAmRM+ToCXVr2U2++reWeHktI1VS6ANhlGr7Z0tzl8TGdxqxjE5A2gUgKPAT32rpzYbOLb9kFxMAPXzfnsEmHFV6JNAz+sa250bEoaHxBKVHWCsO0dEcfTdBVqyD9frq8iYiODQxrFO2bigBIAOU/ReIT3/Q4IHAD5RoifLYkbM3jLmMq4kj8x8BVeB8duWf6msWvic1rxKOacjdA5X2iBmCdWfmEBNMzZaviH9ia+/FWtD8uCxCD/VDYS/4hxvybluZ8IS5MlznrfAmJH0bfmC+1dPeGaoFHah/DnByeU+37GVMZJCA6Dsej/XEDICZQDflnIPpAScM7ts11pz20EOJC5D/BwhSHCLOCL/y8pbnHVQOgmuklgHRHDKibLN39ZJyuWvtgDFq6E7lCK1bQ8ikQMsuY8scIdFeZOS+2NHdNXBjVVEQQFB2THmHhQI/zUJwmfqowMFxIQa6+5GRM+S4CBWG1iA0kzG/V90Pe4wagpOGtRJjmywV+xNbcs+KLu+j2me/I708JmsMCGqy1NaczpOlYi7bULiUKkhictTVXG1v7bFm6292K1uNjxg2A7wZZ5SowVoUTM0Yed6qp3ArgE4HyuJA8fP/E1Re9/Lp4X3LT1CnFxOEvR+M9LLN7HUEfPRlTvptAwVE3SmTYChgHBYCOW5VpqWHeGp3LgGFrTm9coO7+9FnsSb8qL9I73+7NrRfvwoo2TVf2g5AK/lee/Wo2/S6wtDHmZqstzb2olQVXjzkoAIhJq/xz3x7kj1mvb9sXMrzgVmXiEXnsDN89YMWA5vSF76oprwfo3EhAhsmMeyTJSzLTtSD6m4OtfTHfQQNgxA2QvStsPfetcEGZrPx+YvrP8gK9RZaei+L9TkP+O4mwkUB1ZOIbLM2NosvxWsFBA8C3AkN5lgjzSn7+BoEuz2P4voSUkCVPGgTR9ECLyOcThWlDy7e8Fl+AaigrmPjG0UAQaba9GH5X3LL+XwGgGukOkLS2rlDMN1q6++ladN1m+lyPpeuJoMT+7wH4Wjpiz7dHiyLr8hyF4KBaQGAF8moiWjyGQD/NT3TOH1qE4dFo1FKsz4zHpIR3+fAE778PdoY55D02AAzqNOVTSfKOnOBtftTUkW8EaV+LkC4HcCYBbbHd+/P5ie41Q4tQHGse1VBeBmEKg79ra66Yp+mnq18+FUxHA8Vi8WjeOBqAdS3g7AeRnPYH+TwJ9E8e+PHiRPf2egsIpRUBTnKncg4R7hHfilycU53VqV5ZxlDmESHM8C61NOe2ZlbfnVXOYMZnADyaZ+m2If3FKHFTa566AFRsUlnlo8x8medJKwd7//ibRgTrWItEcpd8wM/sknex1ZMrx/s1JhAbYZRJIu80qyf3RCN81O+nJyEhGUx4tjDR+epYLhafrykAxMBOc+ZciVM/J3hXWXrObES4jKFsIsJxtULcERYQu+29nZ22RtxOmDsVsR4Sfd7ucWLJlPrSNQ2AmDJgSBuIcIWlOdfWYxMFOczPWLp70pj+byoiWJrIwCZbc46vN7cfP4D+C/C+Fo876o1rbBMcY5ZMn7KUJNzCjAtt3bl3LIYZQ/4PIvI3Mzpi99GjHWWLb559vFfk5wQdo36iw69BFL2HiWijpTkXNLrocblAxZ5gyhuZcXzBK84bq0rcZaZ7JEi+u9TKHYZzZsz0IoI0GABQP82dMZVfgPm0AvLzWim8+AppBbVwjNo3632QEj+vdQWOz1sRJjN/0dLdr9Xiq5ryVwC60v/HWGnpzjWjyZfpSy8mSVoN5n+3dPcrra5jXAAIphlD/iURvdfz0DXQ6/jaG7GxZdsXECfDU2PA0pxMbQAU4Uof9ddPUEfb0ErX598DnNrD+SnjCY3HD0Bf+jySpHX+ptXjzKvVmuJfl/N4yV8Y8+9s3T25JgCG/EJ466uVNSq7ivwdAq1EnSxzI1YxbgA0A6m9ULaL9LhHXsdATy6WHiuJwCA1q3iBabM39yU3tWoVgvfS4xdSqM1PkARkOMHWHX9DjD/ivOcEbSWiw8H8fkt3oxplIwuuphkVgIwx452g5NR6hQwxoWrKdwLUzeCnbc2dX0uQjCnvINBk8a8oFU8eXL75d3G6LkM5XSJE1d19KUwS1eYRAIT5ReYd+Unu1HpRqWihyVPhqEFt66Zaco1pAaX620oCr12jufePhnBVRvdDlub8tJo2flUWW4elOQNxmoyhXEyEIOxl5C3did0hAsp4hpnBt9iae8loMgnZPSQ+R8QPWlpu9Wh0dV2gY2374aldyUcYeAw8fKWtb9s+cnEz3knU9moge2XCM6RVTeUxAO8R7x74SwOae3WFBZjylRLI380ZvM3W3Jkj+MQz0FyZUKmaaxkxrSLylllaLirTN20BkfBBnL2BCQcK+dfPGvrUq3tHgiD/lojmM+PAXgxPrt6ZM6byIAFnl8b1WZqzosICTFkkQkp1gNq1g3iVyUsUZw5csnlbDRf5Bpg1Jv6HRty3rgWEDPworeA9w0Q/sjXHP6oqTVjOElFQxCRcYPU45WpQkC26nwgf8jXMWG/rzvlVLnAPEYJojvFbS3cWxP/7m1+SXhWXKmb8ydadILsUe8KCLTM+Z+vO92ppvPpbwwCIgWFZymP+9IDu3lipwfSlBOm6YIHcb+tuT9UC1xHhvNK3Jy3NObUKwHK5HfyEpblB6b30VO0RD1i6I5o0okftaz8OUvIpBu/btT81o9FmjKYAEIkOhrQejN07DySnxJmohrwQJC4lPgDbbd09pkJAQ/4BiP65pOFXLN2ZWgmgvJVAMwIDGFlciWeaaiVKMoYSWFCTsUFzAMQ6Q7iqeNF1y4xZUqEt3gh1qqU5T4aLVA1lAAS/GiQap+weNxEFTQzKZOVimAxl4CFbcxZWAbgtllT9pKU7N4X/K+oSDeQc4vM2BUDgBsF5PkJLYhGmPBz28zH4cltzvxsBYMp3ALQkfPeSw+mw8pvJzp5KzOVmR0aFicdviWJ8kYsfjPcqZwzlC0TwG6S4qmGr2uer31sAQPkNAQtERLc3+frEdZds3xPz0z+G2dzqjU415X6AonPbY5wxoDviaERn3+xTEhJH1jJirJHWQJIR8iHPO2lNby7qEYifMHFg6y1e/G8eAEN5kgin+JMTf8TqcX9c1rIi2mLPqLUPZEylj4CoOySeRxjRdQa+y9bcjghYU7mdgKgUlpcK7whrCiJnOX2TsjcsvOaLhfZmGribBkA1lKdA8C8zDHzZ1pyryoLK9xHonAj5pHesaGoW76opXw9QVAtg8KdszfW7yFRTEUXTWDGU11iaG6XWVUN5DgQ/O1S9f4j2fUlKPB7yzPOw3ExuoBUA/JR1SRjb1tyoU6u6JsBeuQCaMUs3uJKkTPxVu8f17/5xHy79jtriqi9JYN5p6a5/p/DHZpUMMawIdKlwurV8y68bMf+mXcDPvCalqJxVvVurpiJ25qgqzEDUvamaimiQiLpF47F8tXXEq8OqqYhWWdEy6z/MvNXW3faY1a0k0Hei/17j/YjNA1DdIcq80dbdd8d89XsEPycfihuZciYrX01MXyz/Ku/0FZXlgCAKlas1zMwv2Lo7J5xHNeQvgejLMYC+bevuv/xZLKDRSf+S6JreA/6SFteIrIcAaASlv2aaQxbw16zdRtb2f8roi5tcE/hhAAAAAElFTkSuQmCC";
  mounted() {
    this.getBGList();
  }
  handleStart() {
    this.bottomList = [];
    this.isStarted = true;
    var audio: HTMLAudioElement = document.getElementById('audio') as HTMLAudioElement;
    audio.muted = false;
    audio.play();
  }

  private handleClickBlock(block: any, blockListCount: number) {
    this.noticeAudio();
    const oldBIndex = this.bottomList.findIndex(b => b.type === block.type);
    const lastIndex =  this.bottomList.lastIndexOf(block, oldBIndex);
    if(oldBIndex > -1) {
      const s = this.bottomList.slice(oldBIndex);
      this.bottomList.splice(oldBIndex);
      this.bottomList.push(block);
      this.bottomList.push(...s);
          
      if(s.length >= 2 && s[0].type === block.type && s[1].type === block.type) {
        this.bottomList.splice(oldBIndex, 3);
        if(blockListCount === 0) {
          this.$confirm("恭喜您已通关，点击确定返回首页", "",)
          .then(() => {
            this.isStarted = false;
          });
        }
      }
    } else {
      this.bottomList.push(block);
    }
    if(this.bottomList.length >= 7) {
      this.$message.success("闯关失败！");
      this.isStarted = false;
    }
  }

  private noticeAudio() {
    const audio: any = document.getElementById("audio-notice");
    audio.load();
    audio.play();
  }

  private getTop(row: number) {
    return `${(8 - row) * (40 + 35) - 40}px`;
  }

  private getLeft(col: number) {
    return `${col * (40 + 23)}px`;
  }

  private getBGList() {
    let list = [];
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
}
</script>
<style lang="scss" scoped>
.home-index {
  width: 100%;
  height: 100%;
  max-height: 844px;
  max-width: 390px;
  background: #ccff99;
  padding: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .home-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    top: 0;
    left: 0;
    position: relative;
    .content-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .start-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        .start-content {
          height: 76%;
        }
        .start-bottom {
          height: 24%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .content {
        width: 350px;
        flex: 1;
        overflow: hidden;
        position: relative;
        
        .content-block-region {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          padding: 0;
        }
      }
      .region {
        width: 350px;
        display: flex;
        background: #965a1c;
        border: 10px #c1812f solid;
        height: 64px;
        align-items: center;
        padding: 0 1px;
        border-radius: 5px;
        margin-bottom: 10px;
      }
    }
    .footer {
      width: 350px;
      display: flex;
      justify-content: space-between;
      padding: 10px 30px;
      .btn-block {
        height: 60px;
        width: 60px;
        background: #6699ff;
        border-radius: 4px;
        display: flex;
        align-content: center;
        text-align: center;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
        i {
          width: 34px;
          height: 34px;
          display: block;
        }
        .btn1 {
          background: url("~@/assets/images/取出.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .btn2 {
          background: url("~@/assets/images/回退.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .btn3 {
          background: url("~@/assets/images/refresh.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  
}
</style>
