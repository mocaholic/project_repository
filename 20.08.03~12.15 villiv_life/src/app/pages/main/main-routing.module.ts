import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import {LoginPage} from "./login/login.page";
import {LogoutConfirmPage} from "./logout-confirm/logout-confirm.page";

import {GatePage} from "./gate/gate.page";

import {TermsPage} from "./terms/terms.page";
import {SettingPage} from "./setting/setting.page";
import {PushListPage} from "./push-list/push-list.page";
import {AuthGuard} from "../../core/guard/auth.guard";
import {BzCodeGuard} from "../../core/guard/bzCode.guard";

const routes: Routes = [
  {
    path: '', // main
    component: MainPage,
    canActivate: [BzCodeGuard,AuthGuard],
  },
  {
    path: 'login', // login
    component: LoginPage,
  },
  // {
  //   path: 'logout-confirm', // 자동로그아웃 확인 페이지
  //   component: LogoutConfirmPage,
  // },
  {
    path: 'gate',           // 게이트 페이지
    component: GatePage,
    canActivate: [BzCodeGuard],
  },
  {
    path: 'terms',           // 약관 페이지
    component: TermsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'setting',        //설정
    component: SettingPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'push',           //알림목록
    component: PushListPage,
    canActivate: [AuthGuard],
  },
  // { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
