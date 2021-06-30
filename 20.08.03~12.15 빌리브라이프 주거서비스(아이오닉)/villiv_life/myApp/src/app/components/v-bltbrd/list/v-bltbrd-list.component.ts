import {Component,OnInit} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {BltbrdService} from "../../../core/service/bltbrd/bltbrd.service";
import {BltbrdListPage} from "../common/bltbrd-list-page";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VUtils} from "../../../core/utils/v-utils";
import {BltbrdModel} from "../../../core/models/bltbrd/bltbrd-model";
import {BltbrdSearchModel} from "../../../core/models/bltbrd/bltbrd-search-model";
import CodeConstants from "../../../core/constants/code-constants";

import {Router} from "@angular/router";
import {VEventUtils} from "../../../core/utils/v-event-utils";
@Component({
    selector: 'v-bltbrd-list',
    templateUrl: './v-bltbrd-list.component.html',
    styleUrls: ['./v-bltbrd-list.component.scss'],
})
export class VBltbrdListComponent extends BltbrdListPage{

    constructor(
        public systemService: SystemService
        , public bltbrdService: BltbrdService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
        , router: Router
    ) {
        super(systemService,bltbrdService,pageUtils,globalVars,eventUtils, router)
    }

    /**
     * 게시판 중요 글 목록
     */
    bltbrdImptcList: Array<BltbrdModel> = [];
    /**
     * 공통코드 상수
     * */
    CodeConstants = CodeConstants;
    // isInit: boolean = false

    ngOnInit() {
    }


    /**
     * 중요글 목록 가져오기
     * */
    loadBltbrdImptcList() {
        const params: any = {
            bltbrdTpCd : this.bltbrdSearchModel.bltbrdTpCd,
            bzCd : this.globalVars.bzCd
        };

        this.bltbrdService.loadBltbrdImptcList(params)
            .then((model) => {

                this.bltbrdImptcList = model.result["data"] as Array<BltbrdModel>;
            });
    }

}
