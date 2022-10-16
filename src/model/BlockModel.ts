import { Common } from "@/utils/Common";
export class BlockModel {
  /**
   *
   */
  constructor() {
    this.id = Common.getNewGuid();
  }
  public id = "";
  public type = 0;

  public src = "";

  public x: number | string = 0;

  public y: number | string = 0;

  public z = 0;

  public rowIndex =  0;

  public colIndex = 0;

  public isEmpty = false;
}