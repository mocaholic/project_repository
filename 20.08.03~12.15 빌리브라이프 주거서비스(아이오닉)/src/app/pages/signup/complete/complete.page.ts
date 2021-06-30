import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
    selector: 'app-complete',
    templateUrl: './complete.page.html',
    styleUrls: ['./complete.page.scss'],
})
export class CompletePage extends BasePage implements OnInit {

    constructor(
        private pageUtils: VPageUtils
        , public globalVars: VGlobalVars
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
        this.onPageReady();
    }
  
    /**
     * 메인페이지로 이동
     * */
    goMainPage() {
        this.pageUtils.navigateForward('/');
    }
}
