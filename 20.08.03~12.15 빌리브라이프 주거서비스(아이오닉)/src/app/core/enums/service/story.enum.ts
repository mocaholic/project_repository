/**
 * 빌리브스토리 모듈의 Enum
 */
export namespace StoryEnum {

    /**
     * 단지 관리 서비스
     */
    export enum ACTIONS_BZ {

        /**
         * 단지 목록 조회
         */
        LIST = '{"action":"/api/front/bz/list"}',
        // LIST = '{"action":"/api/front/bz/list", "mockup":"/story.mockup@bzList"}',

        /**
         * 동 목록 조회
         */
        DONG_LIST = '{"action":"/api/front/bz/blNoListByBz"}',
        // DONG_LIST = '{"action":"/api/front/bz/blNoListByBz", "mockup":"/story.mockup@blNoListByBz"}',

        /**
         * 호 목록 조회
         */
        HO_LIST = '{"action":"/api/front/bz/rmNoListByBz"}',
        // HO_LIST = '{"action":"/api/front/bz/rmNoListByBz", "mockup":"/story.mockup@rmNoListByBz"}',

        /**
         * 단지 정보 조회
         */
        DETAIL = '{"action":"/api/front/bz/detail"}',
        // DETAIL = '{"action":"/api/front/bz/detail", "mockup":"/story.mockup@bzDetail"}',

        /**
         * 컨텐츠 유형별 내용 조회
         */
        CONTENS_DETAIL = '{"action":"/api/front/bz/imageNoticeSqms"}',
        // CONTENS_DETAIL = '{"action":"/api/front/bz/imageNoticeSqms", "mockup":"/story.mockup@bzCtsDetail"}',

        /**
         * 특화시설정보 목록 조회
         */
        SPCL_FCL_LIST = '{"action":"/api/front/bz/spclFcl"}',
        // SPCL_FCL_LIST = '{"action":"/api/front/bz/spclFcl", "mockup":"/story.mockup@spclFclList"}',

        /**
         * 빌리브 매거진 조회
         */
        VLV_MGZ = '{"action":"/api/front/vlvMgz/latest"}',
        // VLV_MGZ = '{"action":"/api/front/vlvMgz/latest", "mockup":"/story.mockup@vlvMgz"}',

        /**
         * 계약대기신청 추가
         */
        CONT_APL_INSERT = '{"action":"/api/front/contApl/insert"}',
        // CONT_APL_INSERT = '{"action":"/api/front/contApl/insert", "mockup":"/story.mockup@contApl"}',
    }
}
