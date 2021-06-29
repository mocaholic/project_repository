import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";
import {CsRoutingModule} from "./cs-routing.module";
import {FaqPage} from "./faq/faq.page";
import {BoardInquirePage} from "./board-inquire/list/board-inquire.page";
import {BoardInquireUpdatePage} from "./board-inquire/update/board-inquire.update.page";
import {BoardInquireViewPage} from "./board-inquire/view/board-inquire.view.page";
import {FontSizeModule} from "../../components/v-bltbrd/font-size/font-size.module";

@NgModule({
  imports: [
    ComponentsModule,
    CsRoutingModule,
    FontSizeModule
  ],
  declarations: [
    FaqPage,
    BoardInquirePage,
    BoardInquireUpdatePage,
    BoardInquireViewPage,
  ]
})
export class CsModule {}
