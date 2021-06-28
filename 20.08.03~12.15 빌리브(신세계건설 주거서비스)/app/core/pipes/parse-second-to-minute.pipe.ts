import { Pipe, PipeTransform } from '@angular/core';

/**
 *  초로된 데이터를 00:00 형식으로 변경
 * */
@Pipe({
  name: 'parseSecondToMinute',
})
export class ParseSecondToMinutePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes.toString().padStart(2, '0') + ':' +
        (value - minutes * 60).toString().padStart(2, '0');
  }
}
