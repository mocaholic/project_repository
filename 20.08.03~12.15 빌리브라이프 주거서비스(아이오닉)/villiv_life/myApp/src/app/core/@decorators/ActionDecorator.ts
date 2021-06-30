/**
 * Action 데코레이터
 * @constructor
 */
import {ServiceModel} from '../service/ServiceModel';
import {VUtils} from '../utils/v-utils';
import {environment} from "../../../environments/environment";

/**
 * 서비스 url 과 서비스 method 방식을 설정한다.
 *
 * @param config {'action': AuthEnum.ACTIONS.LOGIN, 'method': 'POST'}
 * @constructor
 */
export function Action(config: any): MethodDecorator {

    return function(target: Function, key: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;
        // console.log('- Load Service Method::: [', originalMethod.name  , ']');
        descriptor.value =  function (...args: any[]) {
            /* for Time profiling */
            const t0 = performance.now();

            const serviceModel = createServiceModel(args[0]);
            console.log('|---[', serviceModel.actionURL, '] Starting...... ---------|');

            const promise = new Promise((resolve, reject) => {

                this.service(serviceModel).then((model: ServiceModel) => {
                    const tSec = VUtils.roundNFixed((performance.now() - t0) / 1000, 2 );
                    console.log('|-----------------------------------------------', serviceModel);
                    console.log('|---', serviceModel.actionURL, '] Takes[' + tSec + ']sec -------|\n\n\n\n');

                    if ( VUtils.isEmpty(model.httpError) ) {
                        resolve(model);
                    } else {
                        reject(model.httpError);
                    }

                });

            });

            const result = originalMethod.apply(this, [promise]);
            return result;
        };

        return descriptor;
    };

    /**
     * 각 메서드에 전달할 서비스 모델 객체를 만든다.
     */
    function createServiceModel(args: any): ServiceModel {

        const jsonConfig = JSON.parse(config['action']);

        const serviceModel: ServiceModel = new ServiceModel();
        serviceModel.params = args;
        serviceModel.method = config['method'];

        if (VUtils.isEmpty(serviceModel.method)) {
            serviceModel.method = 'GET';
        }

        serviceModel.actionURL = jsonConfig['action'];
        const mockupSpec = jsonConfig['mockup'];
        if ( VUtils.isEmpty(mockupSpec) ) {
            serviceModel.env = 'live';
        } else {
            serviceModel.env = 'mockup';
            serviceModel.mockupSpec = mockupSpec;
        }

        return serviceModel;
    }

}
