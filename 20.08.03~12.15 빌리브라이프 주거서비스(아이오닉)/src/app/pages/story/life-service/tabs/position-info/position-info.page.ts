import {Component, Input, OnInit} from '@angular/core';
import {StoryService} from "../../../../../core/service/story/story.service";
import {BzImageModel} from "../../../../../core/models/story/bz-image-model";
import {BzNtcsModel} from "../../../../../core/models/story/bz-ntcs-model";
import {ModalPopupPage} from "../../../../../core/modals/modal-popup.page";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";
import {VUtils} from "../../../../../core/utils/v-utils";

@Component({
    selector: 'v-position-info',
    templateUrl: './position-info.page.html',
    styleUrls: ['./position-info.page.scss'],
})
export class PositionInfoPage implements OnInit {

    constructor(
        public storyService: StoryService
        , public pageUtils: VPageUtils
    ) {
    }

    /**
     * 단지코드
     */
    @Input() bzCd: string;
    
    /**
     * 이미지
     * */
    imageModel: BzImageModel;

    /**
     * 유의사항
     * */
    ntcsModel: BzNtcsModel;


    ngOnInit() {
        this.loadBzContensDetail();
    }
    ionViewDidEnter() {

    }

    /**
     * 입지환경 컨텐츠 상세 가져오기
     */
    loadBzContensDetail() {
        const params: any = {
            bzCd: this.bzCd,
            ctsTp: 'B'
        }
        this.storyService.loadBzContensDetail(params)
            .then((model) => {
                this.imageModel = model.result["bzImageList"][0] as BzImageModel;

                this.ntcsModel = model.result["bzNtcsList"][0] as BzNtcsModel;
                if(!VUtils.isEmpty(this.ntcsModel.ntcMatt)) {
                    this.ntcsModel.ntcMattList = this.ntcsModel.ntcMatt.split("\n");
                }
            });
    }

    /**
     * 이미지 큰화면으로 보기
     * */
    async openFullImageModal(imagePath) {

        return await this.pageUtils.openModal(ModalPopupPage,{  'imagePath': imagePath});

    }
}
