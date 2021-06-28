import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoticeListPage} from './notice/notice-list/notice-list.page';
import {NoticeViewPage} from "./notice/notice-view/notice-view.page";
import {LetteringPage} from "./lettering/lettering.page";
import {IvstPage} from "./ivst/list/ivst.page";
import {VotePage} from "./vote/list/vote.page";
import {IvstViewPage} from "./ivst/view/ivst.view.page";
import {VoteViewPage} from "./vote/view/vote.view.page";
import {VoteResultPage} from "./vote/result/vote.result.page";

const routes: Routes = [
    {
        path: '', // community    // `기본 공지사항`
        redirectTo: 'notice',
        pathMatch: 'full'
    },
    {
        path: 'notice',           // `공지사항`
        component: NoticeListPage,
    },
    {
        path: 'notice-view/:bltbrdId',           // `공지사항 상세`
        component: NoticeViewPage,
    },
    // {
    //     path: 'fleamarket',            // `플리마켓`
    //     component: FleamarketPage,
    // },
    // {
    //     path: 'fleamarket-view/:bltbrdId',       // `플리마켓 상세`
    //     component: FleamarketViewPage,
    // },
    {
        path: 'lifeshare',        // `community/lifeshare`
        loadChildren: () => import('./lifeshare/lifeshare.module').then(m => m.LifeshareModule)
    },
    {
        path: 'lettering',
        component: LetteringPage, // `레터링 신청`
    },
    {
        path: 'ivst',
        component: IvstPage,      // `설문조사`
    },
    {
        path: 'ivst-view/:qstnId',
        component: IvstViewPage,      // `설문조사 상세`
    },
    {
        path: 'vote',
        component: VotePage,      // `투표`
    },
    {
        path: 'vote-view/:qstnId',
        component: VoteViewPage,      // `투표 상세`
    },
    {
        path: 'vote-result/:qstnId',
        component: VoteResultPage,      // `투표 결과`
    },
    { path: '**', redirectTo: '/' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommunityRoutingModule {
}
