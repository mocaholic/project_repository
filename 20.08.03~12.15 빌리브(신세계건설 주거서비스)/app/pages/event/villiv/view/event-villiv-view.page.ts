import {Component} from '@angular/core';
import {EventService} from "../../../../core/service/event/event.service";
import {ActivatedRoute, Router} from '@angular/router';
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {EventViewPage} from "../../common/event-view-page";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {VUtils} from "../../../../core/utils/v-utils";
import GlobalConstants from "../../../../core/constants/global-constants";
import {SystemService} from "../../../../core/service/system/system.service";

@Component({
    selector: 'app-villiv-view',
    templateUrl: './event-villiv-view.page.html',
    styleUrls: ['./event-villiv-view.page.scss'],
})
export class EventVillivViewPage extends EventViewPage {

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
     * 이벤트 목록 페이지로 이동
     */
    goEventListPage(): void {
        // console.log(this.globalVars.isShowMenu);
        this.pageUtils.navigateForward(GlobalConstants.MENU.LC_EVT_VLV.URL);
    }
}
