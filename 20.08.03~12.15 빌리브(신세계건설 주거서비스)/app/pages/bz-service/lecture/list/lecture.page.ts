import {Component, OnInit} from '@angular/core';
import {CodeModel} from "../../../../core/models/code-model";
import {CodeEnums} from "../../../../core/enums/code-enums";
import {SystemService} from "../../../../core/service/system/system.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {LecSearchModel} from "../../../../core/models/bs-svc/lec/lec-search-model";
import {LecModel} from "../../../../core/models/bs-svc/lec/lec-model";
import {BsSvcService} from "../../../../core/service/bs-service/bs-svc.service";
import {VUtils} from "../../../../core/utils/v-utils";
import GlobalConstants from "../../../../core/constants/global-constants";
import {BasePage} from "../../../BasePage";

import {NavigationEnd, Router} from "@angular/router";
@Component({
    selector: 'app-lecture',
    templateUrl: './lecture.page.html',
    styleUrls: ['./lecture.page.scss'],
})
export class LecturePage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public bsSvcService: BsSvcService
        , public pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public globalVars: VGlobalVars

        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                if(this.router.getCurrentNavigation().extras['lecStats']) {
                    let lecStats = this.router.getCurrentNavigation().extras['lecStats'];
                    if(!VUtils.isEmpty(lecStats)) {
                        this.lecSearchModel.lecStats = lecStats;
                    }
                }
            }

        });
    }

    navigationSubscription;

    /**
     * 문화강좌 유형 목록
     */
    lecTyCatList: Array<CodeModel> = [];

    /**
     * 문화강좌 상태 목록
     */
    lecStatsCatList: Array<CodeModel> = [];

    /**
     * 문화강좌 목록
     */
    lecList: Array<LecModel> = [];

    /**
     * 문화강좌 검색조건
     */
    lecSearchModel: LecSearchModel = new LecSearchModel();

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ionViewDidEnter() {
        this.loadLecStatsCat();
        this.loadLecTpCat();
        this.loadLecList();
    }

    /**
     * 목록 존재 유무
     */
    get isExistList() {
        return this.lecList && this.lecList.length > 0
    }


    /**
     *  문화강좌 상태 목록 가져오기
     * */
    loadLecStatsCat() {
        const params: any = {
            parentCode: CodeEnums.LecStatsCat,
            addAll: 1,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                let lecStatsCatList = model.result["data"] as Array<CodeModel>;
                this.lecStatsCatList = lecStatsCatList.filter((cd)=>{
                    if(cd.cd==="" || cd.cd==="A" || cd.cd==="B") {
                        return true;
                    }
                })
                if(VUtils.isEmpty(this.lecSearchModel.lecStats)) {
                    this.lecSearchModel.lecStats = this.lecStatsCatList[0].cd;
                }
            });
    }
    /**
     *  문화강좌 유형 목록 가져오기
     * */
    loadLecTpCat() {
        const params: any = {
            parentCode: CodeEnums.LecTypeCat,
            addAll: 1,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.lecTyCatList = model.result["data"] as Array<CodeModel>;
                this.lecSearchModel.lecTp = this.lecTyCatList[0].cd;
            });
    }

    /**
     * 문화강좌 목록 가져오기
     * */
    loadLecList(isMore: boolean=false) {
        const params: any = {
            usePaging : this.lecSearchModel.usePaging,
            page : this.lecSearchModel.page,
            perPageNum : this.lecSearchModel.perPageNum,
            lecTp : this.lecSearchModel.lecTp,
            lecStats : this.lecSearchModel.lecStats,
            bzCd : this.globalVars.bzCd,
            fetchToPageYn : isMore ? '0' : '1'
        };

        this.bsSvcService.loadLecList(params)
            .then((model) => {
                if(isMore) {
                    this.lecList = VUtils.dataConcat(this.lecList, model.result["data"] as Array<LecModel>);
                } else {
                    this.lecList = model.result["data"] as Array<LecModel>;
                }
                this.lecSearchModel = model.result["search"] as LecSearchModel;
                if(VUtils.isEmpty(this.lecSearchModel.lecTp) && this.lecTyCatList.length>0) {
                    this.lecSearchModel.lecTp = this.lecTyCatList[0].cd;
                }
                if(VUtils.isEmpty(this.lecSearchModel.lecStats) && this.lecStatsCatList.length>0) {
                    this.lecSearchModel.lecStats = this.lecStatsCatList[0].cd;
                }
                this.onPageReady();
            });
    }

    /**
     * 더보기
     * */
    moreLecList() {
        if(this.lecSearchModel.page >= this.lecSearchModel.totalEndPage) {
            return;
        }
        this.lecSearchModel.page += 1;

        this.loadLecList(true);
    }
    /**
     * 검색하기
     * */
    onClickSearch() {
        this.lecSearchModel.usePaging = 1;
        this.loadLecList();
    }

    /**
     * 상세 페이지로 이동
     */
    goDetailPage(lecId): void {

        this.pageUtils.navigateForward(GlobalConstants.MENU.BS_CULTURE_VIEW.URL + '/' + lecId);
    }

    /**
     * 문화강좌 상태 코드 선택
     */
    onClickStatsCatCd(code): void {
        this.lecSearchModel.lecStats = code;
    }

    /**
     * 문화강좌 타입 이름 가져오기
     */
    getLecTpName(lecTp) {
        let obj = VUtils.getObjByKey(this.lecTyCatList,{cd: lecTp})
        if(obj) {
            return obj.cdName
        }
        return '';
    }
    /**
     * 문화강좌 상태 이름 가져오기
     */
    getLecStatsName(lecStats) {
        let obj = VUtils.getObjByKey(this.lecStatsCatList,{cd: lecStats})
        if(obj) {
            return obj.cdName
        }
        return '';
    }
}
