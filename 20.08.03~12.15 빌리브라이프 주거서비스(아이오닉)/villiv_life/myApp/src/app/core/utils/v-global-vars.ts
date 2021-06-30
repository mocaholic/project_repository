import {Injectable} from '@angular/core';
import {VStorageUtils} from "./v-storage-utils";
import {CustMstModel} from "../models/my-page/cust-mst-model";
import {TerrBzModel} from "../models/story/terr-bz";
import {Platform} from "@ionic/angular";
import {MnuModel} from "../models/mnu-model";
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
@Injectable({
    providedIn: 'root',
})
export class VGlobalVars {

    constructor(
        private plt: Platform,
        // private fcm: FCM,

    ) {

        this._innerWidth = window.innerWidth;
        // window.addEventListener("resize", this.onResize, false);

        if(plt.is('ios')) {
            this._mobileOs = 'ios';
        } else if(plt.is('android')) {
            this._mobileOs = 'android';
        }

        if( plt.is('ios') || plt.is('android') ) {
            if( !plt.is('mobileweb') ){
                this._isApp = true
                // this.fcm.getToken().then((token)=>{
                //     this._pushToken = token;
                // })
            }
        }

        // this._isApp = true;
        //유저 정보
        VStorageUtils.getInstance().get("userDetail").then((custMst: string) => {
            this._userDetail = JSON.parse(custMst);
            if(this.isLogin) {

            }
        })
        //jwt 토큰
        VStorageUtils.getInstance().get("token").then((jwt: string) => {
            this._token = jwt;
        })
        //단지코드
        VStorageUtils.getInstance().get("bzModel").then((bzModel: string) => {
            this._bzModel = JSON.parse(bzModel);
            if(this._bzModel) {
                // let bz = new TerrBzModel();
                // bz.bzCd = "100100";
                // bz.bzNm = "빌리브 하남";
                // this._bzModel = bz;
                this._bzCd = this._bzModel.bzCd;
            }
            // this._bzCd = '217029';
        })

        if(!this._isApp) {
            this._isApp = false;
            return;
        }

        //핀코드
        VStorageUtils.getInstance().get("pinCode").then(( pinCode: string) => {
            this._pinCode = pinCode;
        })
        //앱권한인증
        VStorageUtils.getInstance().get("appAuth").then((appAuth: string) => {
            this._isShowAppAuth = appAuth === '1';
        })

    }
    /**
     * 스플래시 끝났는지 유무
     * */
    private _isEndSplash: boolean;

    /**
     * 윈도우 가로 길이
     * 1025px 이상일경우 pc 화면
     * */
    private _innerWidth: number;


    /**
     * 선택 단지 정보 (비로그인일때만 사용)
     * */
    private _bzModel: TerrBzModel;
    private _bzCd: string = "";

    /**
     * 로그인한 유저 정보
     * */
    private _userDetail: CustMstModel = null;

    /**
     * 앱 유무
     * */
    private _isApp: boolean;

    /**
     * 앱권한안내 확인 유무
     * */
    private _isShowAppAuth: boolean;

    /**
     * 핀코드
     * */
    private _pinCode: string;

    /**
     * 푸쉬토큰
     * */
    private _pushToken: string;

    /**
     * 인증토큰
     * */
    private _token: string;

    /**
     * 모바일 os
     * android / ios
     * */
    private _mobileOs: string;

    /**
     * 현재 버전
     * */
    private _currentVer: string;

    /**
     * 최신앱 유무
     * */
    private _isNewestApp: boolean = true;

    /**
     * 메뉴 리스트 맵
     */
    mnuListMap: Object = {}

    /**
     * 카카오 채널 아이디
     */
    kakaoChnlId: string;

    /**
     * 단지이름 getter
     */
    get bzNm(): string {
        if(this.userDetail && this.userDetail.bzNm) {
            return this.userDetail.bzNm;
        }
        if(this._bzModel) {
            return this._bzModel.bzNm;
        }
        return "";
    }

    /**
     * 단지코드 getter
     */
    get bzCd(): string {
        if(this.userDetail && this.userDetail.bzNm) {
            return this.userDetail.bzCd;
        }
        return this._bzCd;
    }

    /**
     * 앱 접근권한 봤으면 true
     */
    get isShowAppAuth(): boolean {
        if(!this.isApp) {
            return true;
        }
        return this._isShowAppAuth ;
    }

    /**
     * 회원 정보 setter
     */
    set isShowAppAuth(appAuth:boolean) {
        VStorageUtils.getInstance().set("appAuth",appAuth? "1" : "0");
        this._isShowAppAuth = appAuth;
    }

    /**
     * 앱이면 true
     */
    get isApp(): boolean {
        return this._isApp;
    }

    /**
     * 회원 정보 getter
     */
    get userDetail(): CustMstModel {
        return this._userDetail
    }

    /**
     * 앱스플래시 끝났으면 true
     *
     */
    get isEndSplash(): boolean {
        return this._isEndSplash;
    }

    /**
     * isEndSplash setter
     */
    set isEndSplash(isEndSplash: boolean) {
        this._isEndSplash = isEndSplash;
    }

    /**
     * jwt 토큰 getter
     */
    get token() {
        return this._token;
    }

    /**
     * 회원 정보 setter
     */
    set userDetail(custMst: CustMstModel) {
        VStorageUtils.getInstance().set("userDetail",JSON.stringify(custMst));
        if(custMst) {
            let bzModel = new TerrBzModel();
            bzModel.bzNm = custMst.bzNm;
            bzModel.bzCd = custMst.bzCd;
            VStorageUtils.getInstance().set("bzModel",JSON.stringify(bzModel));
        }
        this._userDetail = custMst;
    }

    /**
     * bzModel setter
     */
    set bzModel(bzModel: TerrBzModel) {
        VStorageUtils.getInstance().set("bzModel",JSON.stringify(bzModel));
        if(bzModel) {
            this._bzModel = bzModel;
            this._bzCd = bzModel.bzCd;
        }
    }

    /**
     * jwt 토큰 setter
     */
    set token(jwt: string) {
        VStorageUtils.getInstance().set("token",jwt);
        this._token = jwt;
    }

    /**
     * 로그인 유무
     */
    get isLogin(): boolean {
        return this._userDetail != null && this._userDetail.custSts==='B';
    }

    /**
     * 1025px 이상일경우 pc 화면
     */
    get isPc() {
        return this._innerWidth >= 1025
    }

    /**
     * pinCode getter
     */
    get pinCode() {
        return this._pinCode;
    }

    /**
     * push token getter
     */
    get pushToken() {
        return this._pushToken;
    }


    /**
     * push token getter
     */
    set pushToken(token:string) {
        this._pushToken = token;
    }

    /**
     * pinCode setter
     */
    set pinCode(newCode: string) {
        this._pinCode = newCode;
        VStorageUtils.getInstance().set('pinCode', this._pinCode).then();
    }

    /**
     * 로그아웃
     * */
    logout(isChangeBz = false) {
        this.userDetail = null;
        this.token = null;
        if(!isChangeBz) {
            this.bzModel = null;
        }
    }
    //TODO not working..
    // /**
    //  * window resize event
    //  */
    // onResize() {
    //     if(this._innerWidth == window.innerWidth) {
    //         return;
    //     }
    //     this._innerWidth = window.innerWidth;
    // }

    /**
     * 플랫폼유형
     * A = 앱
     * W = pc웹
     * M = 모바일웹
     * */
    get platformTp() {
        if(this.isApp) {
            return 'A'
        } else {
            return this.isPc ? 'W' : 'M'
        }
    }

    /**
     * mobileOs getter
     * */
    get mobileOs() {
        if(this.isApp) {
            return this._mobileOs
        } else {
            return 'W'
        }
    }

    /**
     * loginTp getter
     * */
    get loginTp() {
        if(this.isApp) {
            if(this._mobileOs==='android') {
                return 'A';
            } else if(this._mobileOs==='ios') {
                return 'I';
            }
            return 'NONE';
        } else {
            return this.isPc ? 'W' : 'MW';
        }
    }

    /**
     * isNewestApp getter
     * */
    get isNewestApp() {
        return this._isNewestApp;
    }

    /**
     * isNewestApp setter
     * */
    set isNewestApp(isNewestApp: boolean) {
        this._isNewestApp = isNewestApp;
    }

    /**
     * currentVer getter
     * */
    get currentVer() {
        return this._currentVer
    }

    /**
     * currentVer setter
     * */
    set currentVer(currentVer: string) {
        this._currentVer = currentVer;
    }

    /**
     * 메뉴목록 get
     * */
    getMenuList(): Array<MnuModel> {

        const mnuList: Array<MnuModel> = this.mnuListMap[this.bzCd];

        if( mnuList && mnuList.length > 0 ) {
            return mnuList;
        }

        return mnuList;
    }

    /**
     * 메뉴목록 set
     * */
    setMenuList(mnuList: Array<MnuModel>) {
        this.mnuListMap[this.bzCd] = mnuList;
    }


}
