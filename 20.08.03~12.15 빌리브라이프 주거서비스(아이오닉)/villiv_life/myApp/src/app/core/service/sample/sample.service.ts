import {Injectable} from '@angular/core';
import {ServiceAbstract} from '../ServiceAbstract';
import {Action} from '../../@decorators/ActionDecorator';
import {ServiceModel} from '../ServiceModel';
import {HttpClient} from "@angular/common/http";
import {SampleEnum} from "../../enums/service/sample.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

/**
 * 샘플 서비스
 */
@Injectable({
  providedIn: 'root',
})
export class SampleService extends ServiceAbstract {

  /** Service Constructor **/
  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 데이터 목록 가져오기
   */
  @Action({'action': SampleEnum.ACTIONS.TABLE_DATA})
  loadTableData(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }



}
