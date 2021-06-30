/**
 * 회원 마스터
 */
export class CustMstModel {
    /**
     *  회원 아이디
     */
    public custId: string;

    /**
     *  단지코드
     */
    public bzCd: string;

    /**
     *  단지명
     */
    public bzNm: string;

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
     *  회원상태
     *  A=미가입, B=가입, C=정지, D=탈퇴, E=퇴거
     */
    public custSts: string;

    /**
     *  세대 대표 여부
     */
    public hoReprYn: string;

    /**
     *  생년월일
     */
    public brth: string;

    /**
     *  핸드폰번호
     */
    public mpPhoneNo: string;

    /**
     *  인증번호
     */
    public authNumber: string;

    /**
     *  푸쉬알림 동의 여부
     */
    public pushYn: string;

    /**
     *  이름
     */
    public custNm: string;

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
     * 가입이 완료인 회원만 true를 반환한다.
     */
    isFinishLogin(): boolean {
        return this.custSts == "B";
    }
}
