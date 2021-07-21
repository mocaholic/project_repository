import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {LottieSplashScreen} from '@ionic-native/lottie-splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NgEventBus} from "ng-event-bus";
import {VGlobalVars} from "./core/utils/v-global-vars";
import {VUtils} from "./core/utils/v-utils";
import {INotificationPayload} from "cordova-plugin-fcm-with-dependecy-updated";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {ModalEventModel} from "./core/models/modal-event-model";
import {SystemService} from "./core/service/system/system.service";
import {VEventUtils} from "./core/utils/v-event-utils";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
declare var cordova:any;

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private fcm: FCM,
        private statusBar: StatusBar,
        private eventBus: NgEventBus,
        private globalVars: VGlobalVars,
        private lottieSplashScreen: LottieSplashScreen,
        private localNotifications: LocalNotifications,
        private network: Network,
        private appVersion: AppVersion,
        private screenOrientation: ScreenOrientation,
        public systemService: SystemService,
        public eventUtils: VEventUtils

    ) {
        this.initializeApp();
    }
    public hasPermission: boolean;
    public token: string;
    public pushPayload: INotificationPayload;

    initializeApp() {

        this.platform.ready().then(() => {

            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#eff2f5');
            this.statusBar.styleDefault();

            if(this.globalVars.isApp) {
                //화면 세로방향 고정
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            // $('ion-app').css('margin-top', '10px');

            type LottieEvent = 'lottieAnimationStart' | 'lottieAnimationEnd' | 'lottieAnimationCancel' | 'lottieAnimationRepeat';

            // const lottieOriginal: any = this.lottieSplashScreen.constructor;
            // console.log('this.lottieSplashScreen=', cordova.plugins);
            // lottieOriginal.on('lottieAnimationEnd', (ev: Event) => {
            //     alert('1111');
            // });


            // //TODO remove setTimeout
            setTimeout(() => {

                // this.lottieSplashScreen.hide();
                this.globalVars.isEndSplash = true;
                // navigator['splashscreen'].hide();
                // this.splashScreen.hide();


            }, 2000);

            //네트워크 체크
            this.setupNetwork();

            //TODO 서버상태 체크
            this.checkApiServer();

            //TODO TEST 앱버전 체크
            if(this.globalVars.isApp) {
                this.checkAppVersion();
            }

            //푸쉬 설정
            this.setupFCM();

            //핀코드 설정
            this.setupPinCode();

        });

    }

    private async setupFCM() {
        await this.platform.ready();
        console.log('FCM setup started');

        if (!this.platform.is('cordova')) {
            return;
        }
        console.log('In cordova platform');

        console.log('Subscribing to token updates');
        this.fcm.onTokenRefresh().subscribe((newToken) => {
            this.token = newToken;
            this.globalVars.token = newToken;
            console.log('onTokenRefresh received event with: ', newToken);
        });

        console.log('Subscribing to new notifications');
        this.fcm.onNotification().subscribe((payload) => {
            if(payload.wasTapped){
                console.log("Received in background");
            } else {
                console.log("Received in foreground");
                this.showNotificationCordova(payload)
            };
            this.pushPayload = payload;
            console.log('onNotification received event with: ', payload);
        });

        // this.hasPermission = await this.fcm.requestPushPermission();
        console.log('requestPushPermission result: ', this.hasPermission);

        this.token = await this.fcm.getToken();
        console.log('getToken result: ', this.token);

        // this.pushPayload = await this.fcm.getInitialPushPayload();
        console.log('getInitialPushPayload result: ', this.pushPayload);
    }

    showNotificationCordova(notification) {
        this.localNotifications.hasPermission().then(permission => {
            if (permission) {
                this.localNotifications.schedule({
                    id: 1,
                    title: notification.title,
                    text: notification.body,
                    icon: notification.image ? notification.image : 'notification_icon',
                });
            } else {
                this.localNotifications.requestPermission().then(value => {
                    if (value) {
                        this.localNotifications.schedule({
                            id: 1,
                            title: notification.title,
                            text: notification.body,
                            icon: notification.image ? notification.image : 'notification_icon',
                        });
                    } else {
                        console.log("Notifications won't be shown as permission is denied");
                    }
                });
            }
        });

    }

    setupNetwork() {
        if(!navigator.onLine) {
           this.openNetworkError();
        }
        if(this.globalVars.isPc) {
            window.addEventListener('online', () => {
                console.log('network connected!');
            });
            window.addEventListener('offline', () => {
                console.log('network was disconnected');
                this.openNetworkError();
            });
        } else {
            this.network.onConnect().subscribe(() => {
                console.log('network connected!');
            });

            this.network.onDisconnect().subscribe(() => {
                console.log('network was disconnected');
                this.openNetworkError();
            });
        }
    }

    openNetworkError() {
        const callback = async () => {
            if(this.globalVars.isApp) {
                navigator['app'].exitApp();
            } else {
                window.location.href = '/';
            }
        }
        const info = new ModalEventModel();
        // info.title = title;
        // info.content = msg;
        info.callback = callback
        this.eventBus.cast('common:networkError',info);
    }

    setupPinCode() {
        if (this.globalVars.isApp) {

            if (!VUtils.isEmpty(this.globalVars.pinCode)) {
                this.eventBus.cast('common:pinCode');
            }
            this.platform.pause.subscribe(() => {
                console.log('pause');
                this.eventBus.cast('common:pinCode');
            });

            //Subscribe on resume i.e. foreground
            this.platform.resume.subscribe(() => {
                console.log('resume');
                window['paused'] = 0;

            });

        }
    }

    checkAppVersion() {
        //TODO test device
        const params: any = {
            os : this.globalVars.mobileOs
        };

        this.appVersion.getVersionNumber().then((number)=>{
            console.log('getVersionNumber : ' + number)
            this.globalVars.currentVer = number;
            this.systemService.loadNewestVer(params)
                .then((model) => {

                    if(this.compareAppVer(model.result['mandYVer'].osVer)<0) {
                        const info = new ModalEventModel();
                        info.isRequired = true;
                        this.eventBus.cast('common:appUpdate', info);
                        return;
                    }
                    if(this.compareAppVer(model.result['data'].osVer)<0) {
                        const info = new ModalEventModel();
                        this.eventBus.cast('common:appUpdate', info);
                        this.globalVars.isNewestApp = false;
                        return;
                    }
                });
        });
    }
    /**
     * 앱버전 비교
     * mandYVer :필수버전
     * mandNVer :선택버전
     * */
    compareAppVer(mandYVer) {
        let res = 0;

        let oldNumbers = this.globalVars.currentVer.split("\.");
        let newNumbers = mandYVer.split("\.");

        let maxIndex = Math.min(oldNumbers.length, newNumbers.length);

        for (let i = 0; i < maxIndex; i ++) {
            let oldVersionPart = Number(oldNumbers[i]);
            let newVersionPart = Number(newNumbers[i]);

            if (oldVersionPart < newVersionPart) {
                res = -1;
                break;
            } else if (oldVersionPart > newVersionPart) {
                res = 1;
                break;
            }
        }

        if (res == 0 && oldNumbers.length != newNumbers.length) {
            res = (oldNumbers.length > newNumbers.length)?1:-1;
        }

        return res;
    }

    checkApiServer() {
        //TODO
    }
}
