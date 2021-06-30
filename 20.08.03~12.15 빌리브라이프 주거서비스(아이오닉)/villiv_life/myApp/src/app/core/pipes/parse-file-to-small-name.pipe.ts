import {Pipe, PipeTransform} from '@angular/core';
import {VUtils} from "../utils/v-utils";

/**
 * 파일 사이즈 변환
 * 원본파일이름_S.확장자 (30%)
 * 원본파일이름_M.확장자 (60%)
 * * 원본파일이름.확장자 (100%)
 *  */
@Pipe({
  name: 'parseFileToSmallName',
})
export class ParseFileToSmallNamePipe implements PipeTransform {

  transform(fileFullPath: string, option?: object) {
      if( VUtils.isEmpty(fileFullPath)) {
        return '';
      }
      let size = "";
      if (option != null && option['size'] && option['size'].length > 0) {
          size = option['size'];
      }
      if( VUtils.isEmpty(size)) {
          return fileFullPath;
      }
      let lastDot = fileFullPath.lastIndexOf('.');

      return fileFullPath.substr(0,lastDot) + "_"+ size + fileFullPath.substr(lastDot,fileFullPath.length);
  }
}
