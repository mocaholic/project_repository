import {Component, OnInit} from '@angular/core';
import {BsSvcService} from "../../../../core/service/bs-service/bs-svc.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {VUtils} from "../../../../core/utils/v-utils";
import {ActivatedRoute, Router} from "@angular/router";
import {LecModel} from "../../../../core/models/bs-svc/lec/lec-model";
import GlobalConstants from "../../../../core/constants/global-constants";
import {BasePage} from "../../../BasePage";
import {SystemService} from "../../../../core/service/system/system.service";


@Component({
    selector: 'app-lecture',
    templateUrl: './lecture.view.page.html',
    styleUrls: ['./lecture.view.page.scss'],
})
export class LectureViewPage extends BasePage implements OnInit {

    constructor(
        public bsSvcService: BsSvcService
        , public systemService: SystemService
        , public pageUtils: VPageUtils
        , public eventUtils: VEventUtils
        , public route: ActivatedRoute
        , public globalVars: VGlobalVars

        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }

    /**
     * 문화강좌 아이디
     * */
    lecId: string;

    /**
     * 문화강좌 상세
     * */
    lecDetail: LecModel;

    /**
     * 취소/환불정책 동의
     * */
    selectedAgree: string;

    /**
     * 선택한 탭
     * */
    selectedTab: string;

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.lecId = this.route.snapshot.params['lecId'];

        if (VUtils.isValidDbRowId(this.lecId)) {
            this.onLoadLecDetail();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.");
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 문화강좌 상세 가져오기
     */
    onLoadLecDetail() {

        const params: any = {
            lecId: this.lecId,
            bzCd: this.globalVars.bzCd
        };
        this.bsSvcService.loadLecDetail(params)
            .then((model) => {
                this.lecDetail = model.result["data"] as LecModel;
                this.onPageReady();
            });
    }

    /**
     * 예약하기
     * */
    onClickLecApply() {
        if (!this.selectedAgree) {
            this.eventUtils.alert('유의사항 및 취소/환불정책 확인여부를 체크해 주세요.');
            return;
        }
        //TODO check 신청여부/취소여부
        // this.checkValidationAndLecApply();

        //TODO remove
        this.insertLecApply();
    }

    /**
     * 문확강좌 신청여부 확인하기
     */
    checkValidationAndLecApply() {
        // TODO
        //  -예약(insert)
        //  -조회(예약여부 && 취소여부)
        const params: any = {
            lecId: this.lecId,
            bzCd : this.globalVars.bzCd,
        };

        this.bsSvcService.isExistLecApply(params).then((model) => {
            if(model.isResultOK()) {

                const confirmCallback = async () => {
                    this.insertLecApply();
                }
                this.eventUtils.confirm('문화강좌 신청을 진행하시겠습니까?',confirmCallback);

            } else {
                this.eventUtils.alert(model.result['msg']);

                /*
                    TODO
                 * 1.이미 신청한 강좌입니다.
                 *  신청내역을 확인해 주세요.
                 * 2.죄송합니다.
                 *   해당 문화강좌의 취소 이력이 있어 신청을 할수 없습니다.
                 * */
            }
        });
    }

    /**
     * 문화강좌 신청하기
     */
    insertLecApply() {

        const params: any = {
            resvTp: 'E',
            prdId: this.lecId,
            bzCd : this.globalVars.bzCd,
            feeTot: this.lecDetail.lecFee
        };

        this.bsSvcService.insertLecApply(params).then((model) => {
            if(model.isResultOK()) {
                const confirmCallback = async () => {
                    this.pageUtils.navigateForward(GlobalConstants.MENU.MP_SVC_VIEW.URL);
                }
                this.eventUtils.confirm('문화강좌 신청이 완료되었습니다.\n신청내역을 확인하시겠습니까?',confirmCallback);

            } else {
                this.eventUtils.alert(model.result['msg']);
            }
        });
    }

    /**
     * 목록 페이지로 이동
     */
    goListPage(): void {

        this.pageUtils.navigateForward(GlobalConstants.MENU.BS_CULTURE.URL);

    }

    /**
     * 탭버튼 클릭
     * */
    onClickTab(tab) {
        this.selectedTab = tab;
    }
}
