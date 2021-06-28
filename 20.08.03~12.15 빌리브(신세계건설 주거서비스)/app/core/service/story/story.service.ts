import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {StoryEnum} from "../../enums/service/story.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
  providedIn: 'root',
})
export class StoryService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 단지 목록 조회
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.LIST, 'method': "GET"})
  loadBzList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
  /**
   * 동 목록 조회
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.DONG_LIST, 'method': "GET"})
  loadDongListByBz(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
  /**
   * 호 목록 조회
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.HO_LIST, 'method': "GET"})
  loadHoListByDong(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 단지 정보 조회
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.DETAIL, 'method': "GET"})
  loadBzDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 콘텐츠 유형별 이미지, 유의사항, 면적정보 정보
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.CONTENS_DETAIL, 'method': "GET"})
  loadBzContensDetail(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 특화시설 정보 목록
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.SPCL_FCL_LIST, 'method': "GET"})
  loadSpclFclList(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 빌리브 매거진 가져오기
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.VLV_MGZ, 'method': "GET"})
  loadVlvMgz(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }

  /**
   * 계약대기신청 추가
   * @param proms
   */
  @Action({'action': StoryEnum.ACTIONS_BZ.CONT_APL_INSERT, 'method': "POST"})
  insertContApl(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }


}
