import {FileModel} from "../file-model";

export class BltbrdModel {
  constructor() {}
  /**
   * 단지 코드
   */
  public bzCd: string;

  /**
   * 게시판 ID
   */
  public bltbrdId: number;

  /**
   * 게시판 원글 ID
   */
  public bltbrdOriId: number;

  /**
   *  게시판 유형코드
   */
  public bltbrdTpCd: string;

  /**
   *  게시판 카테고리
   */
  public bltbrdCat: string;

  /**
   *  게시판 제목
   */
  public bltbrdTtl: string;

  /**
   *  게시판 내용
   */
  public bltbrdCts: string;

  /**
   *  게시판 순서
   */
  public bltbrdSo: string;

  /**
   *  게시판 상태
   */
  public bltbrdStats: string;

  /**
   * 중요여부
   */
  public imptcYn: string;


  /**
   * 썸네일 이미지 링크
   */
  public thumbImagePath: string;

  /**
   * 신고사유
   */
  public dclRsn: string;

  /**
   * 입력자 id
   */
  public iptId: string;

  /**
   * 입력일시
   */
  public iptDtm: string;

  /**
   * 입력자 ip
   */
  public iptIp: string;
  /**
   * 입력자 ID
   */
  public custId: string;
  /**
   * 입력자 이름
   */
  public custNm: string;

  /**
   * 입력자 이름 마스킹처리
   */
  public custNmMasked: string;

  /**
   * 입력자 사는 동
   */
  public custBlNo: string;

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
   * 문의하기 게시판 답변 여부
   */
  public ansStatus: string;

  /**
   * 문의하기 게시판 답변 일시
   */
  public ansIptDtm: string;

  /**
   * 컨텐츠 보이기 여부
   */
  public isShowCts: boolean;

  /**
   * 첨부파일 목록
   */
  public bltbrdAtchList: FileModel[];

  /**
   * 이전글 id
   */
  public prevId: number;
  /**
   * 다음글 id
   */
  public nextId: number;

  /**
   * 문의하기 게시판 답변
   */
  public answer: BltbrdModel;
}
