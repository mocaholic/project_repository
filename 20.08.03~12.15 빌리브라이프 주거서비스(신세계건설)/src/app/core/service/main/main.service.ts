import { Injectable } from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {EventEnum} from "../../enums/service/event.enum";
import {ServiceModel} from "../ServiceModel";
import {MainEnum} from "../../enums/service/main.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class MainService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }
  /**
   * 지역별 사업지 목록 조회
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_GATE.LIST, 'method': "GET"})
  loadTerrBzList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 날씨 정보 조회
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_WEATHER.INFO, 'method': "POST"})
  loadWeatherInfo(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 약관 조회
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_TERMS.DETAIL, 'method': "GET"})
  loadTermsInf(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 약관 버전목록 조회
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_TERMS.VER_LIST, 'method': "GET"})
  loadTermsVersionList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 약관 개정여부
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_TERMS.CHECK_CHANGE, 'method': "GET"})
  checkTermsChanged(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 약관 개정 확인
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_TERMS.CONFIRM_TERMS_CHANGE, 'method': "POST"})
  confirmTermsChanged(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 메뉴 목록 조회
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_MENU.LIST, 'method': "GET"})
  loadMenu(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 메인 컨텐츠 내용 조회
   * @param proms
   */
  @Action({'action': MainEnum.ACTIONS_CONTENTS.LIST, 'method': "GET"})
  loadMainContents(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
  bzMain

}
