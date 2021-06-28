import { Injectable } from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {Rply} from "../../enums/service/rply.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class RplyService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 댓글 목록 조회
   * @param proms
   */
  @Action({'action': Rply.ACTIONS_RPLY.LIST, 'method': "GET"})
  loadRplyList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 댓글 등록
   * @param proms
   */
  @Action({'action': Rply.ACTIONS_RPLY.INSERT, 'method': "POST"})
  insertRply(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 댓글 삭제
   * @param proms
   */
  @Action({'action': Rply.ACTIONS_RPLY.DELETE, 'method': "POST"})
  deleteRply(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

}
