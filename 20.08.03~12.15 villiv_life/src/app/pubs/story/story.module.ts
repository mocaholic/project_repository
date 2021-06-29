import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StoryRoutingModule} from './story-routing.module';

import {VillivInfoPage} from './villiv-info/villiv-info.page';
import {ComponentsModule} from "../../components/components.module";
import {ContractInfoPage} from "./contract-info/contract-info.page";
import {ContractApplyPage} from "./contract-apply/contract-apply.page";
import {PlaneInfoPage} from "./plane-info/plane-info.page";
import {PositionInfoPage} from "./position-info/position-info.page";
import {PublicRentInfoPage} from "./public-rent-info/public-rent-info.page";
import {RentFeeInfoPage} from "./rent-fee-info/rent-fee-info.page";
import {BzInfoPage} from "./bz-info/bz-info.page";
import {InteriorInfoPage} from "./interior-info/interior-info.page";
import {WayInfoPage} from "./way-info/way-info.page";
import {MagazinePage} from "./magazine/magazine.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoryRoutingModule,
    ComponentsModule,
  ],
  declarations: [
      VillivInfoPage, ContractInfoPage,
      ContractApplyPage, PlaneInfoPage,
      PositionInfoPage, PublicRentInfoPage,
      RentFeeInfoPage, BzInfoPage,
      InteriorInfoPage, WayInfoPage,
      MagazinePage
    ]
})
export class StoryModule {}
