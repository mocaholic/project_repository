import {OnInit} from '@angular/core';

import {SystemService} from "../../core/service/system/system.service";
import {QstnService} from "../../core/service/qstn/qstn.service";
import {QstnModel} from "../../core/models/qstn/qstn-model";
import {QstnSearchModel} from "../../core/models/qstn/qstn-search-model";

import {VGlobalVars} from "../../core/utils/v-global-vars";
import CodeConstants from "../../core/constants/code-constants";
import GlobalConstants from "../../core/constants/global-constants";

import {VPageUtils} from "../../core/utils/v-page-utils.service";
import {VUtils} from "../../core/utils/v-utils";
import {VEventUtils} from "../../core/utils/v-event-utils";
import {BasePage} from "../../pages/BasePage";

import {Router} from "@angular/router";

/**
 * 설문/투표 목록 페이지 공통
 * */
export abstract class QstnListPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public qstnService: QstnService
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
     * 설문/투표 진행중 목록
     */
    ingQstnList: Array<QstnModel> = [];

    /**
     * 설문/투표 종료 목록
     */
    endQstnList: Array<QstnModel> = [];

    /**
     * 종료 설문/투표 검색조건
     */
    qstnSearchModel: QstnSearchModel = new QstnSearchModel();

    /**
     * Init
     * */
    ngOnInit() {

    }

    /**
     * 진행중 목록 존재 유무
     */
    get isExistIngList() {
        return this.ingQstnList && this.ingQstnList.length > 0
    }

    /**
     * 종료 목록 존재 유무
     */
    get isExistEndList() {
        return this.endQstnList && this.endQstnList.length > 0
    }


    /**
     * 설문/투표 목록 가져오기
     * */
    loadQstnList(isEnd: boolean = false,isMore: boolean = false) {
        const params: any = {
            usePaging : isEnd ? 1 : 0,
            page : this.qstnSearchModel.page,
            perPageNum : this.qstnSearchModel.perPageNum,
            bzCd : this.globalVars.bzCd,
            qstnKnd : this.qstnSearchModel.qstnKnd,
        };
        if(isEnd) {
            this.qstnService.loadEndQstnList(params)
                .then((model) => {
                    let loadList = model.result["data"] as Array<QstnModel>;
                    if(isMore) {
                        this.endQstnList = VUtils.dataConcat(this.endQstnList, loadList);
                    } else {
                        this.endQstnList = loadList;
                    }
                    this.qstnSearchModel = model.result["search"] as QstnSearchModel;
                });
        } else {
            this.qstnService.loadIngQstnList(params)
                .then((model) => {
                    this.ingQstnList = model.result["data"] as Array<QstnModel>;
                });
        }
        this.onPageReady();
    }

    /**
     * 더보기
     * */
    moreEndQstnList() {
        if(this.qstnSearchModel.page >= this.qstnSearchModel.totalEndPage) {
            return;
        }
        this.qstnSearchModel.page += 1;

        this.loadQstnList(true,true);
    }

    /**
     * 상세 페이지로 이동
     */
    goDetailPage(qstnId): void {
        if(this.qstnSearchModel.qstnKnd=="A") {
            const params: any = {
                bzCd : this.globalVars.bzCd,
                qstnKnd : this.qstnSearchModel.qstnKnd,
                qstnId : qstnId
            };
            this.qstnService.checkVoteYn(params).then((model)=>{
                if(model.result['data']==="1") {
                    this.eventUtils.alert('이미 참여한 설문조사입니다.');
                    return;
                } else {
                    this.pageUtils.navigateForward(this.getDetailPageUrl()+'/'+qstnId);
                }

            })
        } else {
            this.pageUtils.navigateForward(this.getDetailPageUrl()+'/'+qstnId);
        }


    }

    /**
     * 상세 페이지 url 가져오기
     */
    getDetailPageUrl(): string {

        switch(this.qstnSearchModel.qstnKnd) {
            case CodeConstants.QSTN_KND.IVST: {
                return GlobalConstants.MENU.LC_CM_POL_VIEW.URL
            }
            case CodeConstants.QSTN_KND.VOTE: {
                return GlobalConstants.MENU.LC_CM_VOT_VIEW.URL
            }
            default: {
                return '/'
            }
        }
    }
}
