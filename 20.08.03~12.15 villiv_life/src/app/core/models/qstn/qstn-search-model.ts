/**
 * 페이징
 */
import {PageCriteriaModel} from "../page-criteria-model";

export class QstnSearchModel extends PageCriteriaModel {

  constructor(usePaging: number = 1, perPageNum: number = 10) {
    super(usePaging,perPageNum);
  }

  /**
   * 설문/투표 종류
   */
  public qstnKnd: string;

}