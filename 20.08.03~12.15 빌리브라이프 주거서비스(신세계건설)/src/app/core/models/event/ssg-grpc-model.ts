import {SsgGrpcCtsModel} from "./ssg-grpc-cts-model";

export class SsgGrpcModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 이벤트 ID
   */
  public eventId: string;

  /**
   * 그룹사 ID
   */
  public grpcId: string;

  /**
   * 카테고리 코드
   */
  public catCd: string;

  /**
   * 그룹사명칭
   */
  public grpcNm: string;

  /**
   * 그룹사소개
   */
  public grpcIntd: string;

  /**
   * 그룹상세소개
   */
  public grpDtlIntd: string;

  /**
   * 컨텐츠 제목
   */
  public ctsTtl: string;

  /**
   * 링크 제목
   */
  public linkTtl: string;

  /**
   * 링크 URL
   */
  public linkUrl: string;

  /**
   * 메인 노출용 pc 로고 파일 경로
   */
  public pcMlogoFileIdPath: string;

  /**
   * 메인 노출용 mp 로고 파일 경로
   */
  public mpMlogoFileIdPath: string;

  /**
   * pc 로고 파일 경로
   */
  public pcLogoFileIdPath: string;

  /**
   * mp 로고 파일 경로
   */
  public mpLogoFileIdPath: string;

  /**
   * pc 이미지 파일 경로
   */
  public pcImgFileIdPath: string;

  /**
   * mp 이미지 파일 경로
   */
  public mpImgFileIdPath: string;

  /**
   * 컨텐츠 보이기 여부
   */
  public isShowCts: boolean;

  /**
   * 컨텐츠 목록
   */
  public contentsList: SsgGrpcCtsModel[];

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
