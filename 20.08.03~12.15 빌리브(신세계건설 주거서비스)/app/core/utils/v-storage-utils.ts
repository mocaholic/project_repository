/**
 * 저장소 관련된 유틸리티
 */
import {Injectable} from "@angular/core";
import {VUtils} from "./v-utils";
import {LoadingController} from "@ionic/angular";

/**
 * 앱 전체에서 Storage를 사용하기 위한 Singleton 클래스
 * @@@@@@@ 최상위 AppModule 에서만 Injection 하고 있고,  !!!!!! 다른 곳에서는 Injection 하면 안된다.
 */
@Injectable({
    providedIn: 'root',
})
export class VStorageUtils {

    /**
     * VStorageUtils Singleton Instance
     */
    private static vStore: VStorageUtils = undefined;

    constructor() {

        const loader: LoadingController = new LoadingController();
        VStorageUtils.vStore = this;

        console.log('>>>>>>> Create VStorageUtils Singleton Instance >>>>>>>');
    }


    /**
     * Get VStorageUtils Singleton Instance
     */
    public static getInstance() {

        if (!VStorageUtils.vStore) {
            throw new Error('VStorageUtils not initialized');
        }
        return VStorageUtils.vStore;
    }

    /**
     * Storage 에 키/값을 입력
     *
     * Angular 용 localStorage 는 기본적으로 동기화방식으로 호출/응답하지만
     * Ionic 용 Storage 가 Promise 형식으로 응답하기 때문에 통일하기 위해서 맞춘거임
     *
     * @param key
     * @param value
     */
    public set(key: string, value: any): Promise<boolean> {

        return new Promise((resolve) => {
            localStorage.setItem(key, value);
            resolve(true);
        });
    }

    /**
     * Storage 에서 값을 조회
     *
     * Angular 용 Storage 는 기본적으로 동기화방식으로 호출/응답하지만
     * Ionic 용 Storage 가 Promise 형식으로 응답하기 때문에 통일하기 위해서 맞춘거임
     *
     * @param key
     */
    public get(key: string): Promise<any> {

        return new Promise((resolve) => {
            const value = localStorage.getItem(key);
            resolve(value);
        });
    }

    /**
     * Storage 에 토큰 값을 입력
     */
    public setToken(token: string): Promise<boolean> {
        return this.set('token', token);
    }

    /**
     * Storage 에서 토큰 값을 조회
     */
    public getToken(): Promise<any> {
        return this.get('token').then();
    }

    /**
     * 값 존재 유무
     */
    public isExistKey(key: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.get(key).then((value)=>{
                resolve(!VUtils.isEmpty(value));
            });
        });
    }



}
