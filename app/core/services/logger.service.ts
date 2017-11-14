import { Injectable, Inject } from '@angular/core';

import { AppConfig, LogEntry } from '../models/core';
import { APP_CONFIG } from '../../config/app-config.module';
import { LoggingLevelEnum } from '../models/enums';



@Injectable()
export class LoggerService {
    private logs: LogEntry[] = [];

    constructor( @Inject(APP_CONFIG) private config: AppConfig) { }

    log(message: string) {
        if (this.config.loggingEnabled && this.config.loggingLevel === LoggingLevelEnum.Debug) {
            this.logs.push({ message: message, level: LoggingLevelEnum.Log });
            console.logColor(message);
        }
    }

    warn(message: string) {
        if (this.config.loggingEnabled && this.config.loggingLevel === LoggingLevelEnum.Debug) {
            this.logs.push({ message: message, level: LoggingLevelEnum.Warning });
            console.warnColor(message);
        }
    }

    error(message: string) {
        if (this.config.loggingEnabled) {
            this.logs.push({ message: message, level: LoggingLevelEnum.Error });
            console.errorColor(message);
        }
    }
}
