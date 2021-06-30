/**
 * 로그인 및 인증 관련 모듈의 Enum
 */
export namespace AuthEnum {

    /**
     * 로그인 관련 서비스
     */
    export enum ACTIONS_LOGIN {

        /**
         * 인증번호 요청 ( 재요청 , sms요청 포함  / param으로 )
         */
        CERTI_NUM = '{"action":"/api/front/auth/requestCertiNumber"}',
        // CERTI_NUM = '{"action":"/api/front/auth/requestCertiNumber","mockup":"/auth.mockup@requestCertiNumber"}',
        /**
         * 인증번호 확인
         */
        CONFIRM_CERTI_NUM = '{"action":"/api/front/auth/confirmCertiNumber"}',
        // CONFIRM_CERTI_NUM = '{"action":"/api/front/auth/confirmCertiNumber","mockup":"/auth.mockup@confirmCertiNumber"}',
        /**
         * 최신약관 조회
         */
        LATEST_TERMS = '{"action":"/api/front/auth/latestTerms"}',
        // LATEST_TERMS = '{"action":"/api/front/auth/latestTerms","mockup":"/auth.mockup@latestTerms"}',
        /**
         * 약관 확인
         */
        AGREE_TERMS = '{"action":"/api/front/auth/agreeTerms"}',
        // AGREE_TERMS = '{"action":"/api/front/auth/agreeTerms","mockup":"/auth.mockup@agreeTerms"}',
        /**
         * 회원등록 최종확인
         */
        REGISTER_CUST = '{"action":"/api/front/auth/registerCust"}',
        // REGISTER_CUST = '{"action":"/api/front/auth/registerCust","mockup":"/auth.mockup@registerCust"}',
        /**
         * 앱버전
         */

        /**
         * 로그인
         */
        LOGIN = '{"action":"/api/front/auth/registerCust"}',
        // LOGIN = '{"action":"/api/front/auth/registerCust","mockup":"/auth.mockup@registerCust"}',

        /**
         * 로그아웃
         */
        LOGOUT = '{"action":"/api/front/"}',
        // LOGOUT = '{"action":"/api/front/", "mockup":"/auth.mockup@"}',

        /**
         * 로그인 체크
         */
        CHECK = '{"action":"/api/front/auth/loginCheck"}',
        // CHECK = '{"action":"/api/front/auth/loginCheck","mockup":"/auth.mockup@loginCheck"}',

        /**
         * 탈퇴
         */
        WITHDRAW = '{"action":"/api/front/auth/withdraw"}',
        // WITHDRAW = '{"action":"/api/front/auth/withdraw","mockup":"/auth.mockup@withdraw"}',
    }
}
