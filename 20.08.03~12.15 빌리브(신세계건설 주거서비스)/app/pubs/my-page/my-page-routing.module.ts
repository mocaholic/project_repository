import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyPageBillPage} from "./my-page-bill/my-page-bill.page";
import {MyPageServiceListPage} from "./my-page-service-list/my-page-service-list.page";
import {MyPageServiceDetailPage} from "./my-page-service-detail/my-page-service-detail.page";
import {MyInfoPage} from "./my-info/my-info.page";
import {MyHomeServiceListPage} from "./my-home-service-list/my-home-service-list.page";
import {PartnerServiceDetailPage} from "./partner-service-detail/partner-service-detail.page";
import {PartnerServiceListPage} from "./partner-service-list/partner-service-list.page";
import {MyMenuPage} from "./my-menu/my-menu.page";


/**
 */
const routes: Routes = [
  {
    path: '',                 // `my-page`
    redirectTo: 'bill',
    pathMatch: 'full'
  },
  {
    path: 'bill',              // `bill`
    component: MyPageBillPage
  },
  {
    path: 'service-list',              // `service-list`
    component: MyPageServiceListPage
  },
  {
    path: 'service-detail',              // `service-detail`
    component: MyPageServiceDetailPage
  },
  {
    path: 'partner-service-list',              // `partner-service-list`
    component: PartnerServiceListPage
  },
  {
    path: 'partner-service-detail',              // `partner-service-detail`
    component: PartnerServiceDetailPage
  },
  {
    path: 'my-home-service',              // `my-home-service`
    component: MyHomeServiceListPage
  },
  {
    path: 'my-info',              // `my-info`
    component: MyInfoPage
  },
  {
    path: 'my-menu',              // `마이메뉴`
    component: MyMenuPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule { }
