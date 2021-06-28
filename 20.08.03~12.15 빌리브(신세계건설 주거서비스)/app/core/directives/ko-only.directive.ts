import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';


/**
 * input 태그에 사용 할 경우 한글만 입력가능
 * */
@Directive({
    selector: 'input[koOnly]'
})
export class KoOnlyDirective {

    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initValue.replace(/[^ㄱ-ㅎ가-힣]*/g, '');
        if ( initValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }

}
