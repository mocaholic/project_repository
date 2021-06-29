import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IotLoginPage} from "./iot-login/iot-login.page";
import {IotControlPage} from "./iot-control/iot-control.page";
import {IotDetailPage} from "./iot-detail/iot-detail.page";

/**
 */
const routes: Routes = [
  {
    path: '',                 // `iot`
    redirectTo: 'iot-login',
    pathMatch: 'full'
  },
  //TODO guard로 변경
  {
    path: 'iot-login',              // `iot-login`
    component: IotLoginPage
  },
  {
    path: 'iot-control',              // `iot-control`
    component: IotControlPage
  },
  {
    path: 'iot-detail',              // `iot-detail`
    component: IotDetailPage
  },
  { path: '**', redirectTo: '/' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IotRoutingModule { }
