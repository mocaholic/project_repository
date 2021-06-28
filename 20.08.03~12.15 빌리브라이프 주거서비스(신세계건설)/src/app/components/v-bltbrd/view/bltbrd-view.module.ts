import {NgModule} from '@angular/core';

import {VBltbrdViewComponent} from "./v-bltbrd-view.component";
import {FontSizeModule} from "../font-size/font-size.module";
import {ComponentsModule} from "../../components.module";
@NgModule({
    declarations: [
        VBltbrdViewComponent,
    ],
    imports: [
        ComponentsModule,
        FontSizeModule
    ],
    exports: [
        VBltbrdViewComponent
    ],

})
export class BltbrdViewModule {
}
