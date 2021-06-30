import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {CustMstModel} from "../../../core/models/my-page/cust-mst-model";
import {AuthService} from "../../../core/service/auth/auth.service";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
    selector: 'app-my-info',
    templateUrl: './my-info.page.html',
    styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage extends BasePage implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
        , public authService: AuthService
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    custMstModel: CustMstModel;

    ngOnInit() {
    }

    ionViewDidEnter() {
        if (!this.globalVars.isLogin) {
            this.eventUtils.alert("잘못된 접근입니다.")
            this.pageUtils.navigateForward('/');
        } else {
            this.custMstModel = this.globalVars.userDetail;
            this.onPageReady();
        }
    }


    onClickWithdraw() {
        const confirmCallback = async () => {
            const params: any = {

            }
            this.authService.withdraw(params)
                .then((model) => {
                    if(model.isResultOK()) {
                        this.eventUtils.alert('회원탈퇴가 완료되었습니다.\n(회원탈퇴 후에도 회원 재등록을 통해 이용이 가능합니다.)');
                        this.globalVars.logout();
                        this.pageUtils.navigateForward('/');
                    } else {
                        this.eventUtils.alert(model.result['msg']);
                    }
                });

        }
        this.eventUtils.confirm('회원탈퇴를 진행하시겠습니까?\n(회원탈퇴 후에도 회원 재등록을 통해 이용이 가능합니다.)',confirmCallback);


    }

    goHome() {
        this.pageUtils.navigateForward('/');
    }
}
