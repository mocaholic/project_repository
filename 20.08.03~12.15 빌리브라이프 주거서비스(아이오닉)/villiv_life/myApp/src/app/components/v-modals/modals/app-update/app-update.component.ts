import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalEventModel} from "../../../../core/models/modal-event-model";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import GlobalConstants from "../../../../core/constants/global-constants";
import {NgEventBus} from "ng-event-bus";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";

@Component({
    selector: 'v-app-update',
    templateUrl: './app-update.component.html',
    styleUrls: ['./app-update.component.scss'],
})
export class AppUpdateComponent implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , private eventBus: NgEventBus
        , private globalVars: VGlobalVars
    ) {
    }

    _popupInfo: ModalEventModel;

    isActive: boolean = false;

    set popupInfo(_popupInfo) {
        this._popupInfo = _popupInfo;
        this.isActive = true;
    }

    ngOnInit() {
        /* this.eventBus.on('common:appUpdate').subscribe((info: ModalEventModel) => {
            this._popupInfo = info;
            this._popupInfo.show = true;
            this.isActive = true;
        }); */
        this.eventBus.on('common:appUpdate').subscribe((info: ModalEventModel) => { 
            this._popupInfo = info;
            this._popupInfo.show = true;
            this.isActive = true;
            // console.log("test");
        });
    }

    onClick(isCancel) {
        if(this._popupInfo.isRequired || !isCancel) {
            let url;
            if(this.globalVars.mobileOs==='android') {
                url = GlobalConstants.MENU.ANDROID_STORE.URL;
            } else if(this.globalVars.mobileOs==='ios') {
                url = GlobalConstants.MENU.IOS_STORE.URL;
            }
            this.pageUtils.openNewTab(url);
        } else {
            this.isActive = !isCancel;

            setTimeout(() => {
                this._popupInfo.show = !isCancel;
            }, 300);
        }


    }
}
