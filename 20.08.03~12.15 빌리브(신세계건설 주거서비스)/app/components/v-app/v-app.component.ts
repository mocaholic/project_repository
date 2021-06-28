import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'v-app',
  templateUrl: './v-app.component.html',
  styleUrls: ['./v-app.component.scss'],
})
export class VAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      
      
    // if($('nav').hasClass('on')){
    //     $('ion-footer').removeClass('on');
    // } else {
    //     $('ion-footer').addClass('on');
    // }
    //
    // $('.btn_nav_close').click(function(){
    //     $(this).parent().removeClass('on');
    //     $('ion-footer').addClass('on');
    // });
    //
    // $('.fixed_menu .menu').click(function(){
    //     $('nav').addClass('on');
    //     $('ion-footer').removeClass('on');
    // });
    //
    // $('nav li h2').click(function(){
    //     var dep2 = $(this).siblings('ul');
    //
    //     if($(dep2).is(':visible')){
    //         $('nav li ul').hide();
    //         $(dep2).hide();
    //     } else {
    //         $('nav li ul').hide();
    //         $(dep2).show();
    //     }
    //
    //     //$('nav li ul').hide();
    // });

  }


}
