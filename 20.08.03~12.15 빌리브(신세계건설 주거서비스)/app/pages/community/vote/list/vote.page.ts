import { Component, OnInit } from '@angular/core';
import {QstnListPage} from "../../../../components/v-qstn/qstn-list-page";
import {SystemService} from "../../../../core/service/system/system.service";
import {QstnService} from "../../../../core/service/qstn/qstn.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import GlobalConstants from "../../../../core/constants/global-constants";

import {Router} from "@angular/router";
@Component({
  selector: 'v-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage extends QstnListPage{

  constructor(
      public systemService: SystemService
      , public qstnService: QstnService
      , public pageUtils: VPageUtils
      , public globalVars: VGlobalVars
      , public eventUtils: VEventUtils

      , router: Router
) {
    super(systemService,qstnService,pageUtils,globalVars,eventUtils,router)
  }


  ngOnInit() {
  }
  ionViewDidEnter() {
    this.qstnSearchModel.qstnKnd = 'B';
    //진행중가져오기
    this.loadQstnList();
    //종료가져오기
    this.loadQstnList(true);
  }
  /**
   * 투표 결과 페이지로 이동
   */
  goResultPage(qstnId): void {
    this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CM_VOT_RESULT.URL+'/'+qstnId);
  }


}
