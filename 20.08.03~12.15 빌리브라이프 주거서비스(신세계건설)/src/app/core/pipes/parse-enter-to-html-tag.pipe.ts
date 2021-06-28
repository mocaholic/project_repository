import { Pipe, PipeTransform } from '@angular/core';

/**
 * 엔터(\n)을 <br> 태그로 변환
 * */
@Pipe({
    name: 'parseEnterToHtmlTag'
})
export class ParseEnterToHtmlTagPipe implements PipeTransform {
    transform(str: string) {
        if (str == null) {
            return "";
        }
        return str.replace(/\n/gi,"<br>");
    }
}
