import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-iot-control',
  templateUrl: './iot-control.page.html',
  styleUrls: ['../../../pages/iot/iot-control/iot-control.page.scss'],
})
export class IotControlPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {

      /* tab */
      var tabMenu = $('.tab_menu > li > a');
      var tabCont = $('.tab_cont');

      tabCont.hide();

      tabMenu.on('click', function(e){
          var idx = tabMenu.index($(this));
          tabCont.hide();
          tabCont.eq(idx).show();

          tabMenu.removeClass('on');
          $(this).addClass('on');
      });

      tabCont.eq(1).show();

      /* accordion */
      $('.ctrl_list .btn_toggle').click(function(e){
          e.preventDefault();
          $(this).closest('li').find('.ctrl_area').not(':animated').slideToggle();
          $(this).toggleClass('on');
      });

  }

  ionViewWillEnter() {
    


  }
}
