/**
 * 빌리브 서비스 추상 클래스
 */
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ServiceModel} from "./ServiceModel";
import {environment} from "../../../environments/environment";
import {VUtils} from "../utils/v-utils";
import {VStorageUtils} from "../utils/v-storage-utils";
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import {VGlobalVars} from "../utils/v-global-vars";
import {LoadingController} from "@ionic/angular";
export abstract class ServiceAbstract implements Service {


    /**
     * 요청에 대한 식별 정보 맵
     */
    static IN_PROGRESS_MAP: Object = {};

    static loaderMap: Object = {};

    /**
     * 모든 서비스 시작 전에 호출되는 생성자.
     * 빌리브 시스템내의 모든 서비스 구현체는 HttpClient을 인젝션 해야한다.
     */
    protected constructor(
        private http: HttpClient,
        private spinnerDialog: SpinnerDialog,
        private globalVar: VGlobalVars
    ) {

    }

    /**
     * Http 서비스 메서드
     */
    protected service(model: ServiceModel): any {
        return new Promise( (resolve, reject) => {

            model.uuid = VUtils.getUUID();

            this.showLoader(model.uuid).then( () => {

                setTimeout( () => {
                    if( !ServiceAbstract.IN_PROGRESS_MAP[model.uuid] ) {
                        this.hideLoader(model.uuid);
                    }

                }, 300);

            });

            ServiceAbstract.IN_PROGRESS_MAP[model.uuid] = true;

            /*
              * 모든 요청은 "토큰조회" 후 진행된다.
              */
            VStorageUtils.getInstance().getToken()
                .then((token: string) => {

                    if(VUtils.isEmpty(token)) {
                        token = "";
                    }
                    if (model.env === 'mockup') {
                        return resolve(this.doMockup(model));
                    } else if (model.method.toLowerCase() === 'get') {

                        return resolve(this.doGet(model, token));
                    } else if (model.method.toLowerCase() === 'post') {

                        return resolve(this.doPost(model, token));
                    } else if (model.method.toLowerCase() === 'file') {

                        return resolve(this.doFileDownload(model, token));
                    } else {
                        for( const key in ServiceAbstract.IN_PROGRESS_MAP ) {
                            delete ServiceAbstract.IN_PROGRESS_MAP[key];
                        }
                        this.hideLoader(model.uuid);
                        throw new Error('Not Supported Method Error[' + model.method + ']');
                    }
                });

        })
        .then( (model: ServiceModel) => {

            return new Promise( (resolve) => {

                delete ServiceAbstract.IN_PROGRESS_MAP[model.uuid];
                setTimeout( () => {
                    this.hideLoader(model.uuid);
                }, 300);

                resolve(model);

            });
        });
    }

    /**
     * GET 방식의 요청 처리
     * @param model
     * @param token
     */
    private doGet(model: ServiceModel,token: string) {

        return new Promise((resolve, reject) => {
            const url: string = environment.hostname + model.actionURL;
            const parameters: string =  VUtils.object2QueryString(model.params);

            /* 헤더에 토큰값 추가 */
            const headers = new HttpHeaders()
                .set("X-Auth-Token", token )
                .set('Access-Control-Allow-Origin', '*')
                .set('loginTp', this.globalVar.loginTp);

            this.http.get(url + '?' + parameters, { responseType: 'json', headers: headers })
                .subscribe(
                    data => {
                        model.result = data;
                        resolve(model);
                    },
                    error => {
                        model.httpError = error;
                        resolve(model);
                    },
                );

        });
    }

    /**
     * POST 방식의 요청 처리
     * @param model
     * @param token
     */
    private doPost(model: ServiceModel, token: string) {

        return new Promise((resolve, reject) => {
            const url: string = environment.hostname + model.actionURL;

            /* 헤더에 토큰값 추가 */
            const headers = new HttpHeaders()
                .set("X-Auth-Token", token )
                .set('Access-Control-Allow-Origin', '*')
                .set('loginTp', this.globalVar.loginTp);

            this.http.post(url, model.params, { responseType: 'json', headers: headers })
                .subscribe(
                    data => {
                    model.result = data;
                    resolve(model);
                },
                    error => {
                        error.statusText = 'Fail';
                        model.httpError = error;
                        resolve(model);
                },

            );

        });
    }
    /**
     * 파일다운로드
     * @param model
     * @param token
     */
    private doFileDownload(model: ServiceModel,token: string) {

        return new Promise((resolve, reject) => {

            const url: string = environment.hostname + model.actionURL;
            const parameters: string =  VUtils.object2QueryString(model.params);

            /* 헤더에 토큰값 추가 */
            const headers = new HttpHeaders()
                .set("X-Auth-Token", token )
                .set('Access-Control-Allow-Origin', '*')
                .set('loginTp', this.globalVar.loginTp);
                this.http.get(url + '?' + parameters, {observe: 'response', responseType: 'blob' as 'json', headers: headers })
                    .subscribe(
                        (res) => {

                            let filename = VUtils.getFilename(res.headers.get('Content-Disposition'));
                            filename = decodeURI(escape(filename));
                            const a = document.createElement('a')
                            const objectUrl = URL.createObjectURL(res.body)
                            a.href = objectUrl
                            a.download = filename;
                            a.click();
                            URL.revokeObjectURL(objectUrl);
                            model.result = res.body;
                            resolve(model);
                        },
                        error => {
                            model.httpError = error;
                            resolve(model);
                        },
                    );
        });
    }

    /**
     * Mockup 방식의 요청 처리
     * @param model
     */
    private doMockup(model: ServiceModel): Promise<ServiceModel> {

        const mockupRootPath = "assets/@mockup";

        const file = model.mockupSpec.split('@')[0];
        let result = model.mockupSpec.split('@')[1];

        /* 결과값을 변수 바인딩 처리 */
        if ( result.startsWith("{") ) {
            const paramKey = result.substring(1, result.length - 1);
            result = model.params[paramKey];
        }

        const mockupPath = mockupRootPath + file + '.json';

        return new Promise((resolve, reject) => {

            this.http.get(mockupPath, { responseType: 'json' })
                .subscribe(
                    data => {
                    model.result = data[result];
                    resolve(model);
                },
                error => {
                    model.httpError = error;
                    resolve(model);
                },

            );

        });

    }


    /**
     * 프리로더를 보여준다.
     * @param uuid
     */
    async showLoader(uuid: string): Promise<any> {

        ServiceAbstract.loaderMap[uuid] = await new LoadingController().create({
            spinner: "circular",
            showBackdrop: false,
            cssClass: 'custom-loading',
            duration: 10000,
            // message: '로딩중'
        });
        return ServiceAbstract.loaderMap[uuid].present();
    }


    /**
     * 프리로더를 삭제한다.
     * @param uuid
     */
    async hideLoader(uuid) {

        if( ServiceAbstract.loaderMap[uuid] ) {
            await ServiceAbstract.loaderMap[uuid].dismiss();
            delete ServiceAbstract.loaderMap[uuid];
        }

    }

    /**
     * 아무 쓸모없는 메서드
     */
    doNothing(): void {}

}
