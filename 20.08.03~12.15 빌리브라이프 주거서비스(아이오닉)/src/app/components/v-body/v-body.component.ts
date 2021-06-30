import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {VBottomComponent} from "../v-bottom/v-bottom.component";
import {VPageUtils} from "../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../core/utils/v-global-vars";
import GlobalConstants from "../../core/constants/global-constants";
import {MnuModel} from "../../core/models/mnu-model";
import {MyPageService} from "../../core/service/my-page/my-page.service";
import {Router} from "@angular/router";
import {VUtils} from "../../core/utils/v-utils";
import {VEventUtils} from "../../core/utils/v-event-utils";
import {ModalEventModel} from "../../core/models/modal-event-model";
import {NgEventBus} from "ng-event-bus";
import {NavController} from "@ionic/angular";
@Component({
    selector: 'v-body',
    templateUrl: './v-body.component.html',
    styleUrls: ['./v-body.component.scss'],
})
export class VBodyComponent implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public globalVars: VGlobalVars
        , public myPageService: MyPageService
        , private router: Router
        , private eventBus: NgEventBus
        , private navController: NavController
    ) {
    }
    /**
     * 제목
     * */
    @Input("title") title;

    /**
     * 메뉴 id
     * */
    @Input("mnuId") mnuId;

    /**
     * 서비스 id
     * */
    @Input("svcId") svcId;

    /**
     * 마이메뉴 팝업 on/off
     * */
    isShowMyMnuPopup: boolean = false;

    /**
     *
     */
    myMnuStatus: string;

    /**
     * 메뉴 목록
     */
    mnuList: Array<MnuModel>;

    scrollY: number = 0;
    // isShowBottom: boolean = true;
    isShowTop: boolean = false;
    isExistMyMnuFavorites: boolean;

    readonly menuTypeConstants: GlobalConstants.MENU = GlobalConstants.MENU;

    ngOnInit() {
        // window.addEventListener('scroll', this.scrollEvent, true);
        if(this.globalVars.isLogin) {
            this.isExistMyMnu();
        }
        this.eventBus.on('common:movePage').subscribe(() => {
            this.closeMyMnuPopup();
            this.isShowTop = false;
        });
        window['onPageBack'] = this.onPageBack;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes["svcId"]) {
            this.isExistMyMnu();
        }
    }

    // ngOnDestroy() {
    //     window.removeEventListener('scroll', this.scrollEvent, true);
    // }

    // scrollEvent = (event: any): void => {
    //     if (event.target.localName !== "v-body") {
    //         return;
    //     }
    //     const newScrollY = event.target.scrollTop;
    //     if (this.scrollY < newScrollY) {
    //         this.isShowBottom = false;
    //     }
    //     if (this.scrollY > newScrollY) {
    //         this.isShowBottom = true;
    //     }
    //
    //     if (newScrollY < 5) {
    //         this.isShowBottom = true;
    //     }
    //     if (newScrollY > event.target.scrollHeight - event.target.clientHeight -5) {
    //         this.isShowBottom = false;
    //     }
    //     this.scrollY = newScrollY;
    // }
    /**
     * 마이메뉴 별 버튼 클릭
     */
    onClickMyMenuFavorites() {
        if(!this.globalVars.isLogin) {
            this.eventUtils.alert("마이메뉴 등록은 로그인 후 이용 가능합니다.");
            return;
        }
        if(this.isExistMyMnuFavorites) {
            this.deleteMyMenu();
        } else{
            this.addMyMenu();
        }
    }
    /**
     * 마이메뉴 추가
     */
    addMyMenu() {

        const params: any = {
            mnuId: this.mnuId ? this.mnuId : null,
            svcId: this.svcId ? this.svcId : null
        };
        this.myPageService.insertMyMnu(params).then((model) => {
            if(model.isResultOK()) {
                this.eventUtils.alert('마이메뉴에 등록되었습니다.');
                this.isExistMyMnuFavorites = true;
            } else {
                const confirmCallback = async () => {
                    this.pageUtils.navigateForward(this.menuTypeConstants.MP_MENU.URL);
                }
                this.eventUtils.confirm(model.result['msg'],confirmCallback);
            }
        });
    }

    /**
     * 마이메뉴 삭제
     */
    deleteMyMenu() {

        const params: any = {
            mnuId: this.mnuId ? this.mnuId : null,
            svcId: this.svcId ? this.svcId : null
        };
        this.myPageService.deleteMyMnu(params).then((model) => {
            if(model.isResultOK()) {
                this.eventUtils.alert('마이메뉴에서 삭제되었습니다.');
                this.isExistMyMnuFavorites = false;
            } else {
                this.eventUtils.alert(model.result['msg']);
            }
        });
    }

    /**
     * 마이메뉴 등록여부 확인
     */
    isExistMyMnu() {
        if(this.mnuId || this.svcId) {
            const params: any = {
                mnuId: this.mnuId ? this.mnuId : null,
                svcId: this.svcId ? this.svcId : null
            };
            this.myPageService.isExistMyMnu(params).then((model) => {
                this.isExistMyMnuFavorites = model.result['data'] === "1";
            });
        }
    }
    /**
     * 마이메뉴 팝업 열기
     */
    openMyMnuPopup() {
        this.isShowMyMnuPopup = true;

        if( !this.globalVars.isPc ) {
            VUtils.pauseMainAnimation(this.router);
        }
        this.myMnuStatus = 'show';

        this.loadMyMnuList();

    }

    /**
     * 마이메뉴 팝업 닫기
     * #forceClick <-- 실제 마이메뉴에서 클릭으로 닫았는지 여부
     */
    closeMyMnuPopup(forceClick?: boolean): Promise<any> {

        if( !this.globalVars.isPc && forceClick ) {

            this.myMnuStatus = 'hide';

            return new Promise<any>( (resolve) => {

                setTimeout( () => {
                    this.isShowMyMnuPopup = false;
                    this.myMnuStatus = null;
                    VUtils.playMainAnimation(this.router);
                    resolve(true);
                }, 400);
            })

        } else {
            this.myMnuStatus = 'hide';
            return new Promise<any>( (resolve) => {
                setTimeout( () => {
                    this.isShowMyMnuPopup = false;
                    resolve(true);
                }, 300);
            })
        }



    }
    /**
     * 마이메뉴 목록
     */
    loadMyMnuList() {

        const params: any = {
        };
        this.myPageService.loadMyMnuList(params).then((model) => {
            this.mnuList = model.result['data'] as Array<MnuModel>;

        });
    }
    /**
     * 마이메뉴 아이콘 클래스
     */
    getIconClassName(menu) {
        if(menu.mnuId) {
            return this.menuTypeConstants[menu.mnuId].ICON;
        } else {
            return this.menuTypeConstants[menu.svcGrpCd].ICON;
        }
    }
    /**
     * 마이메뉴 이름
     */
    getMenuName(menu) {
        if(menu.mnuId) {
            // return this.menuTypeConstants['menu.mnuId'];
            return this.menuTypeConstants[menu.mnuId].MNU_NM;
        } else {
            return menu.svcNm;
        }
    }
    /**
     * 마이메뉴 url
     */
    getMenuUrl(menu) {
        // this.closeMyMnuPopup();
        if(menu.mnuId) {
            return this.menuTypeConstants[menu.mnuId].URL;
        } else {
            return this.menuTypeConstants[menu.svcGrpCd].URL+'/'+menu.svcId;
        }
    }
    /**
     * 페이지이동
     */
    goPage(url,data?) {
        this.pageUtils.navigateForward(url,data);
    }

    /**
     * 마이메뉴에서 페이지 이동
     */
    goPageFromMyMnu(url) {

        this.closeMyMnuPopup(true)
            .then( () => {
                this.goPage(url);
            });
    }
    /**
     * 페이지이동
     */
    openVillivHomePage() {
        this.pageUtils.openNewTab('https://villiv.co.kr/');
    }

    /**
     * 마이메뉴 모션 클래스 (pc,mp)
     */
    getMnuMotionClass() {
        if(this.globalVars.isPc) {
            return {'active' : (this.myMnuStatus == 'show'), 'inactive': (this.myMnuStatus == 'hide')}
        } else {
            return {'active-mymnu' : (this.myMnuStatus == 'show'), 'inactive-mymnu' : (this.myMnuStatus == 'hide')}
        }
    }

    onPageBack = () => {
        this.navController.back();
    }

}
