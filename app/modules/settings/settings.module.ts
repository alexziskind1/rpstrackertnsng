import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';

console.log('SettingsModule loaded');

@NgModule({
    imports: [
        SettingsRoutingModule
    ],
    exports: [],
    declarations: [SettingsComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule {
    constructor() {
        console.log('SettingsModule constructed');
    }
}
