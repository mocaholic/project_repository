/**
 * iot 관련 모듈의 Enum
 */
export namespace IotEnum {

    /**
     * iot 관련 서비스
     */
    export enum ACTIONS_IOT {

        //TODO 삭제 ==========================================================================
        /**
         * 목록
         */
        DEVICE_LIST = '{"action":"/devices","mockup":"/iot.mockup@devices"}',

        /**
         * 에너지 사용량 목록
         */
        USAGE_LIST = '{"action":"/ems/usage","mockup":"/iot.mockup@usage"}',

        /**
         * 입출차 이력 목록
         */
        PARKING_HISTORY_LIST = '{"action":"/parking-control","mockup":"/iot.mockup@parking"}',

        /**
         * 택배 이력 목록
         */
        PARCEL_HISTORY_LIST = '{"action":"/parcels","mockup":"/iot.mockup@parcelList"}',

        //===================================================================================

        /**
         * 토큰 조회
         */
        GET_TOKEN = '{"action":"/api/front/iot/getToken"}',

        /**
         * 로그인(토큰 저장)
         */
        LOGIN = '{"action":"/api/front/iot/login"}',
        /**
         * 정보 조회
         */
        GET_INFO = '{"action":"/api/front/iot/getInfo"}',

        /**
         * 디바이스 조작
         */
        SET_DEVICE = '{"action":"/api/front/iot/setDevice"}',
    }
}
