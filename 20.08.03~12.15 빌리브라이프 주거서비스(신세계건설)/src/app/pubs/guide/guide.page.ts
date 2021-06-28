import {Component, OnInit, ViewChild} from '@angular/core';
//import * as $ from 'jquery';
declare var $: any;
import { CalendarComponentOptions } from 'ion2-calendar'
import {IonSlides} from "@ionic/angular";
import {ModalPopupPage} from "../../core/modals/modal-popup.page";
import {VPageUtils} from "../../core/utils/v-page-utils.service";

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {

  constructor(public pageUtils: VPageUtils) { }

  ngOnInit() {
    
    // console.log($);
  }

  @ViewChild('slider')  slides: IonSlides;


  swipeNext(){
    this.slides.slideNext();
  }
  swipePrev(){
    // this.slides.slideTo(2);
    this.slides.slidePrev();
  }
  ionViewDidEnter() {

    $('select').selectric({disableOnMobile : false, nativeOnMobile : false}); /* select plugin */
    //console.log($);

  }
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  options: CalendarComponentOptions = {
    from:1,
    monthFormat: 'YYYY년 MM월 ',
    monthPickerFormat: ['1월','2월','3월','4월' ,'5월','6월','7월','8월','9월','10월','11월','12월'],
      weekdays: ['일','월','화','수','목','금','토']
  };
  dateRange: { from: string; to: string; };
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    from:1,
    monthFormat: 'YYYY년 MM월 ',
    monthPickerFormat: ['1월','2월','3월','4월' ,'5월','6월','7월','8월','9월','10월','11월','12월'],
    weekdays: ['일','월','화','수','목','금','토']
  };
  onChange($event) {
    console.log($event);
  }

  async showModal() {
    return await this.pageUtils.openModal(ModalPopupPage,{
      'name': 'Hello User'
    });
  }
}
