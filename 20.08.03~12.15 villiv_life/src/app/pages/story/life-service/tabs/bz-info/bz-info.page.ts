import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BzMstModel} from "../../../../../core/models/story/bz-mst-model";
import {StoryService} from "../../../../../core/service/story/story.service";
import {BzSqmsModel} from "../../../../../core/models/story/bz-sqms-model";
import {BzNtcsModel} from "../../../../../core/models/story/bz-ntcs-model";
import {BzImageModel} from "../../../../../core/models/story/bz-image-model";
import {VUtils} from "../../../../../core/utils/v-utils";
import {BzSpclFclModel} from "../../../../../core/models/story/bz-spcl-fcl-model";
import {ModalPopupPage} from "../../../../../core/modals/modal-popup.page";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";

@Component({
    selector: 'v-bz-info',
    templateUrl: './bz-info.page.html',
    styleUrls: ['./bz-info.page.scss'],
})
export class BzInfoPage implements OnInit {

    constructor(
        public storyService: StoryService
        , public pageUtils: VPageUtils
    ) {
    }

    /**
     * bzMstDetail
     */
    @Input() bzMstDetail: BzMstModel;

    /**
     * 유의사항
     * */
    ntcsModel: BzNtcsModel;

    /**
     * 특화시설 정보 목록
     * */
    spclFclList: Array<BzSpclFclModel>;


    ngOnInit() {

    }
    ngOnChanges(changes: SimpleChanges) {
        if(changes["bzMstDetail"] && this.bzMstDetail) {
            this.loadBzMainImage();
            this.loadBzLayout();
            this.loadSpclFclList();
        }
    }
    /**
     * 대표이미지 가져오기
     */
    loadBzMainImage() {
        const params: any = {
            bzCd: this.bzMstDetail.bzCd,
            ctsTp: 'F'
        }
        this.storyService.loadBzContensDetail(params)
            .then((model) => {
                this.bzMstDetail.mainImageModel = model.result["bzImageList"][0] as BzImageModel;
            });
    }

    /**
     * 단지배치도 컨텐츠 상세 가져오기
     */
    loadBzLayout() {
        const params: any = {
            bzCd: this.bzMstDetail.bzCd,
            ctsTp: 'A'
        }
        this.storyService.loadBzContensDetail(params)
            .then((model) => {
                this.bzMstDetail.bzLayoutModel = model.result["bzImageList"][0] as BzImageModel;

                this.ntcsModel = model.result["bzNtcsList"][0] as BzNtcsModel;

                if(!VUtils.isEmpty(this.ntcsModel.ntcMatt)) {
                    this.ntcsModel.ntcMattList = this.ntcsModel.ntcMatt.split("\n");
                }

            });
    }

    /**
     * 특화시설 정보 목록 가져오기
     */
    loadSpclFclList() {
        const params: any = {
            bzCd: this.bzMstDetail.bzCd
        }
        this.storyService.loadSpclFclList(params)
            .then((model) => {
                this.spclFclList = model.result["bzSpclFclList"] as Array<BzSpclFclModel>;
            });
    }

    /**
     * 슬라이드 다음(오른쪽) 버튼
     */
    slideNext(slides){
        slides.slideNext();
    }

    /**
     * 슬라이드 이전(왼쪽) 버튼
     */
    slidePrev(slides){
        slides.slidePrev();
    }
    /**
     * 이미지 큰화면으로 보기
     * */
    async openFullImageModal(imagePath) {

        return await this.pageUtils.openModal(ModalPopupPage,{  'imagePath': imagePath});

    }
}
