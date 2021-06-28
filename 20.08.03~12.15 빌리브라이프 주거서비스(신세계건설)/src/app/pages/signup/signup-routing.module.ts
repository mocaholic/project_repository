import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgreementPage} from "./agreement/agreement.page";
import {CompletePage} from "./complete/complete.page";
import {ConfirmPage} from "./confirm/confirm.page";

const routes: Routes = [
  {
    path: '',                 // `signup`
    redirectTo: 'agreement',
    pathMatch: 'full'
  },
  {
    path: 'agreement',      // 약관동의
    component: AgreementPage
  },
  {
    path: 'confirm',    // 회원정보 확인
    component: ConfirmPage
  },
  {
    path: 'complete',    // 회원등록 완료
    component: CompletePage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
