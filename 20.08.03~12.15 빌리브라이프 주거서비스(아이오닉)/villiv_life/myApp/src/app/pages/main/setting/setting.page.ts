import {Component, OnInit} from '@angular/core';
import {NgEventBus} from "ng-event-bus";
import {ModalEventModel} from "../../../core/models/modal-event-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VUtils} from "../../../core/utils/v-utils";
import {CustMstModel} from "../../../core/models/my-page/cust-mst-model";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {BasePage} from "../../BasePage";
import GlobalConstants from "../../../core/constants/global-constants";
import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import * as moment from "moment";

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
})
export class SettingPage extends BasePage implements OnInit {

    constructor(
        private pageUtils: VPageUtils
        , private eventBus: NgEventBus
        , globalVars: VGlobalVars
        , public systemService: SystemService
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
     * 핀코드 사용 유무
     * */
    isPinCode: boolean;

    /**
     * 푸쉬 허용 유무
     * */
    isPush: boolean;

    /**
     * 유저정보
     * */
    userDetail: CustMstModel;

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.isPinCode = !VUtils.isEmpty(this.globalVars.pinCode)
        this.userDetail = this.globalVars.userDetail;
        if(this.userDetail) {
            this.isPush = this.userDetail.pushYn === "1";
        }
        this.onPageReady()
    }

    /**
     * 푸쉬 on/off 변경
     * */
    onChangePush(event) {
        this.isPush = event.target.checked;

        let today = moment().format('YYYY.MM.DD');

        const params: any = {
            pushYn: this.isPush ? '1' :'0'
        };
        this.systemService.updatePushSetting(params)
            .then((model) => {
                if(model.isResultOK()) {
                    this.globalVars.userDetail = model.result['data'];
                    if(this.isPush) {
                        this.eventUtils.alert(today+ '\n푸시알림 받기에 동의하셨습니다.','푸시알림 받기 동의');
                    } else {
                        this.eventUtils.alert(today+ '\n푸시알림 받기에 거부하셨습니다.','푸시알림 받기 거부');
                    }
                }
            });

    }

    /**
     * 핀코드 on/off 변경
     * */
    onChangePinCode(event) {
        this.isPinCode = event.target.checked;
        if(this.isPinCode) {
            this.setPinCode();
        } else {
            this.globalVars.pinCode = "";
        }
    }

    /**
     * 핀코드 설정
     * */
    setPinCode() {
        const callback = async () => {
            if(VUtils.isEmpty(this.globalVars.pinCode)) {
                this.isPinCode = false;
            }
        }
        const info = new ModalEventModel();
        info.callback = callback
        this.eventBus.cast('common:setPinCode', info);
    }

    /**
     * 앱 업데이트 클릭
     * 페이지이동
     * */
    onClickAppUpdate() {
        let url;
        if(this.globalVars.mobileOs==='android') {
            url = GlobalConstants.MENU.ANDROID_STORE.URL;
        } else if(this.globalVars.mobileOs==='ios') {
            url = GlobalConstants.MENU.IOS_STORE.URL;
        }
        this.pageUtils.openNewTab(url);
    }

    /**
     * 로그아웃 클릭
     * */
    onClickLogout() {
        const confirmCallback = async () => {
            this.globalVars.logout();
            this.pageUtils.navigateForward('/');
        }
        this.eventUtils.confirm('로그아웃 하시겠습니까?',confirmCallback)
    }
}
