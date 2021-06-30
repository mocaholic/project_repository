import {LecModel} from "../lec/lec-model";
import {FclModel} from "./fcl.model";
import {ResvPrdModel} from "./resv-prd.model";
import {BsSvcModel} from "../bs-svc-model";
import {LnchMstModel} from "../lnch/lnch-mst-model";
import {LnchOdrModel} from "../lnch/lnch-odr-model";

export class ResvHisModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 예약 코드 (월A,월선착순B,기간C,일D,시간E)
   */
  public resvCd: string;

  /**
   * 예약 ID
   */
  public resvId: string;

  /**
   * 회원 ID
   */
  public custId: string;

  /**
   *  동 번호
   */
  public blNo: string;

  /**
   *  호 번호
   */
  public rmNo: string;

  /**
   *  실 번호
   */
  public rmdNo: string;

  /**
   *  예약 종류(B내부,D조식,E문화강좌)
   */
  public resvTp: string;

  /**
   *  서비스 아이디
   */
  public svcId: string;

  /**
   *  서비스 이름
   */
  public svcNm: string;

  /**
   *  시설 아이디
   */
  public fclId: string;

  /**
   *  시설 이름
   */
  public fclNm: string;

  /**
   *  시설 장소
   */
  public descLoc: string;

  /**
   * 예약 시작일자
   */
  public resvStrDt: string;

  /**
   * 예약 종료일자
   */
  public resvEndDt: string;

  /**
   * 자동연장 여부
   */
  public autoResvYn: string;

  /**
   * 신청자 아이디
   */
  public aplCustId: string;

  /**
   * 신청자 이름
   */
  public aplCustNm: string;

  /**
   *  신청일자
   */
  public aplDt: string;

  /**
   *  예약상태
   */
  public resvStats: string;

  /**
   *  이용상태
   */
  public utStats: string;

  /**
   *  취소여부
   */
  public cncYn: string;

  /**
   *  취소일자
   */
  public cncDt: string;

  /**
   *  취소자 아이디
   */
  public cncCustId: string;

  /**
   *  할인율
   */
  public dcRt: string;

  /**
   *  이용요금
   */
  public fee: string;

  /**
   *  옵션 이용요금
   */
  public feeOptn: string;

  /**
   *  총 이용요금
   */
  public feeTot: string;

  /**
   *  청구월
   */
  public feeReqMm: string;

  /**
   *  옵션 내용
   */
  public optnNm: string;
  
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



  //===================================

  /**
   * 내용
   */
  public lecCts: string;

  /**
   * 강사정보
   */
  public techrInf: string;

  /**
   * 유의사항
   */
  public ntcMatt: string;

  /**
   * 취소환불 정책
   */
  public cncPlcy: string;

  /**
   * 문화강좌
   */
  public lecture: LecModel;

  /**
   * 상품
   */
  public product: ResvPrdModel;

  /**
   * 시설
   */
  public fcl: FclModel;

  /**
   * 우리단지 서비스
   */
  public svc: BsSvcModel;

  /**
   * 조식 마스터
   */
  public lnchMst: LnchMstModel;

  /**
   * 조식 주문목록
   */
  public lnchOdrList: Array<LnchOdrModel>;
}
