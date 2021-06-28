import {NgModule} from '@angular/core';

import {VBltbrdListComponent} from "./v-bltbrd-list.component";
import {ComponentsModule} from "../../components.module";
@NgModule({
    declarations: [
        VBltbrdListComponent,
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        VBltbrdListComponent
    ],

})
export class BltbrdListModule {
}
