/**
 * 파일
 */
export class FileModel {
    /**
     *  파일 ID
     */
    public atchFileId: string;

    /**
     *  파일명
     */
    public orgFileNm: string;

    /**
     *  파일명
     */
    public atchFileIdOrg: string;

    /**
     *  파일경로
     */
    public filePath: string;

    /**
     *  파일사이즈
     */
    public fileSize: number;

    /**
     *  확장자
     */
    public ext: string;

    /**
     * basc64 enc
     */
    public enc: string;

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
