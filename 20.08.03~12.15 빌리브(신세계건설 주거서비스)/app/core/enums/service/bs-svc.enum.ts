/**
 * 우리단지서비스 관련 모듈의 Enum
 */
export namespace BsSvcEnum {

    /**
     * 우리단지서비스 관련 서비스
     */
    export enum ACTIONS_BS_SVC {

        /**
         * 상세
         */
        DETAIL = '{"action":"/api/front/bsSvc/detail"}',
        // DETAIL = '{"action":"/api/front/bsSvc/detail","mockup":"/bs-svc.mockup@detail"}',
    }

    /**
     * 제휴업체 관련 서비스
     */
    export enum ACTIONS_PTNR {

        /**
         * 상세
         */
        DETAIL = '{"action":"/api/front/bsPtnr/detail"}',

        /**
         * 예약
         */
        INSERT = '{"action":"/api/front/bsPtnrResv/insert"}',
    }

    /**
     * 문화강좌 관련 서비스
     */
    export enum ACTIONS_LEC {

        /**
         * 목록
         */
        LIST = '{"action":"/api/front/lec/list"}',
        // LIST = '{"action":"/api/front/lec/list","mockup":"/bs-svc.mockup@lecList"}',

        /**
         * 상세
         */
        DETAIL = '{"action":"/api/front/lec/detail"}',
        // DETAIL = '{"action":"/api/front/lec/detail","mockup":"/bs-svc.mockup@lecDetail"}',

        /**
         * 신청
         */
        INSERT = '{"action":"/api/front/resv/apply"}',

        /**
         * 신청여부 확인
         */
        CHECK = '{"action":"/api/front/lec/check","mockup":"/bs-svc.mockup@lecIsExist"}',

    }

    /**
     * 조식 관련 서비스
     */
    export enum ACTIONS_LNCH {

        /**
         * 상세
         */
        DETAIL = '{"action":"/api/front/lnchMst/detail"}',
        // DETAIL = '{"action":"/api/front/bsLnch/detail","mockup":"/bs-svc.mockup@lnchDetail"}',

        /**
         * 예약
         */
        INSERT = '{"action":"/api/front/resv/apply"}',
    }

    /**
     * 예약 상품 관련 서비스
     */
    export enum ACTIONS_RESV_PRD {

        /**
         * 상세
         */
        DETAIL = '{"action":"/api/front/resv/product"}',

        /**
         * 예약
         */
        INSERT = '{"action":"/api/front/resv/apply"}',

    }
}
