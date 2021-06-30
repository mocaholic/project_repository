import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from "./components/components.module";
import {IndexPubPage} from "./pubs/index-pub/index-pub.page";
import {GuidePage} from "./pubs/guide/guide.page";
import {VStorageUtils} from "./core/utils/v-storage-utils";
import {VModalsComponent} from "./components/v-modals/v-modals.component";
import {AlertComponent} from "./components/v-modals/modals/alert/alert.component";
import {ConfirmComponent} from "./components/v-modals/modals/confirm/confirm.component";
import {AppUpdateComponent} from "./components/v-modals/modals/app-update/app-update.component";
import {LogoutConfirmComponent} from "./components/v-modals/modals/logout-confirm/logout-confirm.component";
import {ErrorComponent} from "./components/v-modals/modals/error/error.component";
import {PincodeComponent} from "./components/v-modals/modals/pincode/pincode.component";
import {SetPincodeComponent} from "./components/v-modals/modals/set-pincode/set-pincode.component";
import {NgEventBus} from 'ng-event-bus';
import {ModalPopupPage} from "./core/modals/modal-popup.page";
import {environment} from "../environments/environment";
import {LottieModule} from 'ngx-lottie';
import {LottieSplashScreen} from '@ionic-native/lottie-splash-screen/ngx';
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import { Device } from '@ionic-native/device/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
export function playerFactory() {
    return import('lottie-web');
}

@NgModule({
    declarations: [
        AppComponent
        , IndexPubPage
        , GuidePage
        , VModalsComponent
        , ModalPopupPage
        , AlertComponent
        , ConfirmComponent
        , AppUpdateComponent
        , LogoutConfirmComponent
        , ErrorComponent
        , PincodeComponent
        , SetPincodeComponent
    ],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot({navAnimation: customTransition}),
        AppRoutingModule,
        ComponentsModule,
        HttpClientModule,
        LottieModule.forRoot({player: playerFactory})
    ],
    providers: [
        StatusBar,
        SplashScreen,
        LottieSplashScreen,
        FCM,
        NgEventBus,
        SpinnerDialog,
        Device,
        InAppBrowser,
        LocalNotifications,
        Network,
        AppVersion,
        ScreenOrientation,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
    constructor(vStore: VStorageUtils
        , eventBus: NgEventBus
    ) {
        console.log('[1]. env => ' + environment.curenv );
        console.log('[1]. host => ' + environment.hostname );
        // console.log(
        //     '\n[1].env  => {{' + environment.curenv + '}}, ' +
        //     '\n[2].host => {{'+environment.hostname+'}}');
    }
}

/**
 * ios Safari 13 이상부터 ios 페이지 전환 애니메이션이 적용되지 않는 문제로 인해서
 * 플랫폼에 상관없이 Android용 페이지 전환 애니매이션을 사용한다.
 */
import { Animation, mdTransitionAnimation} from "@ionic/core";

export function customTransition(navEl, opts): Animation {
    console.log(navEl, opts)
    return mdTransitionAnimation(navEl, opts);
}
