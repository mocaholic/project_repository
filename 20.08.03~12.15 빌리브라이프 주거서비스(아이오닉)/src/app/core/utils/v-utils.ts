import {LoadingController} from "@ionic/angular";

declare var XLSX;
import lodash from 'lodash';
import {AnimationItem} from "lottie-web";
import {Router} from "@angular/router";

declare var $: any;

/**
 * 유틸성 메서드 클래스
 */
export class VUtils {

    constructor() {
    }

    /**
     * Wrapper 메서드
     * @param obj
     */
    public isEmpty(obj): boolean {
        return VUtils.isEmpty(obj);
    }

    /**
     * 문자열 | Object 공백 체크
     * @param str
     */
    public static isEmpty(obj: any): boolean {

        if (typeof obj === 'object') {

            for (const key in obj) return false;

            return true;

        } else {
            if (obj === null || obj === '' || obj === undefined || obj === 'undefined') {
                return true;
            }
        }

        return false;
    }


    /**
     * 이메일 형식 체크
     * @param email
     */
    public static isValidEmail(email: string): boolean {
        if (this.isEmpty(email)) {
            return false;
        }
        const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(regExp) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 휴대전화 형식 체크
     * @param number
     */
    public static isValidPhoneNumber(number: string): boolean {
        console.log(number)
        if (this.isEmpty(number)) {
            return false;
        }
        const regExp = /^[0-9]{10,11}/;
        if (number.match(regExp) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * db row id 유효성 검사
     * 0보다 큰 숫자 일때만 true
     * @param number
     */
    public static isValidDbRowId(numStr: string): boolean {
        if (this.isEmpty(numStr)) {
            return false;
        }
        let id = parseInt(numStr);
        if (typeof (id) !== 'number' || isNaN(id)) {
            return false;
        }
        if (id <= 0) {
            return false;
        }
        return true;
    }


    /**
     * 랜덤 문자열 생성
     * @param len
     */
    public static randomString(len: number): string {

        let keystr = "", x;

        for (let i = 0; i < len; i++) {
            x = Math.floor((Math.random() * 36));
            if (x < 10) {
                keystr += String(x);
            } else {
                keystr += String.fromCharCode(x + 87);
            }
        }
        return keystr;
    }

    /**
     * delay 만큼 대기한다.
     * @param delay - milliseconds
     */
    public static sleep(delay) {
        const start = new Date().getTime();
        while (new Date().getTime() < start + delay) ;
    }

    /**
     * 소수점(fixed) 까지 반올림
     * @param fixed
     * @param num
     */
    public static roundNFixed(num, fixed): string {

        return (Math.round(num * 100) / 100).toFixed(fixed);
    }

    /**
     * Object를 쿼리 스트링 형태로 변환
     * @param obj
     */
    public static object2QueryString(obj: Object): string {

        return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

    }
    /**
     * Content-Disposition 안에 filename만 추출
     * @param disposition
     */
    public static getFilename(disposition: string): string {

        let filename = "";
        if (disposition && disposition.indexOf('attachment') !== -1) {
            let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            let matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
            }
        }
        return filename;
    }
    /**
     * arrayBuffer(data) 를 byteArray 형태로 변환
     * @param data
     */
    private static fixdata(data) {

        const w = 10240;

        let o = "";
        let l = 0;

        for (; l < data.byteLength / w; ++l) {
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));

        return o;
    }

    /**
     * 엑셀 workbook 형태로 생성
     * @param data
     */
    private static createWorkbook(data): any {

        const arr = this.fixdata(data);
        return XLSX.read(btoa(arr), {type: 'base64'});
    }


    /**
     * 엑셀을 json 형태로 변환
     * @param workbook
     */
    public static excel2Json(data: any) {

        const workbook = this.createWorkbook(data);

        const result = {};
        const sheetResultName = workbook.SheetNames[0];
        workbook.SheetNames.forEach(function (sheetName) {
            const roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], {header: "A"});

            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result[sheetResultName];
    }

    /**
     * 데이터 하나의 리스트로 변환
     * @param data
     */
    public static dataConcat(...data: any) {

        return lodash.concat(...data);
    }

    /**
     * 데이터 값 변환
     * @param data
     */
    public static dataConvert(data: any) {

        if (data.length <= 0) {
            return data;
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i]['bzType'] === '0') {
                    data[i]['bzType'] = '분양주택';
                } else if (data[i]['bzType'] === '1') {
                    data[i]['bzType'] = '임대주택';
                }

                if (data[i]['useYn'] === '0') {
                    data[i]['useYn'] = '미사용';
                } else if (data[i]['useYn'] === '1') {
                    data[i]['useYn'] = '사용';
                }

                if (data[i]['ourBzService'] === '0') {
                    data[i]['ourBzService'] = '미사용';
                } else if (data[i]['ourBzService'] === '1') {
                    data[i]['ourBzService'] = '사용';
                }

                if (data[i]['smartHome'] === '0') {
                    data[i]['smartHome'] = '미사용';
                } else if (data[i]['smartHome'] === '1') {
                    data[i]['smartHome'] = '사용';
                }
            }
            return data;
        }
    }

    /**
     * 배열 에서 최대값 찾기
     */
    public static getMaxObj(array: any, key: string) {

        return lodash.maxBy(array, key);
    }

    /**
     * 해당 값이 있는지 체크
     */
    public static isExist(array: any, obj: any) {

        let findObj = lodash.find(array, obj);
        if (findObj) {
            return true
        }
        return false;
    }

    /**
     * 해당 키값이 있으면 obj 반환
     */
    public static getObjByKey(array: any, obj: any) {

        return lodash.find(array, obj)

    }

    /**
     * 같은값인 것끼리 묶어서 array로 반환
     * */
    public static partition(array: any, obj: any) {
        return lodash.values(lodash.groupBy(array, obj));

    }

    /**
     * 해당 값이 최소인 객체 반환
     */
    public static getMinValueObj(array: any, obj: any) {

        return lodash.minBy(array, obj)

    }
    /**
     * 해당 값이 최대인 객체 반환
     */
    public static getMaxValueObj(array: any, obj: any) {

        return lodash.maxBy(array, obj)

    }

    /**
     * 스크립트 추가
     * @param url
     */
    public static loadExternalScript(url: string) {

        // $.getScript(url);

        return new Promise((resolve, reject) => {

            const rs = function () {
                resolve(true);
            };

            $.getScript(url).done(rs);
        });

    }

    /**
     * 현재일 YYYYMMDD 리턴
     */
    public static getDateYYYYMMDD(): string {
        let today = new Date();

        let year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString().length < 2 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
        let day = today.getDate().toString().length < 2 ? "0" + today.getDate() : today.getDate();

        return year + month + day;
    }

    /**
     * 허용하는 이미지 파일이라면 true
     * .gif .jpg .jpeg .png
     */
    public static checkImageFileType(fileName: string): boolean {
        let reg = /(\.jpg|\.png|\.gif|\.jpeg)$/i;

        return reg.test(fileName);
    }

    public static setMotionDuration(fn: Function, options?: any) {

        const delay = options ? options.delay : 300;
        setTimeout( () => {fn.call({})}, delay);

    }


    /**
     * 식별자 생성
     */
    public static getUUID(): string {

        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * 메인 애니메이션을 중지한다.
     * @param router
     */
    public static pauseMainAnimation(router: Router): void {
        console.log('>>>>>>>>>>>>>>>>> router.url ', router.url);
        if( router.url === '/' && VUtils.mainAnimation ) {
            console.log('>>>>>>>>>>>>>>>>> pause main animation');
            VUtils.mainAnimation.pause();
        }
    }

    /**
     * 메인 애니메이션을 시작한다.
     * @param router
     */
    public static playMainAnimation(router: Router): void {
        if( router.url === '/' && VUtils.mainAnimation ) {
            console.log('>>>>>>>>>>>>>>>>> play main animation');
            VUtils.mainAnimation.play();
        }
    }

    /**
     * 메인 페이지의 lottie 애니메이션 아이템 instance
     */
    public static mainAnimation: AnimationItem;

}
