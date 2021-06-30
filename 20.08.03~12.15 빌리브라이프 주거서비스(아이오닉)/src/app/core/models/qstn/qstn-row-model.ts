import {QstnItemModel} from "./qstn-item-model";
import {QstnAnsModel} from "./qstn-ans-model";

export class QstnRowModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 행 번호
   */
  public rowNo: number;

  /**
   * 설문/투표 ID
   */
  public qstnId: number;

  /**
   *  행유형
   */
  public rowTp: string;

  /**
   *  행제목
   */
  public rowTtl: string;

  /**
   *  항목 목록
   */
  public qstnItemList: Array<QstnItemModel>;

  /**
   *  답변
   */
  public qstnAnsDTO: QstnAnsModel = new QstnAnsModel();

}
