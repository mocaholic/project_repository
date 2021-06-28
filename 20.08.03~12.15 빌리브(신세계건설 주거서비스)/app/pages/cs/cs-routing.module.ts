import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaqPage} from "./faq/faq.page";
import {BoardInquireViewPage} from "./board-inquire/view/board-inquire.view.page";
import {BoardInquirePage} from "./board-inquire/list/board-inquire.page";
import {BoardInquireUpdatePage} from "./board-inquire/update/board-inquire.update.page";

/**
 */
const routes: Routes = [
  {
    path: '',                 // `cs`
    redirectTo: 'faq',
    pathMatch: 'full'
  },
  {
    path: 'faq',              // `faq`
    component: FaqPage
  },
  {
    path: 'board-inquire',    // `문의하기`(리스트)
    component: BoardInquirePage
  },
  {
    path: 'board-inquire-view/:bltbrdId', // `문의하기`(상세)
    component: BoardInquireViewPage
  },
  {
    path: 'board-inquire-update', // `문의하기`(업데이트)
    component: BoardInquireUpdatePage
  },
  {
    path: 'board-inquire-insert',    // `문의하기 글 작성'
    component: BoardInquireUpdatePage
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CsRoutingModule { }
