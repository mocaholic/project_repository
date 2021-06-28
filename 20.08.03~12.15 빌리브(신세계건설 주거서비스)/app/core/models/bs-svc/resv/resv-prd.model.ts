/**
 * 예약상품 마스터
 */
import {FclModel} from "./fcl.model";
import {ResvOptnModel} from "./resv-optn.model";
import {ResvCncInfoModel} from "./resv-cnc-info.model";

export class ResvPrdModel {

    /**
     * 단지코드
     */
    bzCd: string;

    /**
     * 단지명
     */
    bzNm: string;

    /**
     * 상품 아이디
     */
    prdId: string;

    /**
     * 상품 그룹 아이디
     */
    prdGrpId: number;

    /**
     * 시설 아이디
     */
    fclId: number;

    /**
     * 환불정책 아이디
     */
    cncId: number;

    /**
     * 예약 유형
     */
    resvCd: string;

    /**
     * 예약 상품명
     */
    prdNm: string;

    /**
     * 상품 가격
     */
    prdPrc: number;

    /**
     * 상품가격 할인율
     */
    prdPrcDcrt: string;

    /**
     * 상품가격 설명
     */
    prdPrcDesc: string;

    /**
     * 월별 정원
     */
    mlyRscnt: number;

    /**
     * 익월예약가능 일자
     */
    nxtMmDt: string;

    /**
     * 익월예약가능 시간
     */
    nxtMmTm: string;

    /**
     * 예약가능 범위
     */
    mmRng: number;

    /**
     * 예약일 제한
     */
    strLmtDt: number;

    /**
     * 예약전후 불가시간
     */
    rstctTm: number;

    /**
     * 숙박일 제한
     */
    bkingLmtCnt: number;

    /**
     * 체크인 시간
     */
    chkInTm: string;

    /**
     * 체크아웃 시간
     */
    chkOutTm: string;

    /**
     * 최소예약시간
     */
    minResvTm: number;

    /**
     * 등록아이디
     */
    iptId: string;

    /**
     * 등록일시
     */
    iptDtm: string;

    /**
     * 등록아이피
     */
    iptIp: string;

    /**
     * 수정아이디
     */
    uptId: string;

    /**
     * 수정일시
     */
    uptDtm: string;

    /**
     * 수정아이피
     */
    uptIp: string;

    // /**
    //  * 시설 기준정보
    //  */
    // fcl: FclModel;

    /**
     * 예약상품옵션 목록
     */
    resvOptnList: Array<ResvOptnModel>;

    /**
     * 예약 환불 정책 정보
     */
    cncInf: ResvCncInfoModel;

    /**
     * 시설기준정보 유의사항
     */
    ntcMatt: string;

    /**
     * 월정보 목록
     * */
    monthList: Array<ResvMonthModel>;

    /**
     * 옵션목록
     */
    optionList: Array<ResvOptn>;

    /**
     * 시설 상세
     */
    fclObj: FclModel;

    /**
     * 시간 상품 상세
     */
    timeResv: ResvPrdModel;

    /**
     * 일일 상품 상세
     */
    everyResv: ResvPrdModel;
}
export class ResvOptn {

    /**
     * 옵션아이디
     */
    optnId: string;

    /**
     * 옵션명
     */
    optnNm: string;

    /**
     * 옵션 가격
     */
    optnPrc: number;
}

export class ResvMonthModel {
    /**
     * Datetime instance
     */
    calendar: Date;

    /**
     * 해당 년
     */
    year: number;

    /**
     * 해당 월
     */
    month: number;

    /**
     * 예약 가능여부
     */
    reservableCode: number;

    /**
     * 예약 가능여부
     */
    desc: string;

    /**
     * 이용 요금
     */
    price: number;

    /**
     * 달 첫일
     */
    startDay: number;

    /**
     * 달 마지막 일
     */
    endDay: number;

    /**
     * 예약가능 시작일
     */
    resvStartDay: number;

    /**
     * 예약가능 종료일
     */
    resvEndDay: number;

    /**
     * 현재 일자에 예약된 인원 수
     */
    reservedCnt: number;

    /**
     * 예약일자
     */
    days: Array<ResvDayModel>;

}

export class ResvDayModel {

    /**
     * 예약일자
     */
    day: number;

    /**
     * 해당 월
     */
    month: number;

    /**
     * 이용 요금
     */
    price: number;

    /**
     * 예약 가능 시작일
     */
    resvStartTime: number;

    /**
     * 예약 가능 종료일
     */
    resvEndTime: number;

    /**
     * 예약가능 시간
     */
    resvTimes: Array<ResvTime>;

    /**
     * 현재 일자에 예약된 인원 수
     */
    reservedCnt: number;

    /**
     * 예약 가능상태
     */
    reservableCode: number;

}

export class ResvTime {
    /**
     * 이용 요금
     */
    price: number;
    /**
     * 예약 가능상태
     */
    reservableCode: number;
    /**
     * 현재 시간에 예약된 인원 수
     */
    reservedCnt: number;
    /**
     * 예약 시간
     */
    time: number;
}
