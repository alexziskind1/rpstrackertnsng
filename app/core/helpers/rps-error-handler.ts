import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { LoggerService } from '../../core/services';


@Injectable()
export class RpsErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    public handleError(error) {
        const loggerService = this.injector.get(LoggerService);
        //const zone = this.injector.get(NgZone);

        const message = error.message ? error.message : error.toString();



        /*
        if (confirm('There was an error and we have to close the app')) {
            throw error;
        }
        */

        //zone.run(() => {
        //alert('there was an error : ' + message);
        //});

        loggerService.error(message);
        throw error;
    }

}


