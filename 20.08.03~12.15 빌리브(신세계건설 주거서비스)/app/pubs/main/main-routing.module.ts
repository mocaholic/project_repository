import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import {LoginPage} from "./login/login.page";
import {LogoutConfirmPage} from "./logout-confirm/logout-confirm.page";
import {PincodePage} from "./pincode/pincode.page";
import {GatePage} from "./gate/gate.page";
import {TermsPage} from "./terms/terms.page";
import {SettingPage} from "./setting/setting.page";
import {PushListPage} from "./push-list/push-list.page";

const routes: Routes = [
  {
    path: '', // main
    component: MainPage,
  },

  {
    path: 'login', // login
    component: LoginPage,
  },
  {
    path: 'logout-confirm', // 자동로그아웃 확인 페이지
    component: LogoutConfirmPage,
  },
  {
    path: 'pincode',        // 핀번호 암호 입력 페이지
    component: PincodePage,
  },
  {
    path: 'gate',           // 게이트 페이지
    component: GatePage,
  },
  {
    path: 'terms',           // 약관 페이지
    component: TermsPage,
  },
  {
    path: 'setting',        //설정
    component: SettingPage
  },
  {
    path: 'push',           //알림목록
    component: PushListPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
