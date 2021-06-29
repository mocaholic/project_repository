import {Component, OnInit} from '@angular/core';
import {VUtils} from "../../../core/utils/v-utils";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {CustMstModel} from "../../../core/models/my-page/cust-mst-model";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {AuthService} from "../../../core/service/auth/auth.service";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.page.html',
    styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage extends BasePage implements OnInit {

    constructor(
            private pageUtils: VPageUtils
        , private eventUtils: VEventUtils
        , public globalVars: VGlobalVars
        , private authService: AuthService
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 생일
     * */
    brth: string;

    /**
     * 유저 정보
     * */
    custMst: CustMstModel;

    ngOnInit() {
    }
    ionViewDidEnter() {
        this.custMst = this.globalVars.userDetail;
        this.onPageReady();
    }

    /**
     * 이전 버튼 클릭
     * */
    onClickPrev() {
        this.pageUtils.navigateForward('/signup/agreement');

    }

    /**
     * 다음 버튼 클릭
     * */
    onClickNext() {
        if(VUtils.isEmpty(this.brth)) {
            this.eventUtils.alert("생년월일을 입력해 주세요.");
            return;
        }
        if(this.brth.length!==8) {
            this.eventUtils.alert("생년월일을 정확하게 입력해 주세요. \n 예)19880302");
            return;
        }

        this.custMst.brth = this.brth;
        const params: any = {
            custDTO : {...this.custMst},
        }
        this.authService.registerCust(params)
            .then((model) => {
                if(model.isResultOK()) {
                    this.globalVars.userDetail = model.result['data'] as CustMstModel;
                    this.globalVars.token = model.result['token'];

                    this.pageUtils.navigateForward('/signup/complete');
                } else {
                    this.eventUtils.alert(model.result['msg']);
                }
            });
    }

}
