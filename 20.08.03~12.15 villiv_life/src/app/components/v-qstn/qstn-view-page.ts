import {OnInit} from '@angular/core';
import {SystemService} from "../../core/service/system/system.service";
import {QstnService} from "../../core/service/qstn/qstn.service";
import {QstnModel} from "../../core/models/qstn/qstn-model";
import {VPageUtils} from "../../core/utils/v-page-utils.service";
import CodeConstants from "../../core/constants/code-constants";
import GlobalConstants from "../../core/constants/global-constants";
import {ActivatedRoute, Router} from "@angular/router";
import {VGlobalVars} from "../../core/utils/v-global-vars";
import {QstnAnsModel} from "../../core/models/qstn/qstn-ans-model";
import {VEventUtils} from "../../core/utils/v-event-utils";
import {BasePage} from "../../pages/BasePage";



/**
 * 설문/투표 상세 페이지 공통
 * */
export abstract class QstnViewPage extends BasePage implements OnInit {

    constructor(
        public systemService: SystemService
        , public qstnService: QstnService
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
     * 설문/투표 ID
     */
    qstnId: string;
    /**
     * 설문/투표 상세
     */
    qstnDetail: QstnModel;

    /**
     * 설문/투표 종류
     * A=설문
     * B=투표
     */
    qstnKnd: string;

    /**
     * 폰트 사이즈 클래스
     * ft_m
     * ft_l
     */
    fontSizeClassName: string = '';

    CodeConstants = CodeConstants;

    /**
     * ngOnInit
     */
    ngOnInit() {

    }

    ansList: Array<number>;

    /**
     * 설문/투표 가져오기
     */
    onLoadQstn(qstnKnd: string) {
        this.qstnKnd = qstnKnd;
        const params: any = {
            qstnId: this.qstnId,
            qstnKnd: qstnKnd,
            bzCd: this.globalVars.bzCd
        };
        this.qstnService.loadQstnDetail(params)
            .then((model) => {
                this.qstnDetail = model.result["data"] as QstnModel;

                this.ansList = new Array<number>();
                this.qstnDetail.qstnRowList.forEach((row)=>{
                    if(CodeConstants.ROW_TP.MULTIPLE_CHOICE === row.rowTp) {
                        row.qstnAnsDTO ? this.ansList.push(row.qstnAnsDTO.ansNo) : this.ansList.push(0);
                    } else {
                        row.qstnAnsDTO = new QstnAnsModel();
                    }
                });
                this.onPageReady();
            });

    }

    /**
     * 설문/투표 제출 하기
     */
    onClickSubmit(): void {

        if(this.qstnKnd==="B" && this.globalVars.userDetail.hoReprYn!=="1") {
            this.eventUtils.alert('주민투표는 세대대표만 참여할 수 있습니다.');
            return;
       }
        for(let i=0; i<this.qstnDetail.qstnRowList.length; i++) {
            let row = this.qstnDetail.qstnRowList[i];
            console.log(this.qstnDetail.qstnRowList[i])
            if(row.rowTp==="A") {
                console.log(row.qstnAnsDTO)
                row.qstnAnsDTO = new QstnAnsModel();
                row.qstnAnsDTO.ansNo = this.ansList[row.rowNo-1];
                if(row.qstnAnsDTO.ansNo===0) {
                    this.eventUtils.alert('입력하지 않은 문항이 있습니다.\n \''+row.rowTtl+'\' 문항을 입력해 주세요.');
                    return;
                }
            } else {
                row.qstnAnsDTO.ansNo = -1;
            }
        }
        const confirmCallback = async () => {
            const params: any = this.qstnDetail;
            this.qstnService.insertQstnAns(params)
                .then((model) => {
                    let msg = (this.qstnKnd==="A" ? '설문조사' : '주민투표') + ' 제출이 완료되었습니다.\n참여해 주셔서 감사합니다.';
                    this.eventUtils.alert(msg,"알림",()=>{
                        this.goListPage(false);
                    })
                });
        }

        let msg = '입력한 내용으로 '+ (this.qstnKnd==="A" ? '설문조사' : '주민투표') +'를 제출하시겠습니까?';
        this.eventUtils.confirm(msg, confirmCallback);

    }

    /**
     * 목록 페이지로 이동
     */
    goListPage(isAlert=true): void {
        if(isAlert) {
            const confirmCallback = async () => {
                this.pageUtils.navigateForward(this.getListPageUrl());
            }

            let msg = (this.qstnKnd==="A" ? '설문조사' : '주민투표') +' 진행을 취소하시겠습니까?'
            this.eventUtils.confirm(msg, confirmCallback);
        } else {
            this.pageUtils.navigateForward(this.getListPageUrl());
        }
    }

    /**
     * 목록 페이지 url 가져오기
     */
    getListPageUrl(): string {
        switch(this.qstnDetail.qstnKnd) {
            case CodeConstants.QSTN_KND.IVST: {
                return GlobalConstants.MENU.LC_CM_POL.URL
            }
            case CodeConstants.QSTN_KND.VOTE: {
                return GlobalConstants.MENU.LC_CM_VOT.URL
            }
            default: {
                return '/'
            }
        }
    }



}
