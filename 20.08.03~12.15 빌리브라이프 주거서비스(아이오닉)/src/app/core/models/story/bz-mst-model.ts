import {BzImageModel} from "./bz-image-model";

export class BzMstModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 단지명
   */
  public bzNm: string;

  /**
   * 단지주소
   */
  public bzAddr: string;

  /**
   * 임대료 파일 아이디
   */
  public rfeFileId: string;

  /**
   * 관리사무소 전화번호
   */
  public mofcTelno: string;

  /**
   * 대지면적
   */
  public erthSqms: string;

  /**
   * 공급면적
   */
  public splSqms: string;

  /**
   * 규모
   */
  public scal: string;

  /**
   * 총 세대 개수
   */
  public totHhldCnt: string;

  /**
   * 총 주차 개수
   */
  public totParkCnt: string;

  /**
   * 준공월
   */
  public ccnstMm: string;

  /**
   * 단지배치도 모델
   */
  public bzLayoutModel: BzImageModel;

  /**
   * 대표이미지 모델
   */
  public mainImageModel: BzImageModel;


}
