import {NgModule} from '@angular/core';

import {ServiceInfoPage} from "./service-info/service-info.page";
import {ComponentsModule} from "../../components/components.module";
import {BzServiceRoutingModule} from "./bz-service-routing.module";
import {ResvPage} from "./resv/resv.page";
import {LecturePage} from "./lecture/list/lecture.page";
import {LectureViewPage} from "./lecture/view/lecture.view.page";
import {PtnrResvPage} from "./resv/ptnr/ptnr-resv.page";
import {LnchResvPage} from "./resv/lnch/lnch-resv.page";

@NgModule({
    imports: [
        BzServiceRoutingModule,
        ComponentsModule,
    ],
    declarations: [
        ServiceInfoPage
        , ResvPage
        , LecturePage
        , LectureViewPage
        , PtnrResvPage
        , LnchResvPage
    ]
})
export class BzServiceModule {
}
