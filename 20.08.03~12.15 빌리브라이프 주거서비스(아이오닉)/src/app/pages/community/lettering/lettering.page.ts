import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {CalendarComponentOptions} from 'ion2-calendar';
import * as moment from 'moment';
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {LterngService} from "../../../core/service/lterng/lterng.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {VUtils} from "../../../core/utils/v-utils";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

declare var $: any;

@Component({
    selector: 'app-lettering',
    templateUrl: './lettering.page.html',
    styleUrls: ['./lettering.page.scss'],
})
export class LetteringPage extends BasePage implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public lterngService: LterngService
        , public systemService: SystemService
        , public globalVars: VGlobalVars
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 팝업 on/off
     * */
    isShowInfoPopup: { container: boolean, layer: boolean } = {container: false, layer: false};

    /**
     * 달력 on/off
     * */
    isShowDatePickerPopup: { container: boolean, layer: boolean } = {container: false, layer: false};

    /**
     * 선택날짜(팝업)
     * */
    selectedDate: string;

    /**
     * 선택한 오픈일
     * */
    selectedOpenDate: string;

    /**
     * 레터링 내용
     * */
    contents: string;

    /**
     * 달력 옵션
     * */
    options: CalendarComponentOptions = {
        from: this.getNDayAfterDate(2),
        to: this.getNDayAfterDate(10),
        monthFormat: 'YYYY년 MM월 ',
        monthPickerFormat: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        weekdays: ['일', '월', '화', '수', '목', '금', '토']
    };


    ngOnInit() {

    }

    ionViewDidEnter() {
        this.initData();
        this.onPageReady();
    }

    /**
     * 초기화
     * */
    initData() {
        this.selectedDate = moment(this.getNDayAfterDate(2)).format('YYYY.MM.DD');
        this.selectedOpenDate = this.selectedDate;
        this.contents = '';
    }

    /**
     * 팝업 열기
     */
    openInfoPopup() {
        this.isShowInfoPopup.container = true;
        this.isShowInfoPopup.layer = true;
    }

    /**
     * 팝업 닫기
     */
    closeInfoPopup() {
        this.isShowInfoPopup.layer = false;
        setTimeout(() => {
            this.isShowInfoPopup.container = false;
        }, 300);
    }

    /**
     * 달력팝업 열기
     */
    openDatePickerPopup() {
        this.isShowDatePickerPopup.container = true;
        this.isShowDatePickerPopup.layer = true;
    }

    /**
     * 달력 팝업 닫기
     */
    closeDatePickerPopup(isUpdate = false) {
        this.isShowDatePickerPopup.layer = false;
        if (isUpdate) {
            this.selectedOpenDate = this.selectedDate;
        }

        setTimeout(() => {
            this.isShowDatePickerPopup.container = false;
        }, 300);
    }

    /**
     * 오늘+N일 날짜 객체 가져오기
     * */
    getNDayAfterDate(number) {
        return moment().add(number, 'days').toDate();
    }

    /**
     * 달력 change 이벤트
     * */
    onChange($event) {
        console.log($event);
    }

    /**
     * 레터링 띄우기
     */
    onClickSubmit() {
        if (VUtils.isEmpty(this.contents)) {
            this.eventUtils.alert('내용을 입력해 주세요.');
            return;
        }
        let lines = this.contents.split(/\r|\r\n|\n/).length;
        // console.log(lines)
        if (lines > 5) {
            this.eventUtils.alert('엔터를 기준으로 최대 5줄까지 입력이 가능합니다.');
            return;
        }
        const confirmCallback = async () => {
            const params: any = {
                bzCd: this.globalVars.bzCd,
                lterngCts: this.contents,
                opnDt: this.selectedOpenDate.replace(/\./gi, '')
            };
            this.lterngService.insertLterng(params).then((model) => {
                this.eventUtils.alert('레터링 신청이 완료되었습니다.');
                this.initData();

            });
        };
        this.eventUtils.confirm('입력한 내용으로 레터링을 신청하시겠습니까?', confirmCallback);


    }

    changeFormat(event) {


    }
}
