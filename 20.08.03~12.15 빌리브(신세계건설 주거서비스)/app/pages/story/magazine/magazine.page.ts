import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VlvMgzModel} from "../../../core/models/story/vlv-mgz-model";
import {StoryService} from "../../../core/service/story/story.service";
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
    selector: 'v-magazine',
    templateUrl: './magazine.page.html',
    styleUrls: ['./magazine.page.scss'],
})
export class MagazinePage extends BasePage implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , public storyService: StoryService
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
    vlvMgz: VlvMgzModel;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.onLoadVlvMgz();
    }

    /**
     * 매거진 가져오기
     */
    onLoadVlvMgz() {
        const params: any = {

        }
        this.storyService.loadVlvMgz(params)
            .then((model) => {
                this.vlvMgz = model.result["data"] as VlvMgzModel;
                this.onPageReady();
            });
    }

    /**
     * 빌리브 홈페이지 열기
     */
    openVillivHomePage() {
        this.pageUtils.openNewTab('https://villiv.co.kr/')
    }
}
