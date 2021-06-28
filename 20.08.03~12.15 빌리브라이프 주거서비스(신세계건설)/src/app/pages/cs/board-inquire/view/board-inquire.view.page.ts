import {Component, OnInit} from '@angular/core';
import {SystemService} from "../../../../core/service/system/system.service";
import {BltbrdService} from "../../../../core/service/bltbrd/bltbrd.service";
import {FileService} from "../../../../core/service/file/file.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";
import {BltbrdModel} from "../../../../core/models/bltbrd/bltbrd-model";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import CodeConstants from "../../../../core/constants/code-constants";
import GlobalConstants from "../../../../core/constants/global-constants";
import {VUtils} from "../../../../core/utils/v-utils";
import {BasePage} from "../../../BasePage";


@Component({
    selector: 'app-board-inquire',
    templateUrl: './board-inquire.view.page.html',
    styleUrls: ['./board-inquire.view.page.scss'],
})
export class BoardInquireViewPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public bltbrdService: BltbrdService
        , public fileService: FileService
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
     * 게시판 글 ID
     */
    bltbrdId: string;

    /**
     * 게시판 타입
     */
    bltbrdTpCd: string;

    /**
     * 게시판 질문 글 상세
     */
    bltbrdInquireDetail: BltbrdModel;
    /**
     * 게시판 질문 글 상세
     */
    bltbrdAnswerDetail: BltbrdModel;



    /**
     * ngOnInit
     */
    ngOnInit() {

    }

    ionViewDidEnter() {
        this.bltbrdId = this.route.snapshot.params['bltbrdId'];
        this.bltbrdTpCd = CodeConstants.BLTBRD.INQUIRE;
        if(VUtils.isValidDbRowId(this.bltbrdId)) {
            this.onLoadBltbrd();
        } else {
            this.eventUtils.alert("잘못된 접근입니다.")
            this.pageUtils.navigateForward('/');
        }
    }

    /**
     * 게시글 가져오기
     */
    onLoadBltbrd() {

        const params: any = {
            bltbrdId: this.bltbrdId,
            bltbrdTpCd: this.bltbrdTpCd,
            bzCd: this.globalVars.bzCd
        };
        this.bltbrdService.loadBltbrdDetail(params)
            .then((model) => {
                this.bltbrdInquireDetail = model.result["data"] as BltbrdModel;
                this.bltbrdAnswerDetail = this.bltbrdInquireDetail.answer;
                this.onPageReady();
            });
    }

    /**
     * 삭제하기
     */
    deleteBltbrd(): void {
        const confirmCallback = async () => {
            const params: any = {
                bltbrdId: this.bltbrdId,
                bzCd: this.globalVars.bzCd,
                bltbrdTpCd: this.bltbrdTpCd,
            };
            this.bltbrdService.deleteBltbrd(params).then((model)=>{
                this.eventUtils.alert('게시글이 삭제되었습니다.');
                this.goListPage();

            })

        }
        this.eventUtils.confirm('게시글을 삭제하시겠습니까?',confirmCallback);
    }
    /**
     * 목록 페이지로 이동
     */
    goListPage(): void {
        this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CS_INQ.URL);
    }

    /**
     * 파일 다운로드
     */
    downloadFile(fileId): void {
        const params: any = {
            fileId: fileId,
        };
        this.fileService.downloadFile(params).then((model)=>{

            console.log(model)
        })
    }

}
