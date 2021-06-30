import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {LifeshareRoutingModule} from "./lifeshare-routing.module";
import {BoardLancablePage} from "./board-lancable/list/board-lancable.page";
import {BoardNewsPage} from "./board-news/list/board-news.page";
import {BoardResidentPage} from "./board-resident/list/board-resident.page";
import {ComponentsModule} from "../../../components/components.module";
import {BoardLancableViewPage} from "./board-lancable/view/board-lancable.view.page";
import {BoardNewsViewPage} from "./board-news/view/board-news.view.page";
import {BoardResidentViewPage} from "./board-resident/view/board-resident.view.page";
import {BoardShareViewPage} from "./board-share/view/board-share.view.page";
import {BoardSharePage} from "./board-share/list/board-share.page";
import {BoardLancableUpdatePage} from "./board-lancable/update/board-lancable.update.page";



@NgModule({
  declarations: [BoardLancablePage, BoardNewsPage, BoardResidentPage, BoardSharePage,
  BoardLancableViewPage, BoardNewsViewPage, BoardResidentViewPage, BoardShareViewPage, BoardLancableUpdatePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifeshareRoutingModule,
    ComponentsModule,
  ]
})
export class LifeshareModule { }
