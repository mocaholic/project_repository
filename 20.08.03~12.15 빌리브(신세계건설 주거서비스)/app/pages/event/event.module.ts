import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";

import {EventRoutingModule} from "./event-routing.module";

import {SsgLifePage} from "./ssg-life/ssg-life.page";
import {EventVillivPage} from "./villiv/list/event-villiv.page";
import {EventBizAroundPage} from "./biz-around/list/event-biz-around.page";
import {EventVillivViewPage} from "./villiv/view/event-villiv-view.page";
import {EventBizaroundViewPage} from "./biz-around/view/event-biz-around-view.page";

@NgModule({
  imports: [
    ComponentsModule,
    EventRoutingModule
  ],
  declarations: [
      SsgLifePage, EventVillivPage, EventVillivViewPage,
    EventBizAroundPage, EventBizaroundViewPage
  ]
})
export class EventModule {}
