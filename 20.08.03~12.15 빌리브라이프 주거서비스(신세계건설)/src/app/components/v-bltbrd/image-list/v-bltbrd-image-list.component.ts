import {Component} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {BltbrdService} from "../../../core/service/bltbrd/bltbrd.service";
import GlobalConstants from '../../../core/constants/global-constants.js'
import CodeConstants from '../../../core/constants/code-constants.js'
import {BltbrdListPage} from "../common/bltbrd-list-page";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {CodeModel} from "../../../core/models/code-model";
import {CodeEnums} from "../../../core/enums/code-enums";
import {BnerModel} from "../../../core/models/bltbrd/bner-model";
import {VUtils} from "../../../core/utils/v-utils";

import {Router} from "@angular/router";
import {VEventUtils} from "../../../core/utils/v-event-utils";

@Component({
    selector: 'v-bltbrd-image-list',
    templateUrl: './v-bltbrd-image-list.component.html',
    styleUrls: ['./v-bltbrd-image-list.component.scss'],
})
export class VBltbrdImageListComponent extends BltbrdListPage {

    constructor(
        public systemService: SystemService
        , public bltbrdService: BltbrdService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
        , router: Router
    ) {
        super(systemService,bltbrdService,pageUtils,globalVars,eventUtils, router);
    }

    /**
     * 타입 상수
     * */
    GlobalConstants = GlobalConstants;
    /**
     * 공통코드 상수
     * */
    CodeConstants = CodeConstants;
    /**
     * 단지장터 판매상태 목록
     */
    shareTypeList: Array<CodeModel> = [];
    /**
     * 배너 모델
     */
    bnerModel: BnerModel;


    ngOnInit() {

        // this.bltbrdSearchModel.bltbrdTpCd = this.bltbrdTpCd;
        // this.loadBltbrdSearchTypeList();
        // if(CodeConstants.BLTBRD.SHARE === this.bltbrdTpCd) {
        //     this.loadShareTypeList();
        // }
        // if(CodeConstants.BLTBRD.LANCABLE === this.bltbrdTpCd) {
        //     this.loadBanner();
        // }
        // this.loadBltbrdList();
    }

    /**
     * 단지장터 판매 상태목록 가져오기
     * */
    loadShareTypeList() {
        const params: any = {
            parentCode: CodeEnums.BltbrdShareCat,
            addAll: 1,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.shareTypeList = model.result["data"] as Array<CodeModel>;
            });
    }

    /**
     *단지장터 판매 상태목록 코드 선택
     */
    onClickShareCatCd(code): void {
        this.bltbrdSearchModel.bltbrdStats = code;
        this.bltbrdSearchModel.page = 1;

        this.loadBltbrdList();
    }

    /**
     * 배너 가져오기
     * */
    loadBanner() {
        const params: any = {
            bzCd: this.globalVars.bzCd,
            mnuId: 'LC_CM_LAN',
        };
        this.bltbrdService.loadBanner(params)
            .then((model) => {
                this.bnerModel = model.result["data"] as BnerModel;
            });
    }

    /**
     * 내용에서 첫번째 이미지 태그 src 가져오기
     * */
    getFirstImageSrc(contents) {
        if(contents.match("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>")) {
            return contents.match("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>")[1];
        }
        return '';
    }

    /**
     * 배너 클릭
     */
    onClickBner() {

        this.pageUtils.openNewTab(this.bnerModel.linkUrl);
        this.insertActionLog();
    }

    /**
     * 클릭 로그
     */
    insertActionLog() {
        const params: any = {
            bzCd: this.globalVars.bzCd,
            custId: this.globalVars.userDetail.custId,
            statTp: 'B',
            platformTp: this.globalVars.platformTp,
            eventId: this.bnerModel.bnerId,
            eventTp: 'A',
            actionPath: this.bnerModel.linkUrl
        };
        this.systemService.insertActionLog(params)
            .then((model) => {

            });

    }
}
