import {Pipe, PipeTransform} from '@angular/core';

/**
 * string으로 된 날짜를 형식에 맞게 년월일사이에 구분자 삽입
 * 구분자 기본값 (.)
 * ex) {{'20200907120000' | stringDateFormatDt }}
 *     -> '2020-09-07 12:00'
 *
 * */
@Pipe({
    name: 'stringDateFormatDtm',
})
export class StringDateFormatDtmPipe implements PipeTransform {

    transform(value: string, option?: object) {
        if (value == null) {
            return "";
        }

        let separator = '-';
        let isOnlyTime = false;
        if (option != null && option['separator'] && option['separator'].length > 0) {
            separator = option['separator'];
        }
        if (option != null && option['isOnlyTime'] && option['isOnlyTime']) {
            isOnlyTime = option['isOnlyTime'];
        }
        let year: string = value.substring(0, 4);
        let month: string = value.substring(4, 6);
        let day: string = value.substring(6, 8);
        let hour: string = value.substring(8, 10);
        let minute: string = value.substring(10, 12);

        if (isOnlyTime) {
            return hour + ":" + minute;
        } else {
            return year + separator + month + separator + day + " " + hour + ":" + minute;
        }
    }
}
