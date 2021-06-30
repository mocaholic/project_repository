import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceInfoPage} from "./service-info/service-info.page";
import {ResvPage} from "./resv/resv.page";
import {LectureViewPage} from "./lecture/view/lecture.view.page";
import {LecturePage} from "./lecture/list/lecture.page";
import {PtnrResvPage} from "./resv/ptnr/ptnr-resv.page";
import {LnchResvPage} from "./resv/lnch/lnch-resv.page";

const routes: Routes = [
  {
    path: '',                 // `bz-serivce`
    redirectTo: 'service-info',
    pathMatch: 'full'
  },
  {
    path: 'service-info/:svcId',      // 각 우리단지 서비스 메인페이지
    component: ServiceInfoPage
  },
  {
    path: 'resv/:prdId',           // 각 우리단지 서비스 상품예약페이지
    component: ResvPage
  },
  {
    path: 'ptnr-resv/:ptnrId',           // 제휴 예약페이지
    component: PtnrResvPage
  },
  {
    path: 'lnch-resv',           // 조식 예약페이지
    component: LnchResvPage
  },
  {
    path: 'lecture',           // 각 우리단지 서비스 '문화강좌 리스트'
    component: LecturePage
  },
  {
    path: 'lecture-view/:lecId',           // 각 우리단지 서비스 '문화강좌 상세'
    component: LectureViewPage
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BzServiceRoutingModule {}
