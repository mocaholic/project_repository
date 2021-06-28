import {Component, OnInit} from '@angular/core';
import {VUtils} from "../../../../core/utils/v-utils";
import {ActivatedRoute, Router} from "@angular/router";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {BsSvcService} from "../../../../core/service/bs-service/bs-svc.service";
import {BsPtnrModel} from "../../../../core/models/bs-svc/ptnr/bs-ptnr-model";
import {SystemService} from "../../../../core/service/system/system.service";
import {CodeEnums} from "../../../../core/enums/code-enums";
import {CodeModel} from "../../../../core/models/code-model";
import {BasePage} from "../../../BasePage";
import GlobalConstants from "../../../../core/constants/global-constants";

@Component({
    selector: 'app-ptnr-resv',
    templateUrl: './ptnr-resv.page.html',
    styleUrls: ['../resv.page.scss'],
})
export class PtnrResvPage extends BasePage implements OnInit {

    constructor(
        public bsSvcService: BsSvcService
        , public systemService: SystemService
        , public route: ActivatedRoute
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 제휴업체 아이디
     * */
    ptnrId: string;

    /**
     * 제휴업체 상세
     * */
    ptnr: BsPtnrModel;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    /**
     * 선택날짜
     * */
    selectedDate: string;

    /**
     * 요청사항
     * */
    reqCts: string;

    /**
     * 취소/환불정책 동의
     * */
    selectedAgree: string

    /**
     * 영랑호 객실 타입 코드 목록
     * */
    roomTypeCodeList: Array<CodeModel> = [];


    ngOnInit() {

    }

    ionViewDidEnter() {
        this.ptnrId = this.route.snapshot.params['ptnrId'];

        if (VUtils.isValidDbRowId(this.ptnrId)) {
            this.loadPtnrDetail();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.");
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 제휴업체 가져오기
     */
    loadPtnrDetail() {

        const params: any = {
            ptnrId: this.ptnrId,
            bzCd : this.globalVars.bzCd,
        };
        this.bsSvcService.loadPtnrDetail(params).then((model) => {
            this.ptnr = model.result['data'] as BsPtnrModel;
            if(this.ptnr.ptnrTp === "A") {
                this.loadRoomTypeCodeList();
            }
            this.onPageReady();
        });
    }

    /**
     * 제휴업체 예약하기
     */
    insertPtnrReserv() {

        const params: any = {
            ptnrId: this.ptnrId,
            bzCd : this.globalVars.bzCd,
            resvDt: this.selectedDate,
            reqCts: this.reqCts
        };
        this.bsSvcService.insertPtnrResv(params).then((model) => {
            if(model.isResultOK()) {

                const confirmCallback = async () => {
                    this.pageUtils.navigateBack();
                    setTimeout(() => {
                        this.pageUtils.navigateForward(GlobalConstants.MENU.MP_PARTNER_VIEW.URL+'/'+model.result['data']['ptnrResvId']);
                    }, 500);
                }
                const cancelCallback = async () => {
                    this.selectedDate = null;
                    this.reqCts = null;
                    this.selectedAgree = null;
                }

                this.eventUtils.confirm('서비스 이용/예약 신청이 완료되었습니다.\n신청내역을 확인하시겠습니까?', confirmCallback,'확인','확인',cancelCallback);



            } else {
                this.eventUtils.alert(model.result['msg']);
            }
        });
    }
    /**
    * 예약하기
    * */
    onClickReserv() {
        if(!this.selectedDate) {
            this.eventUtils.alert('예약일자를 선택해 주세요.');
            return;
        }

        if(this.ptnr.ptnrTp==='A' && VUtils.isEmpty(this.reqCts)) {
            this.eventUtils.alert('객실타입을 선택해 주세요.');
            return;
        }
        if(!this.selectedAgree) {
            this.eventUtils.alert('유의사항 확인 여부를 체크해 주세요.');
            return;
        }
        const confirmCallback = async () => {
            this.insertPtnrReserv();
        }

        this.eventUtils.confirm('입력하신 내용으로 서비스 이용/예약 신청을 \n진행하시겠습니까?',  confirmCallback);

    }
    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }

    /**
     * 서비스정보 페이지로 이동
     * */
    goServiceInfoPage() {
        this.pageUtils.navigateForward(GlobalConstants.MENU.BS_SVC.URL+'/'+this.ptnr.svcId);
    }

    /**
     * 영랑호 객실 유형 코드 가져오기
     * */
    loadRoomTypeCodeList() {
        const params: any = {
            parentCode: CodeEnums.PtnrRoomTypeCat,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.roomTypeCodeList = model.result["data"] as Array<CodeModel>;
            });
    }

}
