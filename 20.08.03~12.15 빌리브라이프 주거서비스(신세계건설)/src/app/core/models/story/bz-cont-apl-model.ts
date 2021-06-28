export class BzContAplModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 공급타입
   */
  public supTp: string;

  /**
   * 이름
   */
  public name: string;

  /**
   * 휴대폰번호
   */
  public mpNo: string;
  get getMpNo() {
    return  this.tel0+this.tel1+this.tel2;
  }
  /**
   * 이메일
   */
  public email: string;

  /**
   * 요청사항
   */
  public reqMatt: string;

  /**
   * 약관동의여부
   */
  public termsCsntYn: string;

  /**
   * tel0
   */
  public tel0: string;
  /**
   * tel1
   */
  public tel1: string;
  /**
   * tel2
   */
  public tel2: string;
}
