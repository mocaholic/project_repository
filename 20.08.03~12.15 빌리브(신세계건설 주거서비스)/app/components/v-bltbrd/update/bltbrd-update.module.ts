import {NgModule} from '@angular/core';

import {VBltbrdUpdateComponent} from "./v-bltbrd-update.component";
import {ComponentsModule} from "../../components.module";
@NgModule({
    declarations: [
        VBltbrdUpdateComponent,
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        VBltbrdUpdateComponent
    ],

})
export class BltbrdUpdateModule {
}
