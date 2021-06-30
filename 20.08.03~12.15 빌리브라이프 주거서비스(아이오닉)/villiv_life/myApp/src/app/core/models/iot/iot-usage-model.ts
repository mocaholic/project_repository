/**
 * iot 에너지 사용량 모델
 */
export class IotUsageModel {
    /**
     *  일/월/년
     *  DAY/MONTH/YEAR
     */
    public period: string;

    /**
     *  사용량
     */
    public usage: string;

    /**
     *  동일 평형 사용량
     */
    public sameAreaTypeUsage: string;

    /**
     *  검침 종류
     *  ( ELEC, GAS, WATER, HOTWATER, HEATING)
     */
    public energyType: string;

}
