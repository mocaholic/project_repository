import {
    AfterViewInit,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    SimpleChanges, ViewChild
} from '@angular/core';
import {VGlobalVars} from "../../core/utils/v-global-vars";
import {VPageUtils} from "../../core/utils/v-page-utils.service";
import {CodeModel} from "../../core/models/code-model";
import {TerrBzModel} from "../../core/models/story/terr-bz";
import {SystemService} from "../../core/service/system/system.service";
import {MainService} from "../../core/service/main/main.service";
import {VUtils} from "../../core/utils/v-utils";
import {VStorageUtils} from "../../core/utils/v-storage-utils";
import {NgEventBus} from "ng-event-bus";
import {VEventUtils} from "../../core/utils/v-event-utils";
import {MnuModel} from "../../core/models/mnu-model";
import GlobalConstants from "../../core/constants/global-constants";
import {MyPageService} from "../../core/service/my-page/my-page.service";
import {Router} from "@angular/router";
import {CodeEnums} from "../../core/enums/code-enums";
import {IonSlides} from "@ionic/angular";

declare var $: any;

declare var Swiper;

@Component({
    selector: 'v-top',
    templateUrl: './v-top.component.html',
    styleUrls: ['./v-top.component.scss'],
})
export class VTopComponent implements OnInit, AfterViewInit {

    constructor(
        public systemService: SystemService
        , public mainService: MainService
        , public myPageService: MyPageService
        , public pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public globalVars: VGlobalVars
        , private eventBus: NgEventBus
        , private router: Router
    ) {
    }

    /**
     * 선택된 메뉴 탭 인덱스
     */
    selectedMenuTabIndex = 0;


    @ViewChild("menuSlider") menuSlider: IonSlides;

    /**
     * 제목
     * */
    @Input("title") title;

    /**
     * 메뉴 팝업 on/off
     * */
    @Input("isShow") isShow: boolean;

    /**
     * 메뉴 팝업 on/off 변경 이벤트
     * */
    @Output() isShowChange = new EventEmitter<boolean>();

    @Output() openMyMnu = new EventEmitter();

    /**
     * 단지선택 팝업 on/off
     * */
    isShowSelectBzPopup: boolean = false;

    /**
     * 선택한 지역코드
     * */
    selectedTerrCd: string;

    /**
     * 선택한 단지코드
     * */
    selectedBzCd: string;

    /**
     * 선택한 단지아이디
     * */
    selectedBzId: string;

    /**
     * 단지 목록
     */
    terrBzList: Array<TerrBzModel> = [];

    /**
     * 지역코드 목록
     */
    terrCdList: Array<CodeModel> = [];

    /**
     * 단지목록이 존재하는 지역 코드
     */
    existBzTerrCdList: Array<CodeModel> = [];

    /**
     * 해당 지역 단지 목록
     */
    terrListByCd: Array<TerrBzModel> = [];

    /**
     * 메뉴 목록
     */
    mnuList: Array<MnuModel> = [];

    /**
     * 카카오채널
     */
    kakaoChnl: string = "";
    /**
     * 지역별 단지 목록 load 여부
     */
    isLoadTerrBzList: boolean = false;

    /**
     * 메뉴 타입상수
     */
    readonly menuTypeConstants: GlobalConstants.MENU = GlobalConstants.MENU;

    currentUrl: string;

    ngOnInit() {}

    ngAfterViewInit(): void {

        this.currentUrl = this.router.url
        this.selectedMenuTabIndex = this.currentUrl.includes('bz-service') ? 1 : 0;
        this.loadMenu();

    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes["isShow"]) {
            if(this.isShow && this.router.url !=='/') {

            }
        }
    }

    /**
     * 메뉴 탭 변경
     * @param idx
     */
    changeMenuTab(idx: number): void {
        if( !this.globalVars.isPc ) {
            this.selectedMenuTabIndex = idx;
            this.menuSlider.slideTo(idx, 400);
        }
    }

    /**
     * 메뉴 슬라이드 변경시
     */
    onSlideChanged() {
        this.menuSlider.getActiveIndex()
            .then((idx: number) => {
                console.log('changed idx===', idx);
                this.selectedMenuTabIndex = idx;
            });
    }

    /**
     * 메뉴 가져오기
     */
    loadMenu() {
        const params: any = {
            bzCd : this.globalVars.bzCd,
        };

        const loadedMnuList = this.globalVars.getMenuList();
        if( loadedMnuList && loadedMnuList.length > 0 ) {

            this.mnuList = loadedMnuList;
            this.kakaoChnl = this.globalVars.kakaoChnlId;

            this.currentUrl = this.router.url;
            this.selectedMenuTabIndex = this.currentUrl.includes('bz-service') ? 1 : 0;
            this.changeMenuTab(this.selectedMenuTabIndex);

        } else {

            this.mainService.loadMenu(params)
                .then((model) => {

                    this.mnuList = model.result['data'] as Array<MnuModel>;
                    this.kakaoChnl = model.result['kakaoChnlId'];

                    this.globalVars.setMenuList(this.mnuList);
                    this.globalVars.kakaoChnlId = this.kakaoChnl;

                    this.currentUrl = this.router.url;
                    this.selectedMenuTabIndex = this.currentUrl.includes('bz-service') ? 1 : 0;
                    this.changeMenuTab(this.selectedMenuTabIndex);

                    if( !this.globalVars.isPc ) {
                        setTimeout( () => {
                            this.menuSlider.update();
                        }, 1000)
                    }

                });

        }


    }

    /**
     * 그룹아이디 별 메뉴 존재 여부
     */
    isExistMnuListBygrpId(grpId) {
        let mnuList = this.getMnuListBygrpId(grpId);
        return mnuList.length>0;
    }
    /**
     * 그룹아이디 별 메뉴 가져오기
     */
    getMnuListBygrpId(grpId) {
        return this.mnuList.filter(function(mnu:MnuModel) {
            if(mnu.grpId === grpId) {
                return true;
            }
        })
    }
    /**
     * 메뉴 존재여부
     */
    isExistMnuByMnuId(mnuId) {
        return VUtils.isExist(this.mnuList,{mnuId:mnuId})
    }

    /**
     * 하위메뉴 존재여부
     */
    isExistChildMnu(childMnuIdList: Array<string>) {
        for(let i=0; i<childMnuIdList.length; i++) {
            if(this.isExistMnuByMnuId(childMnuIdList[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     * 메뉴 닫기
     */
    closeMenu() {

        if( !this.globalVars.isPc ) {
            VUtils.setMotionDuration( () => {
                VUtils.playMainAnimation(this.router);
            })
        }

        $('v-body').css('overflow-y', 'auto');

        this.isShow = false;
        this.isShowChange.emit(this.isShow);
    }

    /**
     * 페이지이동
     */
    goPage(url,isLoginRequired=true,isExternal = false) {
        if (isLoginRequired && !this.globalVars.isLogin) {
            const confirmCallback = async () => {
                this.closeMenu();
                VUtils.setMotionDuration(() => {
                    this.pageUtils.navigateForward(GlobalConstants.MENU.LOGIN.URL);
                }, {delay: 200})

            }
            let msg = this.globalVars.bzNm +' 입주민 전용 서비스입니다.';
            if(this.currentUrl===GlobalConstants.MENU.LOGIN.URL) {
                msg += '\n로그인 후 이용해 주세요.';
                this.eventUtils.alert(msg);
            } else {
                this.eventUtils.confirm(msg, confirmCallback,'확인','로그인');
            }
        } else {
            /* 모션감을 주기 위해 timeout 적용 */
            this.closeMenu();
            VUtils.setMotionDuration(() => {
                if (isExternal) {
                    this.pageUtils.openNewTab(url);
                } else {
                    this.pageUtils.navigateForward(url);
                }
            }, {delay: 200})


        }
    }

    /**
     * 메뉴에 마우스 올릴경우 메뉴 열리기 (pc만)
     */
    onMouseEnter(menu: any) {
        if(this.globalVars.isPc) {
            menu.hidden = false;
        }
    }

    /**
     * 메뉴에서 마우스 나갈경우 메뉴 닫히기 (pc만)
     */
    onMouseLeave(menu: any) {
        if(this.globalVars.isPc) {
            menu.hidden = true;
        }
    }

    /**
     * 단지코드 팝업 열기
     */
    async openSelectBzPopup() {
        if(!this.isLoadTerrBzList) {
            this.isLoadTerrBzList=true;
            await this.onLoadTerrCdList();
            await this.onLoadTerrList();
        }
        // this.goPage('/gate');
        this.isShowSelectBzPopup = true;
    }

    /**
     * 단지코드 팝업 닫기
     */
    closeSelectBzPopup() {
        this.isShowSelectBzPopup = false;
        this.selectedTerrCd = null;
        this.selectedBzCd = null;
        this.selectedBzId = null;

    }

    /**
     * 단지코드 바꾸기
     */
    onClickChangeBz() {

        if(VUtils.isEmpty(this.selectedTerrCd)) {
            this.eventUtils.alert('지역을 선택해 주세요');
            return;
        }
        if(VUtils.isEmpty(this.selectedBzId)) {
            this.eventUtils.alert('단지를 선택해 주세요.');
            return;
        }
        if(this.selectedBzCd === this.globalVars.bzCd) {
            this.eventUtils.alert('선택한 단지가 현재 단지와 동일합니다.');
            return;
        }
        let bzModel = VUtils.getObjByKey(this.terrListByCd,{bzId: this.selectedBzId})

        const confirmCallback = async () => {
            VStorageUtils.getInstance().set("bzModel",JSON.stringify(bzModel)).then(()=>{
                this.globalVars.logout(true);
                window.location.href='/';
            });
        }
        if(this.globalVars.isLogin) {
            this.eventUtils.confirm('입주 단지 외의 단지로 이동 시, 로그아웃 후 이용이 가능합니다.<br>로그아웃 하시겠습니까?',confirmCallback);
        } else {
            confirmCallback();
        }

    }

    /**
     * 지역코드 목록 가져오기
     */
    public async onLoadTerrCdList() {
        const params: any = {
            parentCode: CodeEnums.GateTerrCat,
            addAll: 0
        };
        await this.systemService.commonSubCode(params)
            .then((model) => {
                this.terrCdList = model.result["data"] as Array<CodeModel>;
            });
    }

    /**
     * 단지 목록 가져오기
     */
    public async onLoadTerrList() {
        const params: any = {

        };
        await this.mainService.loadTerrBzList(params)
            .then((model) => {
                let allTerrBzList = model.result["data"] as Array<TerrBzModel>;
                this.terrBzList = allTerrBzList.filter(function(terr) {
                    if (terr.lsYn === "0") {
                        return true;
                    }
                });
                VUtils.partition(this.terrBzList,'terrCd').forEach((arr: TerrBzModel)=>{

                    let codeModel = VUtils.getObjByKey(this.terrCdList,{cd: arr[0].terrCd})
                    if(codeModel) {
                        this.existBzTerrCdList.push(codeModel);
                    }
                })
            });
    }

    /**
     * 지역 선택 상자 변경 이벤트
     */
    onChangeTerrCode() {
        this.selectedBzCd = null;
        this.selectedBzId = null;

        let cd = this.selectedTerrCd
        this.terrListByCd = this.terrBzList.filter((terr:TerrBzModel) => {
            if(terr.terrCd === cd) {
                return true;
            }
        });
    }

    /**
     * 로그아웃
     */
    onClickLogout() {
        this.globalVars.logout();
        this.eventUtils.alert('로그아웃 되었습니다. 이용해 주셔서 감사합니다.', '알림',
            ()=> {

            this.closeMenu();
            VUtils.setMotionDuration( ()=> {
                this.pageUtils.navigateForward('/');
            })


        })


    }

    /**
     * 카카오채널 존재여부
     * */
    isExistKakaoChnl() {
        return !VUtils.isEmpty(this.kakaoChnl);
    }

    /**
     * 마이메뉴 팝업 열기
     */
    openMyMnuPopup() {
        this.openMyMnu.emit();
    }

    /**
     * TODO remove
     * 미개발 페이지 alert
     */
    ingPage() {
        this.eventUtils.alert("작업 진행중인 페이지 입니다.")
    }

    getMenuClassName() {
        if(this.globalVars.isPc) {
            return ''
        }
        return this.isShow ? 'on' : 'off';

    }

    /**
     * 단지 변경시 발생하는 이벤트
     * @param data
     */
    onChangeBzId(data: any): void {

        this.selectedBzCd = data.bzCd;
        this.selectedBzId = data.bzId;

    }

}
