import {Component, OnInit} from '@angular/core';
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";
import {IotService} from "../../../core/service/iot/iot.service";

@Component({
    selector: 'app-iot-login',
    templateUrl: './iot-login.page.html',
    styleUrls: ['./iot-login.page.scss'],
})
export class IotLoginPage extends BasePage implements OnInit {

    constructor(
        private eventUtils: VEventUtils
        , public iotService: IotService
        , public globalVars: VGlobalVars
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    id: string;
    password: string;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.onPageReady()
    }

    //TODO validation
    onClickLogin() {
        // this.eventUtils.alert('아이디 또는 비밀번호를 확인 후 다시 입력해 주세요.');
        // this.eventUtils.alert('홈넷 계정 등록에 실패했습니다. 관리사무소 승인 후 다시 시도해 주세요.');
        // this.eventUtils.alert('홈넷 계정 등록이 완료되었습니다.');
        const params: any = {

        };
        this.iotService.login(params)
            .then((model) => {

            });
    }
}
