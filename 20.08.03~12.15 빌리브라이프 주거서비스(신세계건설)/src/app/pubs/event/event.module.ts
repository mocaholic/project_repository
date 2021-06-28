import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EventRoutingModule} from './event-routing.module';
import {ComponentsModule} from "../../components/components.module";
import {SsgLifePage} from "./ssg-life/ssg-life.page";
import {EventVillivPage} from "./villiv/list/event-villiv.page";
import {EventVillivViewPage} from "./villiv/view/event-villiv-view.page";
import {EventBizAroundPage} from "./biz-around/list/event-biz-around.page";
import {EventBizaroundViewPage} from "./biz-around/view/event-biz-around-view.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventRoutingModule,
    ComponentsModule,
  ],
  declarations: [
      SsgLifePage, EventVillivPage, EventVillivViewPage,
      EventBizAroundPage, EventBizaroundViewPage
  ]
})
export class EventModule {}
