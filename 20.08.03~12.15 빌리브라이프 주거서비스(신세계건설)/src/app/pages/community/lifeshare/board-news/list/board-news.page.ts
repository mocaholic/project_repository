import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from "../../../../../core/constants/code-constants";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";
import {VBltbrdListComponent} from "../../../../../components/v-bltbrd/list/v-bltbrd-list.component";
import GlobalConstants from "../../../../../core/constants/global-constants";
import {BasePage} from "../../../../BasePage";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../../core/service/system/system.service";
@Component({
  selector: 'app-board-news',
  templateUrl: './board-news.page.html',
  styleUrls: ['./board-news.page.scss'],
})
export class BoardNewsPage extends BasePage implements OnInit {
  /**
   * 게시판 타입
   */
  bltbrdTpCd: string = CodeConstants.BLTBRD.NEWS;

  /**
   * 게시판 컴포넌트
   */
  @ViewChild('bltbrdList', {static: false}) bltbrdList: VBltbrdListComponent;

  constructor(
      public pageUtils: VPageUtils
      , public globalVars: VGlobalVars
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
  }

  /**
   * 입력 페이지로 이동
   */
  goInsertPage(): void {
    this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CM_CNW_INSERT.URL);
  }
}
