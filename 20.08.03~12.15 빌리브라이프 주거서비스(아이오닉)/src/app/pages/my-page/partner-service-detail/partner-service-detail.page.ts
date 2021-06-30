import {Component, OnInit} from '@angular/core';
import {BsPtnrResvModel} from "../../../core/models/bs-svc/ptnr/bs-ptnr-resv-model";
import {SystemService} from "../../../core/service/system/system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {VUtils} from "../../../core/utils/v-utils";
import GlobalConstants from "../../../core/constants/global-constants";
import {BasePage} from "../../BasePage";

import {MyPageService} from "../../../core/service/my-page/my-page.service";

@Component({
    selector: 'app-partner-service-detail',
    templateUrl: './partner-service-detail.page.html',
    styleUrls: ['./partner-service-detail.page.scss'],
})
export class PartnerServiceDetailPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
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
     * 예약 아이디
     * */
    ptnrResvId: string;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 제휴 예약
     * */
    ptnrResv: BsPtnrResvModel;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.ptnrResvId = this.route.snapshot.params['ptnrResvId'];

        if (VUtils.isValidDbRowId(this.ptnrResvId)) {
            this.loadPtnrResvDetail();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.");
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }

    /**
     * 제휴업체 예약 내역 가져오기
     */
    loadPtnrResvDetail() {

        const params: any = {
            ptnrResvId: this.ptnrResvId,
            bzCd: this.globalVars.bzCd,
        };
        this.myPageService.loadPtnrResvDetail(params).then((model) => {
            this.ptnrResv = model.result['data'] as BsPtnrResvModel;
            this.onPageReady();
        });

    }

    /**
     * 목록 페이지로 이동
     */
    goListPage() {
        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_PARTNER.URL);
    }
}
