import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'contract-info',
  templateUrl: './contract-info.page.html',
  styleUrls: ['../../../pages/story/life-service/tabs/contract-info/contract-info.page.scss'],
})
export class ContractInfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
    
    // console.log($);
  }

  ionViewDidEnter() {

    $('.a').click(function(){
      $('#dimmed').show();
      $('#layer_popup').show();
    });

    
    // let a = function() {
      
    //   $('.a').click(function(){
    //     $('#dimmed').show();
    //     $('#layer_popup').show();
    //   });

    //   alert(1);
    // }
    
    // setTimeout(a, 3000);

  }
}