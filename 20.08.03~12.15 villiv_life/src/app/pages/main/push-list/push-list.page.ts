import {Component, OnInit} from '@angular/core';
import {CodeModel} from "../../../core/models/code-model";
import {SystemService} from "../../../core/service/system/system.service";
import {CustMsgModel} from "../../../core/models/cust-msg-model";
import {BltbrdSearchModel} from "../../../core/models/bltbrd/bltbrd-search-model";
import {PageCriteriaModel} from "../../../core/models/page-criteria-model";
import {VUtils} from "../../../core/utils/v-utils";
import {BltbrdModel} from "../../../core/models/bltbrd/bltbrd-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";

@Component({
    selector: 'app-push-list',
    templateUrl: './push-list.page.html',
    styleUrls: ['./push-list.page.scss'],
})
export class PushListPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
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
     * push 목록
     */
    pushList: Array<CustMsgModel>;

    /**
     * push 검색조건
     */
    pushSearchModel: PageCriteriaModel = new PageCriteriaModel();

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.loadPushList();
    }

    /**
     * push 목록 가져오기
     */
    loadPushList(isMore: boolean = false) {
        // if(!this.globalVars.isApp) {
        //     return;
        // }
        const params: any = {
            bzCd: this.globalVars.bzCd,
            usePaging: this.pushSearchModel.usePaging,
            page: this.pushSearchModel.page,
            perPageNum: this.pushSearchModel.perPageNum,
            fetchToPageYn: isMore ? '0' : '1'
        };
        this.systemService.loadPushList(params).then((model) => {
            if (isMore) {
                this.pushList = VUtils.dataConcat(this.pushList, model.result["data"] as Array<CustMsgModel>);
            } else {
                this.pushList = model.result['data'] as Array<CustMsgModel>;
            }
            this.pushSearchModel = model.result["search"] as PageCriteriaModel;
            this.onPageReady()
        })
    }

    /**
     * 더보기
     * */
    morePushList() {
        if (this.pushSearchModel.page >= this.pushSearchModel.totalEndPage) {
            return;
        }
        this.pushSearchModel.page += 1;

        this.loadPushList(true);
    }

    /**
     * push 목록 존재 유무
     */
    get isExistPush() {
        return this.pushList && this.pushList.length > 0
    }
}
