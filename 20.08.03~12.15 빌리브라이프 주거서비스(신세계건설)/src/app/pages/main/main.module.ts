import {NgModule} from '@angular/core';
import {ComponentsModule} from "../../components/components.module";

import {MainPageRoutingModule} from './main-routing.module';

import {MainPage} from './main.page';
import {LoginPage} from "./login/login.page";
import {LogoutConfirmPage} from "./logout-confirm/logout-confirm.page";
import {TermsPage} from "./terms/terms.page";
import {GatePage} from "./gate/gate.page";
import {SettingPage} from "./setting/setting.page";
import {PushListPage} from "./push-list/push-list.page";
import {PincodePage} from "./pincode/pincode.page";
import {LottieModule} from "ngx-lottie";

@NgModule({
    imports: [
        MainPageRoutingModule,
        ComponentsModule,
        LottieModule,
    ],
    declarations: [
        MainPage
        , LoginPage
        , LogoutConfirmPage
        , GatePage
        , TermsPage
        , PincodePage
        , SettingPage
        , PushListPage
    ]
})
export class MainPageModule {
}
