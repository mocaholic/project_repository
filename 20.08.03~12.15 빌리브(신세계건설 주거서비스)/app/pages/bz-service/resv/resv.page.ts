import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {ActivatedRoute, Router} from "@angular/router";
import {BsSvcService} from "../../../core/service/bs-service/bs-svc.service";
import {SystemService} from "../../../core/service/system/system.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {VUtils} from "../../../core/utils/v-utils";
import {ResvDayModel, ResvMonthModel, ResvOptn, ResvPrdModel, ResvTime} from "../../../core/models/bs-svc/resv/resv-prd.model";
import {DayConfig} from "ion2-calendar";
import GlobalConstants from '../../../core/constants/global-constants.js';
import * as moment from "moment";
import {ResvOptnModel} from "../../../core/models/bs-svc/resv/resv-optn.model";
import {TerrBzModel} from "../../../core/models/story/terr-bz";
import {StringDateFormatDtPipe} from "../../../core/pipes/string-date-format-dt.pipe";
import {GetDayOfTheWeekPipe} from "../../../core/pipes/get-day-of-the-week";

@Component({
    selector: 'app-resv',
    templateUrl: './resv.page.html',
    styleUrls: ['./resv.page.scss'],
    providers: [StringDateFormatDtPipe,GetDayOfTheWeekPipe],
})
export class ResvPage extends BasePage implements OnInit {

    constructor(
        public bsSvcService: BsSvcService
        , public systemService: SystemService
        , public route: ActivatedRoute
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
        , public stringDateFormatDtPipe: StringDateFormatDtPipe
        , public getDayOfTheWeekPipe: GetDayOfTheWeekPipe
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });

    }

    /**
     * 상품 ID
     * */
    prdId: string;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 예약상품 상세
     * */
    resvMstDetail: ResvPrdModel;

    /**
     * 달력 옵션
     * */
    calendarOption: object;

    // /**
    //  * 선택 달 상세
    //  * */
    // selectedMonthDetail: ResvMonthModel;

    /**
     * 선택 달 체크박스
     * */
    selectedMonth: string;

    /**
     * 자동연장여부
     * */
    selectedExtension: string = "0";

    /**
     * 취소/환불정책 동의
     * */
    selectedAgree: string;

    /**
     * 달력 선택 날짜
     * */
    selectedDate: any;

    /**
     * 예약 선택 일 목록 (C)
     * */
    dayList: Array<ResvDayModel>;

    /**
     * 예약 선택 일 (D)
     * */
    dayDetail: ResvDayModel;

    /**
     * 예약 선택 시간 (E)
     * */
    timeList: Array<ResvTime>;

    /**
     * 선택 옵션 목록
     * */
    selectedOptnList: Array<ResvOptn>;


    // //TODO remove , only test
    // testType(type) {
    //     if (!this.resvMstDetail) {
    //         this.resvMstDetail = new ResvPrdModel();
    //     }
    //     this.resvMstDetail = null;
    //     this.loadResvPrdDetail(type);
    // }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.prdId = this.route.snapshot.params['prdId'];

        if (VUtils.isValidDbRowId(this.prdId)) {
            //TODO 아이디로 검색하게 변경
            this.loadResvPrdDetail('A');
        } else {
            this.eventUtils.alert("잘못된 접근입니다.");
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }

    /**
     * 서비스정보 페이지로 이동
     * */
    goServiceInfoPage() {
        this.pageUtils.navigateForward(GlobalConstants.MENU.BS_SVC.URL + '/' + this.prdId);
    }

    /**
     * 서비스 상품 정보 가져오기
     */
    loadResvPrdDetail(type) {
        // prdId: this.prdId,
        // bzCd: this.globalVars.bzCd,
        const params: any = {
            reservType: type,
        };
        this.bsSvcService.loadResvPrdDetail(params).then((model) => {
            this.resvMstDetail = model.result['data'] as ResvPrdModel;

            this.onPageReady();
            if (this.resvMstDetail.resvCd === 'A' || this.resvMstDetail.resvCd === 'B') {
                return;
            }
            this.selectedOptnList = new Array<ResvOptn>();

            let _daysConfig: DayConfig[] = [];
            this.resvMstDetail.monthList.forEach((month) => {
                month.days.forEach((day) => {
                    if (day.reservableCode === 0) {
                        _daysConfig.push({
                            date: new Date(month.year, month.month - 1, day.day),
                            disable: true
                        });
                    }

                });

            });
            this.selectedDate = undefined;
            this.calendarOption = {
                from: new Date(this.resvMstDetail.monthList[0].year, this.resvMstDetail.monthList[0].month - 1, this.resvMstDetail.monthList[0].startDay),
                to: new Date(this.resvMstDetail.monthList[this.resvMstDetail.monthList.length - 1].year, this.resvMstDetail.monthList[this.resvMstDetail.monthList.length - 1].month - 1, this.resvMstDetail.monthList[this.resvMstDetail.monthList.length - 1].endDay),
                monthFormat: 'YYYY년 MM월 ',
                monthPickerFormat: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                weekdays: ['일', '월', '화', '수', '목', '금', '토'],
                daysConfig: _daysConfig
            };
            if (this.resvMstDetail.resvCd === 'C') {
                this.calendarOption['pickMode'] = 'range';
            }
        });


    }

    /**
     * 달력 선택일자 변경 이벤트
     * */
    onChangeCalendarDate() {
        if (this.resvMstDetail.resvCd === 'C') {
            let diffCount = this.getDiffDayCount(this.selectedDate.from, this.selectedDate.to);
            ;

            if (diffCount > this.resvMstDetail.strLmtDt) {
                this.eventUtils.alert('최대 숙박일 수는 ' + this.resvMstDetail.strLmtDt + '박 입니다.', '', () => {
                    this.selectedDate = undefined;
                    this.dayList = null;
                });
            } else if (diffCount === 0) {
                this.selectedDate = undefined;
                this.dayList = null;
            } else {
                let dayList = this.getResvDayList(this.selectedDate.from, this.selectedDate.to);
                if (!dayList) {
                    this.eventUtils.alert('숙박기간은 연박으로 선택해 주세요.');
                } else {
                    this.dayList = dayList;
                }
            }
        } else if (this.resvMstDetail.resvCd === 'D' || this.resvMstDetail.resvCd === 'E') {
            this.dayDetail = this.getResvDay(moment(this.selectedDate).format('YYYYMMDD'));
            this.timeList = new Array<ResvTime>();
        }

    }

    /**
     * 월별(A,B)일때 달력 선택 비활성화 클래스
     * */
    getMonthDisableClass(isReservable: boolean, index: string) {
        if (!isReservable) {
            return 'disabled';
        }
        if (this.selectedMonth === index) {
            return 'on';
        }
    }

    /**
     * 월별(A,B)일때 요금 가져오기
     * */
    getCalcCurrentMonthFee(monthIndex) {
        if (VUtils.isEmpty(monthIndex)) {
            return 0;
        }
        if (!this.resvMstDetail) {
            return 0;
        }
        if (this.resvMstDetail.monthList[monthIndex]) {
            return this.resvMstDetail.monthList[monthIndex].price;
        }
        return 0;
    }

    /**
     * 일자예약(C)일때 요금 가져오기
     * */
    getCalcCurrentRoomFee() {
        if (VUtils.isEmpty(this.dayList)) {
            return 0;
        }

        let totalFee = 0;
        this.dayList.forEach((day) => {
            totalFee += day.price;
        });
        return totalFee;
    }

    /**
     * 일자예약(D)일때 요금 가져오기
     * isExceptOption = false 라면 옵션포함 가격
     * */
    getCalcCurrentDayFee(isExceptOption: boolean = false) {
        if (VUtils.isEmpty(this.dayDetail)) {
            return 0;
        }
        //할인율 적용
        let totalFee = this.dayDetail.price;
        let prdPrcDcrt = Number(this.resvMstDetail.prdPrcDcrt);
        if(prdPrcDcrt>0) {
            totalFee *= (1-prdPrcDcrt/100);
        }
        if(!isExceptOption) {
            this.selectedOptnList.forEach((optn: ResvOptn) => {
                totalFee += optn.optnPrc;
            });
        }
        return totalFee;
    }

    /**
     * 시간예약(E)일때 요금 가져오기
     * */
    getCalcCurrentTimeFee(isExceptOption: boolean = false) {
        if (VUtils.isEmpty(this.dayDetail)) {
            return 0;
        }
        if (VUtils.isEmpty(this.timeList)) {
            return 0;
        }

        let totalFee = 0;

        this.timeList.forEach((time: ResvTime) => {
            totalFee += time.price;
        });
        if(!isExceptOption) {
            this.selectedOptnList.forEach((optn: ResvOptn) => {
                totalFee += optn.optnPrc;
            });
        }
        return totalFee;
    }

    /**
     * 각타입별 요금 가져오기
     * */
    getTotalFee() {
        if (!this.resvMstDetail) {
            return 0;
        }
        if (this.resvMstDetail.resvCd === 'A' || this.resvMstDetail.resvCd === 'B') {
            return this.getCalcCurrentMonthFee(this.selectedMonth);
        } else if (this.resvMstDetail.resvCd === 'C') {
            return this.getCalcCurrentRoomFee();
        } else if (this.resvMstDetail.resvCd === 'D') {
            return this.getCalcCurrentDayFee();
        } else if (this.resvMstDetail.resvCd === 'E') {
            return this.getCalcCurrentTimeFee();
        }
        return 0;
    }

    /**
     * 각타입별 params 가져오기
     * */
    getApplyParams() {
        let params: any = {
            resvTp: 'B',
            resvCd: this.resvMstDetail.resvCd,
            bzCd: this.globalVars.bzCd,
            prdId: this.resvMstDetail.prdId,
            feeTot: this.getTotalFee()
        };
        switch (this.resvMstDetail.resvCd) {
            case 'A' :
                params['selectedMonth'] = this.resvMstDetail.monthList[this.selectedMonth].month;
                params['autoResvYn'] = this.selectedExtension;
                break;
            case 'B' :
                params['selectedMonth'] = this.resvMstDetail.monthList[this.selectedMonth].month;
                break;
            case 'C' :
                params['selectedStrDt'] = this.selectedDate.from;
                params['selectedEndDt'] = this.selectedDate.to;
                break;
            case 'D' :
                params['selectedDt'] = this.selectedDate;
                params['optnIds'] = this.getOptnIds();
                break;
            case 'E' :
                params['selectedDt'] = this.selectedDate;
                params['selectedStrTime'] = VUtils.getMinValueObj(this.timeList, 'time').time;
                params['selectedEndTime'] = VUtils.getMaxValueObj(this.timeList, 'time').time + 1;
                params['optnIds'] = this.getOptnIds();
                break;
        }

        return params;
    }


    /**
     * 예약하기
     * */
    onClickResv() {
        let msg = this.checkValidation();
        if (!VUtils.isEmpty(msg)) {
            this.eventUtils.alert(msg);
            return;
        }

        const confirmCallback = async () => {
            //TODO
            const params: any = this.getApplyParams();
            console.log(this.resvMstDetail.resvCd);
            console.log(params);
            this.bsSvcService.applylResv(params).then((model) => {
                if (model.isResultOK()) {

                    const confirmCallback = async () => {
                        this.pageUtils.navigateBack();
                        setTimeout(() => {
                            this.pageUtils.navigateForward(GlobalConstants.MENU.MP_SVC.URL);
                        }, 500);
                    }

                    this.eventUtils.alert('신청이 완료 되었습니다. \n자세한 내역은 \'서비스 이용/예약관리\' 메뉴에서 \n확인해 주세요.', '', confirmCallback);

                } else {
                    this.eventUtils.alert(model.result['msg']);
                }
                console.log(model);
            });
        }

        this.eventUtils.confirm(this.getConfirmMsg(),confirmCallback);



    }

    getConfirmMsg() {
        // let msg = '신청 서비스 : ' + this.resvMstDetail.fclObj.fclNm + '\n';
        let msg = '신청 서비스 : 휘트니스 센터\n';

        if(this.resvMstDetail.resvCd==='A' || this.resvMstDetail.resvCd==='B') {
            let monthObj: ResvMonthModel = this.resvMstDetail.monthList[this.selectedMonth];
            msg += '이용 월 : '+monthObj.year+'년 '+monthObj.month+'월 ('+monthObj.startDay+'일~'+monthObj.endDay+'일)\n';
        } else if(this.resvMstDetail.resvCd==='C') {
            //selectedDate?.from
            //this.getDayOfTheWeekPipe
            msg += '체크인 : '+this.stringDateFormatDtPipe.transform(this.selectedDate.from,{isKo:true})+' ('+this.getDayOfTheWeekPipe.transform(this.selectedDate.from,{isKo:true})+')\n';
            msg += '체크아웃 : '+this.stringDateFormatDtPipe.transform(this.selectedDate.to,{isKo:true})+' ('+this.getDayOfTheWeekPipe.transform(this.selectedDate.to,{isKo:true})+')\n';
        } else if(this.resvMstDetail.resvCd==='D' || this.resvMstDetail.resvCd==='E') {
            msg += '예약일자 : '+this.stringDateFormatDtPipe.transform(this.selectedDate,{isKo:true})+' ('+this.getDayOfTheWeekPipe.transform(this.selectedDate,{isKo:true})+')\n';
            if(this.resvMstDetail.resvCd==='D') {
                msg += '이용요금 : '+this.getCalcCurrentDayFee(true).toLocaleString()+' 원\n';
            } else {
                msg += '예약시간 : '+this.getMinMaxTime()+'\n';
                msg += '이용요금 : '+this.getCalcCurrentTimeFee(true).toLocaleString()+' 원\n';
            }
            if(this.resvMstDetail.optionList.length>0) {
                this.resvMstDetail.optionList.forEach((optn: ResvOptn)=>{
                    if (VUtils.isExist(this.selectedOptnList, optn)) {
                        msg += optn.optnNm+ ' : 사용함(+ '+ optn.optnPrc.toLocaleString() +' 원)\n';
                    } else {
                        msg += optn.optnNm+ ' : 사용안함(+ 0 원)\n';
                    }
                })
            }
        }

        msg += '총 이용요금 : '+ this.getTotalFee().toLocaleString() +'원\n';
        if(this.resvMstDetail.resvCd==='A') {
            msg += '자동연장 : '+ (this.selectedExtension === '0' ? '신청안함' : '신청함') +'\n';
        }

        msg += '\n';
        msg += '위 정보와 같이 서비스 이용/예약 신청을 \n진행하시겠습니까?';
        return msg;
    }

    /**
     * 예약하기 유효성 체크
     * */
    checkValidation(): string {
        if (this.resvMstDetail.resvCd === 'A' || this.resvMstDetail.resvCd === 'B') {
            if (!this.selectedMonth) {
                return '이용 월을 선택해 주세요.';
            }
        } else if (this.resvMstDetail.resvCd === 'C') {
            if (!this.selectedDate) {
                return '예약일자를 선택해 주세요.';
            }
        } else if (this.resvMstDetail.resvCd === 'D') {
            if (!this.selectedDate) {
                return '예약일자를 선택해 주세요.';
            }
        } else if (this.resvMstDetail.resvCd === 'E') {
            if (!this.selectedDate) {
                return '예약일자를 선택해 주세요.';
            }
            if (!this.selectedDate) {
                return '예약시간을 선택해 주세요.';
            }
            if (!this.timeList || this.timeList.length === 0) {
                return '예약시간을 선택해 주세요.';
            }
            let min = VUtils.getMinValueObj(this.timeList, 'time').time;
            let max = VUtils.getMaxValueObj(this.timeList, 'time').time + 1;
            let totalHour = max - min;
            if (totalHour < this.resvMstDetail.minResvTm) {
                return '최소 ' + this.resvMstDetail.minResvTm + '시간부터 예약이 가능합니다.';
            }
            if (totalHour !== this.timeList.length) {
                return '연속된 시간으로만 예약이 가능합니다.';
            }

        }
        if (!this.selectedAgree) {
            return '유의사항 및 취소/환불정책 확인여부를 체크해 주세요.';
        }


    }

    /**
     * 해당 일 정보 가져오기
     * */
    getResvDay(dt: string) {
        let month = this.getResvMonth(dt);
        if (!month) {
            return null;
        }
        let day = month.days[Number(dt.substring(6, 8)) - 1];
        return day;
    }

    /**
     * 해당 월 정보 가져오기
     * */
    getResvMonth(dt: string): ResvMonthModel {
        if (!this.resvMstDetail) {
            return null;
        }
        if (!this.resvMstDetail.monthList || this.resvMstDetail.monthList.length === 0) {
            return null;
        }
        let resvMonthModel;
        for (let i = 0; i < this.resvMstDetail.monthList.length; i++) {
            if (this.resvMstDetail.monthList[i].year === Number(dt.substring(0, 4))
                && this.resvMstDetail.monthList[i].month === Number(dt.substring(4, 6))) {
                resvMonthModel = this.resvMstDetail.monthList[i];
                break;
            }
        }
        return resvMonthModel;
    }

    /**
     * 선택한 모든일자 가져오기
     * */
    getResvDayList(startDtStr, endDtStr) {
        let diffCount = this.getDiffDayCount(startDtStr, endDtStr);
        ;
        let dayList = new Array<ResvDayModel>();
        let isError;

        for (let i = 0; i < diffCount; i++) {

            let day = this.getResvDay(moment(startDtStr).add(i, 'days').format('YYYYMMDD'));
            if (day.reservableCode === 0) {
                isError = true;
                break;
            }
            dayList.push(day);
        }
        if (isError) {
            return null;
        }
        return dayList;
    }

    /**
     * 날짜 차이값
     * */
    getDiffDayCount(startDtStr, endDtStr) {
        const startDt = moment(startDtStr, 'YYYYMMDD');
        const endDt = moment(endDtStr, 'YYYYMMDD');

        return endDt.diff(startDt, 'days');
    }

    /**
     * 상단 요금 단위 이름
     * */
    getTopFeeUnit() {
        if (!this.resvMstDetail) {
            return '';
        }
        switch (this.resvMstDetail.resvCd) {
            case 'A' :
                return '월'
            case 'B' :
                return '월'
            case 'C' :
                return '1박';
            case 'D' :
                return '일';
            case 'E' :
                return '시간';
        }
    }

    onChangeCheckbox(newOptn, event) {
        if (VUtils.isExist(this.selectedOptnList, newOptn)) {
            if (!event.target.checked) {
                this.selectedOptnList = this.selectedOptnList.filter(function(optn: ResvOptn) {
                    if (optn.optnId !== newOptn.optnId) {
                        return true;
                    }
                });
            }

        } else {
            if (event.target.checked) {
                this.selectedOptnList.push(newOptn);
            }
        }

    }

    selectTimeCode: TimeSelectEnums = TimeSelectEnums.NONE;

    onClickTime(newTime: ResvTime) {
        if (newTime.reservableCode !== 1) {
            return;
        }
        if (this.selectTimeCode === TimeSelectEnums.NONE) {
            this.timeList.push(newTime);
            this.selectTimeCode = TimeSelectEnums.START;
        } else if (this.selectTimeCode === TimeSelectEnums.START) {
            if (this.resvMstDetail.minResvTm > 1) {
                if (VUtils.isExist(this.timeList, newTime)) {
                    this.eventUtils.alert('최소 ' + this.resvMstDetail.minResvTm + '시간부터 예약이 가능합니다.');
                    return;
                } else {
                    let min = this.timeList[0].time;
                    if (min > newTime.time) {
                        this.timeList = new Array<ResvTime>();
                        this.selectTimeCode = TimeSelectEnums.NONE;
                        this.eventUtils.alert('종료시간은 시작시간 이후로 선택해 주세요.');
                        return;
                    }
                    this.timeList = this.dayDetail.resvTimes.filter(function(time: ResvTime) {
                        if (time.reservableCode === 1 && time.time >= min && time.time <= newTime.time) {
                            return true;
                        }
                    });
                    if (newTime.time - min + 1 !== this.timeList.length) {
                        this.timeList = new Array<ResvTime>();
                        this.selectTimeCode = TimeSelectEnums.NONE;
                        this.eventUtils.alert('선택한 예약시간 내에 예약불가 시간이 포함되어있습니다..');
                        return;
                    }
                    this.selectTimeCode = TimeSelectEnums.END;
                }
            } else {
                this.selectTimeCode = TimeSelectEnums.END;
            }
        } else {
            this.selectTimeCode = TimeSelectEnums.START;
            this.timeList = new Array<ResvTime>();
            this.timeList.push(newTime);
        }
    }

    getTimeClass(time: ResvTime) {
        if (time.reservableCode !== 1) {
            return 'disabled';
        }
        if (VUtils.isExist(this.timeList, time)) {
            return 'selected';
        }
        return '';

    }

    getMinMaxTime() {
        let min = VUtils.getMinValueObj(this.timeList, 'time').time;
        let max = VUtils.getMaxValueObj(this.timeList, 'time').time + 1;

        return min + ':00 ~ ' + max + ':00 (' + (max - min) + '시간)';
    }

    getOptnIds() {
        let ids = '';
        if (!this.selectedOptnList || this.selectedOptnList.length === 0) {
            return ids;
        }
        for (let i = 0; i < this.selectedOptnList.length; i++) {
            ids += this.selectedOptnList[i].optnId;
            if (i !== this.selectedOptnList.length - 1) {
                ids += ',';
            }
        }
        return ids;
    }
}

enum TimeSelectEnums {
    NONE,
    START,
    END

}

