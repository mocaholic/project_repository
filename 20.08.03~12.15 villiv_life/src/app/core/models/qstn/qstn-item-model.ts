export class QstnItemModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 아이템 번호
   */
  public itemNo: number;

  /**
   * 설문/투표 ID
   */
  public qstnId: number;

  /**
   *  문항 번호
   */
  public rowNo: string;

  /**
   *  제목
   */
  public itemTtl: string;

  /**
   *  총 선택 수
   */
  public selectedCnt: number;

  /**
   *  가장 표를 많이 받은 아이탬인가?
   */
  public isMaxItem: boolean;

}
