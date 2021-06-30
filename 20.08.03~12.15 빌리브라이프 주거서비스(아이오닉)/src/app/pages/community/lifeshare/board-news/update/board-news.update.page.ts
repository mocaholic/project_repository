import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from "../../../../../core/constants/code-constants";
import {VBltbrdUpdateComponent} from "../../../../../components/v-bltbrd/update/v-bltbrd-update.component";
import {BltbrdModel} from "../../../../../core/models/bltbrd/bltbrd-model";
import {BasePage} from "../../../../BasePage";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../../core/service/system/system.service";

@Component({
    selector: 'app-board-news-update',
    templateUrl: './board-news.update.page.html',
    styleUrls: ['./board-news.update.page.scss'],
})
export class BoardNewsUpdatePage extends BasePage implements OnInit {

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
    bltbrdTpCd: string = CodeConstants.BLTBRD.NEWS;

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



