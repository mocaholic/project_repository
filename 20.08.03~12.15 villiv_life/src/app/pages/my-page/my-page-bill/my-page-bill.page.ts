import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {MyPageService} from "../../../core/service/my-page/my-page.service";
import {VPageUtils} from "../../../core/utils/v-page-utils.service";
import {VGlobalVars} from "../../../core/utils/v-global-vars";
import {CodeModel} from "../../../core/models/code-model";
import {BillFeeModel} from "../../../core/models/my-page/bill-fee-model";
import {CustMstModel} from "../../../core/models/my-page/cust-mst-model";
import {BasePage} from "../../BasePage";

import {NavigationEnd, Router} from "@angular/router";
import {SystemService} from "../../../core/service/system/system.service";
import {VUtils} from "../../../core/utils/v-utils";

@Component({
    selector: 'app-my-page-bill',
    templateUrl: './my-page-bill.page.html',
    styleUrls: ['./my-page-bill.page.scss'],
})
export class MyPageBillPage extends BasePage implements OnInit {

    constructor(
        public myPageService: MyPageService
        , public pageUtils: VPageUtils
        , public globalVars: VGlobalVars
        , public systemService: SystemService
        , router: Router
    ) {
        super({
            systemService: SystemService,
            globalVars: globalVars,
            router: router
        });
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                if(this.router.getCurrentNavigation().extras['yearMonthStr']) {
                    let yearMonthStr = this.router.getCurrentNavigation().extras['yearMonthStr'];
                    if(!VUtils.isEmpty(yearMonthStr)) {
                        this.selectedYear = yearMonthStr.substring(0,4);
                        this.selectedMonth = yearMonthStr.substring(4,6);
                    }
                }
            }

        });
    }

    navigationSubscription;

    /**
     * 차트
     * */
    @ViewChild('chart') chart;
    lineChart: any;

    /**
     * 유저 정보
     * */
    userDetail: CustMstModel;

    /**
     * 선택가능 연도 목록
     * */
    yearList: Array<CodeModel>;

    /**
     * 선택가능 월 목록
     * */
    monthList: Array<CodeModel>;

    /**
     * 선택한 연도
     * */
    selectedYear: string;

    /**
     * 선택한 월
     * */
    selectedMonth: string;

    /**
     * 관리비데이터 존재 유무
     * */
    isExistBillData: boolean;

    /**
     * 관리비 정보
     * */
    billModel: BillFeeModel;

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ionViewDidEnter() {
        this.loadBillYearList();
    }


    /**
     * 연도 목록 가져오기
     * */
    loadBillYearList() {

        this.userDetail = this.globalVars.userDetail;
        const params: any = {
            bzCd : this.globalVars.bzCd,
            blNo : this.userDetail.blNo,
            rmNo : this.userDetail.rmNo,
            rmdMo : this.userDetail.rmdNo,
        };
        this.myPageService.loadBillYearList(params).then((model)=>{
            this.yearList = model.result['data'] as Array<CodeModel>;

            this.isExistBillData = this.yearList.length > 0;

            if(this.isExistBillData) {
                if(VUtils.isEmpty(this.selectedYear)) {
                    this.selectedYear = this.yearList[0].cd;
                }
                this.loadBillMonthList();
            }


        })
    }

    /**
     * 월 목록 가져오기
     * */
    loadBillMonthList() {
        const params: any = {
            bzCd : this.globalVars.bzCd,
            blNo : this.userDetail.blNo,
            rmNo : this.userDetail.rmNo,
            rmdMo : this.userDetail.rmdNo,
            year : this.selectedYear,
        };
        this.myPageService.loadBillMonthList(params).then((model)=>{

            this.monthList = model.result['data'] as Array<CodeModel>;
            if(this.monthList.length>0) {
                if(VUtils.isEmpty(this.selectedMonth)) {
                    this.selectedMonth = this.monthList[0].cd;
                }
                this.loadBillDetail();
            }

        })
    }

    /**
     * 해당 연월 관리비 가져오기
     * */
    loadBillDetail() {
        const params: any = {
            bzCd : this.globalVars.bzCd,
            blNo : this.userDetail.blNo,
            rmNo : this.userDetail.rmNo,
            rmdMo : this.userDetail.rmdNo,
            year : this.selectedYear,
            month : this.selectedMonth,
        };
        this.myPageService.loadBillDetail(params).then((model)=>{
            this.billModel = model.result['data'] as BillFeeModel;

            this.onPageReady();
            //TODO chart data
            this.createBarChart();
        })
    }

    /**
     * 관리비 총 요금 계산
     * */
    get totalFee() {
        if(this.billModel) {
            return this.billModel.fee + this.billModel.unpaidFee + this.billModel.unpaidCharge;
        }
        return 0;
    }

    /**
     * 관리비 퍼센트 계산
     * */
    get calcFeePercent() {
        if(this.billModel) {
            if(this.billModel.fee > this.billModel.avgFee) {
                return ((Number(this.billModel.fee)-Number(this.billModel.minFee)) / (Number(this.billModel.maxFee)-Number(this.billModel.minFee)) * 50) + 50;
            } else {
                return Number(this.billModel.fee) / Number(this.billModel.avgFee) * 50;
            }
        }
        return 0;
    }

    /**
     * 연도 변경 이벤트
     * */
    onChangeYear() {
        this.loadBillMonthList();
    }

    /**
     * 월 변경 이벤트
     * */
    onChangeMonth() {
        console.log('search !' + this.selectedYear + this.selectedMonth );
    }

    /**
     * 요금 비교
     * */
    compareFee(current,before) {
        let className = "";
        if(current > before) {
            className = "up";
        } else if(current < before){
            className = "down";
        }
        return className;
    }

    /**
     * 차트 생성
     * */
    createBarChart(myDataArr=null,avgDataArr=null,monthInfoArr=null) {
        this.lineChart = new Chart(this.chart.nativeElement, {
            type: 'line',
            data: {
                datasets: [{
                    label: '우리집',
                    lineTension: 0,
                    //우리집 데이터
                    data: [0, 0, 100000, 120000],
                    order: 1,
                    fill: false,
                    backgroundColor: "rgb(255,255,255)",
                    borderColor: "#9CC023",
                    pointBackgroundColor: "#9CC023",
                    pointBorderColor: "#9CC023",
                    pointBorderWidth: 2,
                    pointRadius: this.globalVars.isPc ? 5 : 3,
                }, {
                    label: '평균',
                    //평균데이터
                    data: [0, 0, 80000, 154000],
                    type: 'line',
                    lineTension: 0,
                    order: 2,
                    fill: false,
                    backgroundColor: "#2E2B27",
                    borderColor: "#2E2B27",
                    pointBackgroundColor: "#2E2B27",
                    pointBorderColor: "#2E2B27",
                    pointBorderWidth: 2,
                    pointRadius: this.globalVars.isPc ? 5 : 3,
                }],
                //월데이터
                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 12,
                        usePointStyle: true,
                        boxWidth: 4
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: true,
                            callback: function (label, index, labels) {
                                return Number(label).toLocaleString();
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        labelColor: function (tooltipItem, chartInstace) {
                            if (tooltipItem["datasetIndex"] == 0) {
                                chartInstace.options.borderColor = "#9CC023";
                            } else {
                                chartInstace.options.borderColor = "#4B423C";
                            }
                        },
                        title: function (tooltipItem, data) {
                            return tooltipItem[0].label + " " + data['datasets'][tooltipItem[0]['datasetIndex']].label;
                        },
                        label: function (tooltipItem, data) {
                            if (tooltipItem.datasetIndex == 1 && tooltipItem.value == 0) {

                                return '';
                            }
                            return Number(tooltipItem.value).toLocaleString() + "원";
                        },
                        // afterLabel: function(tooltipItem, data) {
                        //   var dataset = data['datasets'][0];
                        //   var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                        //   return '(' + percent + '%)';
                        // }
                    },
                    custom: function (tooltipModel) {
                        if (tooltipModel.opacity !== 0) {
                            if (tooltipModel.dataPoints[0].datasetIndex == 0) {
                                tooltipModel.borderColor = '#9CC023';
                            } else {
                                tooltipModel.borderColor = '#4B423C';
                            }
                        }

                    },
                    backgroundColor: '#FFF',
                    titleFontSize: this.globalVars.isApp ? 16 : 12,
                    titleFontColor: '#4B423C',
                    titleFontStyle: 'bold',
                    bodyFontColor: '#4B423C',
                    bodyFontSize: this.globalVars.isApp ? 16 : 12,
                    bodyAlign: 'center',
                    titleAlign: 'center',
                    displayColors: false,
                    borderColor: '#9CC023',
                    borderWidth: this.globalVars.isApp ? 3 : 2,
                    xPadding: this.globalVars.isApp ? 15 : 12,
                    yPadding: this.globalVars.isApp ? 15 : 12,
                    caretSize: 10,
                    caretPadding: 5

                }
            }
        });
    }
}
