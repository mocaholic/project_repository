import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BoardResidentViewPage} from "./board-resident/view/board-resident.view.page";
import {BoardResidentUpdatePage} from "./board-resident/update/board-resident.update.page";
import {BoardResidentPage} from "./board-resident/list/board-resident.page";

import {BoardLancablePage} from "./board-lancable/list/board-lancable.page";
import {BoardLancableUpdatePage} from "./board-lancable/update/board-lancable.update.page";
import {BoardLancableViewPage} from "./board-lancable/view/board-lancable.view.page";

import {BoardNewsPage} from "./board-news/list/board-news.page";
import {BoardNewsUpdatePage} from "./board-news/update/board-news.update.page";
import {BoardNewsViewPage} from "./board-news/view/board-news.view.page";

import {BoardSharePage} from "./board-share/list/board-share.page";
import {BoardShareUpdatePage} from "./board-share/update/board-share.update.page";
import {BoardShareViewPage} from "./board-share/view/board-share.view.page";

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
        path: 'board-resident-insert',       // `입주민 게시판 입력`
        component: BoardResidentUpdatePage,
    },
    {
        path: 'board-resident-update/:bltbrdId',       // `입주민 게시판 수정`
        component: BoardResidentUpdatePage,
    },
    {
        path: 'board-resident-view/:bltbrdId',  // `입주민 게시판 상세`
        component: BoardResidentViewPage,
    },
    {
        path: 'board-lancable',       // `랜선 집들이 게시판`
        component: BoardLancablePage,
    },
    {
        path: 'board-lancable-view/:bltbrdId',  // `랜선 집들이 게시판 상세`
        component: BoardLancableViewPage,
    },
    {
        path: 'board-lancable-insert',       // `랜선 집들이 게시판 입력`
        component: BoardLancableUpdatePage,
    },
    {
        path: 'board-lancable-update/:bltbrdId',       // `랜선 집들이 게시판 수정`
        component: BoardLancableUpdatePage,
    },
    {
        path: 'board-news',           // `소식방 게시판`
        component: BoardNewsPage,
    },
    {
        path: 'board-news-insert',       // `소식방 게시판 입력`
        component: BoardNewsUpdatePage,
    },
    {
        path: 'board-news-update/:bltbrdId',       // `소식방 게시판 수정`
        component: BoardNewsUpdatePage,
    },
    {
        path: 'board-news-view/:bltbrdId',      // `소식방 게시판 상세`
        component: BoardNewsViewPage,
    },
    {
        path: 'board-share',          // `단지장터 게시판`
        component: BoardSharePage
    },
    {
        path: 'board-share-insert',       // `단지장터 게시판 입력`
        component: BoardShareUpdatePage,
    },
    {
        path: 'board-share-update/:bltbrdId',       // `단지장터 게시판 수정`
        component: BoardShareUpdatePage,
    },
    {
        path: 'board-share-view/:bltbrdId',     // `단지장터 게시판 상세`
        component: BoardShareViewPage,
    },
    { path: '**', redirectTo: '/' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LifeshareRoutingModule {
}
