import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from '../../../../core/constants/code-constants.js'
import {VBltbrdListComponent} from "../../../../components/v-bltbrd/list/v-bltbrd-list.component";
import {BasePage} from "../../../BasePage";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../core/service/system/system.service";
@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.page.html',
  styleUrls: ['./notice-list.page.scss'],
})
export class NoticeListPage extends BasePage implements OnInit {

  /**
   * 게시판 타입
   */
  bltbrdTpCd: string = CodeConstants.BLTBRD.NOTICE;

  /**
   * 게시판 컴포넌트
   */
  @ViewChild('bltbrdList', {static: false}) bltbrdList: VBltbrdListComponent;

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
    this.bltbrdList.bltbrdSearchModel.bltbrdTpCd = this.bltbrdTpCd;
    this.bltbrdList.loadBltbrdSearchTypeList();
    this.bltbrdList.loadBltbrdList();
    this.bltbrdList.loadBltbrdImptcList();
  }

}
