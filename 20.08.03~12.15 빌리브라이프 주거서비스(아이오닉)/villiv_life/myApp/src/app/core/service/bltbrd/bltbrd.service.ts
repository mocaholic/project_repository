import { Injectable } from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {Bltbrd} from "../../enums/service/bltbrd.enum";
import {Rply} from "../../enums/service/rply.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class BltbrdService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http, spinnerDialog, globalVars);
  }

  /**
   * 게시판 목록 조회
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.LIST, 'method': "GET"})
  loadBltbrdList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 게시판 중요 글 목록 조회
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.IMPTC_LIST, 'method': "GET"})
  loadBltbrdImptcList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }


  /**
   * 게시판 상세 조회
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.DETAIL, 'method': "GET"})
  loadBltbrdDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 이미지 업로드
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.IMG_UPLOAD, 'method': "POST"})
  uploadImgFile(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 배너 조회
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BANNER.LATEST, 'method': "GET"})
  loadBanner(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 게시판 글 등록
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.INSERT, 'method': "POST"})
  insertBltbrd(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 게시판 글 삭제
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.DELETE, 'method': "POST"})
  deleteBltbrd(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 게시판 글 수정
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.UPDATE, 'method': "POST"})
  updateBltbrd(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 단지장터 판매완료
   * @param proms
   */
  @Action({'action': Bltbrd.ACTIONS_BLTBRD.SALE_DONE, 'method': "POST"})
  updateSaleDone(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
}
