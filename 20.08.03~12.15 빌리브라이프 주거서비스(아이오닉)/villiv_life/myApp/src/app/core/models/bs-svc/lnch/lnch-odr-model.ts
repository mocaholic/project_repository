import {LnchPrdModel} from "./lnch-prd-model";

export class LnchOdrModel {
  constructor() {}

  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 주문내역 ID
   */
  public odrId: string;

  /**
   *  상품 ID
   */
  public prdId: string;

  /**
   *  주문수량
   */
  public odrQnt: number;

  /**
   * 주문가격
   */
  public odrPrc: number;

  /**
   *  무료혜택적용여부
   */
  public useFreeYn: string;

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
   * 상품
   */
  public prdDetail: LnchPrdModel;
  /**
   * 주문가격 계산
   */
  getTotalPrc(isIncludeFree=false) {
    let qnt = this.odrQnt;
    if(isIncludeFree && this.useFreeYn==="1") {
      qnt-=1;
    }
    if(!isIncludeFree) {
      this.odrPrc = qnt*Number(this.prdDetail.prdPrc);
    }
    return qnt*Number(this.prdDetail.prdPrc);
  }

  /**
   * 상품명
   * */
  public prdNm: string;

  /**
   * 상품가격
   * */
  public prdPrc: string;
}
