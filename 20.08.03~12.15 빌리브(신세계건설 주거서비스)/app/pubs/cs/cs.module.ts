import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";
import {CsRoutingModule} from "./cs-routing.module";
import {FaqPage} from "./faq/faq.page";
import {BoardInquirePage} from "./board-inquire/list/board-inquire.page";
import {BoardInquireUpdatePage} from "./board-inquire/update/board-inquire.update.page";
import {BoardInquireViewPage} from "./board-inquire/view/board-inquire.view.page";

@NgModule({
  imports: [
    ComponentsModule,
    CsRoutingModule,
  ],
  declarations: [
    FaqPage,
    BoardInquirePage,
    BoardInquireUpdatePage,
    BoardInquireViewPage,
  ]
})
export class CsModule {}
