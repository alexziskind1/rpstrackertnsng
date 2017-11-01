import { NgModule } from '@angular/core';
import { Http } from '@angular/http';


import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../core/services/auth.service';
//import { authProviders } from '../../app.routing';

import { AuthPageComponent } from './pages/auth/auth.page.component';
import { LoginFormComponent } from './components/login-form.component';
import { RegisterFormComponent } from './components/register-form.component';
import { Store } from '../../core/app-store';
import { AuthRoutingModule } from './auth.routing';
import { AuthGuard } from '../../core/services';

export const authProviders = [
    AuthGuard
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        AuthRoutingModule,
        TranslateModule.forChild()
    ],
    exports: [],
    declarations: [
        AuthPageComponent,
        LoginFormComponent,
        RegisterFormComponent
    ],
    providers: [
        AuthService,
        authProviders,
        Store
    ]
})
export class AuthModule { }
