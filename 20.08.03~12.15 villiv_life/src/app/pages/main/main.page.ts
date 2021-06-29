import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../core/utils/v-page-utils.service";
import {VUtils} from "../../core/utils/v-utils";
import {VGlobalVars} from "../../core/utils/v-global-vars";
import {MainService} from "../../core/service/main/main.service";
import {LterngService} from "../../core/service/lterng/lterng.service";
import {LterngModel} from "../../core/models/lterng/lterng-model";
import {VEventUtils} from "../../core/utils/v-event-utils";
import {AnimationOptions} from 'ngx-lottie';
import {BltbrdModel} from "../../core/models/bltbrd/bltbrd-model";
import {SsgGrpcModel} from "../../core/models/event/ssg-grpc-model";
import GlobalConstants from "../../core/constants/global-constants";
import {AnimationItem} from "lottie-web";
import {BasePage} from "../BasePage";

import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {environment} from "../../../environments/environment";
import {ServiceModel} from "../../core/service/ServiceModel";
import {SystemService} from "../../core/service/system/system.service";
import {BsSvcModel} from "../../core/models/bs-svc/bs-svc-model";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage extends BasePage implements OnInit {

    constructor(private pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public globalVars: VGlobalVars
        , public mainService: MainService
        , public lterngService: LterngService
        , private nav: NavController
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            nav: nav,
            globalVars: globalVars,
            router: router
        });
    }

    mainAnimOptions: AnimationOptions;

    /**
     * 오늘 날짜
     */
    today: string = VUtils.getDateYYYYMMDD();
    todayDate: Date = new Date();

    /**
     * 레터링 상세
     */
    lterng: LterngModel;

    /**
     * 공지사항 상세
     */
    notice: BltbrdModel;

    /**
     * ssg그룹 상세
     */
    ssgGrpc: SsgGrpcModel;

    /**
     * 오늘의 일정 수
     */
    scheduleCount: number;
    /**
     * 진행중 설문조사 수
     */
    qstnCount: number;
    /**
     * 진행중 투표 수
     */
    voteCount: number;
    /**
     * 진행중 강좌 수
     */
    lecCount: number;
    /**
     * 조식 서비스 아이디
     */
    lnchSvcId: string;
    /**
     * 내부시설 서비스 목록
     */
    innerRsvList: Array<BsSvcModel>;

    /**
     * 선택한 내부시설 서비스 아이디
     */
    selectedInnerSvc: string


    /**
     * 신규 약관 여부
     */
    isNewTerms: boolean;

    /**
     * 팝업 on/off
     * ios
     * android
     * 앱접근권한
     * 신규약정알림
     * 내부시설예약
     */
    isShowNewTerms: { container: boolean, layer: boolean } = { container: false,layer: false};
    isShowAppAuth: { container: boolean, layer: boolean } = { container: false,layer: false};
    isShowIOSPopup: { container: boolean, layer: boolean } = { container: false,layer: false};
    isShowAndroidPopup: { container: boolean, layer: boolean } = { container: false,layer: false};
    isShowInnerSvcPopup: { container: boolean, layer: boolean } = { container: false,layer: false};
    /**
     * 메뉴 타입상수
     */
    readonly menuTypeConstants: GlobalConstants.MENU = GlobalConstants.MENU;

    /**
     * 날씨 정보
     */
    weatherInfoArray: Array<string> = [];

    /**
     * 날씨 강수 관련 클래스 목록
     */
    skyClassNameList: Array<string> = [
        "w_sunny"   //맑음(1) w_sunny
        ,""         //삭제됨
        ,"w_cloudy" //구름많음(3) w_cloudy
        ,"w_blur"   //흐림(4) w_blur
    ]
    ptyClassNameList: Array<string> = [
        "w_rain"    //비(1) w_rain
        ,"w_rain_snow"  //비/눈(2) w_rain_snow
        ,"w_snowy" //눈(3) w_snowy
        ,"w_shower"    //소나기(4) w_shower
        ,"w_raindrop"    //빗방울(5) w_raindrop
        ,"w_rain_snow2"    //빗방울/눈날림(6) w_rain_snow2
        ,"w_snow"    //눈날림(7) w_snow
    ]

    ngOnInit() {

    }

    ionViewDidEnter() {
        if(this.globalVars.isLogin) {
            this.checkTermsChanged();
        }
        this.isShowAppAuth.container = !this.globalVars.isShowAppAuth;
        this.isShowAppAuth.layer = !this.globalVars.isShowAppAuth;
        // this.loadWeatherInfo();
        //this.loadLatestLterng();
        this.loadMainContents();
    }

    /**
     * 메인 컨텐츠 조회
     * */
    loadMainContents() {
        const params: any = {
            bzCd: this.globalVars.bzCd
        }
        this.mainService.loadMainContents(params).then((model)=>{
            //레터링
            this.lterng = model.result['lterngDTO'] as LterngModel;
            //날씨
            if(model.result['weatherInfo'] && model.result['weatherInfo']['weatherDetail']) {
                this.weatherInfoArray = model.result['weatherInfo']['weatherDetail'].split( '&' );
            }

            //TODO: 개발기 방화벽 오픈 후 삭제 처리
            if( environment.curenv == 'www-dev' || environment.curenv == 'www-local'
                || environment.curenv == 'device-dev' ) {

                const empty:any = {};
                this.mainService.loadWeatherInfo( empty)
                    .then( (model: ServiceModel) => {
                        this.weatherInfoArray = model.result['weatherDetail'].split( '&' );
                    });
            }

            //공지사항
            this.notice = model.result['noticeDTO'] as BltbrdModel;
            //SSG
            this.ssgGrpc = model.result['ssgGrpcDTO'] as SsgGrpcModel;
            //진행중 설문 수
            this.qstnCount = model.result['qstnCount'] as number;
            //진행중 투표 수
            this.voteCount = model.result['voteCount'] as number;
            //진행중 강좌 수
            this.lecCount = model.result['lecCount'] as number;

            //오늘의 일정 수
            //TODO
            this.scheduleCount = 0;
            // this.scheduleCount = model.result['scheduleCount'] as number;

            //조식 서비스 아이디
            this.lnchSvcId = model.result['lnchSvcId'];
            //내부시설 서비스 목록
            this.innerRsvList = model.result['innerRsvList'] as Array<BsSvcModel>;



            let mainThemeFileId = model.result['mainThemeDTO']['imgFileIdOrg'];

            this.onPageReady();

            if(this.mainAnimOptions && this.mainAnimOptions['path'] === '/assets/theme/'+mainThemeFileId) {
                return;
            }
            this.mainAnimOptions = {
                path: '/assets/theme/'+mainThemeFileId,
                autoplay: true,
                loop: true,
            }
        });
    }

    /**
     * 약관 개정 여부
     */
    checkTermsChanged(): void {
        const params: any = {
            custId: this.globalVars.userDetail.custId
        }
        this.mainService.checkTermsChanged(params).then((model)=>{
            this.isNewTerms = model.result['data'] === '1';

            this.isShowNewTerms.container = this.isNewTerms;
            this.isShowNewTerms.layer = this.isNewTerms;
        });
    }


    /**
     * 레터링 조회 (deprecated)
     */
    // loadLatestLterng(): void {
    //     const params: any = {bzCd: this.globalVars.bzCd}
    //     this.lterngService.loadLatestLterng(params).then((model)=>{
    //         this.lterng = model.result['data'];
    //     });
    // }

    /**
     * 날씨 정보 조회 (deprecated)
     * 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4), [구름조금(2) 삭제 (2019.06.4)]
     * 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
     *  ex ) 1 & 0 & 13
     *      SKY&PTY&T3H
     */
    // loadWeatherInfo(): void {
    //     const params: any = {bzCd: this.globalVars.bzCd}
    //     this.mainService.loadWeatherInfo(params).then((model)=>{
    //         this.weatherInfoArray = model.result['weatherDetail'].split( '&' );
    //     });
    // }

    /**
     * 날씨 아이콘 클래스 가져오기
     * 강수가 우선순위가 높음
     * */
    get getWeatherCode() {
        if(this.weatherInfoArray.length<2) {
            return;
        }
        let sky = Number(this.weatherInfoArray[0]);
        let pty = Number(this.weatherInfoArray[1]);

        if(pty === 0) {
            return this.skyClassNameList[sky-1];
        } else {
            return this.ptyClassNameList[pty-1];
        }
    }
    /**
     * 약관 페이지로 이동
     * */
    goTermsPage() {
        const params: any = {
            custId: this.globalVars.userDetail.custId
        }
        this.mainService.confirmTermsChanged(params).then((model)=>{
            if(model.isResultOK()) {
                this.isNewTerms = false;
                this.goPage(GlobalConstants.MENU.TERMS.URL);
            } else {
                //TODO 실패일경우
            }
        });
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
     * 페이지 이동
     * */
    goPage(url: string,data?:any) {
        if(!this.globalVars.isLogin) {
            const confirmCallback = async () => {
                this.pageUtils.navigateForward(GlobalConstants.MENU.LOGIN.URL);
            }

            let msg = this.globalVars.bzNm +' 입주민 전용 서비스입니다.';
            this.eventUtils.confirm(msg, confirmCallback,'확인','로그인');

        } else {
            this.pageUtils.navigateForward(url,data);
        }
    }

    /**
     * 새탭으로 열기
    * */
    goExternalPage(url) {
        this.pageUtils.openNewTab(url);
    }
    /**
     * 앱권한 정보 확인
     * */
    onClickShowAppAuthInfo() {
        this.globalVars.isShowAppAuth = true;
        this.isShowAppAuth.layer = false;
        setTimeout(()=>{
            this.isShowAppAuth.container = false;
        },300)
    }

    /**
     * 조식서비스로 이동
     */
    goLnchPage() {
        if(VUtils.isEmpty(this.lnchSvcId)) {
            return;
            // this.eventUtils.alert("준비중인 서비스입니다.")
        } else {
            this.goPage(this.menuTypeConstants.BS_SVC.URL+'/'+this.lnchSvcId)
            // this.goPage(this.menuTypeConstants.BS_LNCH.URL);
        }
    }

    /**
     * 내부시설선택 팝업 열기
     * */
    openInnerSvcPopup() {
        if(VUtils.isEmpty(this.innerRsvList)) {
            return;
            // this.eventUtils.alert("예약 가능한 시설이 없습니다.")
        } else {
            this.isShowInnerSvcPopup.container = true;
            this.isShowInnerSvcPopup.layer = true;
        }
    }
    /**
     * 내부시설선택  팝업 닫기
     * */
    closeInnerSvcPopup() {
        this.isShowInnerSvcPopup.layer = false;
        setTimeout(()=>{
            this.isShowInnerSvcPopup.container = false;
            this.selectedInnerSvc = null;
        },300)
    }
    /**
     * 내부시설선택 완료
     * */
    onClickConfirmInnerSvc() {
        if(VUtils.isEmpty(this.selectedInnerSvc)) {
            this.eventUtils.alert("예약하실 서비스를 선택해 주세요.");
            return;
        }
        this.closeInnerSvcPopup();
        this.goPage(this.menuTypeConstants.BS_SVC.URL+'/'+this.selectedInnerSvc);
    }
    /**
     * TODO remove
     * 미개발 페이지 alert
     */
    ingPage() {
        this.eventUtils.alert("작업 진행중인 페이지 입니다.")
    }


    animationCreated(animationItem: AnimationItem): void {
        VUtils.mainAnimation = animationItem;
    }

}
