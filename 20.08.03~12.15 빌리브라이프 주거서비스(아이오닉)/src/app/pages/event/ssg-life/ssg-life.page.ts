import {Component, OnInit} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {EventService} from "../../../core/service/event/event.service";
import {SsgGrpcModel} from "../../../core/models/event/ssg-grpc-model";
import {CodeEnums} from "../../../core/enums/code-enums";
import {CodeModel} from "../../../core/models/code-model";
import {EventSearchModel} from "../../../core/models/event/event-search-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VUtils} from "../../../core/utils/v-utils";
import {NavigationEnd, Router} from "@angular/router";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {BasePage} from "../../BasePage";


@Component({
    selector: 'app-ssg-life',
    templateUrl: './ssg-life.page.html',
    styleUrls: ['./ssg-life.page.scss'],
})
export class SsgLifePage extends BasePage implements OnInit {

    constructor(public systemService: SystemService
        , private eventService: EventService
        , public globalVars: VGlobalVars
        , public router: Router
        , private pageUtils: VPageUtils

    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });

        this.search = new EventSearchModel(0);
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                if(this.router.getCurrentNavigation().extras['grpcId']) {
                    this.grpcId = this.router.getCurrentNavigation().extras['grpcId'];
                }
                if(!this.ssgGrpcCatCdList) {
                    this.onLoadSsgGrpcCatCdList();
                }
                this.onLoadSsgGrpcList();
            }

        });
    }

    navigationSubscription;
    /**
     * SSG 그룹사 카테고리 코드 목록
     */
    ssgGrpcCatCdList: Array<CodeModel>;
    /**
     * SSG 그룹사 목록
     */
    ssgGrpcList: Array<SsgGrpcModel> = [];

    /**
     * 검색 조건 , 페이지 처리
     */
    search: EventSearchModel;

    grpcId: string;

    /**
     * ngOnInit
     */
    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ionViewDidEnter() {
    }


    /**
     * 목록 존재 유무
     */
    get isExistList() {
        return this.ssgGrpcList && this.ssgGrpcList.length > 0
    }

    /**
     * SSG 그룹사 카테고리 코드 목록 가져오기
     */
    onLoadSsgGrpcCatCdList(): void {
        const params: any = {
            parentCode: CodeEnums.SsgGrpcCat,
            addAll: 1
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.ssgGrpcCatCdList = model.result["data"] as Array<CodeModel>;
            });
    }

    /**
     * SSG 그룹사 목록 가져오기
     */
    onLoadSsgGrpcList(isMore: boolean = false): void {

        const params: any = {
            // usePaging : this.search.usePaging,
            // page : this.search.page,
            // perPageNum : this.search.perPageNum,
            catCd : this.search.catCd,
        };

        this.eventService.loadSsgGrpcList(params)
            .then((model) => {
                if(isMore) {
                    this.ssgGrpcList = VUtils.dataConcat(this.ssgGrpcList, model.result["data"] as Array<SsgGrpcModel>);
                } else {
                    if(this.grpcId) {
                        let grpcList = model.result["data"] as Array<SsgGrpcModel>;
                        let obj = VUtils.getObjByKey(grpcList,{grpcId:this.grpcId})
                        grpcList = grpcList.filter((grpc)=>{
                            return grpc.grpcId != this.grpcId;
                        })
                        grpcList.splice(0,0,obj);
                        this.ssgGrpcList = grpcList;
                        this.grpcId = null;
                    } else {
                        this.ssgGrpcList = model.result["data"] as Array<SsgGrpcModel>;
                    }
                }
                this.onPageReady();
            });
    }

    /**
     * SSG 그룹사 목록 더보기
     */
    public moreSsgGrpcList(): void {
        if(this.search.page >= this.search.totalEndPage) {
            return;
        }
        this.search.page +=1;

        this.onLoadSsgGrpcList(true);
    }

    /**
     * SSG 그룹사 컨텐츠 영역 토글
     */
    toggleContentArea(obj): void {
        obj.isShowCts = !obj.isShowCts;
    }

    /**
     * SSG 그룹사 카테고리 코드 선택
     */
    onClickSsgGrpcCatCd(code): void {
        this.search.catCd = code;
        this.search.page = 1;

        this.onLoadSsgGrpcList();
    }

    /**
     * 링크 클릭시 새탭으로 열기
     */
    goExternalPage(event: SsgGrpcModel) {

        this.pageUtils.openNewTab(event.linkUrl);
        const params: any = {
            bzCd: this.globalVars.bzCd,
            custId: this.globalVars.userDetail.custId,
            statTp: 'B',
            platformTp: this.globalVars.platformTp,
            eventId: event.grpcId,
            eventTp: 'C',
            actionPath: event.linkUrl
        };
        this.insertClickActionLog(params);
    }

    // /**
    //  * 클릭 로그
    //  */
    // insertActionLog(event: SsgGrpcModel) {
    //     const params: any = {
    //         bzCd: this.globalVars.bzCd,
    //         custId: this.globalVars.userDetail.custId,
    //         statTp: 'B',
    //         platformTp: this.globalVars.platformTp,
    //         eventNm: '',
    //         actionNm: event.grpcId,
    //         actionPath: event.linkUrl
    //     };
    //     this.systemService.insertActionLog(params)
    //         .then((model) => {
    //
    //         });
    //
    // }
}
