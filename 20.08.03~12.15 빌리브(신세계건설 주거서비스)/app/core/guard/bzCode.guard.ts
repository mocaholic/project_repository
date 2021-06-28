import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth/auth.service";
import {ServiceModel} from "../service/ServiceModel";
import {VGlobalVars} from "../utils/v-global-vars";
import {VStorageUtils} from "../utils/v-storage-utils";
import {VUtils} from "../utils/v-utils";
import {environment} from "../../../environments/environment";
import GlobalConstants from "../constants/global-constants";
/**
 * 비로그인+앱아닐경우 bzCode 체크
 */
@Injectable({
  providedIn: 'root',
})
export class BzCodeGuard implements CanActivate {

  constructor(
      private router: Router
      , private serivce: AuthService
      , private globalVars: VGlobalVars

  ) {

  }
  /**
   * 비로그인+앱아닐경우 bzCode 체크
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

      console.log('state.urlstate.urlstate.url1=', state.url);

    return new Promise((resolve) => {

        console.log('state.urlstate.urlstate.url1=', state.url);

        if(state.url===GlobalConstants.MENU.GATE.URL) {
            if(this.globalVars.isLogin) {
                this.router.navigate(['/']);
                resolve(false);
            } else {
                resolve(true);
            }
            return;
        }

        console.log('this.globalVars.bzCd=' + this.globalVars.bzCd);

        if(!this.globalVars.isApp && !this.globalVars.isLogin && VUtils.isEmpty(this.globalVars.bzCd)) {
            this.router.navigate([GlobalConstants.MENU.GATE.URL]);
            resolve(false);
        } else {
            console.log('else', state.url);
            resolve(true);
        }
    });

  }
  
}
