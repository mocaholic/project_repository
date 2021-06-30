import {FileModel} from "../file-model";

export class BnerModel {
  constructor() {}
  /**
   * 배너 ID
   */
  public bnerId: string;

  /**
   * linkUrl
   */
  public linkUrl: string;

  /**
   * 모바일 이미지 파일 경로
   */
  public mpImgFileIdPath: string;

  /**
   * pc 이미지 파일 경로
   */
  public pcImgFileIdPath: string;
}
