/**
 * 관리비 상세
 */
export class BillDtlModel {
    /**
     *  단지코드
     */
    public bzCd: string;

    /**
     *  동
     */
    public blNo: string;

    /**
     *  호
     */
    public rmNo: string;

    /**
     *  실
     */
    public rmdNo: string;

    /**
     *  월분
     */
    public billMonth: string;

    /**
     *  관리비 상세명칭
     */
    public mchrDtlNm: string;

    /**
     *  관리비 상세코드
     */
    public mchrDtlCd: string;

    /**
     *  당월 부과금액
     */
    public lvyamt: string;

    /**
     *  전월 부과금액
     */
    public beforeLvyamt: string;

    /**
     * 입력자 id
     */
    public ipdId: string;

    /**
     * 입력일시
     */
    public iptDtm: string;

    /**
     * 입력자 ip
     */
    public iptIp: string;

    /**
     * 입력자 이름
     */
    public iptName: string;

    /**
     * 수정자 id
     */
    public updId: string;

    /**
     * 수정일시
     */
    public updDtm: string;

    /**
     * 수정자 ip
     */
    public updIp: string;
}
