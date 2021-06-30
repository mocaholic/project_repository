import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from "../../components/components.module";
import {SampleRoutingModule} from "./sample-routing.module";
import {SampleIonCompsPage} from "./sample-ion-comps/sample-ion-comps.page";


@NgModule({
  declarations: [SampleIonCompsPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SampleRoutingModule,
    ComponentsModule,
  ]
})
export class SampleModule { }
