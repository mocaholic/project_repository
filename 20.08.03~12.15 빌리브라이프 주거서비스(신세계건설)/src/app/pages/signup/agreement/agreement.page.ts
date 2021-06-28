import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {AuthService} from "../../../core/service/auth/auth.service";
import {TermsInfModel} from "../../../core/models/terms-inf-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import GlobalConstants from "../../../core/constants/global-constants";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
    selector: 'app-agreement',
    templateUrl: './agreement.page.html',
    styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage extends BasePage implements OnInit {

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
     * 체크박스 목록
     * */
    checkboxList: Array<boolean> = [false, false, false];

    /**
     * 약관 목록
     * */
    termList: Array<TermsInfModel> = null;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.onLoadLatestTerms();
    }

    /**
     * 전체 선택
     * */
    checkAll(event) {
        let stat = event.target.checked;
        for (let i = 0; i < this.checkboxList.length; i++) {
            this.checkboxList[i] = stat;
        }
    }

    /**
     * 전체 선택 유무
     * */
    get isAllSelected() {
        return this.checkboxList.every(function (bool: boolean) {
            return bool;
        })
    }

    /**
     * 취소 버튼 클릭
     * */
    onClickCancel() {
        const confirmCallback = async () => {
            this.pageUtils.navigateForward(GlobalConstants.MENU.LOGIN.URL);
        }

        this.eventUtils.confirm('로그인과 회원등록을 취소하시겠습니까?', confirmCallback);
    }

    /**
     * 다음 버튼 클릭
     * */
    onClickNext() {
        if (!this.isAllSelected) {
            this.eventUtils.alert('빌리브 라이프 서비스 회원등록을 위해서는 모든 필수항목에 대한 동의가 필요합니다.');
            return;
        }

        this.pageUtils.navigateForward('/signup/confirm');

        const params: any = {
            custDTO: {...this.globalVars.userDetail},
        }
        this.authService.agreeTerms(params)
            .then((model) => {
                if (model.isResultOK()) {
                    this.pageUtils.navigateForward('/signup/confirm');
                } else {
                    this.eventUtils.alert(model.result['msg']);
                }
            });

    }

    /**
     * 최신 약관 가져오기
     * */
    onLoadLatestTerms() {
        const params: any = {
            kndStrings: "A,B,C"
        }
        this.authService.loadLatestTerms(params)
            .then((model) => {
                if (model.isResultOK()) {
                    this.termList = model.result['data'];
                } else {
                    this.eventUtils.alert(model.result['msg']);
                }
                this.onPageReady();
            });
    }

    /**
     * 약관 가져오기
     * */
    getTermsCtsByIndex(index): string {
        if (this.termList === null || this.termList.length <= index) {
            return "";
        }

        return this.termList[index].termsCts;
    }

}
