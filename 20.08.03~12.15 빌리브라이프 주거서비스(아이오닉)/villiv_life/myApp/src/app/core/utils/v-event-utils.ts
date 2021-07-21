/**
 * 이벤트 관련된 유틸리티
 */
import {NgEventBus} from "ng-event-bus";
import {ModalEventModel} from "../models/modal-event-model";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class VEventUtils {

    constructor(private eventBus: NgEventBus ) {

    }

    /**
     * 공통 alert 처리
     * @param msg
     * @param title
     * @param callback
     */
    public alert(msg: string, title: string="알림", callback?: Function) {
        if(title==='') {
            title='알림'
        }
        const info = new ModalEventModel();
        info.title = title;
        info.content = msg;
        info.callback = callback
        this.eventBus.cast('common:alert',info);
    }

    /**
     * 공통 confirm 처리
     * @param msg
     * @param title
     * @param callback
     * @param confirmBtnNm
     * @param cancelCallback
     */
    public confirm(msg: string, callback?: Function, title: string="확인", confirmBtnNm: string="확인",cancelCallback: Function=null) {
        if(title==='') {
            title='확인'
        }
        const info = new ModalEventModel();
        info.title = title;
        info.content = msg;
        info.confirmBtnNm = confirmBtnNm;
        info.callback = callback;
        info.cancelCallback = cancelCallback;
        this.eventBus.cast('common:confirm',info);
    }

    /**
     * 자동로그아웃
     */
    public openLogoutConfirm() {

        this.eventBus.cast('common:logoutConfirm');
    }

}
