import {Pipe, PipeTransform} from '@angular/core';

/**
 * string으로 된 날짜를 형식에 맞게 년월일사이에 구분자 삽입
 * 구분자 기본값 (.)
 * ex) {{'20200907' | stringDateFormatDt:{separator:'-'}}}
 *     -> '2020-09-07'
 * ex) {{'20200907' | stringDateFormatDt:{isKo:true} }}
 *     -> '2020년 09월 07일'
 * */
@Pipe({
    name: 'stringDateFormatDt',
})
export class StringDateFormatDtPipe implements PipeTransform {

    transform(value: string, option?: object) {
        if (value == null)
            return "";

        let separator = '.';
        let isKo = false;

        if (option != null && option['separator'] && option['separator'].length > 0) {
            separator = option['separator'];
        }
        if (option != null && option['isKo'] && option['isKo']) {
            isKo = option['isKo'];
        }
        let year: string = value.substring(0, 4);
        let month: string = value.substring(4, 6);
        let day: string = value.substring(6, 8);
        if (isKo) {
            if(day) {
                return year + "년 " + month + "월 " + day + "일";
            } else {
                return year + "년 " + month + "월";
            }
        } else {
            if(day) {
                return year + separator + month + separator + day;
            } else {
                return year + separator + month;
            }
        }
    }
}
