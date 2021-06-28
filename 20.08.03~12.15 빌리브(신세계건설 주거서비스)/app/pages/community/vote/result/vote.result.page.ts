import {Component, OnInit} from '@angular/core';
import {SystemService} from "../../../../core/service/system/system.service";
import {QstnService} from "../../../../core/service/qstn/qstn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {QstnModel} from "../../../../core/models/qstn/qstn-model";
import {VUtils} from "../../../../core/utils/v-utils";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import GlobalConstants from "../../../../core/constants/global-constants";
import {BasePage} from "../../../BasePage";


@Component({
    selector: 'v-result',
    templateUrl: './vote.result.page.html',
    styleUrls: ['./vote.result.page.scss'],
})
export class VoteResultPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public qstnService: QstnService
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
     * 투표 ID
     */
    qstnId: string;
    /**
     * 투표 상세
     */
    voteResult: QstnModel;

    /**
     * 폰트 사이즈 클래스
     * ft_m
     * ft_l
     */
    fontSizeClassName: string = '';


    /**
     * ngOnInit
     */
    ngOnInit() {
    }

    ionViewDidEnter() {
        this.qstnId = this.route.snapshot.params['qstnId'];

        if (VUtils.isValidDbRowId(this.qstnId)) {
            this.onLoadVoteResult();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.")
            this.pageUtils.navigateForward('/');
        }

    }

    /**
     * 투표 결과 가져오기
     */
    onLoadVoteResult() {

        const params: any = {
            qstnId: this.qstnId,
            qstnKnd: "B",
            bzCd: this.globalVars.bzCd
        };
        this.qstnService.loadVoteResult(params)
            .then((model) => {
                this.voteResult = model.result["data"] as QstnModel;
                this.voteResult.qstnRowList.forEach((row) => {
                    if(row.qstnItemList) {

                        let maxSelectedCnt = VUtils.getMaxObj(row.qstnItemList,'selectedCnt').selectedCnt;;
                        row.qstnItemList.forEach((item) => {
                            if(item.selectedCnt == maxSelectedCnt) {
                                item.isMaxItem = true;
                            }
                        });
                    }
                    this.onPageReady();
                });
            });

    }

    /**
     * 목록 페이지로 이동
     */
    goListPage(): void {
        this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CM_VOT.URL);
    }

}
