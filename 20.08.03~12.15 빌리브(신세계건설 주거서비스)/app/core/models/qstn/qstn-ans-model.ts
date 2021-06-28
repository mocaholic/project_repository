export class QstnAnsModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 답변 번호
   */
  public ansNo: number;

  /**
   * 설문/투표 ID
   */
  public qstnId: number;

  /**
   *  문항 번호
   */
  public rowNo: number;

  /**
   *  회원 아이디
   */
  public custId: string;

  /**
   *  답변내용
   */
  public ansCts: string ="";

}
