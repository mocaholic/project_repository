/**
 * 페이징
 */
import {PageCriteriaModel} from "../page-criteria-model";

export class RplySearchModel extends PageCriteriaModel {

  constructor(usePaging: number = 1, perPageNum: number = 3) {
    super(usePaging,perPageNum);
  }

  /**
   * 게시판 Id
   */
  public bltbrdId: number;

}