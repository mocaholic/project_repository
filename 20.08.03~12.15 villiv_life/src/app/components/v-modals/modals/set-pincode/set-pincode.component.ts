import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalEventModel} from "../../../../core/models/modal-event-model";
import {VStorageUtils} from "../../../../core/utils/v-storage-utils";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {environment} from "../../../../../environments/environment";
import {VUtils} from "../../../../core/utils/v-utils";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
@Component({
    selector: 'v-set-pincode',
    templateUrl: './set-pincode.component.html',
    styleUrls: ['./set-pincode.component.scss'],
})
export class SetPincodeComponent implements OnInit {

    constructor(
        public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
    ) {
    }

    /**
     * 입력 비밀번호
     * */
    password: string = "";

    /**
     * 확인 비밀번호
     * */
    confirmPassword: string = "";

    /**
     * 문구
     * */
    title: string = "";

    @Input("popupInfo") _popupInfo: ModalEventModel;
    @Output() confirmEvent = new EventEmitter<ModalEventModel>();

    ngOnInit() {
        if(!this.globalVars.isApp) {
            console.log ("not app : " + this.globalVars.isApp);
            return;
        }
        this.title = '새로운 암호를 입력해 주세요.';
    }

    /**
     * 비밀번호 숫자 입력
     * */
    onClickNumber(number) {
        if(this.password.length === 4) {
            return;
        }
        this.password += number;
        if (this.password.length === 4 && VUtils.isEmpty(this.confirmPassword)) {
            this.confirmPassword = this.password;
            this.password = "";
            this.title = '새로운 암호를 한번 더 입력해 주세요.';
            return;
        }
        if (this.password.length === 4 && this.confirmPassword.length === 4) {
            this.checkPassword();
        }
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
        if(this.password === this.confirmPassword) {
            this.globalVars.pinCode = this.password;
            this.confirmEvent.emit(this._popupInfo);
            this.eventUtils.alert('암호가 설정되었습니다.');
        } else {
            this.password = "";
            this.title = '암호가 동일하지 않습니다. 다시 입력해 주세요.';
        }
    }

    /**
     * 창닫기
     * */
    onClickClose() {
        this.confirmEvent.emit(this._popupInfo);
    }

}
