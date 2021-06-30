import {Component} from '@angular/core';
import {QstnViewPage} from "../../../../components/v-qstn/qstn-view-page";
import {SystemService} from "../../../../core/service/system/system.service";
import {QstnService} from "../../../../core/service/qstn/qstn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {VUtils} from "../../../../core/utils/v-utils";

@Component({
    selector: 'v-vote',
    templateUrl: './vote.view.page.html',
    styleUrls: ['./vote.view.page.scss'],
})
export class VoteViewPage extends QstnViewPage {

    constructor(
        public systemService: SystemService
        , public qstnService: QstnService
        , public route: ActivatedRoute
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils

        , router: Router
    ) {
        super(systemService, qstnService, route, pageUtils, globalVars, eventUtils, router);
    }

    voteYn : boolean;
    ngOnInit() {

    }

    ionViewDidEnter() {
        this.qstnId = this.route.snapshot.params['qstnId'];

        if (VUtils.isValidDbRowId(this.qstnId)) {
            this.onLoadQstn("B");
            this.checkVoteYn();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.")
            this.pageUtils.navigateForward('/');
        }
    }

    checkVoteYn() {
        const params: any = {
            bzCd : this.globalVars.bzCd,
            qstnKnd : "B",
            qstnId : this.qstnId
        };
        this.qstnService.checkVoteYn(params).then((model)=>{

            this.voteYn = model.result['data']==="1";
        })
    }
}
