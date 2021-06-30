export class BzNtcsModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 컨텐츠 유형
   */
  public ctsTp: string;

  /**
   * 유의사항
   */
  public ntcMatt: string;

  /**
   * 유의사항 개행으로 구분해놓은 목록
   */
  public ntcMattList: Array<string>;

}
