import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";

import {SignupRoutingModule} from './signup-routing.module';
import {AgreementPage} from "./agreement/agreement.page";
import {CompletePage} from "./complete/complete.page";
import {ConfirmPage} from "./confirm/confirm.page";

@NgModule({
  imports: [
    SignupRoutingModule,
    ComponentsModule,
  ],
  declarations: [
      AgreementPage, CompletePage, ConfirmPage
  ]
})
export class SignupModule {}
