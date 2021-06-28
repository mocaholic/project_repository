import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
import {VUtils} from "../utils/v-utils";

/**
 * 파일경로변환
 *  */
@Pipe({
  name: 'fileToWebPath',
})
export class FileToWebPathPipe implements PipeTransform {

  transform(fileFullPath: string,defaultPath: string="") {
      if( VUtils.isEmpty(fileFullPath) ) {
        return defaultPath;
      }

      let webPath = fileFullPath.substring(fileFullPath.indexOf('/upload'));
      return environment.baseDomain + webPath;
  }
}
