import {BsSvcImgModel} from "./bs-svc-img-model";
import {BsSvcLinkModel} from "./bs-svc-link-model";
import {BsPtnrModel} from "./ptnr/bs-ptnr-model";
import {LnchMstModel} from "./lnch/lnch-mst-model";
import {ResvPrdModel} from "./resv/resv-prd.model";

export class BsSvcModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 서비스 ID
   */
  public svcId: string;

  /**
   * 서비스명
   */
  public svcNm: string;

  /**
   *  서비스 그룹코드
   */
  public svcGrpCd: string;

  /**
   *  서비스 그룹명
   */
  public svcGrpCdName: string;

  /**
   *  서비스 형태
   *  A=비예약(일반),  B=내부(시설)예약, C=제휴예약(영랑호, 영구크린), D=조식
   */
  public svcTp: string;

  /**
   *  위치
   */
  public descLoc: string;

  /**
   *  이용대상
   */
  public descTrg: string;

  /**
   *  이용요금
   */
  public descFee: string;

  /**
   * 운영시간
   */
  public descOpTm: string;

  /**
   * 휴무일
   */
  public descDayoff: string;

  /**
   * 이용방법
   */
  public descMthd: string;

  /**
   * 문의처
   */
  public descRefer: string;

  /**
   * 기타이용정보
   */
  public descEtc: string;

  /**
   *  유의사항
   */
  public ntcMatt: string;

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
   * 우리단지 서비스 이미지 목록
   */
  public bsSvcImgList: Array<BsSvcImgModel>;

  /**
   * 우리단지 서비스 링크 목록
   */
  public bsSvcLinkList: Array<BsSvcLinkModel>;

  /**
   * 우리단지 서비스 제휴업체 목록
   */
  public bsSvcPtnrList: Array<BsPtnrModel>;

  /**
   * 우리단지 서비스 내부시설 상품 목록
   */
  public resvPrdList: Array<ResvPrdModel>;

  /**
   * 조식 상세
   */
  public lnchMstDetail: LnchMstModel;
}
