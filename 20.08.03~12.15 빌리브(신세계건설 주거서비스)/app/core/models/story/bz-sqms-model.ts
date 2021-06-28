import {BzImageModel} from "./bz-image-model";

export class BzSqmsModel {
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
   * 전용면적
   */
  public exsueArea: string;

  /**
   * 공용면적
   */
  public cmsueArea: string;

  /**
   * 공급면적
   */
  public supArea: string;

  /**
   * 기타공용면적
   */
  public etcCmsueArea: string;

  /**
   * 계약면적
   */
  public contArea: string;

  /**
   * 방 개수
   */
  public roomCnt: string;

  /**
   * 평면도 모델
   */
  public planModel: BzImageModel;

  /**
   * 평면배치도 모델
   */
  public planLayoutModel: BzImageModel;


}
