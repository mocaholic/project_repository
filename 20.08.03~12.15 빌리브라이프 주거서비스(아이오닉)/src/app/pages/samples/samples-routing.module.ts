import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableLoadPage} from "./table-load/table-load.page";
import {ApiTestPage} from "./api-test/api-test.page";

/**
 */
const routes: Routes = [{
  path: '', /* samples */
  children: [
    { path: '', redirectTo: 'table-load', pathMatch: 'full' },
    {
      path: 'table-load',
      component: TableLoadPage, /* 샘플 -> 테이블 데이터 로딩 */
    },
    {
      path: 'api-test',
      component: ApiTestPage, /* 샘플 -> API 테스트 페이지 */
    },
  ],

},]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SamplesRoutingModule { }
