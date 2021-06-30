import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StoryService} from "../../../../../core/service/story/story.service";
import {BzImageModel} from "../../../../../core/models/story/bz-image-model";
import {BzNtcsModel} from "../../../../../core/models/story/bz-ntcs-model";
import {VUtils} from "../../../../../core/utils/v-utils";
import {IonSlides} from "@ionic/angular";
import {ModalPopupPage} from "../../../../../core/modals/modal-popup.page";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";

@Component({
    selector: 'v-interior-info',
    templateUrl: './interior-info.page.html',
    styleUrls: ['./interior-info.page.scss'],
})
export class InteriorInfoPage implements OnInit {

    constructor(
        public storyService: StoryService
        , public pageUtils: VPageUtils
    ) {
    }

    /**
     * pc 슬라이더
     */
    @ViewChild('pcSlider') pcSlides: IonSlides;

    /**
     * 모바일 슬라이더
     */
    @ViewChild('mpSlider') mpSlides: IonSlides;


    /**
     * bzCd
     */
    @Input() bzCd: string;

    /**
     * 타입별 이미지 목록
     * */
    imageListByType: Array<Array<BzImageModel>>;

    /**
     * 선택 가능한 공급 타입 목록
     * */
    supTpCatList: Array<BzImageModel> = new Array<BzImageModel>();

    /**
     * 유의사항
     * */
    ntcsModel: BzNtcsModel;

    /**
     * 선택된 공급 타입 index
     * */
    selectedSupTpIndex: number=0;

    /**
     * 선택된 이미지 index
     * */
    selectedImgIndex: number=-1;


    ngOnInit() {
        this.loadBzContensDetail();
    }

    ionViewDidEnter() {

    }
    /**
     * 선택된 타입 이미지 목록
     * */
    get imageListBySupTp() {
        if(this.imageListByType && this.imageListByType.length>0) {
            return this.imageListByType[this.selectedSupTpIndex];
        }
        return null;
    }

    /**
     * 인테리어 컨텐츠 상세 가져오기
     */
    loadBzContensDetail() {
        const params: any = {
            bzCd: this.bzCd,
            ctsTp: 'E'
        }
        this.storyService.loadBzContensDetail(params)
            .then((model) => {
                let bzImageList = model.result["bzImageList"] as Array<BzImageModel>;
                if(bzImageList.length>0) {
                    this.imageListByType = VUtils.partition(bzImageList,'supTp');

                    this.imageListByType.forEach((arr)=>{
                        this.supTpCatList.push(arr[0]);
                    })

                    this.onChangeSupTp(0);
                }
                this.ntcsModel = model.result["bzNtcsList"][0] as BzNtcsModel;
                if(!VUtils.isEmpty(this.ntcsModel.ntcMatt)) {
                    this.ntcsModel.ntcMattList = this.ntcsModel.ntcMatt.split("\n");
                }
            });
    }

    /**
     * 타입 변경
     */
    onChangeSupTp(index) {
        this.selectedSupTpIndex = index;
        this.selectedImgIndex = 0;
        this.pcSlides.slideTo(0);
        this.mpSlides.slideTo(0);
    }

    /**
     * 이미지 변경
     */
    onChangeMainImage(index) {
        this.selectedImgIndex = index;
    }

    /**
     * 이미지 큰화면으로 보기
     * */
    async openFullImageModal(imagePath) {

        return await this.pageUtils.openModal(ModalPopupPage,{  'imagePath': imagePath});

    }
}
