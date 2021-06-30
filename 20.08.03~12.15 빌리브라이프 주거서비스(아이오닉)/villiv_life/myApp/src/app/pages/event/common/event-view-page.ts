import {OnInit} from '@angular/core';
import {EventService} from "../../../core/service/event/event.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {EventModel} from "../../../core/models/event/event-model";
import {ActivatedRoute, Router} from "@angular/router";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {BasePage} from "../../BasePage";
import {SystemService} from "../../../core/service/system/system.service";

/**
 * 이벤트 상세 페이지 공통
 * */
export abstract class EventViewPage extends BasePage implements OnInit {

    constructor(
        public eventService: EventService
        , public systemService: SystemService
        , public route: ActivatedRoute
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 이벤트 ID
     */
    eventId: string;
    /**
     * 이벤트 상세
     */
    eventDetail: EventModel;

    /**
     * ngOnInit
     */
    ngOnInit() {
    }


    /**
     * 이벤트 가져오기
     */
    onLoadEvent() {

        const params: any = {
            eventId: this.eventId,
            bzCd: this.globalVars.bzCd
        };
        this.eventService.loadEventDetail(params)
            .then((model) => {
                this.eventDetail = model.result["data"] as EventModel;
                this.onPageReady();
            });
    }
    /**
     * 링크 클릭시 새창으로 열기
     */
    goExternalPage(event: EventModel) {
        this.pageUtils.openNewTab(event.linkUrl);

        const params: any = {
            bzCd: this.globalVars.bzCd,
            custId: this.globalVars.userDetail.custId,
            statTp: 'B',
            platformTp: this.globalVars.platformTp,
            eventId: event.eventId,
            eventTp: 'B',
            actionPath: event.linkUrl
        };

        this.insertClickActionLog(params);
    }
}
