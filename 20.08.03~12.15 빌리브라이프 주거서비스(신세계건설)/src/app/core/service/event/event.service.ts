import { Injectable } from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {EventEnum} from "../../enums/service/event.enum";
import {ServiceModel} from "../ServiceModel";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class EventService extends ServiceAbstract {


  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * SSG 그룹사 목록 조회
   * @param proms
   */
  @Action({'action': EventEnum.ACTIONS_SSG_GRPC.LIST, 'method': "GET"})
  loadSsgGrpcList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 이벤트 목록 조회
   * @param proms
   */
  @Action({'action': EventEnum.ACTIONS_EVENT.LIST, 'method': "GET"})
  loadEventList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 이벤트 상세 조회
   * @param proms
   */
  @Action({'action': EventEnum.ACTIONS_EVENT.DETAIL, 'method': "GET"})
  loadEventDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

}
