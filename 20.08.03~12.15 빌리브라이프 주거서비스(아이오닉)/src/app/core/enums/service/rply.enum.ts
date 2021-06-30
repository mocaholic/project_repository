/**
 * 댓글 모듈의 Enum
 */
export namespace Rply {

    /**
     * 댓글 관리 서비스
     */
    export enum ACTIONS_RPLY {
        /**
         * 댓글 목록 조회
         */
        LIST = '{"action":"/api/front/bltbrd/reply/list"}',
        // LIST = '{"action":"/api/front/bltbrd/reply/list", "mockup":"/rply.mockup@commentsList"}',
        /**
         * 댓글 등록
         */
        INSERT = '{"action":"/api/front/bltbrd/reply/insert"}',
        // INSERT = '{"action":"/api/front/bltbrd/reply/insert", "mockup":"/rply.mockup@insertComments"}',
        /**
         * 댓글 삭제
         */
        DELETE = '{"action":"/api/front/bltbrd/reply/deleteByUpdate"}',
        // DELETE = '{"action":"/api/front/bltbrd/reply/deleteByUpdate", "mockup":"/rply.mockup@deleteComments"}',

    }

}
