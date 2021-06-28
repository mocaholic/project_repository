import {Component, OnInit} from '@angular/core';
import {QstnListPage} from "../../../../components/v-qstn/qstn-list-page";
import {SystemService} from "../../../../core/service/system/system.service";
import {QstnService} from "../../../../core/service/qstn/qstn.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {QstnViewPage} from "../../../../components/v-qstn/qstn-view-page";
import {ActivatedRoute, Router} from "@angular/router";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {VUtils} from "../../../../core/utils/v-utils";


@Component({
    selector: 'v-ivst',
    templateUrl: './ivst.view.page.html',
    styleUrls: ['./ivst.view.page.scss'],
})
export class IvstViewPage extends QstnViewPage {

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

    ////주관식 최대 글지 길이
    textAreaMaxLength: string = "500";

    ngOnInit() {

    }
    ionViewDidEnter() {
        this.qstnId = this.route.snapshot.params['qstnId'];

        if (VUtils.isValidDbRowId(this.qstnId)) {
            this.onLoadQstn("A");
        } else {
            this.eventUtils.alert("잘못된 접근입니다.")
            this.pageUtils.navigateForward('/');
        }
    }
}
