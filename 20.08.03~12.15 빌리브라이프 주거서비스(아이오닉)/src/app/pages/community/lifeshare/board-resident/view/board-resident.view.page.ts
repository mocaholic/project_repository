import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from "../../../../../core/constants/code-constants";
import {VBltbrdViewComponent} from "../../../../../components/v-bltbrd/view/v-bltbrd-view.component";
import {VUtils} from "../../../../../core/utils/v-utils";
import {BasePage} from "../../../../BasePage";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../../core/service/system/system.service";

@Component({
    selector: 'app-board-resident-view',
    templateUrl: './board-resident.view.page.html',
    styleUrls: ['./board-resident.view.page.scss'],
})
export class BoardResidentViewPage extends BasePage implements OnInit {
    /**
     * 게시판 타입
     */
    bltbrdTpCd: string = CodeConstants.BLTBRD.RESIDENT;

    /**
     * 게시판 컴포넌트
     */
    @ViewChild('bltbrdView', {static: false}) bltbrdView: VBltbrdViewComponent;

    constructor(
        public globalVars: VGlobalVars
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.bltbrdView.bltbrdId = this.bltbrdView.route.snapshot.params['bltbrdId'];

        if (VUtils.isValidDbRowId(this.bltbrdView.bltbrdId)) {
            this.bltbrdView.onLoadBltbrd();
            if (this.bltbrdView.isRply) {
                this.bltbrdView.onLoadRply();
            }
            this.onPageReady();
        } else {
            this.bltbrdView.eventUtils.alert("잘못된 접근입니다.")
            this.bltbrdView.pageUtils.navigateForward('/');
        }
    }
}
