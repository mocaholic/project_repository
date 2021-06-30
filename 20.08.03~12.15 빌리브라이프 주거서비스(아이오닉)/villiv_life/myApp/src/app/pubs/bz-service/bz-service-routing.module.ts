import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceInfoPage} from "./service-info/service-info.page";
import {ReservPage} from "./reserv/reserv.page";
import {LecturePage} from "./lecture/list/lecture.page";
import {LectureViewPage} from "./lecture/view/lecture.view.page";


const routes: Routes = [
  {
    path: '',                 // `bz-serivce`
    redirectTo: 'service-info',
    pathMatch: 'full'
  },
  {
    path: 'service-info',      // 각 우리단지 서비스 메인페이지
    component: ServiceInfoPage
  },
  {
    path: 'reserv',           // 각 우리단지 서비스 예약페이지
    component: ReservPage
  },
  {
    path: 'lecture',           // 각 우리단지 서비스 '문화강좌 리스트'
    component: LecturePage
  },
  {
    path: 'lecture-view',           // 각 우리단지 서비스 '문화강좌 상세'
    component: LectureViewPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BzServiceRoutingModule {}
