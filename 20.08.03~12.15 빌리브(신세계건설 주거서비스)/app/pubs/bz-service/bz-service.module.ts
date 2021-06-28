import {NgModule} from '@angular/core';

import {ServiceInfoPage} from "./service-info/service-info.page";
import {ComponentsModule} from "../../components/components.module";
import {BzServiceRoutingModule} from "./bz-service-routing.module";
import {ReservPage} from "./reserv/reserv.page";
import {LecturePage} from "./lecture/list/lecture.page";
import {LectureViewPage} from "./lecture/view/lecture.view.page";

@NgModule({
  imports: [
    BzServiceRoutingModule,
    ComponentsModule,
  ],
  declarations: [ServiceInfoPage, ReservPage, LecturePage, LectureViewPage]
})
export class BzServiceModule {}
