import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'v-font-size',
    templateUrl: './v-font-size.component.html',
    styleUrls: ['./v-font-size.component.scss'],
})
export class VFontSizeComponent implements OnInit {

    constructor() {
    }

    @Input()  fontClassName: string = "";

    @Output() fontClassNameChange = new EventEmitter<string>();

    /**
     * 폰트 사이즈 조절 팝업 on/off
     */
    isShowFontSizePopup: boolean;

    /**
     * Init
     * */
    ngOnInit() {
    }

    /**
     * 폰트 사이즈 조절 팝업 열기
     */
    openFontSizePopup() {
        this.isShowFontSizePopup = true;
    }
    /**
     * 폰트 사이즈 조절 팝업 닫기
     */
    closeFontSizePopup() {
        this.isShowFontSizePopup = false;
    }
    /**
     * 폰트 클래스 변경
     */
    setFontClassName(code) {
        this.fontClassName = code;
        this.fontClassNameChange.emit(this.fontClassName);
    }
}
