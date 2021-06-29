import { Component, OnInit } from '@angular/core';
import {QstnListPage} from "../../../../components/v-qstn/qstn-list-page";
import {SystemService} from "../../../../core/service/system/system.service";
import {QstnService} from "../../../../core/service/qstn/qstn.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../../core/utils/v-event-utils";

import {Router} from "@angular/router";

@Component({
  selector: 'v-ivst',
  templateUrl: './ivst.page.html',
  styleUrls: ['./ivst.page.scss'],
})
export class IvstPage extends QstnListPage{

  constructor(
      public systemService: SystemService
      , public qstnService: QstnService
      , public pageUtil: VPageUtils
      , public globalVars: VGlobalVars
      , public eventUtils: VEventUtils

      , router: Router
  ) {
    super(systemService,qstnService,pageUtil,globalVars,eventUtils,router)
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.qstnSearchModel.qstnKnd = 'A';
    this.loadQstnList();
    this.loadQstnList(true);
  }

}
