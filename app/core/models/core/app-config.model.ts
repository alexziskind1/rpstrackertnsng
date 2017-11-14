import { TypeProvider } from '@angular/core';
import { LoggingLevelEnum } from '../enums';

export type AppType = 'Ns' | 'Web';

export interface AppConfig {
    appType: AppType;
    apiEndpoint: string;
    loggingEnabled: boolean;
    loggingLevel: LoggingLevelEnum;
    storageServiceClass: TypeProvider;
}
