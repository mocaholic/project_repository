import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoticeListPage} from "./notice/notice-list/notice-list.page";
import {NoticeViewPage} from "./notice/notice-view/notice-view.page";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommunityRoutingModule } from './community-routing.module';
import {ComponentsModule} from "../../components/components.module";
import {FleamarketPage} from "./fleamarket/list/fleamarket.page";
import {FleamarketViewPage} from "./fleamarket/view/fleamarket.view.page";
import {LetteringPage} from "./lettering/lettering.page";
import {IvstPage} from "./ivst/list/ivst.page";
import {IvstViewPage} from "./ivst/view/ivst.view.page";
import {VotePage} from "./vote/list/vote.page";
import {VoteViewPage} from "./vote/view/vote.view.page";
import {VoteResultPage} from "./vote/result/vote.result.page";


@NgModule({
  declarations: [NoticeListPage, NoticeViewPage, FleamarketPage, FleamarketViewPage,
    LetteringPage, IvstPage, IvstViewPage, VotePage, VoteViewPage, VoteResultPage],
  imports: [
    CommunityRoutingModule,
    ComponentsModule,
  ]
})
export class CommunityModule { }
