import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {MyPageService} from "../../../core/service/my-page/my-page.service";
import {BsPtnrResvModel} from "../../../core/models/bs-svc/ptnr/bs-ptnr-resv-model";
import {VUtils} from "../../../core/utils/v-utils";
import {PtnrSearchModel} from "../../../core/models/bs-svc/ptnr/ptnr-search-model";
import {CodeEnums} from "../../../core/enums/code-enums";
import {CodeModel} from "../../../core/models/code-model";
import {SystemService} from "../../../core/service/system/system.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import GlobalConstants from "../../../core/constants/global-constants";
@Component({
    selector: 'app-partner-service-list',
    templateUrl: './partner-service-list.page.html',
    styleUrls: ['./partner-service-list.page.scss'],
})
export class PartnerServiceListPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
        , public systemService: SystemService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars

        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 제휴서비스 목록
     */
    ptnrResvList: Array<BsPtnrResvModel>;

    /**
     * 제휴서비스 검색조건
     */
    ptnrSearchModel: PtnrSearchModel = new PtnrSearchModel();

    /**
     * 제휴서비스 타입 목록
     */
    ptnrTypeList: Array<CodeModel> = [];

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
        this.loadSearchTypeList();
        this.loadPtnrResvList();
    }

    /**
     * 목록 존재 유무
     */
    get isExistList() {
        return this.ptnrResvList && this.ptnrResvList.length > 0
    }

    /**
     * 날짜선택 옵션 설정
     */
    setSearchOption() {
        let today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth();
        this.ptnrSearchModel.searchStrYear = year.toString();
        this.ptnrSearchModel.searchEndYear = year.toString();

        this.ptnrSearchModel.searchStrMonth = (month+1).toString();
        this.ptnrSearchModel.searchEndMonth = (month+1).toString();

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
     * 검색조건 유형 가져오기
     * */
    loadSearchTypeList() {
        const params: any = {
            parentCode: CodeEnums.PtnrTp,
            addAll: 1,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.ptnrTypeList = model.result["data"] as Array<CodeModel>;
                this.ptnrSearchModel.ptnrTp = this.ptnrTypeList[0].cd;
            });
    }

    /**
     * 제휴서비스 목록 가져오기
     * */
    loadPtnrResvList(isMore: boolean = false) {
        this.ptnrSearchModel.iptYMStart = this.ptnrSearchModel.searchStrYear + this.ptnrSearchModel.searchStrMonth;
        this.ptnrSearchModel.iptYMEnd = this.ptnrSearchModel.searchEndYear + this.ptnrSearchModel.searchEndMonth
        const params: any = {
            usePaging: this.ptnrSearchModel.usePaging,
            page: this.ptnrSearchModel.page,
            perPageNum: this.ptnrSearchModel.perPageNum,
            ptnrTp: this.ptnrSearchModel.ptnrTp,
            iptYMStart: this.ptnrSearchModel.iptYMStart,
            iptYMEnd: this.ptnrSearchModel.iptYMEnd,
            bzCd: this.globalVars.bzCd,
            fetchToPageYn: isMore ? '0' : '1'
        };

        this.myPageService.loadPtnrResvList(params)
            .then((model) => {
                if (isMore) {
                    this.ptnrResvList = VUtils.dataConcat(this.ptnrResvList, model.result["data"] as Array<BsPtnrResvModel>);
                } else {
                    this.ptnrResvList = model.result['data'] as Array<BsPtnrResvModel>;
                }
                this.ptnrSearchModel = model.result["search"] as PtnrSearchModel;
                this.setIptStartEndDt();
                if (VUtils.isEmpty(this.ptnrSearchModel.ptnrTp) && this.ptnrTypeList.length > 0) {
                    this.ptnrSearchModel.ptnrTp = this.ptnrTypeList[0].cd;
                }
                if (VUtils.isEmpty(this.ptnrSearchModel.iptYMStart)) {
                   this.setSearchOption();
                }
                this.onPageReady();
            });
    }

    /**
     * 조회하기
     * */
    onClickSearch() {
        this.loadPtnrResvList();
    }

    /**
     * 시작년월 설정
     * */
    setIptStartEndDt() {

        this.ptnrSearchModel.searchStrYear = this.ptnrSearchModel.iptYMStart.substring(0, 4);
        this.ptnrSearchModel.searchStrMonth = this.ptnrSearchModel.iptYMStart.substring(4, 6);

        this.ptnrSearchModel.searchEndYear = this.ptnrSearchModel.iptYMEnd.substring(0, 4);
        this.ptnrSearchModel.searchEndMonth = this.ptnrSearchModel.iptYMEnd.substring(4, 6);

    }

    /**
     * 상세페이지로 이동
     * */
    goDetailPage(ptnrResvId) {
        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_PARTNER_VIEW.URL+'/'+ptnrResvId);
    }
}
