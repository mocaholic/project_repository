import {Component, OnInit} from '@angular/core';
import {VUtils} from "../../../core/utils/v-utils";
import {MyPageService} from "../../../core/service/my-page/my-page.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import GlobalConstants from "../../../core/constants/global-constants";
import {MnuModel} from "../../../core/models/mnu-model";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";
import {ServiceModel} from "../../../core/service/ServiceModel";
import {VEventUtils} from "../../../core/utils/v-event-utils";

@Component({
    selector: 'app-my-menu',
    templateUrl: './my-menu.page.html',
    styleUrls: ['./my-menu.page.scss'],
})
export class MyMenuPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
        , public globalVars: VGlobalVars
        , public systemService: SystemService
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
     * 메뉴 타입상수
     */
    readonly menuTypeConstants: GlobalConstants.MENU = GlobalConstants.MENU;

    /**
     * 마이메뉴 목록
     */
    menuList: Array<MnuModel>;
  
    ngOnInit() {
  
    }
  
    ionViewDidEnter() {
        this.loadMyMnuList();
    }

    /**
     * 마이메뉴 목록 재조정
     */
    reorder({detail}) {

        const itemMove = this.menuList.splice(detail.from, 1)[0];
        this.menuList.splice(detail.to, 0, itemMove);
        detail.complete(true);
    }

    /**
     * 마이메뉴 목록 가져오기
     */
    loadMyMnuList() {

        const params: any = {
        };
        this.myPageService.loadMyMnuList(params).then((model) => {
            this.menuList = model.result['data'] as Array<MnuModel>;
            this.onPageReady();
            console.log('this.menuList')
            console.log(this.menuList)
        });
    }

    /**
     * 마이메뉴 아이콘 클래스
     */
    getIconClassName(menu) {
        if(menu.mnuId) {
            // return this.menuTypeConstants['menu.mnuId'];
            return this.menuTypeConstants[menu.mnuId].ICON;
        } else {
            if(VUtils.isEmpty(menu.svcGrpCd)) {
                return ''
            } else {
                return this.menuTypeConstants[menu.svcGrpCd].ICON;
            }
        }
    }
    /**
     * 마이메뉴 이름
     */
    getMenuName(menu) {
        if(menu.mnuId) {
            return this.menuTypeConstants[menu.mnuId].MNU_NM;
        } else {
            return menu.svcNm;
        }
    }

    /**
     * 마이메뉴 등록 on/off 토글
     */
    toggleFavorites(menu:MnuModel) {
        menu.isDelete = !menu.isDelete;
    }

    /**
     * 마이메뉴 저장
     */
    onClickSave() {

        const params: any = this.menuList.filter((menu)=>{
            if(!menu.isDelete) {
                return true;
            }
        });
        this.myPageService.updateMyMnu(params).then((model: ServiceModel) => {
            if(model.isResultOK()) {
                this.eventUtils.alert('마이메뉴가 저장되었습니다.');
                this.menuList = model.result['data'] as Array<MnuModel>;
            } else {
                this.eventUtils.alert(model.result['msg']);
            }
        });
    }
}
