import {LnchPrdModel} from "./lnch-prd-model";

export class LnchMstModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 서비스 아이디
   */
  public svcId: string;

  /**
   * 조식 상품명
   */
  public lnchNm: string;

  /**
   *  유의사항
   */
  public ntcMatt: string;

  /**
   *  취소환불정책
   */
  public cncPlcy: string;

  /**
   *  무료혜택 여부
   */
  public freeYn: string;

  /**
   *  무료혜택 시작일자
   */
  public freeStrDt: string;

  /**
   *  무료혜택 종료일자
   */
  public freeEndDt: string;

  /**
   *  운영상태 여부
   */
  public opYn: string;

  /**
   *  예약불가사유
   */
  public rejectRsn: string;

  /**
   *  최대주문 수량
   */
  public maxOrdCnt: string;

  /**
   *  예약가능 범위
   *  ex) 1 이라면 1달뒤까지 가능
   */
  public mnthRng: string;

  /**
   *  예약일제한 일자
   *  ex) 2 이라면 2일 후부터 선택가능
   */
  public rcvLmtDt: string;

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

  /**
   * 상품목록
   */
  public lnchPrdList: Array<LnchPrdModel>;

  /**
   * 조식 무료혜택 제외 일자 목록
   */
  public lnchFreoffList: Array<LnchFreOffModel>;

}
export class LnchFreOffModel {

  /**
   * 휴무일
   */
  dyofDtm: string;

}
