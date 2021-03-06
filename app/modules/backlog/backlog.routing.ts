import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { BacklogPageComponent } from './pages/backlog/backlog.page.component';
import { DetailPageComponent } from './pages/detail/detail.page.component';
import { AuthGuard } from '../../core/services';

console.log('BacklogRoutingModule');

const routes: Routes = [
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
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BacklogRoutingModule {
    constructor() {
        console.log('BacklogRoutingModule constructor');
    }
}
