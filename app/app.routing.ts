import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';


import { AuthGuard } from './core/services/auth-guard.service';

import { AuthPageComponent } from './modules/auth/pages/auth/auth.page.component';
import { BacklogPageComponent } from './modules/backlog/pages/backlog/backlog.page.component';
import { DetailPageComponent } from './modules/backlog/pages/detail/detail.page.component';


export const authProviders = [
    AuthGuard
];

const routes: Routes = [
    {
        path: '',
        redirectTo: '/backlog/open',
        pathMatch: 'full'
    },
    {
        path: 'auth/:action',
        component: AuthPageComponent
    },
    {
        path: 'backlog',
        redirectTo: 'backlog/open',
        pathMatch: 'full'
    },
    {
        path: 'backlog/:preset',
        component: BacklogPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'detail/:id',
        component: DetailPageComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
