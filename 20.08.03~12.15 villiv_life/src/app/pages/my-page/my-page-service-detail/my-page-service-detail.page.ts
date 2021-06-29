import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {ActivatedRoute, Router} from "@angular/router";
import {MyPageService} from "../../../core/service/my-page/my-page.service";
import {SystemService} from "../../../core/service/system/system.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import GlobalConstants from "../../../core/constants/global-constants";
import {ResvHisModel} from "../../../core/models/bs-svc/resv/resv-his-model";
import {VUtils} from "../../../core/utils/v-utils";
@Component({
    selector: 'app-my-page-service-detail',
    templateUrl: './my-page-service-detail.page.html',
    styleUrls: ['./my-page-service-detail.page.scss'],
})
export class MyPageServiceDetailPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
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
     * 예약 상태
     * */
    readonly utStatsConstants: GlobalConstants.UT_STATS = GlobalConstants.UT_STATS;

    /**
     * 예약내역 아이디
     * */
    resvId: string;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 예약내역 상세
     * */
    resvHisDetail: ResvHisModel;

    /**
     * 취소 동의
     * */
    selectedCancelAgree: string;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.resvId = this.route.snapshot.params['resvId'];

        if (VUtils.isValidDbRowId(this.resvId)) {
            this.loadResvHisDetail();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.");
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 서비스 이용 취소 클릭
     * */
    onClickCancel() {
        if (!this.selectedCancelAgree) {
            this.eventUtils.alert('유의사항 및 취소/환불정책 확인 여부를 체크해 주세요.');
            return;
        }
        //TODO
        console.log('취소하기 api')
    }

    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }

    /**
     * 예약 내역 가져오기
     */
    loadResvHisDetail() {

        const params: any = {
            resvId: this.resvId,
            bzCd: this.globalVars.bzCd,
        };
        this.myPageService.loadResvHisDetail(params).then((model) => {
            this.resvHisDetail = model.result['data'] as ResvHisModel;

            this.selectedTab = (this.resvHisDetail.resvTp === 'E' ? 'lecCts' : 'ntcMatt');
            this.onPageReady();
        });

    }

    /**
     * 목록 페이지로 이동
     */
    goListPage() {
        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_SVC.URL);
    }

    /**
     * 이용상태 가져오기
     * */
    getUtStat(code) {

        for( const key in GlobalConstants.UT_STATS ) {
            if(GlobalConstants.UT_STATS[key].TYPE === code ) {
                return GlobalConstants.UT_STATS[key].NAME
            }
        }
        return '';
    }

    /**
     * 주문상품 수량 합계
     * */
    getOdrTotalQnt() {
        let total = 0;
        if(!this.resvHisDetail) {
            return total;
        }
        this.resvHisDetail.lnchOdrList.forEach((odr)=>{
            total += odr.odrQnt;
        })
        return total;
    }

    /**
     * 무료혜택 주문 가져오기
     * */
    getFreeOdr() {
        if(!this.resvHisDetail) {
            return null;
        }
        for (let i=0; i<this.resvHisDetail.lnchOdrList.length; i++){
            if (this.resvHisDetail.lnchOdrList[i].useFreeYn === '1') {
                return this.resvHisDetail.lnchOdrList[i];
            }
        }
        return null;
    }

    /**
     * 유의사항
     * */
    getNtcMatt() {
        if(!this.resvHisDetail) {
            return '';
        }
        if(this.resvHisDetail.resvTp === 'E') {
            return this.resvHisDetail.lecture.ntcMatt
        } else if(this.resvHisDetail.resvTp === 'D') {
            return this.resvHisDetail.lnchMst.ntcMatt
        } else if(this.resvHisDetail.resvTp === 'B') {
            return '내부시설'
        }
    }

    /**
     * 취소/환불정책
     * */
    getCncPlcy() {
        if(!this.resvHisDetail) {
            return '';
        }
        if(this.resvHisDetail.resvTp === 'E') {
            return this.resvHisDetail.lecture.cncPlcy
        } else if(this.resvHisDetail.resvTp === 'D') {
            return this.resvHisDetail.lnchMst.cncPlcy
        } else if(this.resvHisDetail.resvTp === 'B') {
            return '내부시설'
        }
    }
}
