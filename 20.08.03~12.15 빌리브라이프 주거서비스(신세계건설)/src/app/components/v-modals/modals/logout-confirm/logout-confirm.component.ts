import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalEventModel} from "../../../../core/models/modal-event-model";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import GlobalConstants from "../../../../core/constants/global-constants";
import {NgEventBus} from "ng-event-bus";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";

@Component({
    selector: 'v-logout-confirm',
    templateUrl: './logout-confirm.component.html',
    styleUrls: ['./logout-confirm.component.scss'],
})
export class LogoutConfirmComponent implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , private eventBus: NgEventBus
        , private globalVars: VGlobalVars
    ) {
    }

    isShow: { container: boolean, layer: boolean } = { container: false,layer: false};


    ngOnInit() {
        this.eventBus.on('common:logoutConfirm').subscribe(() => {
            this.isShow.container = true;
            this.isShow.layer = true;
        });
    }

    onClickLogin() {
        this.pageUtils.navigateForward(GlobalConstants.MENU.LOGIN.URL);

        this.isShow.container = false;
        this.isShow.layer = false;
    }
}
