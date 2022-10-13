import { BlockModel } from "@/model/BlockModel";

export default class CreateBlock {
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
      let startTop = zindex * 35;
      let startLeft = zindex * 30;
      for (let row = 0; row < 8 - zindex; row++) {
        for (let col = 0; col < 7 - zindex; col++) {
          let block = new BlockModel();
          // block.x = this.getLeft(col, startLeft);
          // block.y = this.getTop(row, startTop);
          block.rowIndex = row;
          block.colIndex = col;
          block.z = 5 - zindex;
          block.isEmpty = Math.random() > 0.7 //Number((Math.random() * 10).toFixed(0)) % 2 === 0;
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
}