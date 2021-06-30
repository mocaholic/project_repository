import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";

import {SamplesRoutingModule} from './samples-routing.module';
import {TableLoadPage} from "./table-load/table-load.page";
import {ApiTestPage} from "./api-test/api-test.page";
@NgModule({
  imports: [
    ComponentsModule,
    SamplesRoutingModule,
  ],
  declarations: [
    TableLoadPage,
      ApiTestPage
  ]
})
export class SamplesModule {}
