/**
 * iot device 모델
 */
import {VUtils} from "../../utils/v-utils";

export class IotDeviceModel {
    /**
     *  ID
     */
    public id: string;

    /**
     *  기기 Type
     */
    public deviceType: string;

    /**
     *  기기명
     */
    public deviceName: string;

    /**
     *  기기위치
     */
    public deviceLocation: string;

    /**
     *  상태목록
     */
    public statusList: Array<IotStatusModel>;

    /**
     *  set 모드
     */
    public setMode: string = "cool";
}
/**
 * iot device 상태 모델
 */
export class IotStatusModel {

    /**
     *  키
     */
    public command: string;

    /**
     *  값
     */
    public value: string;
}
