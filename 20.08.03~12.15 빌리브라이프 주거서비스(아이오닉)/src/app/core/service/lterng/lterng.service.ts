import {Injectable} from '@angular/core';
import {ServiceAbstract} from "../ServiceAbstract";
import {HttpClient} from "@angular/common/http";
import {Action} from "../../@decorators/ActionDecorator";
import {ServiceModel} from "../ServiceModel";
import {Lterng} from "../../enums/service/lterng.enum";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {VGlobalVars} from "../../utils/v-global-vars";

@Injectable({
    providedIn: 'root',
})
export class LterngService extends ServiceAbstract {

    constructor(http: HttpClient,
                spinnerDialog: SpinnerDialog,
                globalVars: VGlobalVars
    ) {
        super(http,spinnerDialog,globalVars);
    }

    /**
     * 촤신 레터링 조회
     * @param proms
     */
    @Action({'action': Lterng.ACTIONS_LTERNG.LATEST, 'method': "GET"})
    loadLatestLterng(proms: Promise<ServiceModel>): Promise<ServiceModel> {
        return proms;
    }

    /**
     * 레터링 등록
     * @param proms
     */
    @Action({'action': Lterng.ACTIONS_LTERNG.INSERT, 'method': "POST"})
    insertLterng(proms: Promise<ServiceModel>): Promise<ServiceModel> {
        return proms;
    }

}
