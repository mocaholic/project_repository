import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
/**
 * 시작~종료 기간이 있는 글인 경우
 * string으로된 날짜를 받아서 종료된 글인지 확인
 * */
@Pipe({
    name: 'checkDateIsEnd',
})
export class CheckDateIsEndPipe implements PipeTransform {

    transform(endDtmStr: string) {
        if (endDtmStr == null || endDtmStr.length === 0) {
            return "";
        }

        const now = moment();
        const endDtm= moment(endDtmStr,'YYYYMMDDhhmmss');

        return now.diff(endDtm, 'days')>0;
    }
}
