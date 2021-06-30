/**
 * 페이징
 */
import {PageCriteriaModel} from "../page-criteria-model";

export class BltbrdSearchModel extends PageCriteriaModel {

  constructor(usePaging: number = 1, perPageNum: number = 10) {
    super(usePaging,perPageNum);
  }

  /**
   * 게시판 유형 코드
   */
  public bltbrdTpCd: string;

  /**
   * 게시판 카테고리
   */
  public bltbrdCat: string = "";

  /**
   * 게시판 상태
   */
  public bltbrdStats: string = "";

  /**
   * 게시판 검색 유형
   */
  public searchType: string = "";

  /**
   * 게시판 검색 단어
   */
  public searchWord: string = "";
}
