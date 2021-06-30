import {Component, OnInit} from '@angular/core';
import {VUtils} from "../../../core/utils/v-utils";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VStorageUtils} from "../../../core/utils/v-storage-utils";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {MainService} from "../../../core/service/main/main.service";
import {TerrBzModel} from "../../../core/models/story/terr-bz";
import {SystemService} from "../../../core/service/system/system.service";
import {CodeModel} from "../../../core/models/code-model";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";

@Component({
    selector: 'app-gate',
    templateUrl: './gate.page.html',
    styleUrls: ['./gate.page.scss'],
})
export class GatePage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public mainService: MainService
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
     * 단지선택하기 팝업 on/off
     * */
    isOpenBzPopup: boolean = false;

    /**
     * 라이프서비스 예정단지 포함/미포함
     * 포함 -> true
     * 미포함 -> false
     * default값 false
     * */
    isLifeServiceExpected: boolean = false;

    /**
     * 선택한 지역코드
     * */
    selectedTerrCode: CodeModel;

    /**
     * 단지 목록
     */
    terrList: Array<TerrBzModel> = [];

    /**
     * 지역코드 목록
     */
    terrCdList: Array<CodeModel> = [];


    ngOnInit() {
        this.onLoadTerrCdList();
        this.onLoadTerrList();
    }
    /**
     * 지역코드 목록 가져오기
     */
    public onLoadTerrCdList(): void {

        const params: any = {
            parentCode: '001500',
            addAll: 0
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.terrCdList = model.result["data"] as Array<CodeModel>;
            });
    }

    /**
     * 단지 목록 가져오기
     */
    public onLoadTerrList(): void {
        const params: any = {
        };
        this.mainService.loadTerrBzList(params)
            .then((model) => {
                this.terrList = model.result["data"] as Array<TerrBzModel>;
                this.onPageReady();
            });
    }
    /**
     * 단지선택하기 팝업 열기
     * */
    onClickOpenBzPopup() {
        this.isOpenBzPopup = true;
    }
    /**
     * 단지선택하기 팝업 열기
     * */
    onClickCloseBzPopup() {
        this.isOpenBzPopup = false;
    }
    /**
     * 지역선택하기
     * */
    onClickTerr(codeModel: CodeModel) {
        if(this.getTerrListByTerrCd(codeModel.cd).length==0) {
            return
        }
        this.selectedTerrCode = codeModel;
    }

    /**
     * 지역선택하기
     * */
    onChangeSelectedTerr() {
        this.selectedTerrCode = null;
    }

    /**
     * 예정단지 포함/미포함 이벤트
     * */
    onChangeLifeServiceExpected(event) {

        this.isLifeServiceExpected = !event.target.checked;
    }

    /**
     * 지역가져오기
     * */
    getTerrListByTerrCd(terrCd) {
        // let terrCd = this.selectedTerrCd;
        let isLifeServiceExpected = this.isLifeServiceExpected;
        return this.terrList.filter(function(terr:TerrBzModel) {
            if(isLifeServiceExpected) {
                if(terr.terrCd === terrCd) {
                    return true;
                }
            } else {
                if(terr.terrCd === terrCd && terr.lsYn==='0') {
                    return true;
                }
            }
        })
    }

    /**
     * 메인페이지로 이동
     * */
    goMainPage(bzModel) {
        this.globalVars.bzModel = bzModel;
        this.pageUtils.navigateForward('/');
    }

    /**
     * 새창으로 열기
     * */
    openNewPage(url) {
        this.pageUtils.openNewTab(url)
    }

}
