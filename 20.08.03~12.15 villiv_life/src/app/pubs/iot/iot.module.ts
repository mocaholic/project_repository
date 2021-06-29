import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";
import {IotRoutingModule} from "./iot-routing.module";
import {FontSizeModule} from "../../components/v-bltbrd/font-size/font-size.module";
import {IotLoginPage} from "./iot-login/iot-login.page";
import {IotControlPage} from "./iot-control/iot-control.page";
import {IotDetailPage} from "./iot-detail/iot-detail.page";

@NgModule({
  imports: [
    ComponentsModule,
    IotRoutingModule,
    FontSizeModule
  ],
  declarations: [
    IotLoginPage,
    IotControlPage,
    IotDetailPage
  ]
})
export class IotModule {}
