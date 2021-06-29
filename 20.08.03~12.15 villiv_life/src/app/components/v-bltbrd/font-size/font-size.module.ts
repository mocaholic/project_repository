import {NgModule} from '@angular/core';

import {VFontSizeComponent} from "./v-font-size.component";
import {ComponentsModule} from "../../components.module";
@NgModule({
    declarations: [
        VFontSizeComponent,
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        VFontSizeComponent
    ],

})
export class FontSizeModule {
}
