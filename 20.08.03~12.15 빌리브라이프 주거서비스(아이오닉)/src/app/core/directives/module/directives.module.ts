import { NgModule } from '@angular/core';

import { NumberOnlyDirective } from '../number-only.directive';
import { KoOnlyDirective } from '../ko-only.directive';


@NgModule({
	declarations: [
        NumberOnlyDirective,
		KoOnlyDirective
	],
	imports: [],
	exports: [
        NumberOnlyDirective,
		KoOnlyDirective
    ]
})
export class DirectivesModule {}
