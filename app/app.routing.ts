import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';


import { AuthGuard } from './core/services/auth-guard.service';
//import { SettingsComponent } from './modules/settings/settings.component';


const routes: Routes = [
    { path: '', redirectTo: 'backlog/open', pathMatch: 'full' },
    { path: 'backlog', redirectTo: 'backlog/open', pathMatch: 'full' },
    //{ path: "auth", loadChildren: "./modules/auth/auth.module#AuthModule" },
    { path: "backlog", loadChildren: "./modules/backlog/backlog.module#BacklogModule" },
    { path: 'settings', loadChildren: "./modules/settings/settings.module#SettingsModule" }
    //{ path: 'settings', component: SettingsComponent  }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
