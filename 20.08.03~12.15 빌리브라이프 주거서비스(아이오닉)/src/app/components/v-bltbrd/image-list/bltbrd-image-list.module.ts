import {NgModule} from '@angular/core';

import {VBltbrdImageListComponent} from "./v-bltbrd-image-list.component";
import {ComponentsModule} from "../../components.module";
@NgModule({
    declarations: [
        VBltbrdImageListComponent,
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        VBltbrdImageListComponent
    ],

})
export class BltbrdImageListModule {
}
