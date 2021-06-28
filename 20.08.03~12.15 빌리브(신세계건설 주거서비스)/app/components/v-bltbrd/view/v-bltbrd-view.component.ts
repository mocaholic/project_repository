import {Component, Input, OnInit} from '@angular/core';
import {SystemService} from "../../../core/service/system/system.service";
import {BltbrdService} from "../../../core/service/bltbrd/bltbrd.service";
import {ActivatedRoute} from "@angular/router";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BltbrdModel} from "../../../core/models/bltbrd/bltbrd-model";
import {RplyService} from "../../../core/service/comments/rply.service";
import {RplyModel} from "../../../core/models/rply/rply-model";
import {RplySearchModel} from "../../../core/models/rply/rply-search-model";
import CodeConstants from "../../../core/constants/code-constants";
import GlobalConstants from "../../../core/constants/global-constants";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {VUtils} from "../../../core/utils/v-utils";
import {BzContAplModel} from "../../../core/models/story/bz-cont-apl-model";
import {BltbrdSearchModel} from "../../../core/models/bltbrd/bltbrd-search-model";
import {FileService} from "../../../core/service/file/file.service";

@Component({
    selector: 'v-bltbrd-view',
    templateUrl: './v-bltbrd-view.component.html',
    styleUrls: ['./v-bltbrd-view.component.scss'],
})
export class VBltbrdViewComponent implements OnInit{

    constructor(
        public systemService: SystemService
        , public bltbrdService: BltbrdService
        , public fileService: FileService
        , public rplyService: RplyService
        , public route: ActivatedRoute
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public eventUtils: VEventUtils
    ) {

    }
    /**
     * 게시판 유형코드
     */
    @Input("bltbrdTpCd") bltbrdTpCd: string;

    /**
     * 댓글 유무
     */
    @Input("isRply") isRply: boolean = true;

    /**
     * 폰트 사이즈 조절 기능 유무
     */
    @Input("isChangeFontSize") isChangeFontSize: boolean = false;

    /**
     * 첨부파일 유무
     */
    @Input("isAtchFile") isAtchFile: boolean = false;
    /**
     * 게시판 글 ID
     */
    bltbrdId: string;
    /**
     * 게시판 상세
     */
    bltbrdDetail: BltbrdModel;
    /**
     * 게시판 댓글 목록
     */
    rplyList: Array<RplyModel> = [];
    /**
     * 게시판 댓글 검색 조건
     */
    rplySearchModel: RplySearchModel = new RplySearchModel();
    /**
     * 폰트 사이즈 클래스
     * ft_m
     * ft_l
     */
    fontSizeClassName: string = '';

    /**
     * 댓글 내용
     */
    newReplyInputData: string = "";

    /**
     * 공통코드 상수
     * */
    CodeConstants = CodeConstants;

    /**
     * 타입 상수
     * */
    GlobalConstants = GlobalConstants;


    /**
     * ngOnInit
     */
    ngOnInit() {

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
                this.bltbrdDetail = model.result["data"] as BltbrdModel;
            });
    }

    /**
     * 댓글 가져오기
     */
    onLoadRply(isMore: boolean=false,isReload= false) {

        const params: any = {
            bltbrdId: this.bltbrdId,
            bzCd: this.globalVars.bzCd,
            usePaging : this.rplySearchModel.usePaging,
            page : this.rplySearchModel.page,
            perPageNum : this.rplySearchModel.perPageNum,
            fetchToPageYn : isReload ? '1' : '0'
        };
        this.rplyService.loadRplyList(params)
            .then((model) => {
                if(isMore) {
                    this.rplyList = VUtils.dataConcat(this.rplyList, model.result["data"] as Array<RplyModel>);
                } else {
                    this.rplyList = model.result["data"] as Array<RplyModel>;
                }
                this.rplySearchModel = model.result["search"] as RplySearchModel;
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
                const callback = () => {
                    this.pageUtils.navigateBack();
                }
                this.eventUtils.alert('게시글이 삭제되었습니다.', '알림', callback);
                // this.goListPage();
            })
        }
        this.eventUtils.confirm('게시글을 삭제하시겠습니까?',confirmCallback);
    }

    /**
     * 수정 페이지로 이동
     */
    goUpdatePage(bltbrdId): void {
        this.pageUtils.navigateForward(this.getUpdatePageUrl()+'/'+bltbrdId);
    }

    /**
     * 목록 페이지로 이동
     */
    goListPage(): void {
        this.pageUtils.navigateForward(this.getListPageUrl());
    }


    /**
     * 수정 페이지 url 가져오기
     */
    getUpdatePageUrl(): string {
        switch(this.bltbrdTpCd) {
            case CodeConstants.BLTBRD.NEWS: {
                return GlobalConstants.MENU.LC_CM_CNW_UPDATE.URL
            }
            case CodeConstants.BLTBRD.LANCABLE: {
                return GlobalConstants.MENU.LC_CM_LAN_UPDATE.URL
            }
            case CodeConstants.BLTBRD.RESIDENT: {
                return GlobalConstants.MENU.LC_CM_CSB_UPDATE.URL
            }
            case CodeConstants.BLTBRD.SHARE: {
                return GlobalConstants.MENU.LC_CM_SHR_UPDATE.URL
            }
            default: {
                return '/'
            }
        }
    }
    /**
     * 목록 페이지 url 가져오기
     */
    getListPageUrl(): string {
        switch(this.bltbrdTpCd) {
            case CodeConstants.BLTBRD.NEWS: {
                return GlobalConstants.MENU.LC_CM_CNW.URL
            }
            case CodeConstants.BLTBRD.LANCABLE: {
                return GlobalConstants.MENU.LC_CM_LAN.URL
            }
            case CodeConstants.BLTBRD.RESIDENT: {
                return GlobalConstants.MENU.LC_CM_CSB.URL
            }
            case CodeConstants.BLTBRD.SHARE: {
                return GlobalConstants.MENU.LC_CM_SHR.URL
            }
            case CodeConstants.BLTBRD.NOTICE: {
                return GlobalConstants.MENU.LC_CM_NTC.URL
            }
            default: {
                return '/'
            }
        }
    }
    /**
     * 상세 페이지 url 가져오기
     */
    getDetailPageUrl(): string {
        switch(this.bltbrdTpCd) {
            case CodeConstants.BLTBRD.NEWS: {
                return GlobalConstants.MENU.LC_CM_CNW_VIEW.URL
            }
            case CodeConstants.BLTBRD.LANCABLE: {
                return GlobalConstants.MENU.LC_CM_LAN_VIEW.URL
            }
            case CodeConstants.BLTBRD.RESIDENT: {
                return GlobalConstants.MENU.LC_CM_CSB_VIEW.URL
            }
            case CodeConstants.BLTBRD.SHARE: {
                return GlobalConstants.MENU.LC_CM_SHR_VIEW.URL
            }
            case CodeConstants.BLTBRD.NOTICE: {
                return GlobalConstants.MENU.LC_CM_NTC_VIEW.URL
            }
            default: {
                return '/'
            }
        }
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

    /**
     * 댓글 삭제
     * */
    deleteRply(replyId) {
        const confirmCallback = async () => {
            const params: any = {
                rplyId: replyId,
                bltbrdId: this.bltbrdId,
                bzCd: this.globalVars.bzCd,
            };
            this.rplyService.deleteRply(params).then((model)=>{
                this.eventUtils.alert('댓글이 삭제되었습니다.');
                this.onLoadRply(false,true);
            })

        }
        this.eventUtils.confirm('댓글을 삭제하시겠습니까?',confirmCallback);
    }

    /**
     * 댓글 등록
     * */
    insertRply() {
        if(VUtils.isEmpty(this.newReplyInputData)) {
            this.eventUtils.alert('댓글을 입력해 주세요.');
            return;
        }
        const confirmCallback = async () => {
            const params: any = {
                bltbrdId: this.bltbrdId,
                bzCd: this.globalVars.bzCd,
                rplyCts: this.newReplyInputData
            };
            this.rplyService.insertRply(params).then((model)=>{
                this.newReplyInputData = "";
                this.eventUtils.alert('댓글이 등록되었습니다.');
                this.onLoadRply(false,true);
            })

        }
        this.eventUtils.confirm('입력한 내용으로 댓글을 등록하시겠습니까?',confirmCallback);

    }

    /**
     * 댓글 더보기
     * */
    moreRplyList() {
        if(this.rplySearchModel.page >= this.rplySearchModel.totalEndPage) {
            return;
        }
        this.rplySearchModel.page += 1;
        this.onLoadRply(true);
    }

    /**
     * 해당 id의 글로 이동
     * */
    goPage(bltbrdId) {
        if(!bltbrdId) {
            return;
        }
        if(bltbrdId== -1) {
            return;
        }
        this.pageUtils.navigateForward(this.getDetailPageUrl()+"/"+bltbrdId);
    }

    /**
     * 판매완료로 변경
     * */
    onClickSaleDone() {
        const confirmCallback = async () => {
            const params: any = {
                bltbrdId: this.bltbrdId,
                bltbrdTpCd: this.bltbrdTpCd,
                bzCd: this.globalVars.bzCd
            };
            this.bltbrdService.updateSaleDone(params).then((model)=>{

                if(model.isResultOK()) {
                    this.bltbrdDetail.bltbrdStats = this.GlobalConstants.BLTBRD_STATS.SALE_COMPLETED.TYPE
                }
            })
        }
        this.eventUtils.confirm('판매완료 상태로 변경하시겠습니까?',confirmCallback);
    }

    /**
     * 수정여부 체크
     * 내글+댓글없을때만 true
     * */
    isEnableUpdate() {
        if(this.bltbrdDetail?.iptId === this.globalVars.userDetail.custId) {
            if(this.rplyList && this.rplyList.length===0) {
                return true;
            }
        }
        return false;
    }
}
