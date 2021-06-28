import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../service/auth/auth.service";
import {ServiceModel} from "../service/ServiceModel";
import {VGlobalVars} from "../utils/v-global-vars";
import {VStorageUtils} from "../utils/v-storage-utils";
import {environment} from "../../../environments/environment";
import GlobalConstants from "../constants/global-constants";
/**
 * 사용자 로그인 체크 Guard
 */
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
        , private serivce: AuthService
        , private globalVars: VGlobalVars
    ) {
    }

    /**
     * AuthGuard를 포함한 Page 들은
     * 모두 서버쪽에서 권한체크를 한번씩 하고 이동한다.
     *
     * @param next
     * @param state
     */
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log('auth guard=', state.url);

        return new Promise((resolve) => {
            //TODO 비회원일경우
            console.log('auth guard')
            console.log('auth guard is app?? ', this.globalVars.isApp)
            if(this.globalVars.isApp && !this.globalVars.isLogin) {
                this.router.navigate([GlobalConstants.MENU.LOGIN.URL]);
                resolve(false);
            } else {
                resolve(true);
                return;
            }
            // const param: any = {};
            // this.serivce.loginCheck(param)
            //     .then((model: ServiceModel) => {
            //         /* 로그인 검증(토큰유효성) 성공 */
            //         if (model.isResultOK()) {
            //
            //             resolve(true);
            //
            //         } else {
            //             /* 로그인 검증(토큰유효성) 살패 */
            //             this.router.navigate(['/login']);
            //             resolve(false);
            //         }
            //
            //     });

        });

    }

}
