/**
 * 시스템 관리 모듈의 Enum
 */
export namespace SystemEnum {

    /**
     * 공통코드 관리 서비스
     */
    export enum ACTIONS_COMMON_CODE {
        /**
         * 공통코드 조회
         */
        COMMON_SUBCODE_LIST = '{"action": "/api/code/useListByParentCode"}',
        // COMMON_SUBCODE_LIST = '{"action": "/api/code/useListByParentCode", "mockup":"/common.mockup@{parentCode}"}',

        /**
         * 공통 API 키 조회
         */
        COMMON_API_KEY = '{"action": "/api/system/commonAPIKey", "mockup":"/common.mockup@commonAPIKey"}',
    }

    /**
     * push 관리
     */
    export enum ACTIONS_PUSH {
        /**
         * push 목록 조회
         */
        LIST = '{"action": "/api/front/pushList", "mockup":"/common.mockup@pushList"}',

        /**
         * push on/off 변경
         */
        SET_PUSH = '{"action": "/api/front/auth/setPush"}',
    }

    /**
     * 로그 관리
     */
    export enum ACTIONS_LOG {
        /**
         * 액션로그 추가
         */
        ACTION_INSERT = '{"action": "/api/front/actionLog/insert"}',
    }

    /**
     * 버전 관리
     */
    export enum ACTIONS_VER {
        /**
         * 최신버전
         */
        NEWSET = '{"action": "/api/front/appVer/newest"}',
    }
}
