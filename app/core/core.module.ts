import { NgModule, Optional, SkipSelf, Inject } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { AppConfig } from './models/app-config.model';
import { APP_CONFIG } from '../config/app-config.module';
import { Store } from './state/app-store';

import {
    AuthService,
    AuthTokenService,
    ErrorHandlerService,
    LoggerService,
    NavigationService,
    PtUserService,
    StorageNsService,
    StorageWebService,
    PtApiHttpInterceptor,
} from '../core/services';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule
    ],
    providers: [
        AuthService,
        AuthTokenService,
        PtUserService,
        ErrorHandlerService,
        LoggerService,
        NavigationService,
        StorageNsService,
        StorageWebService,
        Store,
        { provide: HTTP_INTERCEPTORS, useClass: PtApiHttpInterceptor, multi: true }
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
