import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { EMPTY_STRING } from './core/helpers/string-helpers';

console.log('AppRoutingModule loaded');

const routes: Routes = [
    { path: EMPTY_STRING, redirectTo: 'backlog/open', pathMatch: 'full' },
    { path: 'backlog', redirectTo: 'backlog/open', pathMatch: 'full' },
    // { path: "auth", loadChildren: "./modules/auth/auth.module#AuthModule" },
    // { path: 'backlog', loadChildren: './modules/backlog/backlog.module#BacklogModule' },
    { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' }
    // { path: 'settings', component: SettingsComponent  }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: false })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
    constructor() {
        console.log('AppRoutingModule constructed');
    }
}
