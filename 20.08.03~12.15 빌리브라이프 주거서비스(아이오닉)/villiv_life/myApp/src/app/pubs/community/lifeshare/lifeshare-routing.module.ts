import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoticeListPage} from "../notice/notice-list/notice-list.page";
import {BoardResidentViewPage} from "./board-resident/view/board-resident.view.page";
import {BoardResidentPage} from "./board-resident/list/board-resident.page";
import {BoardLancablePage} from "./board-lancable/list/board-lancable.page";
import {BoardLancableViewPage} from "./board-lancable/view/board-lancable.view.page";
import {BoardNewsPage} from "./board-news/list/board-news.page";
import {BoardNewsViewPage} from "./board-news/view/board-news.view.page";
import {BoardSharePage} from "./board-share/list/board-share.page";
import {BoardShareViewPage} from "./board-share/view/board-share.view.page";
import {BoardLancableUpdatePage} from "./board-lancable/update/board-lancable.update.page";

const routes: Routes = [
  {
    path: '', // community/lifeshare
    redirectTo: 'board-resident',
    pathMatch: 'full'
  },
  {
    path: 'board-resident',       // `입주민 게시판`
    component: BoardResidentPage,
  },
  {
    path: 'board-resident-view',  // `입주민 게시판 상세`
    component: BoardResidentViewPage,
  },
  {
    path: 'board-lancable',       // `랜선 집들이 게시판`
    component: BoardLancablePage,
  },
  {
    path: 'board-lancable-view',  // `랜선 집들이 게시판 상세`
    component: BoardLancableViewPage,
  },
  {
    path: 'board-lancable-update',       // `랜선 집들이 게시판 입력/수정`
    component: BoardLancableUpdatePage,
  },
  {
    path: 'board-news',           // `소식방 게시판`
    component: BoardNewsPage,
  },
  {
    path: 'board-news-view',      // `소식방 게시판 상세`
    component: BoardNewsViewPage,
  },
  {
    path: 'board-share',          // `단지장터 게시판`
    component: BoardSharePage
  },
  {
    path: 'board-share-view',     // `단지장터 게시판 상세`
    component: BoardShareViewPage,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeshareRoutingModule {}
