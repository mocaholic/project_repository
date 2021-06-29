import {QstnRowModel} from "./qstn-row-model";

export class QstnModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 설문/투표 ID
   */
  public qstnId: number;

  /**
   * 설문/투표 종류
   */
  public qstnKnd: number;

  /**
   *  설문/투표 제목
   */
  public qstnTtl: string;

  /**
   *  설문/투표 상세
   */
  public qstnCts: string;

  /**
   *  설문/투표 시작 일자
   */
  public qstnStrDt: string;

  /**
   *  설문/투표 종료 일자
   */
  public qstnEndDt: string;

  /**
   *  문항 목록
   */
  public qstnRowList: Array<QstnRowModel>;

  /**
   *  답변 유무
   */
  public isAns: boolean;

  /**
   *  총 세대
   */
  public totalHoRepr: number;

  /**
   *  투표 세대
   */
  public voteHoRepr: number;
}
