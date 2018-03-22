import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-pro-ui/sidedrawer/angular';
import { NativeScriptUIDataFormModule } from 'nativescript-pro-ui/dataform/angular';

import { PtModalService } from './modals/pt-modal.service';

import { MenuComponent } from './components/menu/menu.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TextInputModalComponent } from './modals/text-input/text-input.modal.component';
import { ListSelectorModalComponent } from './modals/list-selector/list-selector.modal.component';
import { LogoutDirective } from './directives/app-logout-attribute.directive';



@NgModule({
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule
    ],
    exports: [
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        MenuComponent,
        DialogComponent,
        LogoutDirective
    ],
    declarations: [
        MenuComponent,
        DialogComponent,
        TextInputModalComponent,
        ListSelectorModalComponent,
        LogoutDirective
    ],
    providers: [
        PtModalService
    ],
    entryComponents: [
        TextInputModalComponent,
        ListSelectorModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
