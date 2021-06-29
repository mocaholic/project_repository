import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";
import {BsSvcEnum} from "../../enums/service/bs-svc.enum";

@Injectable({
  providedIn: 'root',
})
export class BsSvcService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 우리단지 서비스 상세 조회
   */
  @Action({'action': BsSvcEnum.ACTIONS_BS_SVC.DETAIL, 'method': "GET"})
  loadDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 제휴업체 상세 조회
   */
  @Action({'action': BsSvcEnum.ACTIONS_PTNR.DETAIL, 'method': "GET"})
  loadPtnrDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 제휴업체 예약
   */
  @Action({'action': BsSvcEnum.ACTIONS_PTNR.INSERT, 'method': "POST"})
  insertPtnrResv(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }


  /**
   * 문화강좌 목록 가져오기
   */
  @Action({'action': BsSvcEnum.ACTIONS_LEC.LIST, 'method': "GET"})
  loadLecList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 문화강좌 상세 가져오기
   */
  @Action({'action': BsSvcEnum.ACTIONS_LEC.DETAIL, 'method': "GET"})
  loadLecDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 문화강좌 신청하기
   */
  @Action({'action': BsSvcEnum.ACTIONS_LEC.INSERT, 'method': "POST"})
  insertLecApply(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 문화강좌 신청여부 확인하기
   */
  @Action({'action': BsSvcEnum.ACTIONS_LEC.CHECK, 'method': "POST"})
  isExistLecApply(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 조식 상세 조회
   */
  @Action({'action': BsSvcEnum.ACTIONS_LNCH.DETAIL, 'method': "GET"})
  loadLnchDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 조식 상세 조회
   */
  @Action({'action': BsSvcEnum.ACTIONS_LNCH.INSERT, 'method': "POST"})
  applyLnch(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 예약 상품 조회
   */
  @Action({'action': BsSvcEnum.ACTIONS_RESV_PRD.DETAIL, 'method': "GET"})
  loadResvPrdDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 내부 예약
   */
  @Action({'action': BsSvcEnum.ACTIONS_RESV_PRD.INSERT, 'method': "POST"})
  applylResv(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
}
