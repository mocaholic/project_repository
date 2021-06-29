import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
/**
 * string으로된 날짜를 받아서 새글인지 확인
 * period는 몇일 이내의 글을 새글로 취급할지 옵션 (기본 1일(24시간)이내
 * ex) {{ data.iptDtm | checkDateIsNew:{period:n} }}
 * {{ data.iptDtm | checkDateIsNew }}
 * */
@Pipe({
    name: 'checkDateIsNew',
})
export class CheckDateIsNewPipe implements PipeTransform {

    transform(iptDtmStr: string, option?: object) {
        if (iptDtmStr == null || iptDtmStr.length === 0) {
            return "";
        }

        //n일 이내의 글만 새글로
        let period = 1;
        if (option != null && option['period'] > 0) {
            period = option['period'];
        }
        const now = moment();
        const iptDtm= moment(iptDtmStr,'YYYYMMDDhhmmss');

        return (period-1)>=now.diff(iptDtm, 'days');
    }
}
