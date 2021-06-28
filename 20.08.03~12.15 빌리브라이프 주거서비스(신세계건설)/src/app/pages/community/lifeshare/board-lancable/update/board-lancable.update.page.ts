import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from "../../../../../core/constants/code-constants";
import {VBltbrdUpdateComponent} from "../../../../../components/v-bltbrd/update/v-bltbrd-update.component";
import {BltbrdModel} from "../../../../../core/models/bltbrd/bltbrd-model";
import {BasePage} from "../../../../BasePage";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../../core/service/system/system.service";

@Component({
    selector: 'app-board-lancable-update',
    templateUrl: './board-lancable.update.page.html',
    styleUrls: ['./board-lancable.update.page.scss'],
})
export class BoardLancableUpdatePage extends BasePage implements OnInit {

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
    bltbrdTpCd: string = CodeConstants.BLTBRD.LANCABLE;

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



