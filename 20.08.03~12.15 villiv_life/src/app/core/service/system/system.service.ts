import { Injectable } from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {SystemEnum} from "../../enums/service/system.enum";
import {ServiceModel} from "../ServiceModel";
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import {VGlobalVars} from "../../utils/v-global-vars";
@Injectable({
  providedIn: 'root',
})
export class SystemService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 소분류 공통코드 조회
   * @param proms
   */
  @Action({'action': SystemEnum.ACTIONS_COMMON_CODE.COMMON_SUBCODE_LIST, 'method': "GET"})
  commonSubCode(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 공통 API KEY
   * @param proms
   */
  @Action({'action': SystemEnum.ACTIONS_COMMON_CODE.COMMON_API_KEY, 'method': 'GET'})
  commonAPIKey(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * push 목록 가져오기
   * @param proms
   */
  @Action({'action': SystemEnum.ACTIONS_PUSH.LIST, 'method': 'GET'})
  loadPushList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * push 목록 가져오기
   * @param proms
   */
  @Action({'action': SystemEnum.ACTIONS_PUSH.SET_PUSH, 'method': 'POST'})
  updatePushSetting(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 액션로그
   * @param proms
   */
  @Action({'action': SystemEnum.ACTIONS_LOG.ACTION_INSERT, 'method': 'POST'})
  insertActionLog(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 최신버전 가져오기
   * @param proms
   */
  @Action({'action': SystemEnum.ACTIONS_VER.NEWSET, 'method': 'GET'})
  loadNewestVer(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
}
