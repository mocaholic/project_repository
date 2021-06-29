/**
 * 시설기준정보 모델
 */
export class FclModel {

    /**
     * 단지코드
     */
    bzCd: string;

    /**
     * 단지명
     */
    bzNm: string;

    /**
     * 시설 아이디
     */
    fclId: number;

    /**
     * 시설 명
     */
    fclNm: string;

    /**
     * 운영시작 시간
     * 6자리(시분초)
     */
    opStrTm: string;

    /**
     * 운영종료 시간
     * 6자리(시분초)
     */
    opEndTm: string;

    /**
     * 수용인원
     */
    descPcnt: string;

    /**
     * 위치
     */
    descLoc: string;

    /**
     * 운영시간(고정)
     */
    descOpTm: string;

    /**
     * 휴무일(고정)
     */
    descDyof: string;

    /**
     * 신청기간
     */
    descApplTerms: string;

    /**
     * 시설물
     */
    descFacility: string;

    /**
     * 유의사항
     */
    ntcMatt: string;

    /**
     * 취소/환불정책
     */
    descRefunp: string;

    /**
     * 운영상태 여부
     * 0: 예약가능, 1: 예약불가
     */
    opYn: string;

    /**
     * 예약불가 사유
     */
    rejectRsn: string;

    /**
     * 휴무일 리스트
     */
    fclDayoffList: Array<FclDayoffModel>;

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
}

/**
 * 휴무일 모델
 */
export class FclDayoffModel {

    /**
     * 단지코드
     */
    bzCd: string;

    /**
     * 서비스 아이디
     */
    svcId: string;

    /**
     * 시설 아이디
     */
    fclId: number;

    /**
     * 휴무일
     */
    dyofDtm: string;

    /**
     * 비고
     */
    rmks: string;

}
