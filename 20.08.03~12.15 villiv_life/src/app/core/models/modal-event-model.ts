/**
 * 모달이벤트 모델
 */
export class ModalEventModel {

    /**
     *  on/off
     */
    public show: boolean;

    /**
     *  제목
     */
    public title: string;

    /**
     *  내용
     */
    public content: string;

    /**
     *  닫기 버튼 이름
     */
    public cancelBtnNm: string;

    /**
     *  확인 버튼 이름
     */
    public confirmBtnNm: string = '확인';

    /**
     *  콜백
     */
    public callback: Function;

    /**
     *  취소콜백
     */
    public cancelCallback: Function;

    /**
     *  취소여부
     */
    public isCancel: boolean = false;

    /**
     *  필수여부
     */
    public isRequired: boolean = false;
}
