import {Component, OnInit, ViewChild} from '@angular/core';
import CodeConstants from "../../../../../core/constants/code-constants";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";
import {VBltbrdImageListComponent} from "../../../../../components/v-bltbrd/image-list/v-bltbrd-image-list.component";
import GlobalConstants from "../../../../../core/constants/global-constants";
import {BasePage} from "../../../../BasePage";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {SystemService} from "../../../../../core/service/system/system.service";

@Component({
  selector: 'app-board-lancable',
  templateUrl: './board-lancable.page.html',
  styleUrls: ['./board-lancable.page.scss'],
})
export class BoardLancablePage extends BasePage implements OnInit {
  /**
   * 게시판 타입
   */
  bltbrdTpCd: string = CodeConstants.BLTBRD.LANCABLE;

  /**
   * 게시판 컴포넌트
   */
  @ViewChild('bltbrdImageList', {static: false}) bltbrdImageList: VBltbrdImageListComponent;

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
    this.bltbrdImageList.bltbrdSearchModel.bltbrdTpCd = this.bltbrdTpCd;
    this.bltbrdImageList.loadBltbrdSearchTypeList();
    this.bltbrdImageList.loadBanner();
    this.bltbrdImageList.loadBltbrdList();
  }
  /**
   * 입력 페이지로 이동
   */
  goInsertPage(): void {
    this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CM_LAN_INSERT.URL);
  }


}
