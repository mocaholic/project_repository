/**
 * 페이징
 */
import {PageCriteriaModel} from "../../page-criteria-model";

export class PtnrSearchModel extends PageCriteriaModel {

  constructor(usePaging: number = 1, perPageNum: number = 10) {
    super(usePaging,perPageNum);
  }

  /**
   * 업체타입 코드
   */
  public ptnrTp: string = "";

  /**
   * 조회 시작 년
   */
  public searchStrYear: string;

  /**
   * 조회 시작 월
   */
  public searchStrMonth: string;

  /**
   * 조회 종료 년
   */
  public searchEndYear: string;

  /**
   * 조회 시작 월
   */
  public searchEndMonth: string;


  /**
   * 검색 시작일
   */
  public iptYMStart: string = "";

  /**
   * 검색 종료일
   */
  public iptYMEnd: string = "";

}
