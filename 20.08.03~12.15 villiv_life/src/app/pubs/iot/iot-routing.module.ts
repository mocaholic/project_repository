import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IotControlPage} from "./iot-control/iot-control.page";
import {IotDetailPage} from "./iot-detail/iot-detail.page";
import {IotLoginPage} from "./iot-login/iot-login.page";

/**
 */
const routes: Routes = [
  {
    path: '',                 // `iot`
    redirectTo: 'iot-control',
    pathMatch: 'full'
  },
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



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IotRoutingModule { }
