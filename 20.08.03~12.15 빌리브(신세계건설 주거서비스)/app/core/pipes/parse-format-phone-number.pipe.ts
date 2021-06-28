import {Pipe, PipeTransform} from '@angular/core';
import {VUtils} from "../utils/v-utils";

/**
 * string으로 된 11~12자 숫자를 포맷에 맞게 변경
 * ex) {{'01012341234' | parseFormatPhoneNumber }}
 *     -> '010-1234-1234'
 * */
@Pipe({
    name: 'parseFormatPhoneNumber',
})
export class ParseFormatPhoneNumberPipe implements PipeTransform {

    transform(num: string, option?: object) {

        if (VUtils.isEmpty(num)) {
            return '';
        }

        let withMasking = false;
        let formatNum = '';

        if (option != null && option['withMasking']) {
            withMasking = option['withMasking'];
        }

        if (num.length === 11) {
            if (withMasking) {
                formatNum = num.replace(/(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2**-**$5');
            } else {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        } else if (num.length == 8) {
            formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
        } else {
            if (num.indexOf('02') == 0) {
                if (withMasking) {
                    formatNum = num.replace(/(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2**-**$5');
                } else {
                    formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                }
            } else {
                if (withMasking) {
                    formatNum = num.replace(/(\d{3})(\d{1})(\d{2})(\d{2})(\d{2})/, '$1-$2**-**$5');
                } else {
                    formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                }
            }
        }
        return formatNum;
    }
}
