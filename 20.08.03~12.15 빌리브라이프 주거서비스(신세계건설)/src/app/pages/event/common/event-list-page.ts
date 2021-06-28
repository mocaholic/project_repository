import {OnInit} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {CodeModel} from "../../../core/models/code-model";
import {EventService} from "../../../core/service/event/event.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {EventModel} from "../../../core/models/event/event-model";
import {EventSearchModel} from "../../../core/models/event/event-search-model";
import {VUtils} from "../../../core/utils/v-utils";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";

/**
 * 이벤트 목록 페이지 공통
 * */
export abstract class EventListPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public eventService: EventService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars

        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }


    /**
     * 이벤트 카테고리 코드 목록
     */
    eventCatCdList: Array<CodeModel> = [];
    /**
     * 이벤트 목록
     */
    eventList: Array<EventModel> = [];
    /**
     * 검색 조건 , 페이지 처리
     */
    search: EventSearchModel;
    /**
     * 진행중 이벤트 갯수
     */
    progressCount: number;

    /**
     * 카테고리 부모코드
     */
    parentCode: string;
    // = new EventSearchModel("A",1,2);
    /**
     * ngOnInit
     */
    ngOnInit() {
    }

    /**
     * 목록 존재 유무
     */
    get isExistList() {
        return this.eventList && this.eventList.length > 0
    }

    /**
     * 이벤트 카테고리 코드 목록 가져오기
     */
    public onLoadEventCatCdList(parentCode): void {

        const params: any = {
            parentCode: parentCode,
            addAll: 1
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.eventCatCdList = model.result["data"] as Array<CodeModel>;

            });
    }

    /**
     * 빌리브 이벤트 목록 가져오기
     */
    public onLoadEventList(isMore: boolean=false): void {

        const params: any = {
            usePaging : this.search.usePaging,
            page : this.search.page,
            perPageNum : this.search.perPageNum,
            knd : this.search.knd,
            catCd : this.search.catCd,
            bzCd : this.globalVars.bzCd
        };
        this.eventService.loadEventList(params)
            .then((model) => {
                if(isMore) {
                    this.eventList = VUtils.dataConcat(this.eventList, model.result["data"] as Array<EventModel>);
                } else {
                    this.eventList = model.result["data"] as Array<EventModel>;
                }
                this.search = model.result["search"] as EventSearchModel;
                this.progressCount = model.result["progressCount"] as number;
                this.onPageReady();
            });
    }

    /**
     * 이벤트 카테고리 코드 선택
     */
    public onClickEventCatCd(code): void {

        this.search.catCd = code;
        this.search.page = 1;

        this.onLoadEventList();
    }

    /**
     * 이벤트 목록 더보기
     */
    public moreEventList(): void {
        if(this.search.page >= this.search.totalEndPage) {
            return;
        }
        this.search.page += 1;

        this.onLoadEventList(true);
    }

}
