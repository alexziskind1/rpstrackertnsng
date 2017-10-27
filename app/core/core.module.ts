import { NgModule, Optional, SkipSelf, Inject } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Store } from '../core/app-store';

import {
    AuthService,
    ErrorHandlerService,
    LoggerService,
    NavigationService,
    PtUserService,
    StorageNsService,
    StorageWebService,
} from '../core/services';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule
    ],
    providers: [
        AuthService,
        PtUserService,
        ErrorHandlerService,
        LoggerService,
        NavigationService,
        StorageNsService,
        StorageWebService,
        Store
    ]
})
export class CoreModule {
    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}
