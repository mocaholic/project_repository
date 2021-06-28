import {Pipe, PipeTransform} from '@angular/core';

/**
 * 파일사이즈를 KB or MB로 변환
 *
 * 1MB(1024KB) 미만은 KB : %nnn.n%+KB
 * 1MB(1024KB) 이상은 MB : %nn.nn%+MB
 *
 * */
@Pipe({
    name: 'fileSizeFormat',
})
export class FileSizeFormatPipe implements PipeTransform {

    transform(value, option?: object) {

        if (typeof value !== 'number' || isNaN(value) || value<0) {
            return value
        }
        const oneMBToByte = 1024 * 1024;
        const oneKBToByte = 1024;

        const isGreaterOneMBToByte = value > oneMBToByte;

        let unit = isGreaterOneMBToByte ? 'MB' : 'KB';

        if(isGreaterOneMBToByte) {
            value = (value / oneMBToByte).toFixed(2)
        } else {
            value = (value / oneKBToByte).toFixed(1)
        }

        return value + ' ' + unit;
    }
}
