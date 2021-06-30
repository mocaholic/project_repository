import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {AuthEnum} from "../../enums/service/auth.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 인증번호 요청
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.CERTI_NUM, 'method': "POST"})
  requestCertiNumber(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 인증번호 확인
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.CONFIRM_CERTI_NUM, 'method': "POST"})
  confirmCertiNumber(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 최신 약관 조회
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.LATEST_TERMS, 'method': "GET"})
  loadLatestTerms(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 약관 확인
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.AGREE_TERMS, 'method': "POST"})
  agreeTerms(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 회원 등록 최종 확인
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.REGISTER_CUST, 'method': "POST"})
  registerCust(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 사용자 로그인
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.LOGIN, 'method': "POST"})
  login(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 사용자 로그아웃
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.LOGOUT, 'method': "GET"})
  logout(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 사용자 로그인 체크
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.CHECK, 'method': "POST"})
  loginCheck(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 사용자 탈퇴
   */
  @Action({'action': AuthEnum.ACTIONS_LOGIN.WITHDRAW, 'method': "POST"})
  withdraw(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

}
