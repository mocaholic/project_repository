import { Component, OnInit } from '@angular/core';
import {BasePage} from "../../BasePage";
import {VGlobalVars} from "../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";

@Component({
  selector: 'app-logout-confirm',
  templateUrl: './logout-confirm.page.html',
  styleUrls: ['./logout-confirm.page.scss'],
})
export class LogoutConfirmPage extends BasePage implements OnInit {

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
    this.onPageReady()
  }

}
