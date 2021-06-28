/**
 * 이벤트 모듈의 Enum
 */
export namespace EventEnum {

    /**
     * 이벤트 관리 서비스
     */
    export enum ACTIONS_EVENT {
        /**
         * 이벤트 목록 조회
         */
        LIST = '{"action":"/api/front/event/list"}',
        // LIST = '{"action":"/api/front/event/list", "mockup":"/event.mockup@eventDataList"}',
        /**
         * 이벤트 상세조회
         */
        DETAIL = '{"action":"/api/front/event/detail"}',
        // DETAIL = '{"action":"/api/front/event/detail", "mockup":"/event.mockup@eventDataDetail"}',
    }
    /**
     * SSG 그룹사 관리 서비스
     */
    export enum ACTIONS_SSG_GRPC {
        /**
         * SSG 그룹사 목록 조회
         */
        LIST = '{"action":"/api/front/ssgGrpc/list"}',
        // LIST = '{"action":"/api/front/ssgGrpc/list", "mockup":"/event.mockup@ssgLifeDataList"}',
    }

}
