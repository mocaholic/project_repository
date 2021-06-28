
export class BsPtnrModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 업체 ID
   */
  public ptnrId: string;

  /**
   * 서비스 ID
   */
  public svcId: string;

  /**
   * 업체명
   */
  public ptnrNm: string;

  /**
   *  유의사항
   */
  public ntcMatt: string;

  /**
   *  취소환불정책
   */
  public cncPlcy: string;

  /**
   *  업체타입
   *  A 영랑호
   *  B 일반
   */
  public ptnrTp: string;

  /**
   * 입력자 id
   */
  public ipdId: string;

  /**
   * 입력일시
   */
  public iptDtm: string;

  /**
   * 입력자 ip
   */
  public iptIp: string;

  /**
   * 입력자 이름
   */
  public custNm: string;

  /**
   * 수정자 id
   */
  public updId: string;

  /**
   * 수정일시
   */
  public updDtm: string;

  /**
   * 수정자 ip
   */
  public updIp: string;
}
