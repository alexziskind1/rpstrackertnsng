import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';


import { AuthService } from '../../core/services/auth.service';
import { Store } from '../../core/state/app-store';
import { AuthRoutingModule } from './auth.routing';
import { AuthGuard } from '../../core/services';


import { PAGES } from './pages';
import { COMPONENTS } from './components';


export const AUTH_PROVIDERS = [
    AuthGuard
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        AuthRoutingModule,
        TranslateModule.forChild()
    ],
    exports: [],
    declarations: [
        ...PAGES,
        ...COMPONENTS
    ],
    providers: [
        AuthService,
        AUTH_PROVIDERS,
        Store
    ]
})
export class AuthModule { }
