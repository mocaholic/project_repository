import {Component} from '@angular/core';
import {BltbrdListPage} from "../../../../components/v-bltbrd/common/bltbrd-list-page";
import {SystemService} from "../../../../core/service/system/system.service";
import {BltbrdService} from "../../../../core/service/bltbrd/bltbrd.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import CodeConstants from '../../../../core/constants/code-constants.js'
import GlobalConstants from "../../../../core/constants/global-constants";
import {Router} from "@angular/router";
import {VEventUtils} from "../../../../core/utils/v-event-utils";

@Component({
  selector: 'app-board-inquire',
  templateUrl: './board-inquire.page.html',
  styleUrls: ['./board-inquire.page.scss'],
})
export class BoardInquirePage extends BltbrdListPage {

  constructor(
      public systemService: SystemService
      , public bltbrdService: BltbrdService
      , public pageUtils: VPageUtils
      , public globalVars: VGlobalVars
      , public eventUtils: VEventUtils
      , router: Router
  ) {
    super(systemService,bltbrdService,pageUtils,globalVars,eventUtils,router)
  }

  /**
   * Init
   * */
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.bltbrdTpCd = CodeConstants.BLTBRD.INQUIRE;
    this.bltbrdSearchModel.bltbrdTpCd = this.bltbrdTpCd;
    this.loadBltbrdSearchTypeList();
    this.loadBltbrdList();

  }

  goInsertPage() {
    this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CS_INQ_INSERT.URL);
  }
}
