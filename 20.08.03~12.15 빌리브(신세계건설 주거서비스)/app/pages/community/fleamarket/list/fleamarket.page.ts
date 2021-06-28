import { Component, OnInit } from '@angular/core';
import CodeConstants from "../../../../core/constants/code-constants";

@Component({
  selector: 'app-fleamarket',
  templateUrl: './fleamarket.page.html',
  styleUrls: ['./fleamarket.page.scss'],
})
export class FleamarketPage implements OnInit {

  bltbrdTpCd: string = CodeConstants.BLTBRD.FLEAMARKETF;

  constructor() { }

  ngOnInit() {
  }

}
