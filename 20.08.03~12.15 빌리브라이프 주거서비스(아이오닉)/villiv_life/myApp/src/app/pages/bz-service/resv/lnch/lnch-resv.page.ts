import {Component, OnInit} from '@angular/core';
import {LnchFreOffModel, LnchMstModel} from "../../../../core/models/bs-svc/lnch/lnch-mst-model";
import {BsSvcService} from "../../../../core/service/bs-service/bs-svc.service";
import {SystemService} from "../../../../core/service/system/system.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {CalendarComponentOptions, DayConfig} from "ion2-calendar";
import * as moment from "moment";
import {BasePage} from "../../../BasePage";
import GlobalConstants from "../../../../core/constants/global-constants";
import {LnchPrdModel} from "../../../../core/models/bs-svc/lnch/lnch-prd-model";
import {VUtils} from "../../../../core/utils/v-utils";
import {LnchOdrModel} from "../../../../core/models/bs-svc/lnch/lnch-odr-model";
import {GetDayOfTheWeekPipe} from "../../../../core/pipes/get-day-of-the-week";

@Component({
    selector: 'app-lnch-resv',
    templateUrl: './lnch-resv.page.html',
    styleUrls: ['../resv.page.scss'],
    providers: [GetDayOfTheWeekPipe],
})
export class LnchResvPage extends BasePage implements OnInit {

    constructor(
        public bsSvcService: BsSvcService
        , public systemService: SystemService
        , public pageUtils: VPageUtils
        , public route: ActivatedRoute
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
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
     * 조식 Id
     * */
    lnchId: string;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 메뉴상세 팝업 on/off
     * */
    isShowMenuInfoPopup: { container: boolean, layer: boolean } = { container: false,layer: false};

    /**
     * 무료메뉴 팝업 on/off
     * */
    isShowFreeMenuPopup: { container: boolean, layer: boolean } = { container: false,layer: false};

    /**
     * 달력 on/off
     * */
    isShowDatePickerPopup: { container: boolean, layer: boolean } = { container: false,layer: false};

    /**
     * 선택날짜(팝업)
     * */
    selectedDate: string;

    /**
     * 선택한 오픈일
     * */
    selectedOpenDate: string;

    /**
     * 조식 마스터
     * */
    lnChMst: LnchMstModel;

    /**
     * 취소/환불정책 동의
     * */
    selectedAgree: string;

    /**
     * 메뉴상세 팝업에 나오는 메뉴정보
     * */
    prdInfo: LnchPrdModel;

    /**
     * 달력 옵션
     * */
    options: CalendarComponentOptions;

    /**
     * 무료혜택 선택 상품 아이디
     * */
    selectedFreePrdId: string;

    /**
     * 최종 무료혜택 선택 주문
     * */
    confirmFreeOdr: LnchOdrModel;

    /**
     * 주문 목록
     * */
    odrList: Array<LnchOdrModel> = new Array<LnchOdrModel>();

    /**
     * 무료혜택 사용 가능 여부
     * */
    isUseFree: boolean = true;

    ngOnInit() {
    }

    ionViewDidEnter() {
        // this.lnchId = this.route.snapshot.params['lnchId'];

        // if (VUtils.isValidDbRowId(this.lnchId)) {
        this.initData();
        this.loadLnchDetail();
        // } else {
        //   this.eventUtils.alert("잘못된 접근입니다.");
        //   this.pageUtils.navigateForward('/');
        // }
    }

    /**
     * 초기화
     **/
    initData() {
        this.selectedDate = null;
        this.selectedOpenDate = null;
        this.selectedAgree = null;
        this.confirmFreeOdr = null;
        this.odrList = [];

    }
    /**
     * 조식 가져오기
     */
    loadLnchDetail() {
        //TODO check
        // 무료혜택 이용가능여부 및 사용여부
        const params: any = {
            bzCd: this.globalVars.bzCd,
        };
        this.bsSvcService.loadLnchDetail(params).then((model) => {
            this.lnChMst = model.result['data'] as LnchMstModel;

            let _daysConfig: DayConfig[] = [];
            this.lnChMst.lnchFreoffList.forEach((freOff: LnchFreOffModel)=>{
                _daysConfig.push({
                    date: moment(freOff.dyofDtm.substring(0,8),'YYYYMMDD').toDate(),
                    disable: true
                })
            })
            this.options = {
                from: this.getNDayAfterDate(this.lnChMst.rcvLmtDt),
                to: this.getNDayAfterDate(this.lnChMst.mnthRng,true),
                monthFormat: 'YYYY년 MM월 ',
                monthPickerFormat: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                weekdays: ['일', '월', '화', '수', '목', '금', '토'],
                daysConfig: _daysConfig
            };

            this.onPageReady();
        });
    }

    /**
     * 예약하기
     * */
    onClickLnchApply() {
        if (this.odrList.length===0) {
            this.eventUtils.alert('주문 메뉴에 담긴 상품이 없습니다.\n주문할 메뉴를 담아주세요.');
            return;
        }
        if (!this.selectedOpenDate) {
            this.eventUtils.alert('조식을 수령할 예약일자를 선택해 주세요.');
            return;
        }

        if (!this.selectedAgree) {
            this.eventUtils.alert('유의사항 및 취소/환불정책 확인 여부를 체크해 주세요.');
            return;
        }
        //TODO check
        // 무료혜택 이용가능여부 및 사용여부

        const confirmCallback = async () => {
            this.insertLnchApply();
        }

        this.eventUtils.confirm(this.getConfirmMsg(),confirmCallback);
    }
    getConfirmMsg() {
        let msg = '신청 서비스 : ' + this.lnChMst.lnchNm + '\n';
        msg += '예약일자 : '+ this.selectedOpenDate +' ('+ this.getDayOfTheWeekPipe.transform(this.selectedOpenDate.replace(/\./gi,''),{isKo:true})+')\n';
        msg += '주문메뉴 : ';
        if(this.odrList.length>1) {
            msg += this.odrList[0].prdDetail.prdNm + ' 외 '+ (this.odrList.length-1) + '건 \n';
        } else {
            msg += this.odrList[0].prdDetail.prdNm + '\n';
        }
        msg += '총 주문수량 : '+ this.getTotalQnt() +'\n';
        msg += '주문금액 : '+ this.getTotalPrc().toLocaleString() +'원\n';
        if(this.isUseFree) {
            msg += '무료혜택 메뉴 : ';
            msg += (this.confirmFreeOdr ? this.confirmFreeOdr.prdDetail.prdNm : '없음') + '\n';
            msg += '무료혜택 차감 : ';
            msg += Number(this.confirmFreeOdr ? this.confirmFreeOdr.prdDetail.prdPrc : '0').toLocaleString() + ' 원\n';
        }
        msg += '총 이용요금 : '+ this.getTotalPrc(true).toLocaleString() +'원\n';
        msg += '\n';
        msg += '위 정보와 같이 서비스 이용/예약 신청을 \n진행하시겠습니까?';
        return msg;
    }
    /**
     * 조식 신청하기
     */
    insertLnchApply() {

        const params: any = {
            resvTp: 'D',
            bzCd : this.globalVars.bzCd,
            selectedDt : this.selectedOpenDate.replace(/\./gi,''),
            feeTot : this.getTotalPrc(true),
            fee : this.getTotalPrc(),
            lnchOdrList : this.odrList
        };

        this.bsSvcService.applyLnch(params).then((model) => {
            if(model.isResultOK()) {
                const confirmCallback = async () => {
                    this.pageUtils.navigateBack();
                    setTimeout(() => {
                        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_SVC_VIEW.URL + '/' + model.result['data']['resvId']);
                    }, 500);

                }
                this.eventUtils.confirm('조식 신청이 완료되었습니다.\n신청내역을 확인하시겠습니까?',confirmCallback);

            } else {
                this.eventUtils.alert(model.result['msg']);
            }
        });
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
        this.pageUtils.navigateForward(GlobalConstants.MENU.BS_SVC.URL+'/'+this.lnChMst.svcId);
    }

    /**
     * 메뉴상세 팝업 열기
     */
    openMenuInfoPopup(prd: LnchPrdModel) {
        this.prdInfo = prd;

        this.isShowMenuInfoPopup.container = true;
        this.isShowMenuInfoPopup.layer = true;
    }

    /**
     * 메뉴상세 팝업 닫기
     */
    closeMenuInfoPopup() {
        this.isShowMenuInfoPopup.layer = false;
        setTimeout(()=>{
            this.isShowMenuInfoPopup.container = false;
        },300)
    }

    /**
     * 무료메뉴 선택 팝업 열기
     */
    openFreeMenuPopup() {
        if(this.odrList.length===0) {
            this.eventUtils.alert('주문 메뉴에 담긴 상품이 없습니다.\n주문할 메뉴를 담아주세요.');
            return;
        }
        if (!this.selectedOpenDate) {
            this.eventUtils.alert('조식을 수령할 예약일자를 선택해 주세요.');
            return;
        }
        //TODO check
        // 무료혜택 이용가능여부 및 사용여부
        this.isShowFreeMenuPopup.container = true;
        this.isShowFreeMenuPopup.layer = true;
    }

    /**
     * 무료메뉴 선택팝업 닫기
     */
    closeFreeMenuPopup() {
        this.isShowFreeMenuPopup.layer = false;
        setTimeout(()=>{
            this.isShowFreeMenuPopup.container = false;
        },300)
    }

    /**
     * 달력팝업 열기
     */
    openDatePickerPopup() {
        this.isShowDatePickerPopup.container = true;
        this.isShowDatePickerPopup.layer = true;
    }

    /**
     * 달력 팝업 닫기
     */
    closeDatePickerPopup(isUpdate = false) {
        this.isShowDatePickerPopup.layer = false;

        if (isUpdate) {
            this.selectedOpenDate = this.selectedDate;
        }

        setTimeout(()=>{
            this.isShowDatePickerPopup.container = false;
        },300)
    }

    /**
     * 오늘+N일 날짜 객체 가져오기
     * */
    getNDayAfterDate(number,isMonth = false) {
        if(isMonth) {
            return moment().add(number, 'months').toDate();
        } else {
            return moment().add(number, 'days').toDate();
        }
    }


    /**
     * 메뉴담기
     * */
    addMenuOdr(prd: LnchPrdModel) {
        if(VUtils.isExist(this.odrList,{prdId: prd.prdId})) {
            this.eventUtils.alert("이미 담은 메뉴입니다.");
            return;
        }
        let odr = new LnchOdrModel();
        odr.prdDetail = prd;
        odr.prdId = prd.prdId;
        odr.odrQnt = 1;

        this.odrList.push(odr);

        this.eventUtils.alert("상품이 주문메뉴에 담겼습니다.");
    }

    /**
     * 메뉴빼기
     * */
    removeMenuOdr(index) {
        if(this.selectedFreePrdId===this.odrList[index].prdId) {
            this.onClickDeleteFreePrd();
        }
        this.odrList.splice(index,1);
    }
    /**
     * 상품가져오기
     * */
    getPrdById(prdId): LnchPrdModel {
        if(!this.lnChMst) {
            return null
        }
        if(!this.lnChMst.lnchPrdList) {
            return null
        }

        return VUtils.getObjByKey(this.lnChMst,{prdId:prdId})
    }

    /**
     * 주문 가져오기
     * */
    getOdrById(prdId): LnchOdrModel {
        return VUtils.getObjByKey(this.odrList,{prdId:prdId})
    }
    /**
     * 상품 +1
     * */
    onClickQntPlus(odr: LnchOdrModel) {
        if(odr.odrQnt === Number(this.lnChMst.maxOrdCnt)) {
            this.eventUtils.alert("최대 주문가능 수량은"+ this.lnChMst.maxOrdCnt +"개 입니다.");
            return;
        }
        odr.odrQnt+=1;
    }

    /**
     * 상품 -1
     * */
    onClickQntMinus(odr: LnchOdrModel) {
        if(odr.odrQnt===1) {
            return;
        }
        odr.odrQnt-=1;
    }

    /**
     * 주문상품 가격 합계
     * */
    getTotalPrc(isIncludeFree=false) {
       let total = 0;
       this.odrList.forEach((odr)=>{
           total += odr.getTotalPrc(isIncludeFree);
       })
        return total;
    }
    /**
     * 주문상품 수량 합계
     * */
    getTotalQnt() {
        let total = 0;
        this.odrList.forEach((odr)=>{
            total += odr.odrQnt;
        })
        return total;
    }
    /**
     * 무료상품 선택확인
     * */
    onClickConfirmFreePrd() {
        let newFreeOdr = this.getOdrById(this.selectedFreePrdId);
        if(this.confirmFreeOdr) {
            this.confirmFreeOdr.useFreeYn = "0";
        }
        if(newFreeOdr) {
            newFreeOdr.useFreeYn = "1";
            this.confirmFreeOdr = newFreeOdr;
        }
        this.closeFreeMenuPopup();
    }

    /**
     * 무료혜택 삭제
     * */
    onClickDeleteFreePrd() {
        this.confirmFreeOdr.useFreeYn = "0";
        this.confirmFreeOdr = null;
        this.selectedFreePrdId = null;
    }
}
