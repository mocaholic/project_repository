import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VillivInfoPage } from './villiv-info/villiv-info.page';
import {LifeServicePage} from "./life-service/life-service.page";
import {MagazinePage} from "./magazine/magazine.page";

const routes: Routes = [
  {
    path: '',                 // `story`
    redirectTo: 'villiv-info',
    pathMatch: 'full'
  },
  {
    path: 'villiv-info',      // 빌리브 스토리(메인)
    component: VillivInfoPage
  },
  {
    path: 'life-service',      // 빌리브 라이프 스토리
    component: LifeServicePage
  },
  {
    path: 'magazine',         // 빌리브 매거진
    component: MagazinePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryRoutingModule {}
