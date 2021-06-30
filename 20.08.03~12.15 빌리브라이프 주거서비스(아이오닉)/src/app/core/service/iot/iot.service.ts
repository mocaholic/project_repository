import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";
import {BsSvcEnum} from "../../enums/service/bs-svc.enum";
import {IotEnum} from "../../enums/service/iot.enum";

@Injectable({
  providedIn: 'root',
})
export class IotService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 기기 목록 조회
   */
  @Action({'action': IotEnum.ACTIONS_IOT.DEVICE_LIST, 'method': "GET"})
  loadDeviceList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 에너지 사용량 목록 조회
   */
  @Action({'action': IotEnum.ACTIONS_IOT.USAGE_LIST, 'method': "GET"})
  loadUsageList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 입출차 목록 조회
   */
  @Action({'action': IotEnum.ACTIONS_IOT.PARKING_HISTORY_LIST, 'method': "GET"})
  loadParkingHistoryList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 택배 목록 조회
   */
  @Action({'action': IotEnum.ACTIONS_IOT.PARCEL_HISTORY_LIST, 'method': "GET"})
  loadParcelHistoryList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 토큰 조회
   */
  @Action({'action': IotEnum.ACTIONS_IOT.GET_TOKEN, 'method': "GET"})
  getToken(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 로그인(토큰 저장)
   */
  @Action({'action': IotEnum.ACTIONS_IOT.LOGIN, 'method': "POST"})
  login(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 정보 조회
   */
  @Action({'action': IotEnum.ACTIONS_IOT.GET_INFO, 'method': "POST"})
  getInfo(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 디바이스 조작
   */
  @Action({'action': IotEnum.ACTIONS_IOT.SET_DEVICE, 'method': "POST"})
  setDevice(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
}
