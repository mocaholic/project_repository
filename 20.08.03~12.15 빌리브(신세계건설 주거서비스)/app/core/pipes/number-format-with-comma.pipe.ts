import {Pipe, PipeTransform} from '@angular/core';
import {VUtils} from "../utils/v-utils";

/**
 * 숫자를 ,를 포함한 형식 으로 변환
 *
 * */
@Pipe({
    name: 'numberFormatWithComma',
})
export class NumberFormatWithCommaPipe implements PipeTransform {

    transform(value: string | number, option?: object) {
        if (VUtils.isEmpty(value)) {
            return "0";
        }

        return Number(value).toLocaleString();
    }
}
