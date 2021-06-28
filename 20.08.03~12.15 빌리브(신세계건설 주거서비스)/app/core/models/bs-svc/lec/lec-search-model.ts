/**
 * 페이징
 */
import {PageCriteriaModel} from "../../page-criteria-model";

export class LecSearchModel extends PageCriteriaModel {

  constructor(usePaging: number = 1, perPageNum: number = 10) {
    super(usePaging,perPageNum);
  }

  /**
   * 강좌 유형
   */
  public lecTp: string = "";

  /**
   * 강좌 상태
   */
  public lecStats: string = "";

}
