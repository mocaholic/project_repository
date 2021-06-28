import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

/**
 * 날짜의 해당 요일
 * 한/영
 */
@Pipe({
  name: 'getDayOfTheWeek',
})
export class GetDayOfTheWeekPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(dateStr: string, option?: object) {
    if (!dateStr) {
      return '';
    }
    let isKo = false;
    if (option != null && option['isKo'] && option['isKo']) {
      isKo = option['isKo'];
    }
    const dayList = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];
    const dayKoList = [
      '일', '월', '화', '수', '목', '금', '토'
    ];
    if(isKo) {
      return dayKoList[moment(dateStr,'YYYYMMDD').days()];
    } else {
      return dayList[moment(dateStr,'YYYYMMDD').days()];
    }
  }
}
