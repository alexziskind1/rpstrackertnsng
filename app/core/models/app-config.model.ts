import { TypeProvider } from "@angular/core";

export type AppType = 'Ns' | 'Web';

export interface AppConfig {
    appType: AppType;
    apiBaseUrl: string;
    apiRoot: string;
    apiEndpoint: string;
    storageServiceClass: TypeProvider;
}
