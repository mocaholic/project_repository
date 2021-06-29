import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SystemService} from "../../../../../core/service/system/system.service";
import {VUtils} from "../../../../../core/utils/v-utils";
import {BzMstModel} from "../../../../../core/models/story/bz-mst-model";
import {VPageUtils} from "../../../../../core/utils/v-page-utils.service";

declare let daum: any;

@Component({
    selector: 'v-way-info',
    templateUrl: './way-info.page.html',
    styleUrls: ['./way-info.page.scss'],
})
export class WayInfoPage implements OnInit {

    constructor(
        public systemService: SystemService
        ,public pageUtils: VPageUtils
    ) {
    }

    /**
     * bzMstDetail
     */
    @Input() bzMstDetail: BzMstModel;

    /**
     * is finish map load
     */
    isMapLoad: boolean;

    ngOnInit() {
    }

    ionViewDidEnter() {
        if(!this.isMapLoad && this.bzMstDetail ) {
            this.loadExternalScript();
        }
    }

    /**
     * 외부 스크립트 추가
     * 동적으로 호출 하려면 -> url에 aoutlosd=false 추가
     * daum.maps.load 하는 시점에서 호출
     */
    loadExternalScript(): void {
        if(!this.bzMstDetail || !this.bzMstDetail.bzAddr) {
            return;
        }
        this.isMapLoad = true;
        const param: any = {};

        this.systemService.commonAPIKey(param)
            .then((model) => {
                const apikey = model.result['kakao.map.api.key'];

                const url = '//dapi.kakao.com/v2/maps/sdk.js?appkey='
                    + apikey
                    + '&autoload=false'
                    + '&libraries=services';
                VUtils.loadExternalScript(url).then(() => {
                    this.onloadMap(this.bzMstDetail.bzAddr);
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    /**
     * 주소값이 있으면 지도 onload
     * @param addr
     */
    onloadMap(addr: string): void {
        daum.maps.load(function () {

            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
                center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
                level: 5, // 지도의 확대 레벨
            };

            // 지도를 미리 생성
            const map = new daum.maps.Map(mapContainer, mapOption);
            // 주소-좌표 변환 객체를 생성
            const geocoder = new daum.maps.services.Geocoder();
            //이미지

            const imageSrc = '/assets/common/viliv_location.png';
            //이미지의 크기입니다
            const imageSize = new daum.maps.Size(80, 53);
            //이미지 옵션
            const imageOption = {offset: new daum.maps.Point(35, 53)};
            //마커 이미지 생성
            const markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption)
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(addr, function (result, status) {

                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {

                    const coords = new daum.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new daum.maps.Marker({
                        position: coords,
                        image: markerImage
                    });

                    // 지도를 보여준다.
                    mapContainer.style.display = "block";
                    map.relayout();
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                    // 지도에 마커 표시
                    marker.setMap(map);
                }
            });
        });

    }
    openExternalMapSite() {
        this.pageUtils.openNewTab('https://map.kakao.com/?q='+this.bzMstDetail.bzAddr);
    }
    ngOnChanges(changes: SimpleChanges) {
        if(!this.isMapLoad && changes["bzMstDetail"]) {
            this.loadExternalScript();
        }
    }
}
