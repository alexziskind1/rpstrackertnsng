import { NgModule, Optional, SkipSelf, ErrorHandler, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { Store } from './state/app-store';

import {
    SERVICES,
} from './services';
import { RpsErrorHandler } from './helpers/rps-error-handler';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule
    ],
    providers: [
        ...SERVICES,
        Store,
        { provide: ErrorHandler, useClass: RpsErrorHandler }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}
