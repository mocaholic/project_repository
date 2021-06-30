import {Component, OnInit} from '@angular/core';
import {StoryService} from "../../../core/service/story/story.service";

import GlobalConstants from "../../../core/constants/global-constants";
import {SystemService} from "../../../core/service/system/system.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BzMstModel} from "../../../core/models/story/bz-mst-model";
import {Router} from "@angular/router";
import {VUtils} from "../../../core/utils/v-utils";
import {MainService} from "../../../core/service/main/main.service";
import {MnuModel} from "../../../core/models/mnu-model";
import {BasePage} from "../../BasePage";


@Component({
    selector: 'life-service',
    templateUrl: './life-service.page.html',
    styleUrls: ['./life-service.page.scss'],
})
export class LifeServicePage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public mainService: MainService
        , public storyService: StoryService
        , public router: Router
        , public pageUtil: VPageUtils
        , public globalVars: VGlobalVars

    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 메뉴 상수
     * */
    menuConstants = GlobalConstants.MENU;

    /**
     * 단지목록
     * */
    bzList: Array<BzMstModel> = [];

    /**
     * 선택한 단지메뉴 목록
     * */
    bzMenuList: Array<MnuModel> = [];

    /**
     * 선택한 단지 상세
     * */
    bzDetail: BzMstModel;

    /**
    * 선택한 탭 코드
    * */
    selectedTabCode: string;

    /**
     * 선택한 단지코드
     * */
    selectedBzCd: string;

    ngOnInit() {
        this.selectedTabCode = this.router.getCurrentNavigation().extras['tabCode'];
        this.onLoadBzList();
    }
    /**
     * 탭 선택
     * */
    onClickTab(code) {
        this.selectedTabCode = code;
    }
    /**
     * 단지 목록 가져오기
     */
    onLoadBzList() {
        const params: any = {

        }
        this.storyService.loadBzList(params)
            .then((model) => {
                this.bzList = model.result["data"] as Array<BzMstModel>;
                if(this.bzList.length>0) {
                    this.selectedBzCd = this.bzList[0].bzCd;
                    this.onLoadBzMenuList();
                    this.onLoadBzDetail();
                }
            });
    }

    /**
     * 단지 메뉴 목록 가져오기
     */
    onLoadBzMenuList(isReset: boolean = false) {
        const params: any = {
            bzCd: this.selectedBzCd
        }

        this.mainService.loadMenu(params)
            .then((model) => {
                let allMenuList = model.result['data'];
                this.bzMenuList = allMenuList.filter((mnu)=>{
                    if(mnu.mnuId.includes('VLV_LSM_') && mnu.grpId==='MG_VLV_LSM' && mnu.mnuId!==('VLV_LSM_CNTAPPL')) {
                        return true;
                    }
                })
                if(VUtils.isEmpty(this.bzMenuList)) {
                    return;
                }
                if(isReset || !this.isExistMnu(this.selectedTabCode)) {
                    this.selectedTabCode = this.getFirstMnuId();
                }
            });
    }

    /**
     * 단지이름 클릭
     */
    onClickBzNm(bzCd?: string) {
        if(!VUtils.isEmpty(bzCd)) {
            this.selectedBzCd = bzCd;
        }
        this.onLoadBzMenuList(true);
        this.onLoadBzDetail();

    }

    /**
     * 단지 상세 가져오기
     */
    onLoadBzDetail() {
        const params: any = {
            bzCd: this.selectedBzCd
        }
        this.storyService.loadBzDetail(params)
            .then((model) => {
                this.bzDetail = model.result["data"] as BzMstModel;
                this.onPageReady();
            });
    }

    /**
     * 메뉴 존재 여부 확인
     */
    isExistMnu(mnuId) {
        if(VUtils.isEmpty(mnuId)) {
            return false;
        }
        return VUtils.isExist(this.bzMenuList,{mnuId:mnuId});
    }

    /**
     * 가장 상위 메뉴 아이디 가져오기
     */
    getFirstMnuId() {
        if(VUtils.isEmpty(this.bzMenuList)) {
            return '';
        }
        let mnuId = this.bzMenuList[0].mnuId;
        let index= this.menuConstants[this.bzMenuList[0].mnuId].SORT;
        for(let i=1; i<this.bzMenuList.length; i++) {
            let sort = this.menuConstants[this.bzMenuList[i].mnuId].SORT;
            if(sort<index) {
                index = sort;
                mnuId = this.bzMenuList[i].mnuId;
            }
        }
        return mnuId;
    }
}
