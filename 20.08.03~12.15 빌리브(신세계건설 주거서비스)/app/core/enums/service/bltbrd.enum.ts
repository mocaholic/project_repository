/**
 * 게시판 모듈의 Enum
 */
export namespace Bltbrd {

    /**
     * 게시판 관리 서비스
     */
    export enum ACTIONS_BLTBRD {


        /**
         * 게시판 목록 조회
         */
        //일반
        LIST = '{"action":"/api/front/bltbrd/list"}',
        // LIST = '{"action":"/api/front/bltbrd/list", "mockup":"/bltbrd.mockup@noticeBltbrdList"}',
        /**
         * 중요글 목록 조회
         */
        IMPTC_LIST = '{"action":"/api/front/bltbrd/importantNoticeList"}',
        // IMPTC_LIST = '{"action":"/api/front/bltbrd/importantNoticeList", "mockup":"/bltbrd.mockup@importantNoticeList"}',

        /**
         * 게시판 상세조회
         */
        //일반
        DETAIL = '{"action":"/api/front/bltbrd/detail"}',
        // DETAIL = '{"action":"/api/front/bltbrd/detail", "mockup":"/bltbrd.mockup@noticeBltbrdDetail"}',

        /**
         * 이미지 업로드
         */
        IMG_UPLOAD = '{"action":"/api/front/bltbrd/imageUpload"}',
        // IMG_UPLOAD = '{"action":"/api/front/bltbrd/imageUpload","mockup":"/bltbrd.mockup@uploadImage"}',

        /**
         * 게시판 글 등록
         */
        INSERT = '{"action":"/api/front/bltbrd/insert"}',
        // INSERT = '{"action":"/api/front/bltbrd/insert", "mockup":"/bltbrd.mockup@insert"}',

        /**
         * 게시판 글 수정
         */
        UPDATE = '{"action":"/api/front/bltbrd/update"}',
        // UPDATE = '{"action":"/api/front/bltbrd/update", "mockup":"/bltbrd.mockup@update"}',

        /**
         * 게시판 글 삭제
         */
        DELETE = '{"action":"/api/front/bltbrd/deleteByUpdate"}',
        // DELETE = '{"action":"/api/front/bltbrd/deleteByUpdate", "mockup":"/bltbrd.mockup@delete"}',

        /**
         * 단지장터 판매 완료로 변경
         */
        SALE_DONE = '{"action":"/api/front/bltbrd/updateSaleDone"}',
        // SALE_DONE = '{"action":"/api/front/bltbrd/updateSaleDone", "mockup":"/bltbrd.mockup@saleDone"}',
    }

    /**
     * 배너 서비스
     */
    export enum ACTIONS_BANNER {
        /**
         * 최근 배너 1개 조회
         */
        LATEST = '{"action":"/api/front/bnerInf/latestBanner"}',
        // LATEST = '{"action":"/api/front/bnerInf/latestBanner", "mockup":"/bltbrd.mockup@latestBanner"}',


    }
}
