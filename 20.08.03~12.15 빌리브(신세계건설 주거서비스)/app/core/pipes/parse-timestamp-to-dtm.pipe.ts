import {Pipe, PipeTransform} from '@angular/core';
import {VUtils} from "../utils/v-utils";
import * as moment from "moment";

/**
 * string으로 된 타임스탬프를 YYYYMMDDhhmmss 포맷으로 변경
 * */
@Pipe({
    name: 'parseTimestampToDtmPipe',
})
export class ParseTimestampToDtmPipe implements PipeTransform {

    transform(timestamp: string, option?: object) {

        if (VUtils.isEmpty(timestamp)) {
            return "";
        }

        const date = moment(timestamp);
        if(date.isValid()) {
            return date.format('YYYYMMDDhhmmss') ;
        } else {
            return '';
        }
    }
}
