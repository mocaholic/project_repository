/**
 * 페이징
 */
import {PageCriteriaModel} from "../page-criteria-model";

export class EventSearchModel extends PageCriteriaModel {

  constructor(usePaging: number = 1,perPageNum: number = 10,knd?: string) {
    super(usePaging,perPageNum);
    this.knd = knd;
  }

  /**
   * 카테고리 코드
   */
  public catCd: string = "";

  /**
   * A=일반이벤트, B=주변상권 이벤트
   */
  public knd: string;

  /**
   * 이벤트ID
   */
  public eventId: number;

}
