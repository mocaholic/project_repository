/**
 * 레터링 모듈의 Enum
 */
export namespace Lterng {

    /**
     * 레터링 관리 서비스
     */
    export enum ACTIONS_LTERNG {
        /**
         * 최신 레터링 조회
         */
        LATEST = '{"action":"/api/front/lterng/latest"}',
        // LATEST = '{"action":"/api/front/lterng/latest", "mockup":"/lterng.mockup@detail"}',
        /**
         * 레터링 등록
         */
        INSERT = '{"action":"/api/front/lterng/insert"}',
        // INSERT = '{"action":"/api/front/lterng/insert", "mockup":"/lterng.mockup@insert"}',

    }

}
