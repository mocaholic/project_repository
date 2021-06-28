import {Component, HostBinding, OnInit} from '@angular/core';
import {EventService} from "../../../../core/service/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventModel} from "../../../../core/models/event/event-model";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {EventViewPage} from "../../common/event-view-page";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VUtils} from "../../../../core/utils/v-utils";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import GlobalConstants from "../../../../core/constants/global-constants";
import {SystemService} from "../../../../core/service/system/system.service";

@Component({
  selector: 'app-bizaround-view',
  templateUrl: './event-biz-around-view.page.html',
  styleUrls: ['./event-biz-around-view.page.scss'],
})
export class EventBizaroundViewPage extends EventViewPage {

  constructor(
      public eventService: EventService
      , public systemService: SystemService
      , public route: ActivatedRoute
      , public pageUtils: VPageUtils
      , public globalVars: VGlobalVars
      , public eventUtils: VEventUtils

      , router: Router
  ) {
    super(eventService,systemService,route,pageUtils,globalVars,eventUtils,router);
  }

  ionViewDidEnter() {
    this.eventId = this.route.snapshot.params['eventId'];
    if (VUtils.isValidDbRowId(this.eventId)) {
      this.onLoadEvent();
    } else {
      this.eventUtils.alert("잘못된 접근입니다.")
      this.pageUtils.navigateForward('/');
    }

  }

  /**
   * 주변상권 이벤트 목록 페이지로 이동
   */
  goEventBizAroundListPage(): void {
    this.pageUtils.navigateForward(GlobalConstants.MENU.LC_EVT_CCL.URL);
  }
}
