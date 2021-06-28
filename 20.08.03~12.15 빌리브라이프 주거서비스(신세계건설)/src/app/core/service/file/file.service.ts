import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";
import {BsSvcEnum} from "../../enums/service/bs-svc.enum";
import {IotEnum} from "../../enums/service/iot.enum";
import {FileEnum} from "../../enums/service/file.enum";

@Injectable({
  providedIn: 'root',
})
export class FileService extends ServiceAbstract {

  constructor(http: HttpClient,
              spinnerDialog: SpinnerDialog,
              globalVars: VGlobalVars
  ) {
    super(http,spinnerDialog,globalVars);
  }

  /**
   * 파일 다운로드
   */
  @Action({'action': FileEnum.ACTIONS_FILE.DOWNLOAD, 'method': "file"})
  downloadFile(proms: Promise<ServiceModel>): Promise<ServiceModel> {
    return proms;
  }
}
