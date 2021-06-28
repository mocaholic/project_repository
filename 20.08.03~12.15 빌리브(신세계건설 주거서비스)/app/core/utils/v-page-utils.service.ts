import {Injectable} from '@angular/core';
import {IonRouterOutlet, ModalController, NavController} from "@ionic/angular";
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {VGlobalVars} from "./v-global-vars";
import {VUtils} from "./v-utils";
import {NgEventBus} from "ng-event-bus";
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Injectable({
    providedIn: 'root',
})
export class VPageUtils {

    constructor(
        navController: NavController
        ,modalController: ModalController
        ,public router: Router
        ,public location: Location
        , public globalVars: VGlobalVars
        , private eventBus: NgEventBus
        , private inAppBrowser: InAppBrowser
    ) {
        this.nav = navController;
        this.modal = modalController;
    }

    /**
     * NavController
     */
    nav: NavController;

    /**
     * ModalController
     */
    modal: ModalController;

    public routerOutlet: IonRouterOutlet;

    public setTopOutlet(routerOutlet: IonRouterOutlet) {
        this.routerOutlet = routerOutlet;
    }
    /**
     * page 이동
     * 데이터가 있을경우
     * navigateForward('/board',{'example' : 'value})
     * 가져다 쓸때
     * private router: Router
     * this.router.getCurrentNavigation().extras
     */
    public navigateForward(url:string,data?:any): Promise<any> {

        if(this.globalVars.isPc) {
            if(data) {
                data['animated'] = false;
            } else {
                data = {animated : false};
            }
        } else {
            VUtils.pauseMainAnimation(this.router);

            if(data) {
                data['animated'] = true;
            } else {
                data = {animated : true};
            }
        }

        this.eventBus.cast('common:movePage');

        // if( this.globalVars.isApp ) {
        //
        //     let options: NativeTransitionOptions = {
        //         direction: 'up',
        //         duration: 500,
        //         slowdownfactor: 3,
        //         slidePixels: 0,
        //         iosdelay: 0,
        //         androiddelay: 0,
        //         fixedPixelsTop: 0,
        //         fixedPixelsBottom: 0
        //
        //         // duration: 400, // in milliseconds (ms), default 400,
        //         // slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
        //         // iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        //         // androiddelay: -1, // same as above but for Android, default -1
        //         // winphonedelay: -1, // same as above but for Windows Phone, default -1,
        //         // fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        //         // fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        //         // triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        //         // backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
        //     }
        //
        //     this.pageTransition.slide(options);
        //
        // }

        return this.nav.navigateForward(url,data);

    }

    /**
     * 새탭으로 열기
     * 앱일경우 외부 브라우저로 열기
     */
    public openNewTab(url:string) {
        if(VUtils.isEmpty(url)) {
            return;
        }
        if(!url.includes('http://') && !url.includes('https://')) {
            url = 'http://' + url;
        }
        if(this.globalVars.isApp) {
            this.openWithSystemBrowser(url);
        } else {
            window.open(url);
        }
    }

    /**
     * 앱일경우 시스템 브라우저로 열기
     * */
    public openWithSystemBrowser(url : string){
        this.inAppBrowser.create(url,'_system');
    }
    /**
     * 페이지 모달팝업
     */
    public async openModal(page, data) {

        const modalPage = await this.modal.create({
            component: page,
            componentProps: data
        });
        modalPage.onDidDismiss().then(data=>{
            console.log('onDidDismiss')
        })
        return await modalPage.present();
    }

    /**
     * 뒤로가기
     * */
    public navigateBack() {
        this.nav.back();
    }
}
