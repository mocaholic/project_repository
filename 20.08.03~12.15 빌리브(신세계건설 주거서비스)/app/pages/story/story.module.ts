import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";

import {StoryRoutingModule} from './story-routing.module';

import {LifeServicePage} from "./life-service/life-service.page";
import {VillivInfoPage} from './villiv-info/villiv-info.page';
import {RentFeeInfoPage} from "./rent-fee-info/rent-fee-info.page";
import {ContractInfoPage} from "./life-service/tabs/contract-info/contract-info.page";
import {ContractApplyPage} from "./contract-apply/contract-apply.page";
import {PublicRentInfoPage} from "./public-rent-info/public-rent-info.page";
import {PositionInfoPage} from "./life-service/tabs/position-info/position-info.page";
import {PlaneInfoPage} from "./life-service/tabs/plane-info/plane-info.page";
import {InteriorInfoPage} from "./life-service/tabs/interior-info/interior-info.page";
import {BzInfoPage} from "./life-service/tabs/bz-info/bz-info.page";
import {WayInfoPage} from "./life-service/tabs/way-info/way-info.page";
import {MagazinePage} from "./magazine/magazine.page";

@NgModule({
  imports: [
    StoryRoutingModule,
    ComponentsModule
  ],
  declarations: [
      VillivInfoPage, RentFeeInfoPage,
      ContractInfoPage, ContractApplyPage,
      PublicRentInfoPage, PositionInfoPage,
      PlaneInfoPage, InteriorInfoPage,
      BzInfoPage, WayInfoPage,
      LifeServicePage, MagazinePage
  ]
})
export class StoryModule {}
