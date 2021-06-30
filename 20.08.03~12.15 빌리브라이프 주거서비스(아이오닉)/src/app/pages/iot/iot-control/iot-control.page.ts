import {Component, OnInit} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {IotUsageModel} from "../../../core/models/iot/iot-usage-model";
import {IotService} from "../../../core/service/iot/iot.service";
import {VUtils} from "../../../core/utils/v-utils";
import {IotDeviceModel, IotStatusModel} from "../../../core/models/iot/iot-device-model";
import GlobalConstants from "../../../core/constants/global-constants";
import {MnuModel} from "../../../core/models/mnu-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {MainService} from "../../../core/service/main/main.service";
import {BasePage} from "../../BasePage";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

declare var $: any;
@Component({
    selector: 'app-iot-control',
    templateUrl: './iot-control.page.html',
    styleUrls: ['./iot-control.page.scss'],
})
export class IotControlPage extends BasePage implements OnInit {

    constructor(
        public iotService: IotService
        , public mainService: MainService
        , public globalVars: VGlobalVars
        , public pageUtils: VPageUtils
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }
    /**
     * 냉난방 min max
     * */
    tempConstants = GlobalConstants.IOT_TEMP;
    
    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 에너지 사용량 목록
     * */
    usageList: Array<IotUsageModel>;

    /**
     * device 목록
     * */
    deviceList: Array<IotDeviceModel>;

    /**
     * 다기능 스위치 device
     * */
    multiSwitch: IotDeviceModel;

    /**
     * 메뉴 목록
     */
    mnuList: Array<MnuModel> = [];

    /**
     * 메뉴 타입상수
     */
    readonly menuTypeConstants: GlobalConstants.MENU = GlobalConstants.MENU;

    ngOnInit() {
        $('.ctrl_area').attr('hidden','true');
        this.onClickTab("info");
        this.loadMenu();
    }

    ionViewDidEnter() {

        this.onLoadUsageList();
        this.onLoadDeviceList();
    }

    /**
     * 메뉴 가져오기
     */
    loadMenu() {
        const params: any = {
            bzCd : this.globalVars.bzCd,
        };
        this.mainService.loadMenu(params)
            .then((model) => {
                this.mnuList = model.result['data'] as Array<MnuModel>;


            });
    }

    /**
     * 메뉴 존재여부
     */
    isExistMnuByMnuId(mnuId) {
        return VUtils.isExist(this.mnuList,{mnuId:mnuId})
    }


    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }

    /**
     * 새로고침 버튼 클릭
     * */
    onClickRefresh() {
        this.onLoadUsageList();
    }

    /**
     * 상세페이지로 이동
     * 차량 or 택배
     * */
    goDetailPage(typeCode) {
        this.pageUtils.navigateForward('/iot/iot-detail',{typeCode: typeCode})

    }

    /**
     * 에너지 사용량 목록 가져오기
     */
    onLoadUsageList() {

        const params: any = {
            uri: '/ems/usage'
        };
        // this.iotService.getInfo(params)
        this.iotService.loadUsageList(params)
            .then((model) => {
                //TODO 항상 모든 에너지타입을 주는지 확인해야함

                this.usageList = model.result["data"]["usageList"] as Array<IotUsageModel>;

                this.onPageReady()

            });
    }
    /**
     * device 목록 가져오기
     */
    onLoadDeviceList() {

        const params: any = {
            uri: '/devices'
        };
        // this.iotService.getInfo(params)
        this.iotService.loadDeviceList(params)
            .then((model) => {
                this.deviceList = model.result["data"]["deviceList"] as Array<IotDeviceModel>;
                console.log(this.deviceList);
                let multiSwitchList = this.getDeviceListByType('multi_switch')
                if(multiSwitchList.length>0) {
                    this.multiSwitch = this.getDeviceListByType('multi_switch')[0];
                }
            });
    }

   /**
    * 타입 별 device목록 가져오기
    */
   getDeviceListByType(type) {
       if(this.deviceList) {
           return this.deviceList.filter(function(device: IotDeviceModel) {
               if (device.deviceType === type) {
                   return true;
               }
           });
       }
   }

    /**
     * 특정타입 에너지 사용량 가져오기
     */
    getUsageByType(type: string) : IotUsageModel {
        return VUtils.getObjByKey(this.usageList,{energyType: type})
    }

    /**
     * 특정타입 에너지 사용량 평균
     */
    getAvgUsageByType(type: string) {
        let usageObj = this.getUsageByType(type);
        if(!usageObj) {
            return 0;
        }
        if(Number(usageObj.usage)>Number(usageObj.sameAreaTypeUsage)*2) {
            return 100;
        } else {
            return Number(usageObj.usage)/(Number(usageObj.sameAreaTypeUsage)*2)*100
        }
    }

    /**
     * 특정타입 에너지 사용량 평균 이상인지
     */
    isOverUsage(type: string) {
        let usageObj = this.getUsageByType(type);
        if(!usageObj) {
            return false;
        }

        if(Number(usageObj.usage) > this.getAvgUsageByType(type)) {
            return true
        }
        return false;
    }

    /**
     * device 상태목록에서 키에 해당하는 obj 가져오기
     */
    getStatusObj(statusList,key): IotStatusModel {
        let status = VUtils.getObjByKey(statusList,{command: key}) as IotStatusModel;
        if(status) {
            return status;
        }
        const emptyStatus: IotStatusModel = new IotStatusModel();
        return emptyStatus;
    }
    /**
     * device obj 가져오기
     */
    getDeviceObj(deviceId): IotDeviceModel {
        let device = VUtils.getObjByKey(this.deviceList,{id: deviceId}) as IotDeviceModel;
        if(device) {
            return device;
        }
        return null;
    }

    /**
     * 전원 on/off
     */
    changePower(device,event) {
        this.setDevice(device.deviceType,device.id,'power',event.target.checked? 'on' : 'off');
    }
    /**
     * 설정온도 변경
     */
    changeTemperature(device,value) {

        this.setDevice(device.deviceType,device.id,'setTemperature',value);
    }
    /**
     * 설정모드 변경
     */
    changeMode(device,event,command = 'mode') {


        this.setDevice(device.deviceType,device.id,command,event.target.value);
    }

    /**
     * 1개만 있는 디바이스 가져오기
     * 다기능스위치
     */
    getOnlyOneDevice(deviceType) {
        let deviceList = this.getDeviceListByType(deviceType)
        if(VUtils.isEmpty(deviceList)) {
            return null;
        }
        return deviceList[0];
    }


    /**
     * 1개만 있는 디바이스 상태 가져오기
     * 다기능스위치
     */
    getOnlyOneDeviceStatus(deviceType,command) {
        let deviceList = this.getDeviceListByType(deviceType)
        let device;
        if(VUtils.isEmpty(deviceList)) {
            return false;
        }
        device = deviceList[0];
        let status = this.getStatusObj(device.statusList,command)  as IotStatusModel;

        if(!status) {
            return false;
        }
        return status.value
    }

    /**
     * 가스 끄기
     */
    closeGas() {

        if(this.getOnlyOneDeviceStatus('multi_switch','gas')!=='on') {
            return;
        }

        let device = this.getOnlyOneDevice('multi_switch');

        this.setDevice(device.deviceType,device.id,'gas','off');

    }

    /**
     * 전체 전등 켜기/끄기
     */
    allLightManage(status) {
        let device = this.getOnlyOneDevice('multi_switch');
        this.setDevice(device.deviceType,device.id,'light',status ? 'on' : 'off');
    }

    /**
     * 디바이스 조작하기
     * */
    setDevice(deviceType: string,deviceId: string,command: string,value: string) {
        const params: any = {
            uri: this.getURIByDeviceType(deviceType)+'/'+deviceId,
            data: this.getCommandJsonString(command,value)
        };
        // this.iotService.getInfo(params)
        this.iotService.setDevice(params)
            .then((model) => {

                //TODO 성공 or 실패 후 처리
            });
    }

    /**
     * 온도 조절 버튼 클릭
     */
    onClickTmprRange(statusModel: IotStatusModel,isReduce: boolean): void {

        //TODO setDevice
        statusModel.value = (Number(statusModel.value) + (isReduce ? -1 : 1)).toString();

    }

    getCommandJsonString(command:string, value:string): string {
        let str = '';
        str += '{'
        str += '   "commandList":['
        str += '       {';
        str += '           "command":"'+command+'",';
        str += '           "value":"'+value+'"'
        str += '       }'
        str += '   ]'
        str += '}'
        return str;

    }

    /**
     * 타입별 요청 uri 가져오기
     * */
    getURIByDeviceType(deviceType) {
        switch (deviceType) {
            case 'light' :
                return '/lights'
            case 'gas' :
                return '/gases'
            case 'heating' :
                return '/heaters'
            case 'wallsocket' :
                return '/wall-sockets'
            case 'aircon' :
                return '/aircons'
            case 'multi_switch' :
                return '/multi-switches'
            case 'fan' :
                return '/fans-switches'
            default :
                return ''
        }
    }
}

