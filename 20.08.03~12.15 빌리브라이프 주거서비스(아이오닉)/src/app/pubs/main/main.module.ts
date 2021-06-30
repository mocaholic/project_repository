import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MainPageRoutingModule} from './main-routing.module';

import {MainPage} from './main.page';
import {ComponentsModule} from "../../components/components.module";
import {LoginPage} from "./login/login.page";
import {LogoutConfirmPage} from "./logout-confirm/logout-confirm.page";
import {PincodePage} from "./pincode/pincode.page";
import {GatePage} from "./gate/gate.page";
import {TermsPage} from "./terms/terms.page";
import {SettingPage} from "./setting/setting.page";
import {PushListPage} from "./push-list/push-list.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageRoutingModule,
        ComponentsModule,
    ],
    declarations: [
        MainPage
        , LoginPage
        , LogoutConfirmPage
        , PincodePage
        , GatePage
        , TermsPage
        , SettingPage
        , PushListPage
    ]
})
export class MainPageModule {
}
