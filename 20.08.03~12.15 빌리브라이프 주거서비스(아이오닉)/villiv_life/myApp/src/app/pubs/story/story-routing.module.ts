import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VillivInfoPage } from './villiv-info/villiv-info.page';
import {RentFeeInfoPage} from "./rent-fee-info/rent-fee-info.page";
import {ContractInfoPage} from "./contract-info/contract-info.page";
import {PublicRentInfoPage} from "./public-rent-info/public-rent-info.page";
import {PositionInfoPage} from "./position-info/position-info.page";
import {PlaneInfoPage} from "./plane-info/plane-info.page";

import {ContractApplyPage} from "./contract-apply/contract-apply.page";
import {BzInfoPage} from "./bz-info/bz-info.page";
import {InteriorInfoPage} from "./interior-info/interior-info.page";
import {WayInfoPage} from "./way-info/way-info.page";
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
    path: 'rent-fee-info',    // 임대료 안내
    component: RentFeeInfoPage
  },
  {
    path: 'contract-info',    // 계약 안내
    component: ContractInfoPage
  },
  {
    path: 'public-rent-info', // 공공지원민간임대주택
    component: PublicRentInfoPage
  },
  {
    path: 'position-info',    // 입지환경
    component: PositionInfoPage
  },
  {
    path: 'plane-info',       // 평면안내
    component: PlaneInfoPage
  },
  {
    path: 'contract-apply',   // 계약대기 신청
    component: ContractApplyPage
  },
  {
    path: 'bz-info',          // 단지안내
    component: BzInfoPage
  },
  {
    path: 'interior-info',    // 인테리어 안내
    component: InteriorInfoPage
  },
  {
    path: 'way-info',         // 오시는 길
    component: WayInfoPage
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
