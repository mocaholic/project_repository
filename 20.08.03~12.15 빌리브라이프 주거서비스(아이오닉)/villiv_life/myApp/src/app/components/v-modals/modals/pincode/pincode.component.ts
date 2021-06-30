import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalEventModel} from "../../../../core/models/modal-event-model";
import {VStorageUtils} from "../../../../core/utils/v-storage-utils";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {environment} from "../../../../../environments/environment";
@Component({
    selector: 'v-pincode',
    templateUrl: './pincode.component.html',
    styleUrls: ['./pincode.component.scss'],
})
export class PincodeComponent implements OnInit {

    constructor(public globalVars: VGlobalVars) {
    }

    password: string = "";
    title: string = "";

    @Input("popupInfo") _popupInfo: ModalEventModel;
    @Output() confirmEvent = new EventEmitter<ModalEventModel>();

    ngOnInit() {
        if(!this.globalVars.isApp) {
            console.log ("not app : " + this.globalVars.isApp);
            return;
        }

        this.title = "빌리브 암호를 입력해주세요";
    }

    /**
     * 비밀번호 숫자 입력
     * */
    onClickNumber(number) {
        if (this.password.length === 4) {
            return;
        }
        this.password += number;
        this.checkPassword();
    }

    /**
     * 비밀번호 숫자 1개 삭제
     * */
    onClickCancel() {
        if (this.password.length === 0) {
            return;
        }
        this.password = this.password.slice(0, -1)
    }

    /**
     * 비밀번호 맞는지 확인
     * */
    checkPassword() {
        if (this.password.length < 4) {
            return;
        }
        if (this.password !== this.globalVars.pinCode) {
            this.title = "암호가 동일하지 않습니다. 다시 입력해 주세요.";
            this.password = "";
            return;
        }
        this.confirmEvent.emit(this._popupInfo);

    }


}
