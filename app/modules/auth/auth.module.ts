import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// import { TranslateModule } from '@ngx-translate/core';
// import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { Store } from '../../core/state/app-store';
import { AuthRoutingModule } from './auth.routing';
import { AuthGuard } from '../../core/services';

import { CONTAINERS } from './containers';
import { PAGES } from './pages';
import { COMPONENTS } from './components';

export const AUTH_PROVIDERS = [
    AuthGuard
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AuthRoutingModule,
        // TranslateModule.forChild(),
        // TNSFontIconModule
    ],
    exports: [],
    declarations: [
        ...CONTAINERS,
        ...PAGES,
        ...COMPONENTS
    ],
    providers: [
        AuthService,
        AUTH_PROVIDERS,
        Store
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule {
    constructor() {
        console.log('AuthModule constructor');
    }
}
