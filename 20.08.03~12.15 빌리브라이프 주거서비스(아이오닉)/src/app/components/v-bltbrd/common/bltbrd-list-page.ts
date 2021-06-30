import {Input, OnInit} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {BltbrdSearchModel} from "../../../core/models/bltbrd/bltbrd-search-model";
import {CodeModel} from "../../../core/models/code-model";
import {BltbrdService} from "../../../core/service/bltbrd/bltbrd.service";
import {BltbrdModel} from "../../../core/models/bltbrd/bltbrd-model";
import {CodeEnums} from "../../../core/enums/code-enums";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import CodeConstants from "../../../core/constants/code-constants";
import GlobalConstants from "../../../core/constants/global-constants";
import {VUtils} from "../../../core/utils/v-utils";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BasePage} from "../../../pages/BasePage";

import {Router} from "@angular/router";
import {VEventUtils} from "../../../core/utils/v-event-utils";

/**
 * 게시판 목록 페이지 공통
 * */
export abstract class BltbrdListPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public bltbrdService: BltbrdService
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
     * 게시판 유형코드
     */
    @Input("bltbrdTpCd") bltbrdTpCd: string;

    /**
     * 첨부파일 컬럼 유무
     */
    @Input("isFileColumn") isFileColumn: boolean = false;

    /**
     * 게시판 검색 유형 목록
     */
    searchTypeList: Array<CodeModel> = [];
    /**
     * 게시판 글 목록
     */
    bltbrdList: Array<BltbrdModel> = [];

    /**
     * 게시판 검색조건
     */
    bltbrdSearchModel: BltbrdSearchModel = new BltbrdSearchModel();

    /**
     * Init
     * */
    ngOnInit() {
    }


    /**
     * 목록 존재 유무
     */
    get isExistList() {
        return this.bltbrdList && this.bltbrdList.length > 0
    }

    /**
     * 검색조건 유형 가져오기
     * */
    loadBltbrdSearchTypeList(parentCode: string = CodeEnums.BltbrdSearchType,addAll: boolean = false) {
        const params: any = {
            parentCode: parentCode,
            addAll: addAll ? 1 : 0,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.searchTypeList = model.result["data"] as Array<CodeModel>;
                this.bltbrdSearchModel.searchType = this.searchTypeList[0].cd;
            });
    }

    /**
     * 게시판 목록 가져오기
     * */
    loadBltbrdList(isMore: boolean=false) {
        const params: any = {
            usePaging : this.bltbrdSearchModel.usePaging,
            page : this.bltbrdSearchModel.page,
            perPageNum : this.bltbrdSearchModel.perPageNum,
            bltbrdTpCd : this.bltbrdSearchModel.bltbrdTpCd,
            bltbrdCat : this.bltbrdSearchModel.bltbrdCat,
            bltbrdStats : this.bltbrdSearchModel.bltbrdStats,
            searchType : this.bltbrdSearchModel.searchType,
            searchWord : this.bltbrdSearchModel.searchWord,
            bzCd : this.globalVars.bzCd,
            fetchToPageYn : isMore ? '0' : '1'
        };

        this.bltbrdService.loadBltbrdList(params)
            .then((model) => {
                if(isMore) {
                    this.bltbrdList = VUtils.dataConcat(this.bltbrdList, model.result["data"] as Array<BltbrdModel>);
                } else {
                    this.bltbrdList = model.result["data"] as Array<BltbrdModel>;
                }
                this.bltbrdSearchModel = model.result["search"] as BltbrdSearchModel;
                if(VUtils.isEmpty(this.bltbrdSearchModel.searchType) && this.searchTypeList.length>0) {
                    this.bltbrdSearchModel.searchType = this.searchTypeList[0].cd;
                }
                this.onPageReady();
            });
    }

    /**
     * 더보기
     * */
    moreBltbrdList() {
        if(this.bltbrdSearchModel.page >= this.bltbrdSearchModel.totalEndPage) {
            return;
        }
        this.bltbrdSearchModel.page += 1;

        this.loadBltbrdList(true);
    }
    /**
     * 검색하기
     * */
    onClickSearch() {
        if(VUtils.isEmpty(this.bltbrdSearchModel.searchWord)) {
            this.eventUtils.alert('검색어를 입력해 주세요.')
            return;
        }
        this.bltbrdSearchModel.usePaging = 1;
        this.loadBltbrdList();
    }

    /**
     * 상세 페이지로 이동
     */
    goDetailPage(bltbrdId): void {

        this.pageUtils.navigateForward(this.getDetailPageUrl()+'/'+bltbrdId);
    }

    /**
     * 상세 페이지 url 가져오기
     */
    getDetailPageUrl(): string {

        switch(this.bltbrdTpCd) {
            case CodeConstants.BLTBRD.NEWS: {
                return GlobalConstants.MENU.LC_CM_CNW_VIEW.URL
            }
            case CodeConstants.BLTBRD.LANCABLE: {
                return GlobalConstants.MENU.LC_CM_LAN_VIEW.URL
            }
            case CodeConstants.BLTBRD.RESIDENT: {
                return GlobalConstants.MENU.LC_CM_CSB_VIEW.URL
            }
            case CodeConstants.BLTBRD.SHARE: {
                return GlobalConstants.MENU.LC_CM_SHR_VIEW.URL
            }
            case CodeConstants.BLTBRD.NOTICE: {
                return GlobalConstants.MENU.LC_CM_NTC_VIEW.URL
            }
            case CodeConstants.BLTBRD.INQUIRE: {
                return GlobalConstants.MENU.LC_CS_INQ_VIEW.URL
            }
            default: {
                return '/'
            }
        }
    }
}
