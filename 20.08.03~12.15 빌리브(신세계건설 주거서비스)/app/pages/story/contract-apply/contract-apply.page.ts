import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
  selector: 'contract-apply',
  templateUrl: './contract-apply.page.html',
  styleUrls: ['./contract-apply.page.scss'],
})
export class ContractApplyPage extends BasePage implements OnInit {

  constructor(
      public globalVars: VGlobalVars
      , public systemService: SystemService
      , router: Router
  ) {
    super({
      systemService: SystemService,
      globalVars: globalVars,
      router: router
    });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.onPageReady();
  }
}
