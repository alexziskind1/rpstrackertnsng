import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';


import { AuthGuard } from './core/services/auth-guard.service';

import { AuthPageComponent } from './modules/auth/pages/auth/auth.page.component';
import { BacklogPageComponent } from './modules/backlog/pages/backlog/backlog.page.component';
import { DetailPageComponent } from './modules/backlog/pages/detail/detail.page.component';


const routes: Routes = [
    { path: '', redirectTo: 'backlog/open', pathMatch: 'full' },
    { path: 'backlog', redirectTo: 'backlog/open', pathMatch: 'full' },
    { path: "auth", loadChildren: "./modules/auth/auth.module#AuthModule" },
    { path: "backlog", loadChildren: "./modules/backlog/backlog.module#BacklogModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
