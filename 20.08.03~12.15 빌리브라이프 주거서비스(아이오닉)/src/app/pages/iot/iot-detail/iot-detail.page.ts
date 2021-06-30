import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {IotService} from "../../../core/service/iot/iot.service";
import {IotParkingModel} from "../../../core/models/iot/iot-parking-model";
import * as moment from 'moment';
import {IotParcelModel} from "../../../core/models/iot/iot-parcel-model";
import {NavigationEnd, Router} from "@angular/router";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {SystemService} from "../../../core/service/system/system.service";


@Component({
    selector: 'app-iot-detail',
    templateUrl: './iot-detail.page.html',
    styleUrls: ['./iot-detail.page.scss'],
})
export class IotDetailPage extends BasePage implements OnInit {

    constructor(
        public pageUtils: VPageUtils,
        public eventUtils: VEventUtils,
        public iotService: IotService,
        public systemService: SystemService,
        public router: Router,
        public globalVars: VGlobalVars,
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });

        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                if(this.router.getCurrentNavigation().extras['typeCode']) {
                    this.selectedTypeCode = this.router.getCurrentNavigation().extras['typeCode'];
                }
                if(this.selectedTypeCode === 'parking') {
                    this.onLoadParkingHistoryList();
                } else if(this.selectedTypeCode === 'parcel') {
                    this.onLoadParcelHistoryList();
                } else {
                    this.eventUtils.alert("잘못된 접근입니다.")
                    this.pageUtils.navigateForward('/');
                }
            }

        });
    }

    navigationSubscription;

    /**
     * 주차 이력 목록
     * */
    parkingHistoryList: Array<IotParkingModel>;

    /**
     * 택배 이력 목록
     * */
    parcelHistoryList: Array<IotParcelModel>;

    /**
     * 선택 타입
     * */
    selectedTypeCode: string;

    ngOnInit() {
        // this.selectedTypeCode = this.router.getCurrentNavigation().extras['typeCode'];
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ionViewDidEnter() {

    }

    /**
     * 입출차 이력 목록 가져오기
     */
    onLoadParkingHistoryList() {

        const params: any = {
            uri: '/parking-control'
        };
        // this.iotService.getInfo(params)
        this.iotService.loadParkingHistoryList(params)
            .then((model) => {

                this.parkingHistoryList = model.result["data"]["parkingControlList"] as Array<IotParkingModel>;
                this.onPageReady()
            });
    }

    /**
     * 택배 이력 목록 가져오기
     */
    onLoadParcelHistoryList() {

        const params: any = {
            uri: '/parcels'
        };
        // this.iotService.getInfo(params)
        this.iotService.loadParcelHistoryList(params)
            .then((model) => {

                this.parcelHistoryList = model.result["data"]["parcelList"] as Array<IotParcelModel>;
                this.onPageReady()
            });
    }

    /**
     * AMA001(입차), AMA002(출차)
     * AMA003(방문차량 입차), AMA004(방문차량 출차)
     * */
    parseParkingTime(timestamp) {
        let date = moment(timestamp);
        if (date.isValid()) {
            return date.format('YYYY.MM.DD HH:mm');
        }
        return '';
    }

    /**
     * AMA001(입차), AMA002(출차)
     * AMA003(방문차량 입차), AMA004(방문차량 출차)
     * */
    getParkingInputTypeName(type) {
        switch (type) {
            case 'AMA001':
                return "입차";
            case 'AMA002':
                return "출차";
            case 'AMA003':
                return "방문차량 입차";
            case 'AMA004':
                return "방문차량 출차";
            default:
                return "";
        }
    }
}
