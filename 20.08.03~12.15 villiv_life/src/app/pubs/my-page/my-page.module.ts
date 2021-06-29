import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";

import {MyPageRoutingModule} from "./my-page-routing.module";
import {MyPageBillPage} from "./my-page-bill/my-page-bill.page";
import {MyPageServiceListPage} from "./my-page-service-list/my-page-service-list.page";
import {MyPageServiceDetailPage} from "./my-page-service-detail/my-page-service-detail.page";
import {MyInfoPage} from "./my-info/my-info.page";
import {MyHomeServiceListPage} from "./my-home-service-list/my-home-service-list.page";
import {PartnerServiceDetailPage} from "./partner-service-detail/partner-service-detail.page";
import {PartnerServiceListPage} from "./partner-service-list/partner-service-list.page";
import {MyMenuPage} from "./my-menu/my-menu.page";

@NgModule({
  imports: [
    ComponentsModule,
    MyPageRoutingModule
  ],
  declarations: [
    MyPageBillPage,
    MyPageServiceListPage,
    MyPageServiceDetailPage,
    PartnerServiceListPage,
    PartnerServiceDetailPage,
    MyHomeServiceListPage,
    MyInfoPage,
    MyMenuPage

  ]
})
export class MyPageModule {}
