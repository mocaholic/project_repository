import {Component, Input, OnInit} from '@angular/core';
import {BzMstModel} from "../../../../../core/models/story/bz-mst-model";
import {BzContAplModel} from "../../../../../core/models/story/bz-cont-apl-model";
import {StoryService} from "../../../../../core/service/story/story.service";
import {VlvMgzModel} from "../../../../../core/models/story/vlv-mgz-model";
import {VGlobalVars} from "../../../../../core/utils/v-global-vars";
import {VUtils} from "../../../../../core/utils/v-utils";
import {VEventUtils} from "../../../../../core/utils/v-event-utils";
import {ModalPopupPage} from "../../../../../core/modals/modal-popup.page";
import {FileService} from "../../../../../core/service/file/file.service";

@Component({
    selector: 'v-contract-info',
    templateUrl: './contract-info.page.html',
    styleUrls: ['./contract-info.page.scss'],
})
export class ContractInfoPage implements OnInit {

    constructor(
        public storyService: StoryService
        , public fileService: FileService
        ,private eventUtils: VEventUtils
    ) {
    }

    /**
     * 계약대기신청 팝업 on/off
     */
    @Input()  isShowPopup: boolean;
    isShowPopupLayer: boolean;


    /**
     * bzMstDetail
     */
    @Input()  bzMstDetail: BzMstModel;

    /**
     * contAplModel
     * 계약대기신청 정보 모델
     */
    contAplModel: BzContAplModel;

    ngOnInit() {
    }

    /**
     * 계약대기 신청 팝업 데이터 초기화
     * */
    initPopupData() {
        this.contAplModel = new BzContAplModel();
    }

    onClickDownloadPDF() {
        const params: any = {
            fileId: this.bzMstDetail.rfeFileId,
        };
        this.fileService.downloadFile(params).then((model)=>{
    
        })
    }

    /**
     * 팝업 열기
     */
    openPopup() {
        this.initPopupData();
        this.isShowPopup = true;
        this.isShowPopupLayer = true;
    }

    /**
     * 팝업 닫기
     */
    closePopup() {
        const confirmCallback = async () => {
            this.isShowPopupLayer = false;
            setTimeout(()=>{
                this.isShowPopup = false;
            },300)
        }
        this.eventUtils.confirm('계약대기신청을 취소하시겠습니까?',confirmCallback);
    }

    /**
     * 신청하기
     */
    onClickApply() {
        if(VUtils.isEmpty(this.contAplModel.termsCsntYn) || this.contAplModel.termsCsntYn==="0") {
            this.eventUtils.alert('개인정보 수집 및 이용 동의해 주세요.');
            return;
        }
        if(VUtils.isEmpty(this.contAplModel.name)) {
            this.eventUtils.alert('이름을 입력해 주세요.');
            return;
        }
        if(VUtils.isEmpty(this.contAplModel.tel0) && VUtils.isEmpty(this.contAplModel.tel1) && VUtils.isEmpty(this.contAplModel.tel2)) {
            this.eventUtils.alert('휴대전화번호를 입력해 주세요.');
            return;
        }
        if(!VUtils.isValidPhoneNumber(this.contAplModel.getMpNo)) {
            this.eventUtils.alert('휴대전화번호를 형식에 맞게 입력해 주세요.');
            return;
        }
        if(VUtils.isEmpty(this.contAplModel.email)) {
            this.eventUtils.alert('이메일을 입력해 주세요.');
            return;
        }
        if(!VUtils.isValidEmail(this.contAplModel.email)) {
            this.eventUtils.alert('이메일 형식에 맞게 입력해 주세요.');
            return;
        }
        const confirmCallback = async () => {
            const params: any = {
                ...this.contAplModel,
                mpNo:this.contAplModel.getMpNo,
                bzCd:this.bzMstDetail.bzCd
            }
            this.storyService.insertContApl(params)
                .then((model) => {
                    this.contAplModel = new BzContAplModel();
                    this.eventUtils.alert('계약대기신청이 완료되었습니다.');
                });
            this.isShowPopup = false;
        }
        this.eventUtils.confirm('입력한 내용으로 계약대기신청을 접수하시겠습니까?',confirmCallback);

    }
}
