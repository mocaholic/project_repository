import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SampleIonCompsPage} from "./sample-ion-comps/sample-ion-comps.page";

const routes: Routes = [
  {
    path: '', // samples
    redirectTo: 'ion-comp',
    pathMatch: 'full'
  },
  {
    path: 'ion-comp',
    component: SampleIonCompsPage,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule {}
