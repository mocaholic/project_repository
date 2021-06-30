import {Component, OnInit} from '@angular/core';

import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {CustMstModel} from "../../../core/models/my-page/cust-mst-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BzMstModel} from "../../../core/models/story/bz-mst-model";
import {StoryService} from "../../../core/service/story/story.service";
import {AuthService} from "../../../core/service/auth/auth.service";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {VUtils} from "../../../core/utils/v-utils";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {CustDeviceModel} from "../../../core/models/cust-device-model";
import { Device } from '@ionic-native/device/ngx';
import {SystemService} from "../../../core/service/system/system.service";
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

    constructor(
        private pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public globalVars: VGlobalVars
        , public storyService: StoryService
        , public authService: AuthService
        , public plt: Platform
        , private device: Device
        , public systemService: SystemService
        // , private fcm: FCM
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 남은시간 기준 초
     * 3분
     * */
    time: number = 180;

    /**
     * 실제남은시간
     * */
    timeLeft: number = 180;

    /**
     * 타이머 인터벌
     * */
    interval;

    /**
     * 인증번호 요청 유무
     * */
    isReqAuthNumber: boolean;

    /**
     * sms 요청 유무
     * */
    isReqSms: boolean;

    /**
     * 타이머 시작 유무
     * */
    isIngTime: boolean;

    /**
     * 유저 모델
     * */
    custMstModel: CustMstModel = new CustMstModel();

    /**
     * 단지목록
     * */
    bzList: Array<BzMstModel> = [];

    /**
     * 동 목록
     * */
    dongList: Array<string> = [];

    /**
     * 호 목록
     * */
    hoList: Array<string> = [];

    /**
     * 선택한 단지코드
     * */
    selectedBzCd: string;
    
    /**
     * 선택한 동
     * */
    selectedBlNo: string;
    
    /**
     * 선택한 호
     * */
    selectedRmNo: string;

    /**
     * 인증번호 토큰
     * */
    certiNumberToken: string;

    /**
     * 앱다운로드 qr 팝업 on/off
     */
    isShowIOSPopup: { container: boolean, layer: boolean } = { container: false,layer: false};
    isShowAndroidPopup: { container: boolean, layer: boolean } = { container: false,layer: false};

    ngOnInit() {
        if(this.globalVars.isApp) {
            this.isReqSms = true;
        }
    }

    ionViewDidEnter() {
        this.loadBzList();
    }

    /**
     * 단지목록 가져오기
     */
    loadBzList() {
        const params: any = {

        }
        this.storyService.loadBzList(params)
            .then((model) => {
                this.bzList = model.result["data"] as Array<BzMstModel>;
                this.selectedBlNo = null;
                this.selectedRmNo = null;
                this.hoList = [];
                this.onPageReady();
            });
    }

    /**
     * 동 목록 가져오기
     */
    loadDongListByBz() {
        const params: any = {
            bzCd : this.selectedBzCd
        }
        this.storyService.loadDongListByBz(params)
            .then((model) => {
                this.dongList = model.result["data"] as Array<string>;
                this.selectedBlNo = null;
                this.selectedRmNo = null;
            });
    }

    /**
     * 호 목록 가져오기
     */
    loadHoListByDong() {
        const params: any = {
            bzCd : this.selectedBzCd,
            blNo : this.selectedBlNo
        }
        this.storyService.loadHoListByDong(params)
            .then((model) => {
                this.hoList = model.result["data"] as Array<string>;
                this.selectedRmNo= null;
            });
    }

    /**
     * 단지 변경 이벤트
     */
    onChangeBzCode() {
        this.loadDongListByBz();
    }

    /**
     * 동 변경 이벤트
     */
    onChangeDongCode() {
        this.loadHoListByDong();
    }

    /**
     * 타이머 시작
     * */
    startTimer() {
        this.isIngTime = true;
        clearInterval(this.interval);
        this.timeLeft = this.time;
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                this.timeLeft = 60;
            }
            if (this.timeLeft === 0) {
                this.isIngTime = false;
                clearInterval(this.interval);
            }
        }, 1000)
    }

    /**
     * 인증번호 요청 버튼 클릭
     * */
    onClickReqAuthNumber() {
        if(this.isReqAuthNumber) {
            return;
        }
        this.isReqAuthNumber = true;

        this.custMstModel.bzCd = this.selectedBzCd;
        this.custMstModel.blNo = this.selectedBlNo;
        this.custMstModel.rmNo = this.selectedRmNo;

        this.requestCertiNumber();


    }
    /**
     * 인증번호 재요청
     * */
    onClickReSendAuthNumber() {
        this.requestCertiNumber();

    }
    /**
     * 인증번호 서버에 요청
     * */
    requestCertiNumber() {
        const params: any = {
            custDTO : {
                bzCd: this.custMstModel.bzCd,
                blNo: this.custMstModel.blNo,
                rmNo: this.custMstModel.rmNo,
                mpPhoneNo: this.custMstModel.mpPhoneNo
            },
            sendDiv : this.isReqSms ? 'S' : 'P',
        }
        this.authService.requestCertiNumber(params)
            .then((model) => {
                this.eventUtils.alert(model.result['msg']);
                if(model.isResultOK()) {
                    this.startTimer();
                    this.certiNumberToken = model.result['certiNumberToken'];

                } else {
                    this.isReqAuthNumber = false;
                }
            });
    }
    /**
     * 인증번호 sms로 요청 클릭
     * */
    onClickReqSms() {
        this.isReqSms = true;
        this.requestCertiNumber();
    }

    /**
     * 확인 버튼 클릭
     * */
    onClickConfirm() {
        if(!this.isIngTime) {
            return;
        }
        if(VUtils.isEmpty(this.custMstModel.authNumber)) {
            return;
        }
        let params: any = {
            custDTO : {
                bzCd: this.custMstModel.bzCd,
                blNo: this.custMstModel.blNo,
                rmNo: this.custMstModel.rmNo,
                mpPhoneNo: this.custMstModel.mpPhoneNo
            },
            sendDiv : this.isReqSms ? 'S' : 'P',
            certiNumber: this.custMstModel.authNumber,
            certiNumberToken: this.certiNumberToken
        }
        if(this.globalVars.isApp) {
            params['deviceDTO'] = {
                ...this.getDeviceInfo()
            }
        }
        this.authService.confirmCertiNumber(params)
            .then((model) => {
                if(model.isResultOK()) {
                    this.globalVars.userDetail = model.result['data'];
                    if(this.globalVars.isLogin) {
                        this.globalVars.token = model.result['token'];
                        this.pageUtils.navigateForward('/');
                    } else {
                        this.pageUtils.navigateForward('/signup/agreement');
                    }
                    this.onClickCancel();
                } else {
                    this.custMstModel.authNumber = null;
                    this.eventUtils.alert(model.result['msg']);
                }
            });
    }

    /**
     * 취소 버튼 클릭
     * */
    onClickCancel(isConfirm= false) {
        const confirmCallback = async () => {
            this.isIngTime = false;
            clearInterval(this.interval);
            if(!this.globalVars.isApp) {
                this.isReqSms = false;
            }
            this.isReqAuthNumber = false;
            this.timeLeft = this.time;
            this.custMstModel = new CustMstModel();
            this.selectedBzCd = null;
            this.selectedBlNo = null;
            this.selectedRmNo = null;
        }
        if(isConfirm) {
            this.eventUtils.confirm('로그인을 취소하시겠습니까?',confirmCallback);
        } else {
            confirmCallback();
        }
    }
    
    /**
     * ios qr코드 팝업 열기
     * */
    openIOSPopup() {
        this.isShowIOSPopup.container = true;
        this.isShowIOSPopup.layer = true;
    }
    
    /**
     * ios qr코드 팝업 닫기
     * */
    closeIOSPopup() {
        this.isShowIOSPopup.layer = false;
        setTimeout(()=>{
            this.isShowIOSPopup.container = false;
        },300)
    }
    
    /**
     * 안드로이드 qr코드 팝업 열기
     * */
    openAndroidPopup() {
        this.isShowAndroidPopup.container = true;
        this.isShowAndroidPopup.layer = true;
    }
    
    /**
     * 안드로이드 qr코드 팝업 닫기
     * */
    closeAndroidPopup() {
        this.isShowAndroidPopup.layer = false;
        setTimeout(()=>{
            this.isShowAndroidPopup.container = false;
        },300)
    }

    /**
     * 디바이스 정보 가져오기
     * */
    getDeviceInfo() {

        let deviceDto = new CustDeviceModel()

        deviceDto.deviceKnd = this.globalVars.loginTp;
        deviceDto.deviceModel = this.device.model;
        deviceDto.pushToken = this.globalVars.pushToken;
        deviceDto.deviceUuid = this.device.uuid;

        return deviceDto;

    }
}
