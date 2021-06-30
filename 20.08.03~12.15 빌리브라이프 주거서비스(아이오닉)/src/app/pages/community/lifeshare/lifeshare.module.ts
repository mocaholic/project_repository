import {NgModule} from '@angular/core';

import {ComponentsModule} from "../../../components/components.module";
import {BltbrdListModule} from "../../../components/v-bltbrd/list/bltbrd-list.module";
import {BltbrdImageListModule} from "../../../components/v-bltbrd/image-list/bltbrd-image-list.module";
import {BltbrdUpdateModule} from "../../../components/v-bltbrd/update/bltbrd-update.module";
import {LifeshareRoutingModule} from "./lifeshare-routing.module";

import {BoardLancablePage} from "./board-lancable/list/board-lancable.page";
import {BoardNewsPage} from "./board-news/list/board-news.page";
import {BoardResidentPage} from "./board-resident/list/board-resident.page";
import {BoardLancableViewPage} from "./board-lancable/view/board-lancable.view.page";
import {BoardNewsViewPage} from "./board-news/view/board-news.view.page";
import {BoardResidentViewPage} from "./board-resident/view/board-resident.view.page";
import {BoardShareViewPage} from "./board-share/view/board-share.view.page";
import {BoardSharePage} from "./board-share/list/board-share.page";
import {BoardLancableUpdatePage} from "./board-lancable/update/board-lancable.update.page";
import {BltbrdViewModule} from "../../../components/v-bltbrd/view/bltbrd-view.module";
import {BoardResidentUpdatePage} from "./board-resident/update/board-resident.update.page";
import {BoardNewsUpdatePage} from "./board-news/update/board-news.update.page";
import {BoardShareUpdatePage} from "./board-share/update/board-share.update.page";

@NgModule({
    declarations: [BoardLancablePage, BoardNewsPage, BoardResidentPage, BoardSharePage,
        BoardLancableViewPage, BoardNewsViewPage, BoardResidentViewPage, BoardShareViewPage,
        BoardLancableUpdatePage,
        BoardResidentUpdatePage,
        BoardNewsUpdatePage,
        BoardShareUpdatePage
    ],
    imports: [
        LifeshareRoutingModule,
        ComponentsModule,
        BltbrdListModule,
        BltbrdImageListModule,
        BltbrdViewModule,
        BltbrdUpdateModule
    ]
})
export class LifeshareModule {
}
