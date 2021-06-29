/**
 * push,sms 발송
 */
export class CustMsgModel {
    /**
     *  메세지 ID
     */
    public msgId: string;

    /**
     *  게시판 노출순서
     */
    public no: string;

    /**
     *  플랫폼( all , android, ios)
     */
    public platform: string;

    /**
     *  안내분류 ( 공지,시스템,일반)
     */
    public anncCls: string;

    /**
     *  제목
     */
    public title: string;

    /**
     *  메시지내용
     */
    public msgCts: string;

    /**
     * 링크 url
     */
    public link: string;

    /**
     * 발송구분(sms,push)
     */
    public sendDiv: string;

    /**
     * 발송상태(대기,완료,발송,발송중,취소)
     */
    public sendStats: string;

    /**
     * 발송옵션(즉시,예약)
     */
    public sendOptn: string;

    /**
     * 발송예약시간
     */
    public rsrvtTime: string;

    /**
     * 발송형태
     */
    public sendTp: string;

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

    public atchFileIdObj: object;
}
