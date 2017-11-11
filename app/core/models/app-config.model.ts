import { TypeProvider } from "@angular/core";

export type AppType = 'Ns' | 'Web';

export interface AppConfig {
    appType: AppType;
    apiEndpoint: string;
    storageServiceClass: TypeProvider;
}
