import {Component, OnInit} from '@angular/core';
import {VUtils} from "../../../core/utils/v-utils";
import {ActivatedRoute, Router} from "@angular/router";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {BsSvcService} from "../../../core/service/bs-service/bs-svc.service";
import {BsSvcModel} from "../../../core/models/bs-svc/bs-svc-model";
import {ModalPopupPage} from "../../../core/modals/modal-popup.page";
import {BasePage} from "../../BasePage";
import GlobalConstants from "../../../core/constants/global-constants";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.page.html',
    styleUrls: ['./service-info.page.scss'],
})
export class ServiceInfoPage extends BasePage implements OnInit {

    constructor(
        public bzSvcService: BsSvcService
        , public systemService: SystemService
        , public route: ActivatedRoute
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
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
     * 서비스 아이디
     * */
    svcId: string;

    /**
     * 우리단지서비스 상세
     * */
    bzSvcDetail: BsSvcModel;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 선택한 상품 아이디
     * */
    selectedPrdId: string;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.svcId = this.route.snapshot.params['svcId'];

        if (!VUtils.isEmpty(this.svcId)) {
            this.onLoadBzSvcDetail();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.")
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 우리단지 서비스 상세 가져오기
     */
    onLoadBzSvcDetail() {

        const params: any = {
            svcId: this.svcId,
            bzCd: this.globalVars.bzCd
        };
        this.bzSvcService.loadDetail(params)
            .then((model) => {
                this.bzSvcDetail = model.result["data"] as BsSvcModel;

                if(!VUtils.isEmpty(this.bzSvcDetail.resvPrdList)) {
                    this.selectedPrdId = this.bzSvcDetail.resvPrdList[0].prdId;
                }

                this.onPageReady();
            });
    }

    /**
     * 외부링크
     * */
    goExternalPage(url) {
        this.pageUtils.openNewTab(url);
    }

    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }

    /**
     * 슬라이드 다음(오른쪽) 버튼
     */
    slideNext(slides){
        slides.slideNext();
    }

    /**
     * 슬라이드 이전(왼쪽) 버튼
     */
    slidePrev(slides){
        slides.slidePrev();
    }

    /**
     * 이미지 큰화면으로 보기
     * */
    async openFullImageModal(imagePath) {
        return await this.pageUtils.openModal(ModalPopupPage,{ 'imagePath': imagePath });
    }

    /**
     * 타입별 예약페이지로 이동
     * */
    goResvPage(id: string) {
        if(!this.globalVars.isLogin) {
            const confirmCallback = async () => {
                this.pageUtils.navigateForward(GlobalConstants.MENU.LOGIN.URL);
            }
            let msg = this.globalVars.bzNm +' 입주민 전용 서비스입니다.';
            this.eventUtils.confirm(msg, confirmCallback,'확인','로그인');
            return;
        }

        if(VUtils.isEmpty(id)) {
            return;
        }
        switch (this.bzSvcDetail.svcTp) {
            case 'A' :
                this.pageUtils.navigateForward(GlobalConstants.MENU.BS_RESV.URL+'/'+id);
                break;
            case 'B' :
                this.pageUtils.navigateForward(GlobalConstants.MENU.BS_RESV.URL+'/'+id);
                break;
            case 'C' :
                this.pageUtils.navigateForward(GlobalConstants.MENU.BS_PTNR.URL+'/'+id);
                break;
            case 'D' :
                this.pageUtils.navigateForward(GlobalConstants.MENU.BS_LNCH.URL,{svcId:id});
                break;
            default:
                this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 타입별 요금 단위 이름
     * */
    getTopFeeUnit(resvCd) {
        if(VUtils.isEmpty(resvCd)) {
            return '';
        }
        if(resvCd === 'A' || resvCd === 'B') {
            return '월'
        } else if(resvCd === 'C') {
            return '1박'
        } else if(resvCd === 'D') {
            return '일'
        } else if(resvCd === 'E') {
            return '시간'
        }
    }
    
    /**
     * 상품 클릭
     * */
    onClickPrd(prdId: string) {
        if(this.selectedPrdId === prdId) {
            this.selectedPrdId = '';
            return;
        }
        this.selectedPrdId = prdId;
    }
}
