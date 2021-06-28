import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "../../../../core/models/code-model";
import {BltbrdModel} from "../../../../core/models/bltbrd/bltbrd-model";
import {CodeEnums} from "../../../../core/enums/code-enums";
import {SystemService} from "../../../../core/service/system/system.service";
import {VPageUtils} from "../../../../core/utils/v-page-utils.service";
import {FileModel} from "../../../../core/models/file-model";
import {VUtils} from "../../../../core/utils/v-utils";
import {BltbrdService} from "../../../../core/service/bltbrd/bltbrd.service";
import {VEventUtils} from "../../../../core/utils/v-event-utils";
import {FileToWebPathPipe} from "../../../../core/pipes/file-to-web-path.pipe";
import CodeConstants from "../../../../core/constants/code-constants";
import GlobalConstants from "../../../../core/constants/global-constants";
import {VGlobalVars} from "../../../../core/utils/v-global-vars";

import {Router} from "@angular/router";
import {BasePage} from "../../../BasePage";
@Component({
    selector: 'app-board-inquire',
    templateUrl: './board-inquire.update.page.html',
    styleUrls: ['./board-inquire.update.page.scss'],
    providers: [ FileToWebPathPipe ]
})
export class BoardInquireUpdatePage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public globalVars: VGlobalVars
        , public pageUtils: VPageUtils
        , public bltbrdService: BltbrdService
        , public eventUtils: VEventUtils
        , private fileToWebPathPipe: FileToWebPathPipe

        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
    }
    /**
     * 게시판 타입
     */
    bltbrdTpCd: string;

    /**
     * 에디터 엘리먼트
     */
    @ViewChild('editor', {static: false}) editor: ElementRef;

    /**
     * 게시판 카테고리 코드 목록
     */
    bltbrdInquireCatList: Array<CodeModel> = [];

    /**
     * 선택한 게시판 카테고리
     */
    selectedInquireCat: string;
    /**
     * 유의사항 정보 팝업 on/off
     */
    isShowInfoPopup: { container: boolean, layer: boolean } = { container: false,layer: false};

    /**
     * 첨부파일 파일 오브젝트
     */
    atchFileList: FileModel[] = [];

    /**
     * 게시판 글 모델
     */
    bltbrdDetail: BltbrdModel = new BltbrdModel();

    /**
     * 제목
     */
    bltbrdTtl: string = "";
    
    /**
     * 게시판 글 모델
     */
    get atchFileTotalSize() {

        let totalSize: number = 0;
        this.atchFileList.forEach(function (file) {
            totalSize += file.fileSize;
        });

        return (totalSize / Math.pow(1024,2)).toFixed(2);
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.loadBltbrdCatList();
        this.bltbrdTpCd = CodeConstants.BLTBRD.INQUIRE;
    }
    /**
     * 게시판 카테고리 코드가져오기
     * */
    loadBltbrdCatList() {
        const params: any = {
            parentCode: CodeEnums.BltbrdInquireCat,
        };
        this.systemService.commonSubCode(params)
            .then((model) => {
                this.bltbrdInquireCatList = model.result["data"] as Array<CodeModel>;
                // this.selectedInquireCat = this.bltbrdInquireCatList[0].cd;
                this.onPageReady();
            });
    }

    /**
     * 첨부파일 업로드
     */
    uploadAtchFile(event) {
        if(this.atchFileList.length>=5) {
            alert("첨부파일은 최대 5개 까지 등록이 가능합니다.")
            return;
        }
        let fileModel = new FileModel();
        // fileModel.
        let file = event.target.files[0];
        if(!file) {
            return;
        }
        if(!this.checkTotalFileSize(file.size)) {
            alert("전체 첨부파일의 용량은 5MB를 초과할 수 없습니다.")
            return;
        }
        fileModel.orgFileNm = file.name;
        fileModel.fileSize = file.size;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            fileModel.enc = reader.result as string;
        };
        this.atchFileList.push(fileModel);
    }

    checkTotalFileSize(newFileSize) {
        let maxSize = 5 * 1024 * 1024;
        let totalSize: number = 0;
        this.atchFileList.forEach(function (file) {
            totalSize += file.fileSize;
        });
        return totalSize + newFileSize <= maxSize;

    }

    /**
     * 첨부파일 모두 삭제
     */
    deleteAllAtchFile() {
        this.atchFileList = [];
    }

    /**
     * 첨부파일 삭제
     */
    deleteAtchFile(index) {
        this.atchFileList.splice(index,1);
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
        this.isShowInfoPopup.container = true;
        this.isShowInfoPopup.layer = true;
    }

    /**
     * 팝업 닫기
     */
    closeInfoPopup() {
        this.isShowInfoPopup.layer = false;
        setTimeout(()=>{
            this.isShowInfoPopup.container = false;
        },300)
    }

    /**
     * 목록 페이지로 이동
     */
    goListPage(): void {
        this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CS_INQ.URL);
    }

    /**
     * 등록하기
     */
    insertBltbrd(): void {
        if(VUtils.isEmpty(this.selectedInquireCat)) {
            this.eventUtils.alert('문의구분을 선택해 주세요.');
            return;
        }
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

        this.atchFileList.forEach((file)=>{
            file.atchFileIdObj = {enc:file.enc,orgFileNm:file.orgFileNm}
        })
        const confirmCallback = async () => {
            const params: any = {
                bltbrdTpCd: this.bltbrdTpCd,
                bltbrdCat: this.selectedInquireCat,
                bzCd: this.globalVars.bzCd,
                bltbrdTtl : this.bltbrdDetail.bltbrdTtl,
                bltbrdCts : this.bltbrdDetail.bltbrdCts,
                bltbrdAtchList : this.atchFileList
            };
            this.bltbrdService.insertBltbrd(params).then((model)=>{
                this.eventUtils.alert('게시글이 등록되었습니다.');
                let bltbrdId = model.result['data'].bltbrdId;
                this.pageUtils.navigateForward(GlobalConstants.MENU.LC_CS_INQ_VIEW.URL+'/'+bltbrdId);
            })

        }
        this.eventUtils.confirm("입력한 내용으로 게시글을 등록하시겠습니까?",confirmCallback);
    }
}
