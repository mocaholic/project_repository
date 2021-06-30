import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";
import {BltbrdListModule} from "../../components/v-bltbrd/list/bltbrd-list.module";
import {BltbrdViewModule} from "../../components/v-bltbrd/view/bltbrd-view.module";
import {CommunityRoutingModule} from './community-routing.module';
import {FontSizeModule} from "../../components/v-bltbrd/font-size/font-size.module"

import {NoticeListPage} from "./notice/notice-list/notice-list.page";
import {NoticeViewPage} from "./notice/notice-view/notice-view.page";
// import {FleamarketPage} from "./fleamarket/list/fleamarket.page";
// import {FleamarketViewPage} from "./fleamarket/view/fleamarket.view.page";
import {LetteringPage} from "./lettering/lettering.page";
import {VotePage} from "./vote/list/vote.page";
import {VoteViewPage} from "./vote/view/vote.view.page";
import {IvstPage} from "./ivst/list/ivst.page";
import {IvstViewPage} from "./ivst/view/ivst.view.page";
import {VoteResultPage} from "./vote/result/vote.result.page";
import { CalendarModule } from 'ion2-calendar';

import {IonicModule} from "@ionic/angular";
import {FleamarketPage} from "./fleamarket/list/fleamarket.page";
import {FleamarketViewPage} from "./fleamarket/view/fleamarket.view.page";

@NgModule({
    declarations: [
        NoticeListPage,
        NoticeViewPage,
        FleamarketPage,
        FleamarketViewPage,
        LetteringPage,
        VotePage,
        VoteViewPage,
        IvstPage,
        IvstViewPage,
        VoteResultPage
    ],
    imports: [
        CommunityRoutingModule,
        ComponentsModule,
        BltbrdListModule,
        BltbrdViewModule,
        CalendarModule,
        FontSizeModule
    ],

})
export class CommunityModule {
}
