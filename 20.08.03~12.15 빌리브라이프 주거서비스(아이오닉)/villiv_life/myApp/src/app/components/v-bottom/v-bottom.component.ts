import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VGlobalVars} from "../../core/utils/v-global-vars";
import {NgEventBus} from "ng-event-bus";
import {VPageUtils} from "../../core/utils/v-page-utils.service";
import {Router} from "@angular/router";
import {VEventUtils} from "../../core/utils/v-event-utils";
import {MenuController, Platform} from '@ionic/angular';
import GlobalConstants from "../../core/constants/global-constants";
import {VUtils} from "../../core/utils/v-utils";
declare var $: any;

@Component({
    selector: 'v-bottom',
    templateUrl: './v-bottom.component.html',
    styleUrls: ['./v-bottom.component.scss'],
})
export class VBottomComponent implements OnInit {

    constructor(
        public globalVars: VGlobalVars
        , private eventBus: NgEventBus
        , private pageUtils: VPageUtils
        , private eventUtils: VEventUtils
        , private router: Router
        , private platform: Platform
    ) {
        this.platform.keyboardDidShow.subscribe(ev => {
            this.isOpenKeyboard = true;
        });

        this.platform.keyboardDidHide.subscribe(() => {
            this.isOpenKeyboard = false;
        });
    }
    isOpenKeyboard : boolean = false;
    // @Input("isShowBottom") isShowBottom;
    @Input("isShowTop") isShowTop;
    @Output() isShowTopChange = new EventEmitter<boolean>();
    @Output() openMyMnu = new EventEmitter();
    currentUrl: string;

    ngOnInit() {
        this.currentUrl = this.router.url
    }
    ionViewDidEnter() {
    }
    toggleMenu() {

        this.isShowTop = !this.isShowTop;
        if( this.isShowTop && !this.globalVars.isPc ) {
            VUtils.pauseMainAnimation(this.router);
        }

        const thisObj = this;
        if( this.isShowTop ) {
            $('[dir]').each( function() {

                const mnuDir = $(this).attr('dir');
                const currentUrl = thisObj.router.url;

                if( currentUrl.startsWith(mnuDir) ) {

                    const folder = $(this).parent().parent().parent().parent();
                    $(folder).trigger('click');
                }


            });
        }

        if( this.isShowTop ) {
            $('v-body').css('overflow-y', 'hidden');
        }

        this.isShowTopChange.emit(this.isShowTop);
    }

    goPage(url: string, isLoginRequired: boolean) {
        if (isLoginRequired) {
            if(!this.globalVars.isLogin) {
                this.getLoginAlertMsg();
                return;
            } else {
                this.pageUtils.navigateForward(url)
            }
        } else {
            this.pageUtils.navigateForward(url)
        }
    }

    /**
     * 마이메뉴 팝업 열기
     */
    openMyMnuPopup() {
        if(!this.globalVars.isLogin) {
            this.getLoginAlertMsg();
            return;
        }
        this.openMyMnu.emit();
    }

    getLoginAlertMsg() {
        const confirmCallback = async () => {
            this.pageUtils.navigateForward(GlobalConstants.MENU.LOGIN.URL);
        }
        let msg = this.globalVars.bzNm +' 입주민 전용 서비스입니다.';
        if(this.currentUrl===GlobalConstants.MENU.LOGIN.URL) {
            msg += '\n로그인 후 이용해 주세요.';
            this.eventUtils.alert(msg);
        } else {
            this.eventUtils.confirm(msg, confirmCallback,'확인','로그인');
        }
    }
}
