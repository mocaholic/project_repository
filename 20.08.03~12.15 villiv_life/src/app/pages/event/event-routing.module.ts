import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SsgLifePage} from "./ssg-life/ssg-life.page";
import {EventVillivPage} from "./villiv/list/event-villiv.page";
import {EventBizAroundPage} from "./biz-around/list/event-biz-around.page";
import {EventVillivViewPage} from "./villiv/view/event-villiv-view.page";
import {EventBizaroundViewPage} from "./biz-around/view/event-biz-around-view.page";


const routes: Routes = [
  {
    path: '',                 // `story`
    redirectTo: 'ssg-life',
    pathMatch: 'full'
  },
  {
    path: 'ssg-life',      // 이벤트 & 혜택(SSG Life)
    component: SsgLifePage
  },
  {
    path: 'villiv',       // 이벤트 & 혜택(빌리브)
    component: EventVillivPage
  },
  {
    path: 'bzaround',      // 이벤트 & 혜택(주변상권)
    component: EventBizAroundPage
  },
  {
    path: 'villiv-view/:eventId',       // 이벤트 & 혜택(빌리브)
    component: EventVillivViewPage
  },
  {
    path: 'bzaround-view/:eventId',      // 이벤트 & 혜택(주변상권)
    component: EventBizaroundViewPage
  },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
