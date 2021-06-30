export class EventModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 이벤트 ID
   */
  public eventId: number;

  /**
   * 카테고리 코드
   */
  public catCd: string;

  /**
   * 종류
   */
  public knd: string;

  /**
   * 이벤트 제목
   */
  public eventTtl: string;

  /**
   * 상호 이름
   */
  public enmName: string;

  /**
   * 이벤트 시작 일자
   */
  public eventStrDt: string;

  /**
   * 이벤트 종료 일자
   */
  public eventEndDt: string;

  /**
   * pc 썸네일 파일 id
   */
  public pcThumbFileId: number;

  /**
   * pc 썸네일 파일 경로
   */
  public pcThumbFileIdPath: string;

  /**
   * 모바일 썸네일 파일 id
   */
  public mpThumbFileId: number;

  /**
   * 모바일 썸네일 파일 경로
   */
  public mpThumbFileIdPath: string;

  /**
   * pc 이미지 파일 id
   */
  public pcImgFileId: number;

  /**
   * 이미지 파일 경로
   */
  public imgFileIdPath: string;

  // /**
  //  * 모바일 이미지 파일 id
  //  */
  // public mpImgFileId: number;

  /**
   * 모바일 이미지 파일 경로
   */
  public mpImgFileIdPath: string;

  /**
   * 링크 URL
   */
  public linkUrl: string;

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
