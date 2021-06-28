import {Pipe, PipeTransform} from '@angular/core';

/**
 * 숫자를 소수점 n자리 퍼센트 형식으로 변환
 * ex) {{ 12/32 | numberFormatPercent:{fractionDigits:2}}}
 * */
@Pipe({
    name: 'numberFormatPercent',
})
export class NumberFormatPercentPipe implements PipeTransform {

    transform(value: string | number, option?: object) {
        if (value == null) {
            return "";
        }

        let fractionDigits = 1;

        if( option != null && option['fractionDigits']>0) {
            fractionDigits = option['fractionDigits'];
        }
        return (Number(value)* 100).toFixed(fractionDigits);
    }
}
