import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SettingsComponent } from './settings.component';
import { EMPTY_STRING } from '../../core/helpers/string-helpers';

console.log('BacklogRoutingModule loaded');

const routes: Routes = [
    {
        path: EMPTY_STRING,
        component: SettingsComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule {
    constructor() {
        console.log('SettingsRoutingModule constructed');
    }
}
