import { Injectable } from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {EventEnum} from "../../enums/service/event.enum";
import {ServiceModel} from "../ServiceModel";
import {MainEnum} from "../../enums/service/main.enum";
import {MyPageEnum} from "../../enums/service/my-page.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class MyPageService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 관리비 조회 가능 년도 목록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MY.BILL_YEAR_LIST, 'method': "get"})
  loadBillYearList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 관리비 조회 가능한 년도의 월 목록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MY.BILL_MONTH_LIST, 'method': "get"})
  loadBillMonthList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 관리비 조회
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MY.BILL, 'method': "get"})
  loadBillDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }



  /**
   * 알림 목록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MY.PUSH_LIST, 'method': "get"})
  loadPushList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }



  /**
   * 마이메뉴 목록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MENU.LIST, 'method': "get"})
  loadMyMnuList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
  /**
   * 마이메뉴 수정
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MENU.UPDATE, 'method': "post"})
  updateMyMnu(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
  /**
   * 마이메뉴 등록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MENU.INSERT, 'method': "post"})
  insertMyMnu(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 마이메뉴 삭제
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MENU.DELETE, 'method': "post"})
  deleteMyMnu(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 마이메뉴 등록 유무
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MENU.IS_EXIST, 'method': "post"})
  isExistMyMnu(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }



  /**
   * 제휴서비스 신청내역 목록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_PTNR.LIST, 'method': "get"})
  loadPtnrResvList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 제휴서비스 신청내역 상세
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_PTNR.DETAIL, 'method': "get"})
  loadPtnrResvDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 서비스 신청내역 목록
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_SVC.LIST, 'method': "get"})
  loadResvHisList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 서비스 신청내역 상세
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_SVC.DETAIL, 'method': "get"})
  loadResvHisDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }


  /**
   * 우리집 현황
   * 서비스 존재 유무 가져오기
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MY_HOME.DAY_LIST, 'method': "get"})
  loadMyHomeServiceDayList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 우리집 현황 해당 일자 클릭시
   * 일자별/기간별 내역 가져오기
   * @param proms
   */
  @Action({'action': MyPageEnum.ACTIONS_MY_HOME.HISTORY_BY_DAY, 'method': "get"})
  loadMyHomeServiceByDay(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
}
