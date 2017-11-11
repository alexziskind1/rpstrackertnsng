import { Injectable, Inject } from '@angular/core';

import { AppConfig } from '../models/core/app-config.model';
import { APP_CONFIG } from '../../config/app-config.module';
import { LoggingLevelEnum } from '../models/enums/logging-level.enum';


@Injectable()
export class LoggerService {
    private logs: string[] = [];
    private errors: string[] = [];

    constructor( @Inject(APP_CONFIG) private config: AppConfig) { }

    log(message: string) {
        if (this.config.loggingEnabled && this.config.loggingLevel === LoggingLevelEnum.Debug) {
            this.logs.push(message);
            console.log(message);
        }
    }

    error(message: string) {
        if (this.config.loggingEnabled) {
            this.errors.push(message);
            console.error(message);
        }
    }
}
