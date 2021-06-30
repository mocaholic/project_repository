/**
 * 서비스 필요 객체
 */
export class ServiceModel {

    /**
     * 요청 url
     */
    actionURL: string;

    /**
     * 요청 파라미터
     */
    params: Object;

    /**
     * 요청 방식 "GET" or "POST"
     */
    method: string;


    /**
     * 개발환경
     * 'mock' or 'live'
     */
    env: string;

    /**
     * Mockup 결과 파일 정의
     */
    mockupSpec: string;


    /**
     * 결과값
     */
    result: Object;

    /**
     * 검색관련,페이징
     */
    search: Object;

    /**
     * Http 응답 에러
     */
    httpError: Object;

    /**
     * 요청 식별자
     */
    uuid: string;


    /**
     * 결과값이 정상 처리되었을 경우 true를 반환한다.
     */
    isResultOK(): boolean {
        return this.result['resultCode'] != "FAIL";
    }
}
