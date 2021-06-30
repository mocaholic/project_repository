import {Component, Input, OnInit} from '@angular/core';
import {BzImageModel} from "../../../../../core/models/story/bz-image-model";
import {VUtils} from "../../../../../core/utils/v-utils";
import {BzNtcsModel} from "../../../../../core/models/story/bz-ntcs-model";
import {StoryService} from "../../../../../core/service/story/story.service";
import {BzSqmsModel} from "../../../../../core/models/story/bz-sqms-model";
import {ModalPopupPage} from "../../../../../core/modals/modal-popup.page";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";

@Component({
    selector: 'v-plane-info',
    templateUrl: './plane-info.page.html',
    styleUrls: ['./plane-info.page.scss'],
})
export class PlaneInfoPage implements OnInit {

    constructor(
        public storyService: StoryService
        , public pageUtils: VPageUtils
    ) {
    }

    /**
     * bzCd
     */
    @Input() bzCd: string;

    /**
     * 면적정보 목록
     * */
    sqmsList: Array<BzSqmsModel>;

    /**
     * 유의사항
     * */
    ntcsModel: BzNtcsModel;

    /**
     * 선택된 면적정보 모델
     * */
    selectedSqms: BzSqmsModel;

    ngOnInit() {
        this.loadBzPlanDetail();

    }

    /**
     * 평면도 컨텐츠 상세 가져오기
     */
    loadBzPlanDetail() {
        const params: any = {
            bzCd: this.bzCd,
            ctsTp: 'C'
        }
        this.storyService.loadBzContensDetail(params)
            .then((model) => {
                this.sqmsList = model.result["bzSqmsList"] as Array<BzSqmsModel>;
                this.loadBzPlanLayoutDetail();
                let planImageList = model.result["bzImageList"] as Array<BzImageModel>;

                planImageList.forEach((image)=>{
                    let sqms = VUtils.getObjByKey(this.sqmsList,{supTp: image.supTp})
                    if(sqms) {
                        sqms.planModel = image;
                    }
                });
                this.onChangeSupTp(0);

                this.ntcsModel = model.result["bzNtcsList"][0] as BzNtcsModel;

                if(!VUtils.isEmpty(this.ntcsModel.ntcMatt)) {
                    this.ntcsModel.ntcMattList = this.ntcsModel.ntcMatt.split("\n");
                }
            });
    }

    /**
     * 평면배치도 컨텐츠 상세 가져오기
     */
    loadBzPlanLayoutDetail() {
        const params: any = {
            bzCd: this.bzCd,
            ctsTp: 'D'
        }
        this.storyService.loadBzContensDetail(params)
            .then((model) => {
                let planLayoutImageList = model.result["bzImageList"] as Array<BzImageModel>;
                planLayoutImageList.forEach((image)=>{
                    let sqms = VUtils.getObjByKey(this.sqmsList,{supTp: image.supTp})
                    if(sqms) {
                        sqms.planLayoutModel = image;
                    }
                });
            });
    }

    /**
     * 타입 변경
     */
    onChangeSupTp(index) {
        this.selectedSqms = this.sqmsList[index];

    }
    /**
     * 이미지 큰화면으로 보기
     * */
    async openFullImageModal(imagePath) {

        return await this.pageUtils.openModal(ModalPopupPage,{  'imagePath': imagePath});

    }
}
