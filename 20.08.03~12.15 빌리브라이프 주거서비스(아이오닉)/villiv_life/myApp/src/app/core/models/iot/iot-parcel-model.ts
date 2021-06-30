/**
 * iot 택배 모델
 */
export class IotParcelModel {

    /**
     *  택배 도착ID
     */
    public parcelGetId: string;

    /**
     *  택배상태변경일시
     */
    public parcelStatusChangeDt: string;

    /**
     *  택배 상태
     */
    public parcelStatus: string;

    /**
     *  택배회사 or null
     */
    public parcelCompany: string;

    /**
     *  택배함번호 or null
     */
    public parcelBoxNo: string;

    /**
     *  택배함상세번호 or null
     */
    public parcelBoxDtlNo: string;

    /**
     *  확인 여부
     */
    public confirmYn: string;

}
