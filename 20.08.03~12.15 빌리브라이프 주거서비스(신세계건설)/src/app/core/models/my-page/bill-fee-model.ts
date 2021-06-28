/**
 * 관리비 청구이력
 */
import {BillDtlModel} from "./bill-dtl-model";

export class BillFeeModel {
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
     *  관리비 차감
     */
    public subtctFee: string;

    /**
     *  납기내금액
     */
    public feeInDuedate: string;

    /**
     *  납기 후 금액
     */
    public feeOvDuedate: string;

    /**
     *  미납금액
     */
    public unpaidFee: string;

    /**
     *  당월부과금액
     */
    public fee: string;

    /**
     *  미납 연체료
     */
    public unpaidCharge: string;

    /**
     *  징수대행
     */
    public agentFee: string;

    /**
     *  전기료할인
     */
    public elecDiscnt: string;

    /**
     *  납기 후 연체료
     */
    public postCharge: string;

    /**
     *  관리비 상세 목록
     */
    public billDtlList: Array<BillDtlModel>;

    /**
     *  납기일자
     */
    public dueDate: string;

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

    /**
     *  당월 동일면적 최저관리비
     */
    public minFee: string;

    /**
     *  당월 동일면적 최고관리비
     */
    public maxFee: string;

    /**
     *  당월 동일면적 평균관리비
     */
    public avgFee: string;

    /**
     *  전월 내 관리비
     */
    public beforeFee: string;

    /**
     *  최근일년치 내 관리비
     */
    public myFeeList: Array<number>;

    /**
     *  일년치 평균 관리비
     */
    public avgFeeList: Array<number>;

    /**
     *  일년치 관리비 해당 월
     */
    public monthList: Array<string>;
}
