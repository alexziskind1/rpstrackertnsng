import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app.routing';
import { AppConfigModule } from './config/app-config.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { BacklogModule } from './modules/backlog/backlog.module';

import { AppComponent } from './app.component';
import { Store } from './core/state/app-store';
import { PtMissingTranslationHandler } from './core/helpers/pt-missing-translations-handler';
import { createTranslateLoader, setStatusBarColors } from './utils';
import './utils/console-color';
import './rxjs-imports';

setStatusBarColors();

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,


        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            },
            missingTranslationHandler: { provide: MissingTranslationHandler, useClass: PtMissingTranslationHandler }
        }),

        AppRoutingModule,
        AppConfigModule,
        CoreModule,
        AuthModule,
        BacklogModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
