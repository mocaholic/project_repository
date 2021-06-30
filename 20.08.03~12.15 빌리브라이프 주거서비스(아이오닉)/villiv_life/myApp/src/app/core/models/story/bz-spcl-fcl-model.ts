import {BzSpclFclImageModel} from "./bz-spcl-fcl-image-model";

export class BzSpclFclModel {
    constructor() {
    }

    /**
     * 단지 코드
     */
    public bzCd: string;

    /**
     * 특화시설 ID
     */
    public sfclId: string;

    /**
     * 시설 제목
     */
    public fclTtl: string;

    /**
     * 상세 설명
     */
    public dtlDesc: string;

    /**
     * 특화시설 이미지 목록
     */
    public spclFclImgList: Array<BzSpclFclImageModel>;


}
