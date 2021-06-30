import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {IndexPubPage} from "./pubs/index-pub/index-pub.page";
import {GuidePage} from "./pubs/guide/guide.page";
import {SettingPage} from "./pages/main/setting/setting.page";
import {PushListPage} from "./pages/main/push-list/push-list.page";
import {AuthGuard} from "./core/guard/auth.guard";
import {BzCodeGuard} from "./core/guard/bzCode.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(environment.pagePath +  '/main/main.module').then( m => m.MainPageModule),
  },
  {
    path: 'pubs',
    component: IndexPubPage,
  },
  {
    path: 'guide',
    component: GuidePage,
  },
  {
    path: 'community',
    loadChildren: () => import( environment.pagePath + '/community/community.module').then( m => m.CommunityModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'samples',
    loadChildren: () => import(environment.pagePath +  '/samples/samples.module').then( m => m.SamplesModule)
  },
  {
    path: 'story',
    loadChildren: () => import(environment.pagePath +  '/story/story.module').then(m => m.StoryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'event',
    loadChildren: () => import(environment.pagePath +  '/event/event.module').then( m => m.EventModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cs',
    loadChildren: () => import(environment.pagePath +  '/cs/cs.module').then( m => m.CsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    loadChildren: () => import(environment.pagePath +  '/signup/signup.module').then( m => m.SignupModule)
  },
  {
    path: 'bz-service',
    loadChildren: () => import(environment.pagePath +  '/bz-service/bz-service.module').then( m => m.BzServiceModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'iot',
    loadChildren: () => import(environment.pagePath +  '/iot/iot.module').then( m => m.IotModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-page',
    loadChildren: () => import(environment.pagePath +  '/my-page/my-page.module').then( m => m.MyPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import(environment.pagePath +  '/main/main.module').then( m => m.MainPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload',anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', scrollOffset:[0,0]})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
