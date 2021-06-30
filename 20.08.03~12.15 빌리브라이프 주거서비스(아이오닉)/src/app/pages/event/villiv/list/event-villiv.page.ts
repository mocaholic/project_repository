import {Component} from '@angular/core';
import {SystemService} from "../../../../core/service/system/system.service";
import {EventService} from "../../../../core/service/event/event.service";
import {EventSearchModel} from "../../../../core/models/event/event-search-model";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {EventListPage} from "../../common/event-list-page";
import {CodeEnums} from "../../../../core/enums/code-enums";
import GlobalConstants from "../../../../core/constants/global-constants";

import {Router} from "@angular/router";

@Component({
    selector: 'app-event-villiv',
    templateUrl: './event-villiv.page.html',
    styleUrls: ['./event-villiv.page.scss'],
})
export class EventVillivPage extends EventListPage {

    constructor(
        public systemService: SystemService
        , public eventService: EventService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars

        , router: Router
    ) {
        super(systemService,eventService,pageUtils,globalVars,router);

    }

    /**
     * ngOnInit
     */
    ngOnInit() {
    }

    ionViewDidEnter() {
        this.search = new EventSearchModel(1,this.globalVars.isPc ? 10 : 5,"A");
        this.onLoadEventCatCdList(CodeEnums.VillivEventCat);
        this.onLoadEventList();
    }

    /**
     * 빌리브 이벤트 상세 페이지로 이동
     */
    goEventDetailPage(eventId): void {
        this.pageUtils.navigateForward(GlobalConstants.MENU.LC_EVT_VLV_VIEW.URL+'/'+eventId);
    }
}
