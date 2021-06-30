import {Component, Input, OnInit} from '@angular/core';
import {NgEventBus} from "ng-event-bus";
import {ModalEventModel} from "../../core/models/modal-event-model";
import {environment} from "../../../environments/environment";
import {VGlobalVars} from "../../core/utils/v-global-vars";
import {VStorageUtils} from "../../core/utils/v-storage-utils";
import {VUtils} from "../../core/utils/v-utils";

/**
 * 공통 모달들
 */
@Component({
    selector: 'v-modals',
    templateUrl: './v-modals.component.html',
    styleUrls: ['./v-modals.component.scss'],
})
export class VModalsComponent implements OnInit {


    constructor(
        private eventBus: NgEventBus
        , public globalVars: VGlobalVars
    ) {
    }

    alertPopupInfo: ModalEventModel;
    confirmPopupInfo: ModalEventModel;
    pinCodePopupInfo: ModalEventModel;
    setPinCodePopupInfo: ModalEventModel;
    errorPopupInfo: ModalEventModel;

    ngOnInit() {
        //alert
        this.eventBus.on('common:alert').subscribe((info: ModalEventModel) => {
            this.alertPopupInfo = info;
            this.alertPopupInfo.show = true;
        });
        //error
        this.eventBus.on('common:networkError').subscribe((info: ModalEventModel) => {
            this.errorPopupInfo = info;
            this.errorPopupInfo.show = true;
        });
        //confirm
        this.eventBus.on('common:confirm').subscribe((info: ModalEventModel) => {

            this.confirmPopupInfo = info;
            this.confirmPopupInfo.show = true;
        });

        //pincode
        if (this.globalVars.isApp) {
            this.eventBus.on('common:pinCode').subscribe((info: ModalEventModel) => {
                VStorageUtils.getInstance().get("pinCode").then((pinCode: string) => {
                    if (!VUtils.isEmpty(pinCode)) {
                        if (!info) {
                            info = new ModalEventModel();
                        }
                        this.pinCodePopupInfo = info;
                        this.pinCodePopupInfo.show = true;
                    }
                })
            });
        }

        //set pincode
        if (this.globalVars.isApp) {
            this.eventBus.on('common:setPinCode').subscribe((info: ModalEventModel) => {
                this.setPinCodePopupInfo = info;
                this.setPinCodePopupInfo.show = true;
            });
        }
    }

    /**
     * 하위컴포넌트에서 확인/취소 클릭시 발생하는 이벤트
     * */
    confirmEvent(event) {

        if (!event.isCancel && event.callback) {
            event.callback();
        }
        if (event.isCancel && event.cancelCallback) {
            event.cancelCallback();
        }
        event.show = false;
    }

}
