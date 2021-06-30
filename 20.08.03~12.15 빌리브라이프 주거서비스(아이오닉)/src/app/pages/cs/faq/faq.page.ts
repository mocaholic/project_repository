import {Component} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {BltbrdService} from "../../../core/service/bltbrd/bltbrd.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {CodeEnums} from "../../../core/enums/code-enums";
import CodeConstants from "../../../core/constants/code-constants";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BltbrdListPage} from "../../../components/v-bltbrd/common/bltbrd-list-page";

import {Router} from "@angular/router";
import {VEventUtils} from "../../../core/utils/v-event-utils";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage extends BltbrdListPage {

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
    this.fontSizeClassName = '';
    this.bltbrdTpCd = CodeConstants.BLTBRD.FAQ;
    this.bltbrdSearchModel.searchType = "A3";
    this.bltbrdSearchModel.bltbrdTpCd = this.bltbrdTpCd;
    this.loadBltbrdSearchTypeList(CodeEnums.BltbrdFaqCat,true);
    this.loadBltbrdList();
  }

  /**
   * 폰트 사이즈 클래스
   * ft_m
   * ft_l
   */
  fontSizeClassName: string = '';

  /**
   * faq 카테고리 코드 선택
   */
  onClickFaqCatCd(code): void {
    this.bltbrdSearchModel.bltbrdCat = code;
    this.bltbrdSearchModel.page = 1;

    this.loadBltbrdList();
  }

  /**
   * faq 컨텐츠 영역 토글
   */
  toggleContentArea(obj): void {
    obj.isShowCts = !obj.isShowCts;
  }

}
