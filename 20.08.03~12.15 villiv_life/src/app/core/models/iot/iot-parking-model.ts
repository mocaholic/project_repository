/**
 * iot 주차 관제 모델
 */
export class IotParkingModel {
    /**
     *  자동차번호
     */
    public carNo: string;

    /**
     *  입출차타입
     *  AMA001(입차), AMA002(출차)
     *  AMA003(방문차량 입차), AMA004(방문차량 출차)
     */
    public inoutType: string;

    /**
     *  자동차별칭
     */
    public carAlias: string;

    /**
     *  입출차 발생 시간
     */
    public inoutCreDt: string;

}
