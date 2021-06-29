import {NgModule} from '@angular/core';

//공통모듈
import {IonicModule} from "@ionic/angular";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'ion2-calendar';
import { PinchZoomModule } from 'ngx-pinch-zoom';

//공통컴포넌트
import {VHeaderComponent} from "./v-header/v-header.component";
import {VBottomComponent} from "./v-bottom/v-bottom.component";
import {VBodyComponent} from "./v-body/v-body.component";
import {VAppComponent} from "./v-app/v-app.component";
import {VTopComponent} from "./v-top/v-top.component";



//공통파이프
import {PipesModule} from "../core/pipes/module/pipes.module"
//공통디렉티브
import {DirectivesModule} from "../core/directives/module/directives.module"
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
        VAppComponent,
        VHeaderComponent,
        VBodyComponent,
        VTopComponent,
        VBottomComponent,
    ],
    exports: [
        VAppComponent,
        VHeaderComponent,
        VBottomComponent,
        VBodyComponent,
        VTopComponent,
        IonicModule,
        CommonModule,
        FormsModule,
        NgSelectModule,
        PipesModule,
        DirectivesModule,
        CalendarModule,
        PinchZoomModule
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        NgSelectModule
    ]
})
export class ComponentsModule {
}
