import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {MyHomeDayModel} from "../../../core/models/my-page/my-home-day-model";
import * as moment from "moment";
import {CustMstModel} from "../../../core/models/my-page/cust-mst-model";
import {MyPageService} from "../../../core/service/my-page/my-page.service";
import {BillFeeModel} from "../../../core/models/my-page/bill-fee-model";
import {ResvHisModel} from "../../../core/models/bs-svc/resv/resv-his-model";
import {SystemService} from "../../../core/service/system/system.service";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import GlobalConstants from "../../../core/constants/global-constants";

@Component({
    selector: 'app-my-home-service-list',
    templateUrl: './my-home-service-list.page.html',
    styleUrls: ['./my-home-service-list.page.scss'],
})
export class MyHomeServiceListPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
        , public globalVars: VGlobalVars
        , public systemService: SystemService
        , public eventUtils: VEventUtils
        , public pageUtils: VPageUtils
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     *  한번에 보이는 요일 갯수
     */
    viewCount: number = this.globalVars.isPc ? 15 : 7;
    /**
     *  오늘날짜 앞뒤로 n일까지 생성
     */
    offset: number = 30;

    /**
     * 요일 설정 목록
     */
    dayConfigList: Array<MyHomeDayModel>;

    /**
     * 오늘날짜 YYYYMMDD
     */
    todayStr: string;

    /**
     * 선택날짜 YYYYMMDD
     */
    selectedDayStr: string;

    /**
     * 선택관리비 달 MM
     */
    selectedBillMonthStr: string;

    /**
     *  로그인유저 detail
     */
    userDetail: CustMstModel;

    /**
     *  일자별 내역 목록
     */
    historyListByDate: Array<ResvHisModel>;

    /**
     *  기간별 내역 목록
     */
    historyListByPeriod: Array<ResvHisModel>;

    /**
     * 관리비 상세
     * */
    billModel: BillFeeModel;

    ngOnInit() {
    }

    ionViewDidEnter() {
        //TODO load day list
        this.userDetail = this.globalVars.userDetail;
        this.dayConfigList = new Array<MyHomeDayModel>();
        this.todayStr = moment().format('YYYYMMDD');
        this.selectedDayStr = this.todayStr;
        this.selectedBillMonthStr = this.todayStr.substring(0,6);

        for (let i = -this.offset; i < this.offset; i++) {
            let day = new MyHomeDayModel();
            day.day = moment().add(i, 'days').format('YYYYMMDD');
            this.dayConfigList.push(day);
        }
        this.loadBillDetail(this.selectedBillMonthStr);
        this.onPageReady();
    }

    /**
     * 일자별 내역 존재 유무
     */
    get isExistListByDate() {
        return this.historyListByDate && this.historyListByDate.length > 0
    }

    /**
     * 기간별 내역 존재 유무
     */
    get isExistListByPeriod() {
        return this.historyListByPeriod && this.historyListByPeriod.length > 0
    }

    /**
     * 관리비 내역 존재 유무
     */
    get isExistBill() {
        return this.billModel
    }

    /**
     * 상단 슬라이더 로딩 완료 이벤트
     */
    ionSlidesDidLoad(slides) {
        if(this.globalVars.isPc) {
            slides.getActiveIndex().then((index) => {
                slides.lockSwipes(false).then(()=>{
                    slides.slideTo(index + this.offset -((this.viewCount-1)/2), 0, false).then(()=>{
                        slides.lockSwipes(false);
                    });
                });
            });
        } else {
            slides.getActiveIndex().then((index) => {
                slides.slideTo(index + this.offset -((this.viewCount-1)/2), 0, false).then(()=>{
                });
            });
        }
    }
    /**
     * 날짜 설정 목록 가져오기
     */
    loadMyHomeServiceDayList() {
        //TODO
        // const params: any = {
        // };
        // this.myPageService.loadMyHomeServiceDayList(params).then((model)=>{
        //     console.log(model.result);
        // })
    }

    /**
     * 날짜별 이력목록 가져오기
     */
    loadMyHomeServiceByDay() {
        //TODO
        // const params: any = {
        // this.selectedDayStr
        // };
        // this.myPageService.loadMyHomeServiceByDay(params).then((model)=>{
        //     console.log(model.result);
        // })
    }

    /**
     * pc 슬라이드 이전(왼쪽) 버튼 (pc 만)
     */
    onClickPrev(slides) {
        slides.getActiveIndex().then((index) => {
            if(index === 0) {
                this.eventUtils.alert('오늘을 기준으로 30일 이내의 정보만 조회 가능합니다.');
                return;
            }
            let newIndex = index - (this.viewCount-1)/2;
            if(newIndex<0) {
                newIndex = 0;
            }
            slides.lockSwipes(false).then(()=>{
                slides.slideTo(newIndex).then(() => {
                    slides.lockSwipes(true);
                });

            });
        });
    }

    /**
     * 슬라이드 다음(오른쪽) 버튼 (pc만)
     */
    onClickNext(slides) {

        slides.getActiveIndex().then((index) => {
            if(index === this.viewCount + this.offset) {
                this.eventUtils.alert('조회 당일 기준으로 30일 이내의 일자만 조회 가능합니다.');
                return;
            }
            let newIndex = index + (this.viewCount-1)/2;
            if(newIndex > this.dayConfigList.length-1) {
                newIndex = this.dayConfigList.length-1;
            }
            slides.lockSwipes(false).then(() => {
                slides.slideTo(newIndex).then(() => {
                    slides.lockSwipes(true);
                });
            });

        });
    }

    /**
     * 상단 달력 오늘날짜거나 선택된 날짜일경우 클래스
     */
    getTodayClassName(str) {
        if (this.selectedDayStr === str) {
            return "on";
        }
        if (this.todayStr === str) {
            return "today";
        }

        return '';
    }

    /**
     * 상단 달력 요일 클래스 이름 가져오기
     * 토 : sat
     * 일 : sun
     */
    getDayOfTheWeekClassName(dayOfTheWeek) {
        dayOfTheWeek = dayOfTheWeek.toLowerCase();
        if(dayOfTheWeek === 'sun' || dayOfTheWeek === 'sat') {
            return dayOfTheWeek;
        }
        return '';
    }

    /**
     * 상단 달력 일자 선택
     */
    onClickDay(str) {
        this.selectedDayStr = str;
        this.loadMyHomeServiceByDay();
    }

    /**
     * 관리비 가져오기
     */
    loadBillDetail(yearMonthStr: string) {
        this.selectedBillMonthStr = yearMonthStr;
        const params: any = {
            bzCd : this.globalVars.bzCd,
            blNo : this.userDetail.blNo,
            rmNo : this.userDetail.rmNo,
            rmdMo : this.userDetail.rmdNo,
            year : yearMonthStr.substring(0,4),
            month : yearMonthStr.substring(4,6),
        };
        this.myPageService.loadBillDetail(params).then((model)=>{
            this.billModel = model.result['data'] as BillFeeModel;
        })
    }

    /**
     *  이번달 +n
     */
    getMonth(number: number,format: string = 'MM') {
        return moment().add(number, 'months').format(format);
    }

    /**
     *  관리비
     */
    onClickBill(yearMonthStr) {
        this.loadBillDetail(yearMonthStr);
    }

    /**
     * 관리비 자세히 보기
     * */
    goPageBillDetail() {
        //TODO
        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_BILL.URL,{yearMonthStr:this.selectedBillMonthStr});
    }

    /**
     * 관리비 총 요금 계산
     * */
    get billTotalFee() {
        if(this.billModel) {
            return this.billModel.fee + this.billModel.unpaidFee + this.billModel.unpaidCharge;
        }
        return 0;
    }

    /**
     * 요금 비교
     * */
    compareBillFee(current,before) {
        let className = "";
        if(current > before) {
            className = "up";
        } else if(current < before){
            className = "down";
        }
        return className;
    }
}
