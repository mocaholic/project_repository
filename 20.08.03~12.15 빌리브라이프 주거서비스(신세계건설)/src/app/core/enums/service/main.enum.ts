/**
 * 메인 모듈의 Enum
 */
export namespace MainEnum {

    /**
     * 게이트 관리 서비스
     */
    export enum ACTIONS_GATE {
        /**
         * 지역별 사업지 목록 조회
         */
        LIST = '{"action":"/api/front/main/terrBzList"}',
        // LIST = '{"action":"/api/front/main/terrBzList", "mockup":"/main.mockup@gateList"}',
    }

    /**
     * 날씨정보 서비스
     */
    export enum ACTIONS_WEATHER {
        /**
         * 날씨정보 조회
         */
        INFO = '{"action":"/api/extapi/weather", "mockup":"/main.mockup@weatherInfo"}',
    }

    /**
     * 약관 서비스
     */
    export enum ACTIONS_TERMS {
        /**
         * 약관 조회
         */
        DETAIL = '{"action":"/api/front/auth/searchTermsByKndVer"}',
        // DETAIL = '{"action":"/api/front/auth/searchTermsByKndVer", "mockup":"/main.mockup@termsInf"}',

        /**
         * 약관 버전 목록 조회
         */
        VER_LIST = '{"action":"/api/front/auth/searchTermsByKnd"}',
        // VER_LIST = '{"action":"/api/front/auth/searchTermsByKnd", "mockup":"/main.mockup@versionList"}',

        /**
         * 약관 개정 (새버전) 여부
         */
        CHECK_CHANGE = '{"action":"/api/front/auth/checkTermsChanged"}',
        // CHECK_CHANGE = '{"action":"/api/front/auth/checkTermsChanged","mockup":"/main.mockup@checkTermsChanged"}',

        /**
         * 약관 개정 확인
         */
        CONFIRM_TERMS_CHANGE = '{"action":"/api/front/auth/confirmTermsChanged"}',

    }
    /**
     * 메뉴 관리 서비스
     */
    export enum ACTIONS_MENU {
        /**
         * 메뉴 목록 조회
         */
        //LIST = '{"action":"/api/front/main/menuListByBz"}',
         LIST = '{"action":"/api/front/main/menuListByBz", "mockup":"/main.mockup@menuList"}',
    }

    /**
     * 메인 컨텐츠 서비스
     */
    export enum ACTIONS_CONTENTS {
        /**
         * 모든 내용 조회
         */
        LIST = '{"action":"/api/front/main/bzMain"}',
        // LIST = '{"action":"/api/front/main/bzMain", "mockup":"/main.mockup@bzMain"}',
    }
}
