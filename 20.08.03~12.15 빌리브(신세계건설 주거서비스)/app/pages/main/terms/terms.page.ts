import {Component, OnInit} from '@angular/core';
import {MainService} from "../../../core/service/main/main.service";
import {NavigationEnd, Router} from "@angular/router";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {TermsInfModel} from "../../../core/models/terms-inf-model";
import {BasePage} from "../../BasePage";
import {SystemService} from "../../../core/service/system/system.service";


@Component({
    selector: 'v-terms',
    templateUrl: './terms.page.html',
    styleUrls: ['./terms.page.scss'],
})
export class TermsPage extends BasePage implements OnInit {


    constructor(
        public mainService: MainService
        , public router: Router
        , public pageUtil: VPageUtils
        , public globalVars: VGlobalVars
        , public systemService: SystemService
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                if(this.router.getCurrentNavigation().extras['tabCode']) {
                    this.selectedTermsKnd = this.router.getCurrentNavigation().extras['tabCode'];
                } else {
                    this.selectedTermsKnd = "A";
                }
                this.loadTermsInf();
                //최상단으로 스크롤 이동하려면 이렇게 해줘야함
                //v-body에 스크롤이 생겨서 이렇게 해줘야 동작함..
                document.querySelector('v-body').scrollTo(0,0);
            }

        });
    }

    /**
     * 약관 종류
     * */
    selectedTermsKnd: string;

    /**
     * 선택 약관 A,D버전
     * */
    selectedTermsAVer: string;
    selectedTermsDVer: string;

    /**
     * 약관 A,D 상세
     * */
    termsAInf: TermsInfModel;
    termsDInf: TermsInfModel;

    /**
     * 약관 A,D 버전 목록
     * */
    termsAVerList: Array<string>;
    termsDVerList: Array<string>;

    navigationSubscription;

    ngOnInit() {
        if(this.router.getCurrentNavigation().extras['tabCode']) {
            this.selectedTermsKnd = this.router.getCurrentNavigation().extras['tabCode'];
        } else {
            this.selectedTermsKnd = "A";
        }
        this.loadTermsVersionList();
    }
    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    scrollToElement(event) {
        console.log(event)
    }
    /**
     * 약관 버전 목록 가져오기
     * */
    loadTermsVersionList() {
        if(this.selectedTermsKnd==='A') {
            if(this.termsAVerList && this.termsAVerList.length>0) {
                return;
            }
        } else {
            if(this.termsDVerList && this.termsDVerList.length>0) {
                return;
            }
        }
        const params: any = {
            termsKnd: this.selectedTermsKnd
        };
        this.mainService.loadTermsVersionList(params).then((model) => {
            if(this.selectedTermsKnd==='A') {

                this.termsAVerList = model.result['data'] as Array<string>;
                if(this.termsAVerList.length>0) {
                    this.selectedTermsAVer = this.termsAVerList[0];
                }
            } else {
                this.termsDVerList = model.result['data'] as Array<string>;
                if(this.termsDVerList.length>0) {
                    this.selectedTermsDVer = this.termsDVerList[0];
                }
            }
            this.loadTermsInf();
        })
    }

    /**
     * 약관 상세 가져오기
     * */
    loadTermsInf() {

        const params: any = {
            termsKnd: this.selectedTermsKnd,
            termsVer: this.selectedTermsKnd ==='A' ? this.selectedTermsAVer : this.selectedTermsDVer,
        };
        this.mainService.loadTermsInf(params).then((model) => {
            if(this.selectedTermsKnd ==='A') {
                this.termsAInf = model.result['data'] as TermsInfModel;
            } else {
                this.termsDInf = model.result['data'] as TermsInfModel;
            }
            this.onPageReady();
        })
    }

    /**
     * 탭버튼 클릭
     * */
    onClickTab(termsKnd) {
        this.selectedTermsKnd = termsKnd;
        this.loadTermsVersionList();
    }


    /**
     * 약관 버전 변경
     * */
    onChangeTermVer() {
        this.loadTermsInf();
    }
}
