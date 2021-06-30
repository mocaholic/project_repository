import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {Router} from "@angular/router";
import {CodeModel} from "../../../core/models/code-model";
import {VUtils} from "../../../core/utils/v-utils";
import {MyPageService} from "../../../core/service/my-page/my-page.service";
import {SystemService} from "../../../core/service/system/system.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {CodeEnums} from "../../../core/enums/code-enums";
import {ResvSearchModel} from "../../../core/models/bs-svc/ptnr/resv-search-model";
import {ResvHisModel} from "../../../core/models/bs-svc/resv/resv-his-model";
import GlobalConstants from "../../../core/constants/global-constants";
import {StringDateFormatDtPipe} from "../../../core/pipes/string-date-format-dt.pipe";
import {StringDateFormatDtmPipe} from "../../../core/pipes/string-date-format-dtm.pipe";

@Component({
    selector: 'app-my-page-service-list',
    templateUrl: './my-page-service-list.page.html',
    styleUrls: ['./my-page-service-list.page.scss'],
    providers: [ StringDateFormatDtPipe, StringDateFormatDtmPipe ]
})
export class MyPageServiceListPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
        , public systemService: SystemService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , private stringDateFormatDtPipe: StringDateFormatDtPipe
        , private stringDateFormatDtmPipe: StringDateFormatDtmPipe
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 서비스 그룹 코드 목록
     */
    svcGrpCdList: Array<CodeModel> = [];

    /**
     * 이용상태 코드 목록
     */
    utStatsCdList: Array<CodeModel> = [];

    /**
     * 예약내역 검색조건
     */
    resvSearchModel: ResvSearchModel = new ResvSearchModel();

    /**
     * 예약내역 목록
     */
    resvHisList: Array<ResvHisModel>;

    /**
     * 시작년 데이터
     * */
    searchStrYearOption: Array<CodeModel>;

    /**
     * 시작월 데이터
     * */
    searchStrMonthOption: Array<CodeModel>;

    /**
     * 종료년 데이터
     * */
    searchEndYearOption: Array<CodeModel>;

    /**
     * 종료월 데이터
     * */
    searchEndMonthOption: Array<CodeModel>;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.setSearchOption();
        this.loadSvcGrpCdList();
        this.loadUpStatsCdList();
        this.loadResvHisList();
    }

    /**
     * 목록 존재 유무
     */
    get isExistList() {
        return this.resvHisList && this.resvHisList.length > 0
    }

    /**
     * 조회하기
     * */
    onClickSearch() {
        this.loadResvHisList();
    }

    /**
     * 서비스 구분 코드 목록 가져오기
     * */
    loadSvcGrpCdList() {
        const params: any = {
            parentCode: CodeEnums.SvcGrpTp,
            addAll: 1,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.svcGrpCdList = model.result["data"] as Array<CodeModel>;
                this.resvSearchModel.svcGrpCd = this.svcGrpCdList[0].cd;
            });
    }

    /**
     * 이용상태 코드 목록 가져오기
     * */
    loadUpStatsCdList() {
        const params: any = {
            parentCode: CodeEnums.UtStats,
            addAll: 1,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.utStatsCdList = model.result["data"] as Array<CodeModel>;
                this.resvSearchModel.utStats = this.utStatsCdList[0].cd;
            });
    }

    /**
     * 서비스 목록 가져오기
     * */
    loadResvHisList(isMore: boolean = false) {
        this.resvSearchModel.iptYMStart = this.resvSearchModel.searchStrYear + this.resvSearchModel.searchStrMonth;
        this.resvSearchModel.iptYMEnd = this.resvSearchModel.searchEndYear + this.resvSearchModel.searchEndMonth
        const params: any = {
            usePaging: this.resvSearchModel.usePaging,
            page: this.resvSearchModel.page,
            perPageNum: this.resvSearchModel.perPageNum,
            svcGrpCd: this.resvSearchModel.svcGrpCd,
            utStats: this.resvSearchModel.utStats,
            iptYMStart: this.resvSearchModel.iptYMStart,
            iptYMEnd: this.resvSearchModel.iptYMEnd,
            bzCd: this.globalVars.bzCd,
            fetchToPageYn: isMore ? '0' : '1'
        };

        this.myPageService.loadResvHisList(params)
            .then((model) => {
                if (isMore) {
                    this.resvHisList = VUtils.dataConcat(this.resvHisList, model.result["data"] as Array<ResvHisModel>);
                } else {
                    this.resvHisList = model.result['data'] as Array<ResvHisModel>;
                }
                this.resvSearchModel = model.result["search"] as ResvSearchModel;
                //TODO
                // this.setIptStartEndDt();
                if (VUtils.isEmpty(this.resvSearchModel.svcGrpCd) && this.svcGrpCdList.length > 0) {
                    this.resvSearchModel.svcGrpCd = this.svcGrpCdList[0].cd;
                }
                if (VUtils.isEmpty(this.resvSearchModel.utStats) && this.svcGrpCdList.length > 0) {
                    this.resvSearchModel.utStats = this.svcGrpCdList[0].cd;
                }
                if (VUtils.isEmpty(this.resvSearchModel.iptYMStart)) {
                    this.setSearchOption();
                }
                this.onPageReady();
            });
    }

    /**
     * 날짜선택 옵션 설정
     */
    setSearchOption() {
        let today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth();
        this.resvSearchModel.searchStrYear = year.toString();
        this.resvSearchModel.searchEndYear = year.toString();

        this.resvSearchModel.searchStrMonth = (month+1).toString();
        this.resvSearchModel.searchEndMonth = (month+1).toString();

        if(VUtils.isEmpty(this.searchStrYearOption)) {
            this.searchStrYearOption = new Array<CodeModel>();
            this.searchEndYearOption = new Array<CodeModel>();
            for(let i=2020; i<=year+1; i++) {
                let code = new CodeModel();
                code.cdName = i+"년";
                code.cd = i.toString();
                this.searchStrYearOption.push(code);
                this.searchEndYearOption.push(code);
            }
        }
        if(VUtils.isEmpty(this.searchStrMonthOption)) {
            this.searchStrMonthOption = new Array<CodeModel>();
            this.searchEndMonthOption = new Array<CodeModel>();


            for (let i = 1; i <= 12; i++) {
                let code = new CodeModel();
                code.cdName = i + "월";
                code.cd = (i.toString().length < 2 ? "0" + i : i).toString();
                this.searchStrMonthOption.push(code);
                this.searchEndMonthOption.push(code);
            }
        }
    }

    /**
     * 시작년월 설정
     * */
    setIptStartEndDt() {

        this.resvSearchModel.searchStrYear = this.resvSearchModel.iptYMStart.substring(0, 4);
        this.resvSearchModel.searchStrMonth = this.resvSearchModel.iptYMStart.substring(4, 6);

        this.resvSearchModel.searchEndYear = this.resvSearchModel.iptYMEnd.substring(0, 4);
        this.resvSearchModel.searchEndMonth = this.resvSearchModel.iptYMEnd.substring(4, 6);

    }

    /**
     * 상세페이지로 이동
     * */
    goDetailPage(resvId) {
        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_SVC_VIEW.URL+'/'+resvId);
    }

    /**
     * 타이틀 색깔 클래스
     * */
    getTitleColorClass(resvTp,resvCd) {

        if(resvTp === 'E') {
            return 'study'
        } else {
            if(resvCd === 'E') {
                return 'period'
            } else {
                return 'day'
            }
        }
    }

    /**
     * 타입별 서비스 이름 가져오기
     * */
    getSvcNm(data: ResvHisModel) {
        if(data.resvTp === 'E') {
            return data.lecture.lecNm;
        } else if(data.resvTp === 'D') {
            return data.lnchMst.lnchNm
        } else if(data.resvTp === 'B') {
            return data.product.prdNm;
        }
    }

    /**
     * 타입별 서비스 상세 가져오기
     * */
    getSvcDetail(data: ResvHisModel) {
        if(data.resvTp === 'E') {
            return data.fcl.fclNm + ' / ' + data.fcl.descLoc;
        } else if(data.resvTp === 'D') {
            if(data.lnchOdrList.length>1) {
                return data.lnchOdrList[0].prdNm+' 외 '+(data.lnchOdrList.length-1) + '건'
            } else {
                return data.lnchOdrList[0].prdNm
            }
        } else if(data.resvTp === 'B') {
            // return data.fcl.fclNm + ' / ' + data.fcl.descLoc;
            return '내부시설';
        }
    }

    /**
     * 타입별 예약 기간 가져오기
     * */
    getSvcPeriod(data: ResvHisModel) {
        if(data.resvTp === 'E') {
            let lec = data.lecture;
            let strDt = this.stringDateFormatDtPipe.transform(lec.lecStrDt);
            let endDt = this.stringDateFormatDtPipe.transform(lec.lecEndDt);
            return strDt + ' ~ ' + endDt + ' / ' + lec.lecDay + ' / ' + lec.lecTm;
        } else if(data.resvTp === 'D') {
            return this.stringDateFormatDtPipe.transform(data.resvStrDt) + ' 07:00';
        } else if(data.resvTp === 'B') {
            let strDt = this.stringDateFormatDtPipe.transform(data.resvStrDt);
            let endDt = this.stringDateFormatDtPipe.transform(data.resvEndDt);
            let strTm = this.stringDateFormatDtmPipe.transform(data.resvStrDt,{isOnlyTime:true});
            let endTm = this.stringDateFormatDtmPipe.transform(data.resvEndDt,{isOnlyTime:true});

            if(strDt === endDt) {
                return strDt + ' ' + strTm + ' ~ ' + endTm;
            } else {
                return strDt + ' ~ ' + endDt;
            }
        }
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
}
