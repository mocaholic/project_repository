import {Component, ElementRef, ViewChild, AfterContentInit, AfterViewChecked, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import CodeConstants from "../../../core/constants/code-constants";
import GlobalConstants from "../../../core/constants/global-constants";
import {ActivatedRoute} from "@angular/router";
import {BltbrdModel} from "../../../core/models/bltbrd/bltbrd-model";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {BltbrdService} from "../../../core/service/bltbrd/bltbrd.service";
import {VUtils} from "../../../core/utils/v-utils";
import {VEventUtils} from "../../../core/utils/v-event-utils";
import {BzImageModel} from "../../../core/models/story/bz-image-model";
import {FileModel} from "../../../core/models/file-model";
import {environment} from "../../../../environments/environment";
import {FileToWebPathPipe} from "../../../core/pipes/file-to-web-path.pipe";

@Component({
    selector: 'v-bltbrd-update',
    templateUrl: './v-bltbrd-update.component.html',
    styleUrls: ['./v-bltbrd-update.component.scss'],
    providers: [ FileToWebPathPipe ]
})
export class VBltbrdUpdateComponent implements OnInit {

    constructor(
        public pageUtils: VPageUtils
        , public route: ActivatedRoute
        , public globalVars: VGlobalVars
        , public bltbrdService: BltbrdService
        , public eventUtils: VEventUtils
        , private fileToWebPathPipe: FileToWebPathPipe
    ) {
    }

    /**
     * 게시판 유형코드
     */
    @Input("bltbrdTpCd") bltbrdTpCd: string = CodeConstants.BLTBRD.NEWS;

    /**
     * 에디터 엘리먼트
     */
    @ViewChild('editor', {static: false}) editor: ElementRef;

    /**
     * 유의사항 정보 팝업 on/off
     */
    @Input()  isShowInfoPopup: boolean;
    infoPopupLayer: boolean;

    /**
     * 유의사항 정보 팝업 on/off 이벤트
     */
    @Output() isShowInfoPopupChange = new EventEmitter<boolean>();

    /**
     * 게시판 ID
     */
    bltbrdId: number;

    /**
     * 게시판 상세
     */
    bltbrdDetail: BltbrdModel;

    /**
     * 업로드 이미지 파일 오브젝트
     */
    file: object;

    /**
     * 제목
     */
    bltbrdTtl: string = "";

    ngOnInit() {

        // this.bltbrdId = this.route.snapshot.params['bltbrdId'];
        //
        // if( !this.isNew() ) {
        //     this.onLoadBltbrd();
        // } else {
        //     this.bltbrdDetail = new BltbrdModel();
        // }

    }

    /**
     * 새글인지 유무
     */
    isNew() {
        if(!this.bltbrdId) {
            return true;
        }
        if(isNaN(this.bltbrdId)) {
            return true;
        }
        if(this.bltbrdId <= 0) {
            return true;
        }
        return false;
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
                this.bltbrdTtl = this.bltbrdDetail.bltbrdTtl;
                this.editor.nativeElement.innerHTML = this.bltbrdDetail.bltbrdCts;
            });
    }


    /**
     * 파일업로드
     */
    uploadFile(event) {
        let file = event.target.files[0];
        if(!VUtils.checkImageFileType(file.name)) {
            this.eventUtils.alert('이미지파일이 아닙니다');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const params: any = {
                imgFileIdObj: {
                    orgFileNm: file.name,
                    enc: reader.result
                }
            };
            this.bltbrdService.uploadImgFile(params)
                .then((model) => {
                    let fileObj = model.result['data']['imgFileIdObj'] as FileModel

                    let img = "<img src='" + this.fileToWebPathPipe.transform(fileObj.filePath) + "' />";

                    this.editor.nativeElement.focus()

                    document.getSelection().collapse(this.editor.nativeElement, this.editor.nativeElement.childNodes.length)

                    this.file = null;

                    document.execCommand("insertHTML", false, img);
                });
        };

    }

    /**
     * 에디터 내용 가져오기
     */
    getEditorContent() {
        return this.editor.nativeElement.innerHTML;
    }

    /**
     * 팝업 열기
     */
    openInfoPopup() {
        this.isShowInfoPopup = true;
        this.infoPopupLayer = true;
        this.isShowInfoPopupChange.emit(this.isShowInfoPopup);
    }

    /**
     * 팝업 닫기
     */
    closeInfoPopup() {
        this.infoPopupLayer = false;
        setTimeout(()=>{
            this.isShowInfoPopup = false;
            this.isShowInfoPopupChange.emit(this.isShowInfoPopup);
        },300)
    }

    /**
     * 목록 페이지로 이동
     */
    goListPage(): void {
        const confirmCallback = async () => {
            this.pageUtils.navigateForward(this.getListPageUrl());
        }
        let msg = '게시글 ';
        msg += (this.isNew() ? '등록' : '수정');
        msg += '을 취소하시겠습니까?'
        this.eventUtils.confirm(msg,confirmCallback)
    }

    /**
     * 등록하기
     */
    insertBltbrd(): void {
        if(VUtils.isEmpty(this.bltbrdTtl)) {
            this.eventUtils.alert('제목을 입력해 주세요.');
            return;
        }
        this.bltbrdDetail.bltbrdTtl = this.bltbrdTtl;
        if(VUtils.isEmpty(this.getEditorContent())) {
            this.eventUtils.alert('내용을 입력해 주세요.');
            return;
        }
        this.bltbrdDetail.bltbrdCts = this.getEditorContent();

        let msg = "입력한 내용으로 게시글을 ";
        this.isNew() ? msg += "등록" : msg += "수정";
        msg += "하시겠습니까?";
        const confirmCallback = async () => {
            if( this.isNew() ) {
                const params: any = {
                    bltbrdTpCd: this.bltbrdTpCd,
                    bzCd: this.globalVars.bzCd,
                    bltbrdTtl : this.bltbrdDetail.bltbrdTtl,
                    bltbrdCts : this.bltbrdDetail.bltbrdCts,
                    bltbrdStats : this.bltbrdTpCd===CodeConstants.BLTBRD.SHARE ? GlobalConstants.BLTBRD_STATS.SALE.TYPE : ''
                };
                this.bltbrdService.insertBltbrd(params).then((model)=>{

                    const callback = () => {
                        let bltbrdId = model.result['data'].bltbrdId;
                        // navigateBack
                        this.pageUtils.navigateBack();
                    }
                    this.eventUtils.alert('게시글이 등록되었습니다.', '알림', callback);

                    // this.pageUtils.navigateForward(this.getDetailPageUrl()+'/'+bltbrdId);
                })
            } else {
                const params: any = {
                    bltbrdId: this.bltbrdId,
                    bzCd: this.globalVars.bzCd,
                    bltbrdTpCd: this.bltbrdTpCd,
                    bltbrdTtl : this.bltbrdDetail.bltbrdTtl,
                    bltbrdCts : this.bltbrdDetail.bltbrdCts
                };
                this.bltbrdService.updateBltbrd(params).then((model)=>{

                    const callback = () => {
                        this.pageUtils.navigateBack();
                    }
                    this.eventUtils.alert('게시글이 수정되었습니다.', '알림', callback);

                    // this.pageUtils.navigateForward(this.getDetailPageUrl()+'/'+this.bltbrdId);
                })
            }
        }
        this.eventUtils.confirm(msg,confirmCallback);
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
            case CodeConstants.BLTBRD.INQUIRE: {
                return GlobalConstants.MENU.LC_CS_INQ_VIEW.URL
            }
            default: {
                return '/'
            }
        }
    }
}



