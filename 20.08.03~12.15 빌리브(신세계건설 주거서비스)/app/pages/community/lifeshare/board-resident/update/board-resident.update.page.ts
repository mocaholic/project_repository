import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from "../../../../../core/constants/code-constants";
import {BltbrdModel} from "../../../../../core/models/bltbrd/bltbrd-model";
import {VBltbrdUpdateComponent} from "../../../../../components/v-bltbrd/update/v-bltbrd-update.component";
import {BasePage} from "../../../../BasePage";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../../core/service/system/system.service";

@Component({
    selector: 'app-board-resident-update',
    templateUrl: './board-resident.update.page.html',
    styleUrls: ['./board-resident.update.page.scss'],
})
export class BoardResidentUpdatePage extends BasePage implements OnInit {

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

    /**
     * 게시판 코드
     * */
    bltbrdTpCd: string = CodeConstants.BLTBRD.RESIDENT;

    /**
     * 팝업 on/off
     * */
    isShowInfoPopup: boolean;

    /**
     * 게시판 컴포넌트
     */
    @ViewChild('bltbrdUpdate', {static: false}) bltbrdUpdate: VBltbrdUpdateComponent;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.bltbrdUpdate.bltbrdId = this.bltbrdUpdate.route.snapshot.params['bltbrdId'];

        if( !this.bltbrdUpdate.isNew() ) {
            this.bltbrdUpdate.onLoadBltbrd();
        } else {
            this.bltbrdUpdate.bltbrdDetail = new BltbrdModel();
            this.bltbrdUpdate.bltbrdTtl = "";
            this.bltbrdUpdate.editor.nativeElement.innerHTML = "";
        }
        this.onPageReady();
    }
}



