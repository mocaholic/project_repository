/**
 * 설문/투표 모듈의 Enum
 */
export namespace QstnEnum {

    /**
     * 설문/투표 관리 서비스
     */
    export enum ACTIONS_QSTN {
        /**
         * 설문/투표 진행중 목록 조회
         */
        ING_LIST = '{"action":"/api/front/qstn/progressList"}',
        // ING_LIST = '{"action":"/api/qstn/list", "mockup":"/qstn.mockup@qstnList"}',

        /**
         * 설문/투표 종료 목록 조회
         */
        END_LIST = '{"action":"/api/front/qstn/endList"}',
        // END_LIST = '{"action":"/api/qstn/list", "mockup":"/qstn.mockup@qstnList"}',

        /**
         * 설문/투표 목록 상세
         */
        DETAIL = '{"action":"/api/front/qstn/detail"}',
        // DETAIL = '{"action":"/api/qstn/detail", "mockup":"/qstn.mockup@qstnDetail"}',

        /**
         * 설문/투표 제출하기
         */
        INSERT = '{"action":"/api/front/qstn/ans/insert"}',
        // INSERT = '{"action":"/api/qstn/ans/insert", "mockup":"/qstn.mockup@qstnAnsInsert"}',

        /**
         * 투표 결과 조회
         */
        VOTE_RESULT = '{"action":"/api/front/qstn/detail"}',
        // VOTE_RESULT = '{"action":"/api/qstn/", "mockup":"/qstn.mockup@qstnDetail"}',

        /**
         * 설문 참여 여부 조회
         */
        CHECK_VOTE_YN = '{"action":"/api/front/qstn/checkVoteYn"}',
    }

}
