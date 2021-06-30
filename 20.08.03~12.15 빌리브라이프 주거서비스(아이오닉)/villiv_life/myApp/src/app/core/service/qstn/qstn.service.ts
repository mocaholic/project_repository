import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {QstnEnum} from "../../enums/service/qstn.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class QstnService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 설문/투표 목록 조회
   * @param proms
   */
  @Action({'action': QstnEnum.ACTIONS_QSTN.ING_LIST, 'method': "GET"})
  loadIngQstnList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 설문/투표 목록 조회
   * @param proms
   */
  @Action({'action': QstnEnum.ACTIONS_QSTN.END_LIST, 'method': "GET"})
  loadEndQstnList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 설문/투표 상세 조회
   * @param proms
   */
  @Action({'action': QstnEnum.ACTIONS_QSTN.DETAIL, 'method': "GET"})
  loadQstnDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 설문/투표 제출
   * @param proms
   */
  @Action({'action': QstnEnum.ACTIONS_QSTN.INSERT, 'method': "POST"})
  insertQstnAns(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 설문 참여 여부
   * @param proms
   */
  @Action({'action': QstnEnum.ACTIONS_QSTN.CHECK_VOTE_YN, 'method': "GET"})
  checkVoteYn(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 투표 결과
   * @param proms
   */
  @Action({'action': QstnEnum.ACTIONS_QSTN.VOTE_RESULT, 'method': "GET"})
  loadVoteResult(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }



}
