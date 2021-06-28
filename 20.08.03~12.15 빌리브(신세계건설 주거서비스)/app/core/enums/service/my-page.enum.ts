/**
 * 마이페이지 모듈의 Enum
 */
export namespace MyPageEnum {

    /**
     * 회원 정보 관련
     */
    export enum ACTIONS_MY {
        /**
         * 관리비조회
         */
        BILL = '{"action":"/api/front/my-page/", "mockup":"/my-page.mockup@bill"}',

        /**
         * 관리비 조회 가능 년 목록
         */
        BILL_YEAR_LIST = '{"action":"/api/front/my-page/", "mockup":"/my-page.mockup@billYearList"}',

        /**
         * 관리비 조회 가능 월 목록
         */
        BILL_MONTH_LIST = '{"action":"/api/front/my-page/", "mockup":"/my-page.mockup@billMonthList"}',


        /**
         * 알림 목록
         */
        PUSH_LIST = '{"action":"/api/front/my-page/", "mockup":"/my-page.mockup@pushList"}',
    }

    /**
     * 마이메뉴 관련
     */
    export enum ACTIONS_MENU {

        /**
         * 마이메뉴 목록
         */
        LIST = '{"action":"/api/front/custMyMnu/list"}',
        // LIST = '{"action":/api/front/custMyMnu/list", "mockup":"/my-page.mockup@custMyMnuList"}',
        /**
         * 마이메뉴 저장
         */
        UPDATE = '{"action":"/api/front/custMyMnu/update"}',
        // UPDATE = '{"action":"/api/front/custMyMnu/update", "mockup":"/my-page.mockup@custMyMnuUpdate"}',
        /**
         * 마이메뉴 추가
         */
        INSERT = '{"action":"/api/front/custMyMnu/insert"}',
        // INSERT = '{"action":"/api/front/custMyMnu/insert", "mockup":"/my-page.mockup@custMyMnuInsert"}'

        /**
         * 마이메뉴 삭제
         */
        DELETE = '{"action":"/api/front/custMyMnu/delete"}',
        // INSERT = '{"action":"/api/front/custMyMnu/insert", "mockup":"/my-page.mockup@custMyMnuInsert"}'

        /**
         * 마이메뉴 존재여부
         */
        IS_EXIST = '{"action":"/api/front/custMyMnu/isExist"}'
    }

    /**
     * 제휴서비스 관련
     */
    export enum ACTIONS_PTNR {

        /**
         * 제휴서비스 신청내역 목록
         */
        LIST = '{"action":"/api/front/bsPtnrResv/list"}',
        /**
         * 제휴서비스 신청내역 상세
         */
        DETAIL = '{"action":"/api/front/bsPtnrResv/detail"}',
    }

    /**
     * 서비스 관련
     */
    export enum ACTIONS_SVC {

        /**
         * 서비스 신청내역 목록
         */
        LIST = '{"action":"/api/front/resv/resvHisList"}',
        // LIST = '{"action":"/api/front/resv/resvHisList", "mockup":"/my-page.mockup@myServiceList"}',

        /**
         * 서비스 신청내역 상세
         */
        DETAIL = '{"action":"/api/front/resv/resvHisDetail"}',
        // DETAIL = '{"action":"/api/front/resv/resvHisDetail", "mockup":"/my-page.mockup@myServiceDetail"}',
    }


    /**
     * 우리집 서비스 관련
     */
    export enum ACTIONS_MY_HOME {

        /**
         * 우리집 현황 해당 일자 클릭시
         * 일자별/기간별 내역 가져오기
         */
        HISTORY_BY_DAY = '{"action":"/api/front/"}',
        /**
         * 제휴서비스 신청내역 상세
         */
        DAY_LIST = '{"action":"/api/front/bsPtnrResv/detail"}',
    }

}
