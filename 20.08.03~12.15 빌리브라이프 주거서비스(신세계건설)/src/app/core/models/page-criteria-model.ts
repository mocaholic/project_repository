/**
 * 페이징
 */
export class PageCriteriaModel {

    /**
     * paging 사용여부
     */
    public usePaging: number;

    /**
     * 총 목록 수
     */
    public totalCount: number;

    /**
     * 총 페이지 수
     */
    public totalEndPage: number;

    /**
     * 현재 페이지
     */
    public page: number = 1;

    /**
     * 페이지별 데이터 수
     */
    public perPageNum: number;

    /**
     * 생성자
     */
    public constructor(usePaging: number = 1, perPageNum: number = 10) {
        this.usePaging = usePaging;
        this.perPageNum = perPageNum;
    }

}
