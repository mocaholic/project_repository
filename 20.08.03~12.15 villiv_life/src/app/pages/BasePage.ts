import {VUtils} from "../core/utils/v-utils";
import {VGlobalVars} from "../core/utils/v-global-vars";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {SystemService} from "../core/service/system/system.service";
import {CodeEnums} from "../core/enums/code-enums";
import {CodeModel} from "../core/models/code-model";
import GlobalConstants from "../core/constants/global-constants";

declare var $: any;

/**
 * 빌리브 앱의 기본 페이지
 */
export class BasePage {

    pageLoaded: boolean;
    globalVars: VGlobalVars;
    systemService: SystemService;
    router: Router;

    isPageReady: boolean = false;
    /**
     * 각 페이지에서의 컨텐츠를 보여줄때 호출해야 한다.
     */
    onPageReady(): void {
        // const pageBody: HTMLElement = document.querySelector('.page-body');
        $('.page-body').css('visibility','visible');
        // console.log('pageBody=', pageBody);
        // pageBody.style.visibility = 'visible';
    }


    constructor(private mand: any, private opt?: any) {
        this.systemService = mand.systemService as SystemService;
        this.globalVars = mand.globalVars as VGlobalVars;
        this.router = mand.router as Router;
    }

    ionViewWillEnter(item) {

        if( this.router.url == '/' ) {
            VUtils.playMainAnimation(this.router);
        }



        // console.log('ionViewWillEnter url=' + this.router.url);
        this.insertActionLog();
    }

    ionViewWillLeave() {


    }

    insertActionLog() {
        let url = this.router.url;
        let mnuTp = url.includes(GlobalConstants.MENU.BS_SVC.URL) ? 'B' : 'A'

        const params: any = {
            bzCd: this.globalVars.bzCd ? this.globalVars.bzCd : '',
            custId: this.globalVars.userDetail ? this.globalVars.userDetail.custId : '',
            statTp: 'A',
            platformTp: this.globalVars.platformTp,
            mnuTp: mnuTp,
            mnuId: this.getMnuId(url,mnuTp),
            actionPath: url,
        };
        this.systemService.insertActionLog(params)
            .then((model) => {

            });

    }
    insertClickActionLog(params) {
        this.systemService.insertActionLog(params)
            .then((model) => {

            });
    }

    getMnuId(url ,mnuTp) {

        if(mnuTp === 'B') {
            let list = url.split( '/' )
            return list[list.length-1];
        } else {
            let id;
            for( const key in GlobalConstants.MENU ) {
                if(GlobalConstants.MENU[key].URL !== '/' && url.includes(GlobalConstants.MENU[key].URL)) {
                    id = GlobalConstants.MENU[key].MNU_ID;
                    break;
                }
            }
            return id;
        }
    }

}
