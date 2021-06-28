import { NgModule } from '@angular/core';

import { ParseEnterToHtmlTagPipe } from '../parse-enter-to-html-tag.pipe';
import { StringDateFormatDtPipe } from '../string-date-format-dt.pipe';
import { StringDateFormatDtmPipe } from '../string-date-format-dtm.pipe';
import { CheckDateIsNewPipe } from '../check-date-is-new.pipe';
import { CheckDateIsEndPipe } from '../check-date-is-end.pipe';
import { FileToWebPathPipe } from '../file-to-web-path.pipe';
import { FileSizeFormatPipe } from '../file-size-format.pipe';
import { NumberFormatWithCommaPipe } from '../number-format-with-comma.pipe';
import { NumberFormatPercentPipe } from '../number-format-percent.pipe';
import { ParseSecondToMinutePipe } from '../parse-second-to-minute.pipe';
import { GetDayOfTheWeekPipe } from '../get-day-of-the-week';
import { ParseFormatPhoneNumberPipe } from '../parse-format-phone-number.pipe';
import { ParseTimestampToDtmPipe } from '../parse-timestamp-to-dtm.pipe';
import { ParseFileToSmallNamePipe } from '../parse-file-to-small-name.pipe';

@NgModule({
	declarations: [
	    ParseEnterToHtmlTagPipe,
		StringDateFormatDtPipe,
		StringDateFormatDtmPipe,
		CheckDateIsNewPipe,
		CheckDateIsEndPipe,
		FileToWebPathPipe,
		FileSizeFormatPipe,
		NumberFormatWithCommaPipe,
		NumberFormatPercentPipe,
		ParseSecondToMinutePipe,
		GetDayOfTheWeekPipe,
		ParseFormatPhoneNumberPipe,
		ParseTimestampToDtmPipe,
		ParseFileToSmallNamePipe
    ],
	imports: [],
	exports: [
        ParseEnterToHtmlTagPipe,
		StringDateFormatDtPipe,
		StringDateFormatDtmPipe,
		CheckDateIsNewPipe,
		CheckDateIsEndPipe,
		FileToWebPathPipe,
		FileSizeFormatPipe,
		NumberFormatWithCommaPipe,
		NumberFormatPercentPipe,
		ParseSecondToMinutePipe,
		GetDayOfTheWeekPipe,
		ParseFormatPhoneNumberPipe,
		ParseTimestampToDtmPipe,
		ParseFileToSmallNamePipe
    ]
})
export class PipesModule {}
